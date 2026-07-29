import { CircleAlert, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return(
        <div className="flex min-h-screen items-center justify-center bg-[#0A0A0B] px-6">
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111114] p-10 text-center shadow-2xl">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 ring-1 ring-cyan-400/20">
                    <CircleAlert className="h-10 w-10 text-cyan-400" />
                </div>

                <p className="mt-8 text-7xl font-black tracking-tight text-white">
                    404
                </p>

                <h1 className="mt-4 text-3xl font-bold text-white">
                    Página não encontrada
                </h1>

                <p className="mx-auto mt-4 max-w-md text-zinc-400">
                    Parece que você tentou acessar uma página que não existe ou
                    foi movida. Volte para o início e continue organizando sua
                    produtividade com o Nexa AI.
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#12B5FD] text-white px-6 py-3 font-semibold transition-all duration-200 hover:bg-[#2BC2FF hover:shadow-[0_0_10px_rgba(18,181,253,0.35)]"
                >
                    <Home size={18} />
                    Voltar ao início
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;