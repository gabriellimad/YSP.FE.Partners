/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/api.ts
import axios from "axios";
import { getAuthToken } from "./authService";
import { useMemo } from "react";
import { useLoading } from "../components/helpers/LoadingContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useApiL = () => {
  const { showLoading, hideLoading } = useLoading();

  // useMemo evita recriar o axios a cada render
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
    });

    instance.interceptors.request.use(
      async (config) => {
        showLoading();
        config.headers = {
            ...config.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
            } as any;
        return config;
      },
      (error) => {
        hideLoading();
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        hideLoading();
        return response;
      },
      (error) => {
        hideLoading();
        return Promise.reject(error);
      }
    );

    return instance;
  }, [showLoading, hideLoading]);

  return api;
};
