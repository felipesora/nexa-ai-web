import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../services/authService";
import { limparAutenticacao } from "../services/localStorageService";

export function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTokenValid()) {
            limparAutenticacao();
            navigate('/auth/login', { replace: true });
        }
    }, [navigate]);
}