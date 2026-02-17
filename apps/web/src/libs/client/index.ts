import axios, { AxiosError, AxiosHeaders, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { authApi } from "../../api/auth";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true
});


let accessToken: string | null = null;
let isRefreshing = false;
let axiosLogoutFn: () => void;
let failedQueue: {
    resolve: (value: any) => void;
    reject: (reason: any) => void;
}[] = [];


const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};


export const setAxiosAccessToken = (token: string | null): void => { accessToken = token; };
export const setAxiosLogoutFn = (fn: () => void) => { axiosLogoutFn = fn }


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

api.interceptors.response.use(response => response, async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean }

    if (error.response?.status !== 401 || accessToken === null) {
        return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh")) {
        axiosLogoutFn();
        accessToken = null;
        return Promise.reject(error);
    }

    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        })
            .then(token => {
                withAuthorizationHeader(originalRequest.headers, token as string)
                return api(originalRequest);
            })
            .catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
        const res = await authApi.refresh();
        console.log("refreshing")

        const newAccess = res.data.data.accessToken;

        accessToken = newAccess;

        api.defaults.headers.Authorization = `Bearer ${newAccess}`;

        processQueue(null, newAccess);

        withAuthorizationHeader(originalRequest.headers, accessToken)
        return api(originalRequest);

    } catch (err) {
        processQueue(err, null);
        accessToken = null;
        axiosLogoutFn()
        return Promise.reject(err);
    } finally {
        isRefreshing = false;
    }
})