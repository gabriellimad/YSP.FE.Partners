 import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Substitua pela URL da sua API

export const loginService = async (username: string, password: string): Promise<string> => {
    localStorage.removeItem('authToken'); // Remove antes de fazer login
    localStorage.removeItem('refreshToken');

    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token, refreshToken } = response.data; // Ajuste conforme a resposta do backend
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token;
};

export const refreshAuthToken = async (): Promise<string> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('Sem token de atualização disponível.');

    const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return token;
};

export const getAuthToken = (): string | null => {
    const token = localStorage.getItem('authToken');
    return token;
};

export const logoutService = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
};

export const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    return !!token;
};
