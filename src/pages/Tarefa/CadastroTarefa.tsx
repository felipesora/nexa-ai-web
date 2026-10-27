import { ArrowLeft, CalendarClock, ChartNoAxesCombined, ChevronDown, Flag, Plus, Type } from "lucide-react";
import MainLayout from "../../layouts/MainLayout"
import { useNavigate, useParams } from "react-router-dom";
import { useState, type SubmitEvent } from "react";
import { cadastrarTarefa } from "../../services/tarefaService";
import type { TarefaCreateDTO } from "../../types/tarefaTypes";

const CadastroTarefa = () => {
    const { idWorkspace } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        prioridade: "" as TarefaCreateDTO["prioridade"] | "",
        dificuldade: "" as NonNullable<TarefaCreateDTO["dificuldade"]> | "",
        prazo: "",
    });

    const [salvando, setSalvando] = useState<boolean>(false);
    const [erroEnvio, setErroEnvio] = useState<string>("");

    const [erros, setErros] = useState({
        titulo: "",
        descricao: "",
        prioridade: "",
        prazo: "",
    });

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
            titulo: "",
            descricao: "",
            prioridade: "",
            prazo: "",
        };

        let valido = true;

        if (!form.titulo.trim()) {
            novosErros.titulo = "O título é obrigatório.";
            valido = false;
        } else if (form.titulo.trim().length < 3 || form.titulo.trim().length > 200) {
            novosErros.titulo = "O título deve ter entre 3 e 200 caracteres.";
            valido = false;
        }

        if (form.descricao &&(form.descricao.trim().length < 3 || form.descricao.trim().length > 700)
        ) {
            novosErros.descricao ="A descrição deve ter entre 3 e 700 caracteres.";
            valido = false;
        }

        if (!form.prioridade) {
            novosErros.prioridade = "Selecione uma prioridade.";
            valido = false;
        }

        if (form.prazo) {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            const prazo = new Date(`${form.prazo}T00:00:00`);

            if (prazo < hoje) {
                novosErros.prazo = "A data limite deve ser hoje ou uma data futura.";
                valido = false;
            }
        }

        setErros(novosErros);

        if (!valido || !form.prioridade) return;

        if (!idWorkspace || Number.isNaN(Number(idWorkspace))) {
            setErroEnvio("Workspace inválido. Volte e abra a tarefa a partir de um workspace.");
            return;
        }

        setErroEnvio("");
        setSalvando(true);

        try {
            await cadastrarTarefa({
                titulo: form.titulo.trim(),
                descricao: form.descricao.trim() || undefined,
                prioridade: form.prioridade,
                dificuldade: form.dificuldade || undefined,
                data_limite: form.prazo || undefined,
                id_workspace: Number(idWorkspace),
            });

            navigate(`/workspace/${idWorkspace}`);
        } catch (error) {
            console.error(error);
            setErroEnvio(error instanceof Error ? error.message : "Erro ao cadastrar tarefa.");
        } finally {
            setSalvando(false);
        }
    };

    return(
        <MainLayout titulo="Criar Nova Tarefa" pageTitle="Nova Tarefa">
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

            <div className="w-full bg-[#111114] rounded-xl border border-white/8 px-4 py-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="titulo" className="text-[#C2C6D8] text-sm">
                            Título da Tarefa <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <Type 
                                size={18} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />

                            <input
                                type="text"
                                name="titulo"
                                value={form.titulo}
                                onChange={handleChange}
                                placeholder="Digite o título da tarefa"
                                className={`text-sm w-full rounded-md bg-[#0F0F11] py-2 pl-10 pr-3 text-white placeholder:text-gray-500 focus:outline-none transition-all duration-300 ${erros.titulo ? "border border-red-500" : "border border-white/10 focus:border-[#12B5FD]"}`}
                            />
                        </div>

                        {erros.titulo && (
                            <p className="text-red-400 text-xs mt-1">
                                {erros.titulo}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="descricao" className="text-[#C2C6D8] text-sm">
                            Descrição
                        </label>

                        <textarea 
                            name="descricao" 
                            placeholder="Descreva a tarefa..."
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

                    <div className="mt-5 flex flex-col gap-5 md:flex-row">
                       <div className="flex-1 flex flex-col gap-2">
                            <label htmlFor="prioridade" className="text-[#C2C6D8] text-sm">
                                Prioridade <span className="text-red-500">*</span>
                            </label>

                            <div className="relative w-full">
                                <Flag
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                />

                                <select
                                    name="prioridade"
                                    id="prioridade"
                                    value={form.prioridade}
                                    onChange={handleChange}
                                    className={`appearance-none w-full bg-[#0F0F12] rounded-md py-2 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 focus:outline-none transition-all duration-300 cursor-pointer ${erros.prioridade ? "border border-red-500" : "border border-white/10 focus:border-[#12B5FD]"}`}>
                                    <option value="" disabled>Selecione uma prioridade</option>
                                    <option value="BAIXA">Baixa</option>
                                    <option value="MEDIA">Média</option>
                                    <option value="ALTA">Alta</option>
                                    <option value="URGENTE">Urgente</option>
                                </select>

                                <ChevronDown
                                    size={18}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E909A] pointer-events-none"
                                />
                            </div>

                            {erros.prioridade && (
                                <p className="text-red-400 text-xs mt-1">
                                    {erros.prioridade}
                                </p>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <label htmlFor="dificuldade" className="text-[#C2C6D8] text-sm">
                                Dificuldade
                            </label>

                            <div className="relative w-full">
                                <ChartNoAxesCombined
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" 
                                />

                                <select
                                    name="dificuldade"
                                    id="dificuldade"
                                    value={form.dificuldade}
                                    onChange={handleChange}
                                    className="appearance-none w-full bg-[#0F0F12] border border-white/10 rounded-md py-2 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-[#12B5FD] focus:outline-none transition-all duration-300 cursor-pointer">
                                    <option value="">Selecione uma dificuldade</option>
                                    <option value="BAIXA">Baixa</option>
                                    <option value="MEDIA">Média</option>
                                    <option value="ALTA">Alta</option>
                                </select>

                                <ChevronDown
                                    size={18}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E909A] pointer-events-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="prazo" className="text-[#C2C6D8] text-sm">
                            Data Limite (Prazo)
                        </label>

                        <div className="relative">
                            <CalendarClock 
                                size={18} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />

                            <input
                                type="date"
                                name="prazo"
                                value={form.prazo}
                                onChange={handleChange}
                                className={`text-sm w-full rounded-md bg-[#0F0F11] py-2 pl-10 pr-3 text-white focus:outline-none transition-all duration-300 cursor-pointer ${erros.prazo ? "border border-red-500" : "border border-white/10 focus:border-[#12B5FD]"}`}
                            />

                        </div>

                        {erros.prazo && (
                            <p className="text-red-400 text-xs mt-1">
                                {erros.prazo}
                            </p>
                        )}
                    </div>

                    {erroEnvio && (
                        <p className="text-red-400 text-sm mt-5">{erroEnvio}</p>
                    )}

                    <div className="my-6 h-px bg-white/8" />

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button type="button" onClick={() => navigate(-1)} className="w-full sm:w-auto px-5 py-3 cursor-pointer rounded-xl text-[#C5C6D0] transition-all duration-200 hover:bg-white/5 hover:text-white">
                            Cancelar
                        </button>

                        <button type="submit" disabled={salvando} className="disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-[15px] text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                            <Plus size={22}/>
                            {salvando ? "Criando..." : "Criar Tarefa"}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
};

export default CadastroTarefa;