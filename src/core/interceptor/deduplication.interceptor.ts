import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosClient } from "./axios-client";

/**
 * Request Deduplication Interceptor
 *
 * ⚡ Performance: Prevents duplicate identical requests from being sent
 * If the same request is already in flight, subsequent requests will wait
 * for the first one to complete and reuse its result.
 *
 * Benefits:
 * - Reduces bandwidth usage
 * - Reduces server load
 * - Prevents race conditions
 * - Improves perceived performance
 *
 * Use cases:
 * - User clicks submit button multiple times rapidly
 * - Multiple components request the same data simultaneously
 * - Page navigation triggers multiple identical API calls
 */

// Store pending requests: key -> Promise
const pendingRequests = new Map<string, Promise<AxiosResponse>>();

// Store to track request timestamps for cleanup
const requestTimestamps = new Map<string, number>();

// Maximum time to keep a request in cache (5 minutes)
const MAX_REQUEST_AGE = 5 * 60 * 1000;

/**
 * Generate unique key for request
 * Only GET requests with same URL and params are considered duplicates
 */
const generateRequestKey = (config: AxiosRequestConfig): string | null => {
  const { method, url, params } = config;

  // Only deduplicate GET requests (safe to cache)
  // POST/PUT/DELETE may have side effects, should not deduplicate
  if (method?.toLowerCase() !== "get") {
    return null;
  }

  const paramsStr = params ? JSON.stringify(params) : "";
  return `GET-${url}-${paramsStr}`;
};

/**
 * Clean up stale requests from cache
 */
const cleanupStaleRequests = (): void => {
  const now = Date.now();
  const keysToDelete: string[] = [];

  requestTimestamps.forEach((timestamp, key) => {
    if (now - timestamp > MAX_REQUEST_AGE) {
      keysToDelete.push(key);
    }
  });

  keysToDelete.forEach((key) => {
    pendingRequests.delete(key);
    requestTimestamps.delete(key);
  });
};

/**
 * Setup request deduplication by wrapping axios request method
 * This is more reliable than using interceptors
 */
export const setupDeduplicationInterceptor = (): void => {
  const originalRequest = axiosClient.request.bind(axiosClient);

  axiosClient.request = function <T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R> {
    const requestKey = generateRequestKey(config);

    // If not a GET request, proceed normally
    if (!requestKey) {
      return originalRequest<T, R, D>(config);
    }

    // Clean up stale requests periodically
    cleanupStaleRequests();

    // Check if duplicate request exists
    const duplicatePromise = pendingRequests.get(requestKey);
    if (duplicatePromise) {
      // Return the existing promise
      return duplicatePromise as Promise<R>;
    }

    // Create new request promise
    const requestPromise = originalRequest<T, R, D>(config).finally(() => {
      // Clean up after request completes
      pendingRequests.delete(requestKey);
      requestTimestamps.delete(requestKey);
    });

    // Store in pending requests
    pendingRequests.set(requestKey, requestPromise as Promise<AxiosResponse>);
    requestTimestamps.set(requestKey, Date.now());

    return requestPromise;
  };
};

/**
 * Manually clear all pending requests
 * Useful for cleanup on logout or route change
 */
export const clearPendingRequests = (): void => {
  pendingRequests.clear();
  requestTimestamps.clear();
};
