import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import PaginaInicial from "../pages/PaginaInicial";
import Dashboard from "../pages/Dashboard";
import ChatIA from "../pages/ChatIA";
import Workspaces from "../pages/Workspaces";
import WorkspacePage from "../pages/Workspaces/WorkspacePage";
import Tarefa from "../pages/Tarefa";
import CadastroTarefa from "../pages/Tarefa/CadastroTarefa";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/cadastro" element={<Cadastro />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat-ia" element={<ChatIA />} />
                <Route path="/workspaces" element={<Workspaces />} />
                <Route path="/workspace/:id" element={<WorkspacePage />} />
                <Route path="/tarefa/:id" element={<Tarefa />} />
                <Route path="/cadastro-tarefa" element={<CadastroTarefa />} />
            </Routes>
        </BrowserRouter>
    );
}