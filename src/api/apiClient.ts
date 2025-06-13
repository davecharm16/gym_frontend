/* eslint-disable @typescript-eslint/no-explicit-any */
// services/apiClient.ts
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { ApiResponse } from "../types/api_response";
import { base_url } from "./api";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: base_url,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

class ApiClient {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const res = await instance.get<ApiResponse<T>>(url, config);
    return res.data;
  }

  async post<T, B = any>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const res = await instance.post<ApiResponse<T>>(url, body, config);
    return res.data;
  }

  async put<T, B = any>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const res = await instance.put<ApiResponse<T>>(url, body, config);
    return res.data;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const res = await instance.delete<ApiResponse<T>>(url, config);
    return res.data;
  }
}

export const apiClient = new ApiClient();
