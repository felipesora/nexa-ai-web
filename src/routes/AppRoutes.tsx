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
import CadastroSubtarefa from "../pages/Subtarefa/CadastroSubtarefa";
import CadastrarWorkspace from "../pages/Workspaces/CadastrarWorkspace";
import Calendario from "../pages/Calendario";
import Kanban from "../pages/Kanban";
import MeusDados from "../pages/MeusDados";
import EditarWorkspace from "../pages/Workspaces/EditarWorkspace";
import EditarTarefa from "../pages/Tarefa/EditarTarefa";
import EditarSubtarefa from "../pages/Subtarefa/EditarSubtarefa";
import Tags from "../pages/Tags";
import CadastrarTag from "../pages/Tags/CadastrarTag";
import EditarTag from "../pages/Tags/EditarTag";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/cadastro" element={<Cadastro />} />
                <Route path="/meus-dados" element={<MeusDados />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat-ia" element={<ChatIA />} />
                <Route path="/workspaces" element={<Workspaces />} />
                <Route path="/workspace/:id" element={<WorkspacePage />} />
                <Route path="/tarefa/:id" element={<Tarefa />} />
                <Route path="/cadastro-workspace" element={<CadastrarWorkspace />} />
                <Route path="/editar-workspace/:id" element={<EditarWorkspace />} />
                <Route path="/cadastro-tarefa" element={<CadastroTarefa />} />
                <Route path="/editar-tarefa/:id" element={<EditarTarefa />} />
                <Route path="/cadastro-subtarefa" element={<CadastroSubtarefa />} />
                <Route path="/editar-subtarefa/:id" element={<EditarSubtarefa />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/cadastro-tag" element={<CadastrarTag />} />
                <Route path="/editar-tag/:id" element={<EditarTag />} />
            </Routes>
        </BrowserRouter>
    );
}