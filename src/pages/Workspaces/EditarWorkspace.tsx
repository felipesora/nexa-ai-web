import { useEffect, useState, type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarIconeWorkspace } from "../../data/workspaceOptions";
import { useOpcoesWorkspace } from "../../hooks/useOpcoesWorkspace";
import MainLayout from "../../layouts/MainLayout";
import { ArrowLeft, SquarePen, Type } from "lucide-react";
import type { WorkspaceResponseDTO } from "../../types/workspaceTypes";
import { atualizarWorkspace, buscarWorkspacePorId } from "../../services/workspaceService";

const EditarWorkspace = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workspace, setWorkspace] = useState<WorkspaceResponseDTO>();
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>("");

    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        icone: "Folder",
        cor: "#12B5FD",
    });

    useEffect(() => {
        const getWorkspace = async () => {
            try {
                setLoading(true);
                setErro("");
                const response = await buscarWorkspacePorId(Number(id));
                setWorkspace(response);

                setForm({
                    nome: response.nome ?? "",
                    descricao: response.descricao ?? "",
                    icone: response.icone_workspace?.caminho ?? "Folder",
                    cor: response.cor_workspace?.cor ?? "#12B5FD",
                });
            } catch (error) {
                console.error(error);
                setErro(error instanceof Error ? error.message : "Erro ao carregar dados do workspace.");
            } finally {
                setLoading(false);
            }
        };

        getWorkspace();
    }, [id])

    const [salvando, setSalvando] = useState<boolean>(false);
    const [erroEnvio, setErroEnvio] = useState<string>("");

    const [erros, setErros] = useState({
        nome: "",
        descricao: "",
    });

    const { icones, cores, loading: loadingOpcoes, erro: erroOpcoes } = useOpcoesWorkspace();

    const iconSelecionado = buscarIconeWorkspace(form.icone);

    const corSelecionada = form.cor ? { cor: form.cor } : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));

        setErros(prev => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const novosErros = {
            nome: "",
            descricao: "",
        };

        let valido = true;

        if (!form.nome.trim()) {
            novosErros.nome = "O nome é obrigatório.";
            valido = false;
        } else if (form.nome.trim().length < 3 || form.nome.trim().length > 150) {
            novosErros.nome = "O nome deve ter entre 3 e 150 caracteres.";
            valido = false;
        }

        if (form.descricao &&(form.descricao.trim().length < 3 || form.descricao.trim().length > 500)
        ) {
            novosErros.descricao ="A descrição deve ter entre 3 e 500 caracteres.";
            valido = false;
        }

        setErros(novosErros);

        if (!valido) return;

        const idIcone = icones.find(i => i.caminho === form.icone)?.id_icone;
        const idCor = cores.find(c => c.cor === form.cor)?.id_cor;

        if (idIcone == null || idCor == null) {
            setErroEnvio("Selecione um ícone e uma cor.");
            return;
        }

        setErroEnvio("");
        setSalvando(true);

        try {
            await atualizarWorkspace(workspace?.id_workspace ?? Number(id), {
                nome: form.nome.trim(),
                descricao: form.descricao.trim() || undefined,
                id_icone: idIcone,
                id_cor: idCor,
            });

            navigate("/workspaces");
        } catch (error) {
            console.error(error);
            setErroEnvio(error instanceof Error ? error.message : "Erro ao atualizar workspace.");
        } finally {
            setSalvando(false);
        }
    };

    return(
        <MainLayout titulo="Editar Workspace">
            <div className="mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#8E909A] hover:text-[#E5E1E4] transition-colors cursor-pointer group">
                    <ArrowLeft
                        size={18}
                        className="transition-transform group-hover:-translate-x-1"
                    />
                    <span className="text-sm font-medium">
                        Voltar
                    </span>
                </button>
            </div>

            {loading ? (
                <p className="text-[#8E909A]">Carregando workspace...</p>
            ) : erro ? (
                <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-2 text-sm">
                    {erro}
                </p>
            ) : (
            <div className="w-full bg-[#111114] rounded-xl border border-white/8 px-4 py-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-[#C2C6D8] text-sm">
                            Nome do Workspace <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <Type
                                size={18} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />

                            <input
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Digite o nome do workspace"
                                className={`text-sm w-full rounded-md bg-[#0F0F11] py-2 pl-10 pr-3 text-white placeholder:text-gray-500 focus:outline-none transition-all duration-300 ${erros.nome ? "border border-red-500" : "border border-white/10 focus:border-[#12B5FD]"}`}
                            />
                        </div>

                        {erros.nome && (
                            <p className="text-red-400 text-xs mt-1">
                                {erros.nome}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="descricao" className="text-[#C2C6D8] text-sm">
                            Descrição
                        </label>

                        <textarea 
                            name="descricao" 
                            placeholder="Descreva o workspace..."
                            value={form.descricao}
                            onChange={handleChange}
                            className="text-sm w-full rounded-md border border-white/10 bg-[#0F0F11] py-2 pl-2 pr-3 text-white placeholder:text-gray-500 focus:border-[#12B5FD] focus:outline-none transition-all duration-300"
                        />

                        {erros.descricao && (
                            <p className="text-red-400 text-xs mt-1">
                                {erros.descricao}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="descricao" className="text-[#C2C6D8] text-sm">
                            Ícone do Workspace
                        </label>

                        {loadingOpcoes && (
                            <p className="text-[#8E909A] text-sm">Carregando ícones e cores...</p>
                        )}

                        {erroOpcoes && (
                            <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-2 text-sm">
                                {erroOpcoes}
                            </p>
                        )}

                        <div className="grid grid-cols-5 gap-3">
                            {icones.map(({ caminho: id, icon: Icon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() =>
                                        setForm(prev => ({
                                            ...prev,
                                            icone: id,
                                        }))
                                    }
                                    className={`h-12 rounded-xl border transition cursor-pointer
                                        ${
                                            form.icone === id
                                                ? "border-[#12B5FD] bg-[#12B5FD]/10"
                                                : "border-white/10 hover:border-white/30"
                                        }`}
                                >
                                    <Icon size={22} className="mx-auto text-white" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="descricao" className="text-[#C2C6D8] text-sm">
                            Cor do Workspace
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {cores.map(color => (
                                <button
                                    key={color.cor}
                                    type="button"
                                    onClick={() =>
                                        setForm(prev => ({
                                            ...prev,
                                            cor: color.cor,
                                        }))
                                    }
                                    className={`w-10 h-10 rounded-full border-2 transition cursor-pointer
                                        ${
                                            form.cor === color.cor
                                                ? "border-white scale-110"
                                                : "border-transparent"
                                        }`}
                                    style={{ backgroundColor: color.cor }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="descricao" className="text-[#C2C6D8] text-sm">
                            Prévia do workspace
                        </label>

                        {iconSelecionado && corSelecionada && (
                            <div className="mb-6 rounded-xl border border-white/10 bg-[#0F0F11] p-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                                        style={{
                                            backgroundColor: `${corSelecionada.cor}20`,
                                        }}
                                    >
                                        <iconSelecionado.icon
                                            size={28}
                                            style={{ color: corSelecionada.cor }}
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-white font-medium">
                                            {form.nome || "Novo Workspace"}
                                        </h3>

                                        <p className="text-sm text-[#8E909A]">
                                            {form.descricao || "Descrição do workspace"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {erroEnvio && (
                        <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-2 text-sm text-center">
                            {erroEnvio}
                        </p>
                    )}

                    <div className="my-6 h-px bg-white/8" />

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button type="button" onClick={() => navigate(-1)} className="w-full sm:w-auto px-5 py-3 cursor-pointer rounded-xl text-[#C5C6D0] transition-all duration-200 hover:bg-white/5 hover:text-white">
                            Cancelar
                        </button>

                        <button type="submit" disabled={salvando || loadingOpcoes} className="w-full sm:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-[15px] text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                            <SquarePen size={22}/>
                            {salvando ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
            )}
        </MainLayout>
    );
}

export default EditarWorkspace;