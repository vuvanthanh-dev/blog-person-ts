import { axiosClient } from "./axios-client";
import type { HttpRequestConfig } from "./types";
import "./interceptor";

const call = <TResponse = any, TData = any, TParams = any>(
  config: HttpRequestConfig<TData, TParams>
) => {
  const { url, method = "GET", params, data, ...rest } = config;

  return axiosClient.request<TResponse>({
    url,
    method,
    params,
    data,
    ...rest,
  });
};

const upload = <
  TResponse = any,
  TParams = any,
  TExtraData = Record<string, any>
>(config: {
  url: string;
  method?: "POST" | "PUT" | "GET";
  file: File | Blob;
  params?: TParams;
  data?: TExtraData;
  headers?: Record<string, string>;
}) => {
  const { url, method = "POST", file, params, data, headers } = config;

  const formData = new FormData();
  formData.append("file", file);

  if (data) {
    Object.keys(data).forEach((key) => {
      const value = (data as any)[key];
      formData.append(key, String(value));
    });
  }

  return call<TResponse>({
    url,
    method,
    params,
    data: formData,
    headers,
  });
};

const download = <TParams = any, TData = any>(config: {
  url: string;
  method?: "GET" | "POST";
  params?: TParams;
  data?: TData;
}) => {
  const { url, method = "GET", params, data } = config;

  return call<Blob>({
    url,
    method,
    params,
    data,
    responseType: "blob",
  });
};

const http = {
  call,
  upload,
  download,
};

export default http;
