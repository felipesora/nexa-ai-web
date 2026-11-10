import { ArrowLeft, Eye, EyeOff, KeyRound, Lock, Mail, Save, User } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, type SubmitEvent } from "react";
import Modal from "../../components/Modal";
import { alterarSenhaUsuario, atualizarUsuario, buscarUsuarioPorId, desativarUsuario } from "../../services/usuarioService";
import { getIdUsuario, limparAutenticacao } from "../../services/localStorageService";

const classeInput = (temErro: boolean) =>
    `text-sm w-full rounded-md bg-[#0F0F11] py-2 pl-10 pr-3 text-white placeholder:text-gray-500 focus:outline-none transition-all duration-300 ${temErro ? "border border-red-500" : "border border-white/10 focus:border-[#12B5FD]"}`;

const getPasswordStrength = (password: string) => {
    if (!password) return { level: 0, text: "-", color: "bg-[#2A2A2C]" };

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (password.length < 6) return { level: 1, text: "Muito curta", color: "bg-red-500" };
    if (hasLetter && hasNumber && hasSpecial) return { level: 3, text: "Forte", color: "bg-green-500" };
    if (hasLetter && hasNumber) return { level: 2, text: "Média", color: "bg-yellow-400" };

    return { level: 1, text: "Fraca", color: "bg-red-500" };
};

const Aviso = ({ tipo, texto }: { tipo: "erro" | "sucesso"; texto: string }) => (
    <p
        role={tipo === "erro" ? "alert" : "status"}
        className={`mb-5 rounded-md border px-3 py-2 text-sm ${tipo === "erro" ? "border-red-500/30 bg-red-500/10 text-red-400" : "border-green-500/30 bg-green-500/10 text-green-400"}`}
    >
        {texto}
    </p>
);

const MeusDados = () => {
    const navigate = useNavigate();
    const idUsuario = getIdUsuario();

    const [modalExcluirContaAberto, setModalExcluirContaAberto] = useState<boolean>(false);
    const [erroExclusao, setErroExclusao] = useState<string>("");

    // Dados pessoais
    const [loading, setLoading] = useState<boolean>(true);
    const [salvandoDados, setSalvandoDados] = useState<boolean>(false);
    const [erroDados, setErroDados] = useState<string>("");
    const [sucessoDados, setSucessoDados] = useState<string>("");
    const [dados, setDados] = useState({ nome: "", email: "" });
    const [errosDados, setErrosDados] = useState({ nome: "", email: "" });

    // Senha
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [salvandoSenha, setSalvandoSenha] = useState<boolean>(false);
    const [erroSenha, setErroSenha] = useState<string>("");
    const [sucessoSenha, setSucessoSenha] = useState<string>("");
    const [senhas, setSenhas] = useState({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
    const [errosSenha, setErrosSenha] = useState({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });

    useEffect(() => {
        const getUsuario = async () => {
            try {
                setLoading(true);
                setErroDados("");
                const usuario = await buscarUsuarioPorId(idUsuario);
                setDados({ nome: usuario.nome ?? "", email: usuario.email ?? "" });
            } catch (error) {
                console.error(error);
                setErroDados(error instanceof Error ? error.message : "Erro ao carregar seus dados.");
            } finally {
                setLoading(false);
            }
        };

        getUsuario();
    }, [idUsuario]);

    const handleChangeDados = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSucessoDados("");
        setDados(prev => ({ ...prev, [name]: value }));
        setErrosDados(prev => ({ ...prev, [name]: "" }));
    };

    const handleChangeSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSucessoSenha("");
        setSenhas(prev => ({ ...prev, [name]: value }));
        setErrosSenha(prev => ({ ...prev, [name]: "" }));
    };

    const salvarDados = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const novosErros = { nome: "", email: "" };
        const nome = dados.nome.trim();
        const email = dados.email.trim();

        if (!nome) novosErros.nome = "O nome é obrigatório.";
        else if (nome.length < 3 || nome.length > 150) novosErros.nome = "O nome deve ter entre 3 e 150 caracteres.";

        if (!email) novosErros.email = "O email é obrigatório.";
        else if (email.length > 150) novosErros.email = "O email deve ter no máximo 150 caracteres.";

        setErrosDados(novosErros);
        if (novosErros.nome || novosErros.email) return;

        setErroDados("");
        setSucessoDados("");
        setSalvandoDados(true);

        try {
            await atualizarUsuario(idUsuario, { nome, email });
            setSucessoDados("Dados atualizados com sucesso.");
        } catch (error) {
            console.error(error);
            setErroDados(error instanceof Error ? error.message : "Erro ao atualizar seus dados.");
        } finally {
            setSalvandoDados(false);
        }
    };

    const salvarSenha = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const novosErros = { senhaAtual: "", novaSenha: "", confirmarSenha: "" };

        if (!senhas.senhaAtual) novosErros.senhaAtual = "Informe sua senha atual.";

        if (!senhas.novaSenha.trim()) novosErros.novaSenha = "A nova senha é obrigatória.";
        else if (senhas.novaSenha.length < 6 || senhas.novaSenha.length > 100) novosErros.novaSenha = "A senha deve ter entre 6 e 100 caracteres.";
        else if (senhas.novaSenha === senhas.senhaAtual) novosErros.novaSenha = "A nova senha deve ser diferente da atual.";

        if (!senhas.confirmarSenha) novosErros.confirmarSenha = "Confirme a nova senha.";
        else if (senhas.confirmarSenha !== senhas.novaSenha) novosErros.confirmarSenha = "As senhas devem ser iguais.";

        setErrosSenha(novosErros);
        if (novosErros.senhaAtual || novosErros.novaSenha || novosErros.confirmarSenha) return;

        setErroSenha("");
        setSucessoSenha("");
        setSalvandoSenha(true);

        try {
            await alterarSenhaUsuario(idUsuario, { senha_atual: senhas.senhaAtual, nova_senha: senhas.novaSenha });
            setSenhas({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
            setSucessoSenha("Senha alterada com sucesso.");
        } catch (error) {
            console.error(error);
            setErroSenha(error instanceof Error ? error.message : "Erro ao alterar a senha.");
        } finally {
            setSalvandoSenha(false);
        }
    };

    const excluirConta = async () => {
        setModalExcluirContaAberto(false);
        setErroExclusao("");

        try {
            await desativarUsuario(idUsuario);
            limparAutenticacao();
            navigate("/", { replace: true });
        } catch (error) {
            console.error(error);
            setErroExclusao(error instanceof Error ? error.message : "Erro ao excluir a conta.");
        }
    };

    const strength = getPasswordStrength(senhas.novaSenha);

    const botaoOlho = (
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
        >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
    );

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

            {/* Dados pessoais */}
            <div className="w-full bg-[#111114] rounded-xl border border-white/8 px-4 py-6">
                <h2 className="text-[#E5E1E4] text-lg font-semibold mb-5">Dados pessoais</h2>

                {erroDados && <Aviso tipo="erro" texto={erroDados} />}
                {sucessoDados && <Aviso tipo="sucesso" texto={sucessoDados} />}

                {loading ? (
                    <p className="text-[#8E909A] text-sm">Carregando seus dados...</p>
                ) : (
                <form onSubmit={salvarDados}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-[#C2C6D8] text-sm">
                            Nome Completo <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                id="nome"
                                type="text"
                                name="nome"
                                value={dados.nome}
                                onChange={handleChangeDados}
                                placeholder="Seu nome completo"
                                className={classeInput(!!errosDados.nome)}
                            />
                        </div>

                        {errosDados.nome && <p className="text-red-400 text-xs mt-1">{errosDados.nome}</p>}
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="email" className="text-[#C2C6D8] text-sm">
                            E-mail <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={dados.email}
                                onChange={handleChangeDados}
                                placeholder="seu@email.com"
                                className={classeInput(!!errosDados.email)}
                            />
                        </div>

                        {errosDados.email && <p className="text-red-400 text-xs mt-1">{errosDados.email}</p>}
                    </div>

                    <div className="my-6 h-px bg-white/8" />

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button type="button" onClick={() => navigate(-1)} className="w-full sm:w-auto px-5 py-3 cursor-pointer rounded-xl text-[#C5C6D0] transition-all duration-200 hover:bg-white/5 hover:text-white">
                            Cancelar
                        </button>

                        <button type="submit" disabled={salvandoDados} className="disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-[15px] text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                            <Save size={22}/>
                            {salvandoDados ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
                )}
            </div>

            {/* Alterar senha */}
            <div className="w-full bg-[#111114] rounded-xl border border-white/8 px-4 py-6 mt-5">
                <h2 className="text-[#E5E1E4] text-lg font-semibold mb-5">Alterar senha</h2>

                {erroSenha && <Aviso tipo="erro" texto={erroSenha} />}
                {sucessoSenha && <Aviso tipo="sucesso" texto={sucessoSenha} />}

                <form onSubmit={salvarSenha}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="senhaAtual" className="text-[#C2C6D8] text-sm">
                            Senha Atual <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                id="senhaAtual"
                                type={showPassword ? "text" : "password"}
                                name="senhaAtual"
                                value={senhas.senhaAtual}
                                onChange={handleChangeSenha}
                                placeholder="Digite sua senha atual"
                                autoComplete="current-password"
                                className={classeInput(!!errosSenha.senhaAtual)}
                            />
                            {botaoOlho}
                        </div>

                        {errosSenha.senhaAtual && <p className="text-red-400 text-xs mt-1">{errosSenha.senhaAtual}</p>}
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="novaSenha" className="text-[#C2C6D8] text-sm">
                            Nova Senha <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                id="novaSenha"
                                type={showPassword ? "text" : "password"}
                                name="novaSenha"
                                value={senhas.novaSenha}
                                onChange={handleChangeSenha}
                                placeholder="Digite sua nova senha"
                                autoComplete="new-password"
                                className={classeInput(!!errosSenha.novaSenha)}
                            />
                            {botaoOlho}
                        </div>

                        {errosSenha.novaSenha && <p className="text-red-400 text-xs mt-1">{errosSenha.novaSenha}</p>}

                        <div className="flex flex-col gap-1">
                            <div className="w-full bg-[#2A2A2C] h-1 rounded-full mt-2 overflow-hidden">
                                <div
                                    className={`${strength.color} h-full transition-all duration-500`}
                                    style={{ width: `${[0, 33, 66, 100][strength.level]}%` }}
                                />
                            </div>

                            <p className="text-[#C2C6D8] text-xs">
                                Força da senha:{" "}
                                <span className={["", "text-red-400", "text-yellow-400", "text-green-400"][strength.level]}>
                                    {strength.text}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="confirmarSenha" className="text-[#C2C6D8] text-sm">
                            Confirmar Nova Senha <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                id="confirmarSenha"
                                type={showPassword ? "text" : "password"}
                                name="confirmarSenha"
                                value={senhas.confirmarSenha}
                                onChange={handleChangeSenha}
                                placeholder="Confirme sua nova senha"
                                autoComplete="new-password"
                                className={classeInput(!!errosSenha.confirmarSenha)}
                            />
                            {botaoOlho}
                        </div>

                        {errosSenha.confirmarSenha && <p className="text-red-400 text-xs mt-1">{errosSenha.confirmarSenha}</p>}
                    </div>

                    <div className="my-6 h-px bg-white/8" />

                    <div className="flex justify-end">
                        <button type="submit" disabled={salvandoSenha} className="disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-[15px] text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                            <KeyRound size={20}/>
                            {salvandoSenha ? "Alterando..." : "Alterar Senha"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Excluir conta */}
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

                    {erroExclusao && (
                        <p role="alert" className="mt-2 rounded-md border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-2 text-sm">
                            {erroExclusao}
                        </p>
                    )}

                    <div className="mt-4">
                        <button
                            onClick={() => setModalExcluirContaAberto(true)}
                            type="button"
                            className="cursor-pointer rounded-xl text-[15px] bg-red-600 px-5 py-3 text-white font-medium transition-colors hover:bg-red-700"
                        >
                            Excluir Conta
                        </button>
                    </div>
                </div>
            </div>

            {modalExcluirContaAberto && (
                <Modal
                    tipo="DESTRUTIVO"
                    titulo="Excluir conta?"
                    descricao="Você está prestes a excluir sua conta permanentemente. Todos os seus workspaces, tarefas, subtarefas, tags e demais dados serão removidos e não poderão ser recuperados."
                    textoConfirmacao="EXCLUIR CONTA"
                    onCancelar={() => setModalExcluirContaAberto(false)}
                    onConfirmar={excluirConta}
                />
            )}
        </MainLayout>
    );
}

export default MeusDados;
