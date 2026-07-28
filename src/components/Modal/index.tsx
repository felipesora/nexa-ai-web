import { CircleCheck, Info, TriangleAlert, X } from "lucide-react";

interface ModalProps {
    tipo: "DESTRUTIVO" | "INFORMATIVO" | "CONFIRMACAO";
    titulo: string;
    descricao: string;
    confirmacao?: boolean
    onCancelar?: () => void;
    onConfirmar?: () => void;
}

const configuracoes = {
    DESTRUTIVO: {
        Icone: TriangleAlert,
        iconColor: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        button: "bg-red-500 hover:bg-red-600",
        textoBotao: "Excluir",
    },
    INFORMATIVO: {
        Icone: Info,
        iconColor: "text-[#12B5FD]",
        bg: "bg-[#12B5FD]/10",
        border: "border-[#12B5FD]/20",
        button: "bg-[#12B5FD] hover:bg-[#2BC0FF]",
        textoBotao: "Entendi",
    },
    CONFIRMACAO: {
        Icone: CircleCheck,
        iconColor: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        button: "bg-emerald-500 hover:bg-emerald-600",
        textoBotao: "Confirmar",
    },
};

const Modal = ({ tipo, titulo, descricao, confirmacao, onCancelar, onConfirmar }: ModalProps) => {
    const config = configuracoes[tipo];
    const Icone = config.Icone;
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm p-4">
            <div className={`w-full max-w-md rounded-2xl border ${config.border} bg-[#111114] shadow-2xl p-2`}>
                
                <div className="flex justify-end">
                    <button
                        onClick={onCancelar}
                        className="cursor-pointer rounded-lg p-2 text-[#8E909A] hover:bg-white/5 hover:text-white transition">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex flex-col items-center gap-3 px-6">
                    <div className={`h-20 w-20 rounded-full ${config.bg} flex items-center justify-center`}>
                        <Icone
                            size={40}
                            className={config.iconColor}
                        />
                    </div>

                    <h2 className="text-xl font-semibold text-[#E5E1E4] text-center">
                        {titulo}
                    </h2>

                    <p className="max-w-sm text-center text-sm leading-6 text-[#8E909A] break-words">
                        {descricao}
                    </p>
                </div>

                <div className="mt-6 border-t border-white/8 py-5 px-4 flex justify-end gap-3">
                    <button
                        onClick={onCancelar}
                        className="px-4 py-2 rounded-lg border border-white/10 text-[#E5E1E4] hover:bg-white/5 transition cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirmar}
                        className={`px-4 py-2 rounded-lg text-white transition cursor-pointer ${config.button}`}
                    >
                        {config.textoBotao}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;