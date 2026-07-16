import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import PaginaInicial from "../pages/PaginaInicial";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/cadastro" element={<Cadastro />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}