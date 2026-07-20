import { Bot } from "lucide-react";

interface ChatMensagemProps {
    tipo: string;
    texto: string;
}

const ChatMensagem = ({ tipo, texto }: ChatMensagemProps) => {
    if (tipo === "usuario") {
        return (
            <div className="flex justify-end">
                <div className="max-w-xl rounded-2xl rounded-tr-none bg-[#171B24] px-5 py-4 text-sm text-gray-200">
                    {texto}
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <div
                className="max-w-2xl rounded-2xl rounded-tl-none border border-cyan-500/20 bg-[#11151D] p-6 shadow-lg shadow-cyan-500/5">
                <div className="mb-5 flex items-center gap-2">

                    <Bot size={18} className="text-[#12B5FD]" />

                    <span className="font-semibold text-[#12B5FD]">
                        NEXA IA
                    </span>

                </div>

                <div className="whitespace-pre-line leading-8 text-gray-300">
                    {texto}
                </div>

                <button className="cursor-pointer mt-6 w-full rounded-xl bg-gradient-to-r from-[#D7E7FF] to-[#12B5FD] py-3 font-semibold text-[#09111F] transition">
                    Deseja aplicar estas mudanças?
                </button>

            </div>
        </div>
    );
}

export default ChatMensagem;