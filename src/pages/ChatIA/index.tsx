import MainLayout from "../../layouts/MainLayout";
import ChatInput from "./components/ChatInput";
import ChatMensagem from "./components/ChatMensagem";

const mensagens = [
    {
        id: 1,
        tipo: "usuario",
        texto: "Tenho prova sexta e preciso terminar meus projetos."
    },
    {
        id: 2,
        tipo: "ia",
        texto: `• Reorganizei sua semana estrategicamente.
        • Priorizei o projeto "Nexa Design".
        • Reservei a quinta-feira exclusivamente para revisão.`
    },
    {
        id: 3,
        tipo: "usuario",
        texto: "Tenho prova sexta e preciso terminar meus projetos.dawdwdwdwdwadwdwadwadwadwadwdwadw"
    },
];

const ChatIA = () => {
    return(
        <MainLayout titulo="Chat IA">
            <div className="flex h-full flex-col">
                <div className="flex-1 overflow-y-auto pr-2 scroll-minimal">
                    <div className="space-y-8">
                        {mensagens.map((msg) => (
                            <ChatMensagem
                                key={msg.id}
                                tipo={msg.tipo}
                                texto={msg.texto}
                            />
                        ))}
                    </div>
                </div>

                <div className="pt-6">
                    <ChatInput />
                </div>
            </div>
        </MainLayout>
    );
}

export default ChatIA;