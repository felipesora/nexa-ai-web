import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import PaginaInicial from "../pages/PaginaInicial";
import Dashboard from "../pages/Dashboard";
import Workspaces from "../pages/Workspaces";
import WorkspacePage from "../pages/Workspaces/WorkspacePage";
import CadastroTarefa from "../pages/Tarefa/CadastroTarefa";
import CadastroSubtarefa from "../pages/Subtarefa/CadastroSubtarefa";
import CadastrarWorkspace from "../pages/Workspaces/CadastrarWorkspace";
import Kanban from "../pages/Kanban";
import MeusDados from "../pages/MeusDados";
import EditarWorkspace from "../pages/Workspaces/EditarWorkspace";
import EditarTarefa from "../pages/Tarefa/EditarTarefa";
import EditarSubtarefa from "../pages/Subtarefa/EditarSubtarefa";
import Tags from "../pages/Tags";
import CadastrarTag from "../pages/Tags/CadastrarTag";
import EditarTag from "../pages/Tags/EditarTag";
import TarefaPage from "../pages/Tarefa/TarefaPage";
import NotFoundPage from "../pages/NotFoundPage";
import CentralIA from "../pages/CentralIA";
import Agenda from "../pages/Agenda";
import RotaPrivada from "./RotaPrivada";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/cadastro" element={<Cadastro />} />
                <Route path="/meus-dados" element={<RotaPrivada><MeusDados /></RotaPrivada>} />
                <Route path="/dashboard" element={<RotaPrivada><Dashboard /></RotaPrivada>} />
                <Route path="/central-ia" element={<RotaPrivada><CentralIA /></RotaPrivada>} />
                <Route path="/workspaces" element={<RotaPrivada><Workspaces /></RotaPrivada>} />
                <Route path="/workspace/:id" element={<RotaPrivada><WorkspacePage /></RotaPrivada>} />
                <Route path="/tarefa/:id" element={<RotaPrivada><TarefaPage /></RotaPrivada>} />
                <Route path="/cadastro-workspace" element={<RotaPrivada><CadastrarWorkspace /></RotaPrivada>} />
                <Route path="/editar-workspace/:id" element={<RotaPrivada><EditarWorkspace /></RotaPrivada>} />
                <Route path="/cadastro-tarefa" element={<RotaPrivada><CadastroTarefa /></RotaPrivada>} />
                <Route path="/editar-tarefa/:id" element={<RotaPrivada><EditarTarefa /></RotaPrivada>} />
                <Route path="/cadastro-subtarefa" element={<RotaPrivada><CadastroSubtarefa /></RotaPrivada>} />
                <Route path="/editar-subtarefa/:id" element={<RotaPrivada><EditarSubtarefa /></RotaPrivada>} />
                <Route path="/agenda" element={<RotaPrivada><Agenda /></RotaPrivada>} />
                <Route path="/kanban" element={<RotaPrivada><Kanban /></RotaPrivada>} />
                <Route path="/tags" element={<RotaPrivada><Tags /></RotaPrivada>} />
                <Route path="/cadastro-tag" element={<RotaPrivada><CadastrarTag /></RotaPrivada>} />
                <Route path="/editar-tag/:id" element={<RotaPrivada><EditarTag /></RotaPrivada>} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}