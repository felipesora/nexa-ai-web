import { ArrowLeft, Eye, EyeOff, Lock, Mail, Save, Type, User } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { useState, type SubmitEvent } from "react";

const MeusDados = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });

    const [erros, setErros] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
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

    const getPasswordStrength = (password: string) => {
        if (!password) {
            return {
                level: 0,
                text: "-",
                color: "bg-[#2A2A2C]"
            };
        }

        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[^a-zA-Z0-9]/.test(password);

        if (password.length < 6) {
            return {
                level: 1,
                text: "Muito curta",
                color: "bg-red-500",
            };
        }

        if (hasLetter && !hasNumber && !hasSpecial) {
            return {
                level: 1,
                text: "Fraca",
                color: "bg-red-500",
            };
        }

        if (hasLetter && hasNumber && !hasSpecial) {
            return {
                level: 2,
                text: "Média",
                color: "bg-yellow-400",
            };
        }

        if (hasLetter && hasNumber && hasSpecial) {
            return {
                level: 3,
                text: "Forte",
                color: "bg-green-500",
            };
        }

        return {
            level: 1,
            text: "Fraca",
            color: "bg-red-500",
        };
    }

    const strength = getPasswordStrength(form.senha);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const novosErros = {
            nome: "",
            email: "",
            senha: "",
            confirmarSenha: "",
        };

        let valido = true;

        if (!form.nome.trim()) {
            novosErros.nome = "O nome é obrigatório.";
            valido = false;
        } else if (form.nome.trim().length < 3 || form.nome.trim().length > 150) {
            novosErros.nome = "O nome deve ter entre 3 e 150 caracteres.";
            valido = false;
        }

        if (!form.email.trim()) {
            novosErros.email = "O email é obrigatório.";
            valido = false;
        } else if (form.email.trim().length < 3 || form.email.trim().length > 150) {
            novosErros.email = "O email deve ter entre 3 e 150 caracteres.";
            valido = false;
        }

        if (!form.senha.trim()) {
            novosErros.senha = "A senha é obrigatória.";
            valido = false;
        } else if (form.senha.trim().length < 6 || form.senha.trim().length > 100) {
            novosErros.senha = "A senha deve ter entre 6 e 100 caracteres.";
            valido = false;
        }

        if (!form.confirmarSenha.trim()) {
            novosErros.confirmarSenha = "A confirmação da senha é obrigatória.";
            valido = false;
        } else if (form.confirmarSenha !== form.senha) {
            novosErros.confirmarSenha = "As senhas devem ser iguais.";
            valido = false;
        }

        setErros(novosErros);

        if (!valido) return;

        console.log(form);
    };

    return(
        <MainLayout titulo="Meus Dados">
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
                        <label htmlFor="nome" className="text-[#C2C6D8] text-sm">
                            Nome Completo <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <User 
                                size={18} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />

                            <input
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Seu nome completo"
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
                        <label htmlFor="email" className="text-[#C2C6D8] text-sm">
                            E-mail <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <Mail 
                                size={18} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                className={`text-sm w-full rounded-md bg-[#0F0F11] py-2 pl-10 pr-3 text-white placeholder:text-gray-500 focus:outline-none transition-all duration-300 ${erros.email ? "border border-red-500" : "border border-white/10 focus:border-[#12B5FD]"}`}
                            />
                        </div>

                        {erros.email && (
                            <p className="text-red-400 text-xs mt-1">
                                {erros.email}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="senha" className="text-[#C2C6D8] text-sm">
                            Nova Senha
                        </label>

                        <div className="relative">
                            <Lock 
                                size={18} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="senha"
                                value={form.senha}
                                onChange={handleChange}
                                placeholder="Digite sua nova senha"
                                className={`text-sm w-full rounded-md bg-[#0F0F11] py-2 pl-10 pr-3 text-white placeholder:text-gray-500 focus:outline-none transition-all duration-300 ${erros.senha ? "border border-red-500" : "border border-white/10 focus:border-[#12B5FD]"}`}
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

                        {erros.senha && (
                            <p className="text-red-400 text-xs mt-1">
                                {erros.senha}
                            </p>
                        )}

                        <div className="flex flex-col gap-1">
                            <div className="w-full bg-[#2A2A2C] h-1 rounded-full mt-2 overflow-hidden">
                                <div
                                    className={`${strength.color} h-full transition-all duration-500`}
                                    style={{
                                        width:
                                            strength.level === 0
                                                ? "0%"
                                                : strength.level === 1
                                                ? "33%"
                                                : strength.level === 2
                                                ? "66%"
                                                : "100%",
                                    }}
                                />
                            </div>

                            <p className="text-[#C2C6D8] text-xs">
                                Força da senha:{" "}

                                <span
                                    className={
                                        strength.level === 1
                                            ? "text-red-400"
                                            : strength.level === 2
                                            ? "text-yellow-400"
                                            : strength.level === 3
                                            ? "text-green-400"
                                            : ""
                                    }
                                >
                                    {strength.text}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="confirmarSenha" className="text-[#C2C6D8] text-sm">
                            Confirmar Nova Senha
                        </label>

                        <div className="relative">
                            <Lock 
                                size={18} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmarSenha"
                                value={form.confirmarSenha}
                                onChange={handleChange}
                                placeholder="Confirme sua nova senha"
                                className={`text-sm w-full rounded-md bg-[#0F0F11] py-2 pl-10 pr-3 text-white placeholder:text-gray-500 focus:outline-none transition-all duration-300 ${erros.confirmarSenha ? "border border-red-500" : "border border-white/10 focus:border-[#12B5FD]"}`}
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

                        {erros.confirmarSenha && (
                            <p className="text-red-400 text-xs mt-1">
                                {erros.confirmarSenha}
                            </p>
                        )}
                    </div>

                    <div className="my-6 h-px bg-white/8" />

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button type="button" onClick={() => navigate(-1)} className="w-full sm:w-auto px-5 py-3 cursor-pointer rounded-xl text-[#C5C6D0] transition-all duration-200 hover:bg-white/5 hover:text-white">
                            Cancelar
                        </button>

                        <button type="submit" className="w-full sm:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-[15px] text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                            <Save size={22}/>
                            Salvar Alterções
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-full bg-[#111114] rounded-xl border border-red-500/20 px-4 py-6 mt-5">
                <div className="flex flex-col gap-2">
                    <h2 className="text-red-400 text-lg font-semibold">
                        Excluir Conta
                    </h2>

                    <p className="text-[#A4A8B8] text-sm leading-6">
                        Essa ação é permanente e não poderá ser desfeita. Ao excluir sua
                        conta, todos os seus workspaces, tarefas, subtarefas e demais dados
                        serão removidos definitivamente.
                    </p>

                    <div className="mt-4">
                        <button
                            type="button"
                            className="cursor-pointer rounded-xl text-[15px] bg-red-600 px-5 py-3 text-white font-medium transition-colors hover:bg-red-700"
                        >
                            Excluir Conta
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default MeusDados;