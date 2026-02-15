import axios, { AxiosError, AxiosHeaders, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import type { LoginResponse } from "../../@types/auth";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true
});

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean; };

let accessToken: string | null = null;
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export const setAxiosAccessToken = (token: string | null): void => { accessToken = token; };


const withAuthorizationHeader = (headers: AxiosRequestConfig["headers"], token: string): AxiosHeaders => {
    const nextHeaders = AxiosHeaders.from(headers as any);
    nextHeaders.set("Authorization", `Bearer ${token}`);
    return nextHeaders;
};


api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (!accessToken) return config;
    config.headers = withAuthorizationHeader(config.headers, accessToken);
    return config;
})

api.interceptors.response.use((response) => response, async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
    }

    if ((originalRequest.url ?? "").includes("/auth/refresh")) {
        setAxiosAccessToken(null);
        console.log('you logged out')
        return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
        console.log('refreshing on client')
        const refreshResponse = await api.post<LoginResponse>("/auth/refresh");

        if (refreshResponse.data.success) {
            const newAccessToken = refreshResponse.data.data?.accessToken;
            setAxiosAccessToken(newAccessToken);
        }

        return api(originalRequest);
    } catch (refreshError) {
        // اگه رفرش هم ارور داد، دیگه تمومه → لاگ‌اوت
        setAxiosAccessToken(null);
        console.log("refresh failed → logout");
        return Promise.reject(refreshError);
    }

})