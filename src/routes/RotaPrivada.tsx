import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../services/authService";
import { limparAutenticacao } from "../services/localStorageService";

const RotaPrivada = ({ children }: { children: ReactNode }) => {
    if (!isTokenValid()) {
        limparAutenticacao();
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default RotaPrivada;
