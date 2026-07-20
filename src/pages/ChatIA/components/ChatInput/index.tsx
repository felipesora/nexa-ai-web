import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const ChatInput = () => {
    const [mensagem, setMensagem] = useState("");

    const enviarMensagem = () => {
        if (!mensagem.trim()) return;

        console.log(mensagem);

        setMensagem("");
    };

    return (
        <div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#17181D] px-4 py-3">
                <textarea
                    rows={1}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            enviarMensagem();
                        }
                    }}
                    placeholder="Pergunte qualquer coisa ao Nexa AI..."
                    className="max-h-40 flex-1 resize-none bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
                />

                <button
                    onClick={enviarMensagem}
                    disabled={!mensagem.trim()}
                    className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl bg-[#12B5FD] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40">
                    <SendHorizontal
                        size={18}
                        className="text-[#09111F]"
                    />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;