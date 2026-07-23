import { useState, type SubmitEvent } from "react";
import LogoCompleta from "../../assets/logos/logo-completa-nexa-ai.png";
import { ChevronRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    document.title = "Nexa AI - Login";

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Formulário enviado");
    };

    return(
        <main className="flex min-h-screen bg-[#0A0A0C]">

            <section className="hidden min-[1025px]:flex relative overflow-hidden flex-1 min-h-screen bg-[#0E0E10] flex justify-center items-center px-8">
                
                <div className="absolute inset-0 bg-gradient-to-br from-[#13151B] via-[#0E0E10] to-[#09090B]" />
                
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px] animate-[float_12s_ease-in-out_infinite]" />

                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[160px] animate-[float_15s_ease-in-out_infinite_reverse]" />

                <div className="relative z-10 max-w-[520px] min-[1330px]:max-w-[650px] min-[1536px]:max-w-[750px] flex flex-col gap-4">
                    <img src={LogoCompleta} alt="Logo Nexa AI" className="w-72 min-[1330px]:w-80 min-[1536px]:w-110 animate-[fadeUp_800ms_ease-out]" />

                    <h2 className="font-bold text-2xl min-[1330px]:text-3xl text-[#12B5FD] animate-[fadeUp_900ms_ease-out]">Your AI Productivity Assistant</h2>

                    <p className="text-[#C2C6D8] text-sm min-[1330px]:text-base text-justify animate-[fadeUp_1000ms_ease-out]">Planeje tarefas, organize projetos e automatize sua rotina com inteligência artificial. A Nexa AI transforma sua forma de trabalhar para que você possa focar no que realmente importa.</p>
                </div>

            </section>

            <section className="relative flex-1 bg-[#0A0A0C] flex justify-center items-center px-8 py-8">

                <form onSubmit={handleSubmit} className="w-full max-w-sm min-[1330px]:max-w-md bg-[#0D0D0F] rounded-[10px] border border-white/8 p-12 flex flex-col gap-7 animate-[cardEnter_700ms_ease-out]">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h2 className="font-bold text-white text-2xl">Entrar</h2>
                        <p className="text-center text-[#C2C6D8]">Acesse sua conta para continuar.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[#C2C6D8] text-sm">E-mail</label>
                        
                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />

                            <input 
                                name="email" 
                                type="email"
                                className="text-sm w-full rounded-md border border-white/10 bg-transparent py-2 pl-10 pr-3 text-white placeholder:text-gray-500 focus:border-[#12B5FD] focus:outline-none transition-all duration-300"
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="senha" className="text-[#C2C6D8] text-sm">Senha</label>
                        
                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />

                            <input 
                                name="senha" 
                                type={showPassword ? "text" : "password"}
                                className="text-sm w-full rounded-md border border-white/10 bg-transparent py-2 pl-10 pr-3 text-white placeholder:text-gray-500 focus:border-[#12B5FD] focus:outline-none transition-all duration-300"
                                placeholder="Digite sua senha"
                            />

                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"  
                            className="group w-full rounded-md bg-[#12B5FD] py-2 cursor-pointer flex gap justify-center items-center font-medium text-[#0A0A0C] transition-all duration-300 hover:bg-[#2BC2FF] hover:-translate-y-0.5 hover:shadow-[0_0_10px_rgba(18,181,253,0.35)]">
                            Entrar

                            <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>

                    <div className="bg-white/10 w-full h-px"></div>

                    <p className="text-[#C2C6D8] text-sm text-center">
                        Ainda não possui uma conta?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/auth/cadastro")}
                            className="text-[#12B5FD] hover:underline cursor-pointer"
                        >
                            Criar conta.
                        </button>
                    </p>
                </form>

            </section>

        </main>
    )
};

export default Login;