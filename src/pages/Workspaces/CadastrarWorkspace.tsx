import { ArrowLeft, Plus, Type } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { workspaceColors, workspaceIcons } from "../../data/workspaceOptions";

const CadastrarWorkspace = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        icone: "folder",
        cor: "white"
    });

    const [erros, setErros] = useState({
        nome: "",
        descricao: "",
    });

    const iconSelecionado = workspaceIcons.find(i => i.id === form.icone);

    const corSelecionada = workspaceColors.find(c => c.id === form.cor);

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

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const novosErros = {
            nome: "",
            descricao: "",
        };

        let valido = true;

        if (!form.nome.trim()) {
            novosErros.nome = "O nome é obrigatório.";
            valido = false;
        } else if (form.nome.trim().length < 3 || form.nome.trim().length > 200) {
            novosErros.nome = "O nome deve ter entre 3 e 200 caracteres.";
            valido = false;
        }

        if (form.descricao &&(form.descricao.trim().length < 3 || form.descricao.trim().length > 700)
        ) {
            novosErros.descricao ="A descrição deve ter entre 3 e 700 caracteres.";
            valido = false;
        }

        setErros(novosErros);

        if (!valido) return;

        console.log(form);
    };

    return(
        <MainLayout titulo="Criar Novo Workspace" pageTitle="Novo Workspace">
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
                            Nome do Workspace <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <Type
                                size={18} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />

                            <input
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Digite o nome do workspace"
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
                        <label htmlFor="descricao" className="text-[#C2C6D8] text-sm">
                            Descrição
                        </label>

                        <textarea 
                            name="descricao" 
                            placeholder="Descreva o workspace..."
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

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="descricao" className="text-[#C2C6D8] text-sm">
                            Ícone do Workspace
                        </label>

                        <div className="grid grid-cols-5 gap-3">
                            {workspaceIcons.map(({ id, icon: Icon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() =>
                                        setForm(prev => ({
                                            ...prev,
                                            icone: id,
                                        }))
                                    }
                                    className={`h-12 rounded-xl border transition cursor-pointer
                                        ${
                                            form.icone === id
                                                ? "border-[#12B5FD] bg-[#12B5FD]/10"
                                                : "border-white/10 hover:border-white/30"
                                        }`}
                                >
                                    <Icon size={22} className="mx-auto text-white" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="descricao" className="text-[#C2C6D8] text-sm">
                            Cor do Workspace
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {workspaceColors.map(color => (
                                <button
                                    key={color.id}
                                    type="button"
                                    onClick={() =>
                                        setForm(prev => ({
                                            ...prev,
                                            cor: color.id,
                                        }))
                                    }
                                    className={`w-10 h-10 rounded-full border-2 transition cursor-pointer
                                        ${
                                            form.cor === color.id
                                                ? "border-white scale-110"
                                                : "border-transparent"
                                        }`}
                                    style={{ backgroundColor: color.cor }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="descricao" className="text-[#C2C6D8] text-sm">
                            Prévia do workspace
                        </label>

                        {iconSelecionado && corSelecionada && (
                            <div className="mb-6 rounded-xl border border-white/10 bg-[#0F0F11] p-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                                        style={{
                                            backgroundColor: `${corSelecionada.cor}20`,
                                        }}
                                    >
                                        <iconSelecionado.icon
                                            size={28}
                                            style={{ color: corSelecionada.cor }}
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-white font-medium">
                                            {form.nome || "Novo Workspace"}
                                        </h3>

                                        <p className="text-sm text-[#8E909A]">
                                            {form.descricao || "Descrição do workspace"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="my-6 h-px bg-white/8" />

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button type="button" onClick={() => navigate(-1)} className="w-full sm:w-auto px-5 py-3 cursor-pointer rounded-xl text-[#C5C6D0] transition-all duration-200 hover:bg-white/5 hover:text-white">
                            Cancelar
                        </button>

                        <button type="submit" className="w-full sm:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-[15px] text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                            <Plus size={22}/>
                            Criar Workspace
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}

export default CadastrarWorkspace;