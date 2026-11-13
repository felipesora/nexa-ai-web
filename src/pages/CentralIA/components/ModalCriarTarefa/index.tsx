import { ChevronDown, ClipboardList, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";

interface ModalCriarTarefaProps {
    onCancelar?: () => void;
    onConfirmar?: () => void;
}

const workspaces = [
    {
        id: 1,
        nome: "Nexa AI",
    },
    {
        id: 2,
        nome: "Faculdade",
    },
    {
        id: 3,
        nome: "Projetos pessoais",
    },
];

const ModalCriarTarefa = ({ onCancelar, onConfirmar }: ModalCriarTarefaProps) => {
    const [descricao, setDescricao] = useState("");
    const [workspace, setWorkspace] = useState("");
    const [resultadoIA, setResultadoIA] = useState(false);

    const analisarComIA = () => {
        if (!descricao.trim() || !workspace) return;

        // Futuramente:
        // chamar AI Service aqui

        setResultadoIA(true);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/10 p-4 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center">
                <div className="w-full max-w-xl rounded-2xl border border-[#12B5FD]/20 bg-[#111114] p-2 shadow-2xl">
                    
                    {/* Fechar */}
                    <div className="flex justify-end">
                        <button
                            onClick={onCancelar}
                            className="cursor-pointer rounded-lg p-2 text-[#8E909A] transition hover:bg-white/5 hover:text-white"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-3 px-6 pb-6">
                        
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#12B5FD]/10">
                            <ClipboardList
                                size={40}
                                className="text-[#12B5FD]"
                            />
                        </div>

                        <h2 className="text-center text-xl font-semibold text-[#E5E1E4]">
                            Criar tarefa com IA
                        </h2>

                        <p className="max-w-sm break-words text-center text-sm leading-6 text-[#8E909A]">
                            Descreva o que você precisa fazer e deixe o Nexa IA
                            organizar os detalhes.
                        </p>

                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Preciso terminar o trabalho da faculdade até sexta-feira..."
                            rows={3}
                            className="w-full resize-none rounded-xl border border-white/10 bg-[#0F0F12] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-[#6F7482] focus:border-[#12B5FD]"
                        />

                        <div className="w-full">
                            <label className="mb-2 block text-sm font-medium text-[#E5E1E4]">
                                Workspace
                            </label>

                            <div className="relative w-full">
                                <select
                                    value={workspace}
                                    onChange={(e) => setWorkspace(e.target.value)}
                                    className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-[#0F0F12] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#12B5FD]"
                                >
                                    <option value="" disabled>
                                        Selecione um workspace
                                    </option>

                                    {workspaces.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                            className="bg-[#111114]"
                                        >
                                            {item.nome}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    size={18}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E909A] pointer-events-none"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={analisarComIA}
                            disabled={!descricao.trim() || !workspace}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#12B5FD] px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#2BC0FF] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <Sparkles size={18} />
                            Analisar com IA
                        </button>

                        <div className="mt-3 h-[0.5px] w-full bg-white/10" />

                        {resultadoIA && (
                            <div className="w-full rounded-2xl border border-[#12B5FD]/15 bg-[#0F1116] p-5">
                                <div className="mb-5 flex items-center gap-2">
                                    <Sparkles
                                        size={18}
                                        className="text-[#12B5FD]"
                                    />

                                    <span className="font-semibold text-[#12B5FD]">
                                        Nexa IA
                                    </span>
                                </div>

                                <div className="space-y-4">

                                    <div>
                                        <span className="text-xs text-[#6F7482]">
                                            Título
                                        </span>

                                        <p className="mt-1 text-sm font-medium text-white">
                                            Terminar trabalho da faculdade
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-[#6F7482]">
                                            Descrição
                                        </span>

                                        <p className="mt-1 text-sm leading-6 text-[#B8BBC6]">
                                            Finalizar o trabalho da faculdade e revisar o conteúdo
                                            antes da entrega.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs text-[#6F7482]">
                                                Prioridade
                                            </span>

                                            <p className="mt-1 text-sm font-medium text-red-400">
                                                Alta
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-xs text-[#6F7482]">
                                                Dificuldade
                                            </span>

                                            <p className="mt-1 text-sm font-medium text-yellow-400">
                                                Média
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-xs text-[#6F7482]">
                                                Prazo
                                            </span>

                                            <p className="mt-1 text-sm font-medium text-white">
                                                28/08/2026
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-xs text-[#6F7482]">
                                                Workspace
                                            </span>

                                            <p className="mt-1 text-sm font-medium text-white">
                                                Faculdade
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={onConfirmar}
                                    className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#12B5FD] px-5 py-3 text-[15px] font-medium text-white transition hover:bg-[#2BC0FF]"
                                >
                                    <Plus size={18} />
                                    Confirmar e criar tarefa
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCriarTarefa;