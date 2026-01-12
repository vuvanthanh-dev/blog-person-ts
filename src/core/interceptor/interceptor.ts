import { setupAuthInterceptor } from "./auth.interceptor";
import { setupRetryInterceptor } from "./retry.interceptor";
import { setupCsrfInterceptor } from "./csrf.interceptor";
import { setupDeduplicationInterceptor } from "./deduplication.interceptor";

// Order matters: Deduplication -> Auth -> CSRF -> Retry
setupDeduplicationInterceptor();
setupAuthInterceptor();
setupCsrfInterceptor();
setupRetryInterceptor();
