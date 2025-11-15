import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../../services/authService';

interface PrivateRouteProps {
    children: React.ReactNode; // Elementos filhos renderizados se autenticado
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = getAuthToken(); // Verifica se há um token armazenado

    if (!token) {
        return <Navigate to="/login" replace />; // Redireciona para login se não autenticado
    }

    return <>{children}</>; // Renderiza os filhos se autenticado
};

export default PrivateRoute;
