import { useState, type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tagsColors } from "../../data/tagOptions";
import MainLayout from "../../layouts/MainLayout";
import { ArrowLeft, SquarePen, TagIcon, Type } from "lucide-react";
import { tags } from "../../data/tags";

const EditarTag = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const tag = tags.find(t => t.id === Number(id)) ?? null;

    const [form, setForm] = useState({
        nome: tag?.nome ?? "",
        cor: tag?.cor ?? "white"
    });

    const [erros, setErros] = useState({
        nome: "",
        cor: "",
    });

    const corSelecionada = tagsColors.find(c => c.id === form.cor);

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
            cor: "",
        };

        let valido = true;

        if (!form.nome.trim()) {
            novosErros.nome = "O nome da tag é obrigatório.";
            valido = false;
        } else if (form.nome.trim().length < 3 || form.nome.trim().length > 100) {
            novosErros.nome = "O nome da tag deve ter entre 3 e 100 caracteres.";
            valido = false;
        }

        setErros(novosErros);

        if (!valido) return;

        console.log(form);
    };
    
    return(
        <MainLayout titulo="Editar Tag">
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
                            Nome da Tag <span className="text-red-500">*</span>
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
                                placeholder="Digite o nome da tag"
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
                            Cor da Tag
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {tagsColors.map(color => (
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
                            Prévia da tag
                        </label>

                        {corSelecionada && (
                            <div style={{ backgroundColor: `${corSelecionada.cor}1A`, "--tag-color": corSelecionada.cor,} as React.CSSProperties} className="border border-transparent rounded-2xl p-3 flex items-center justify-between transition-all duration-300 hover:[border-color:var(--tag-color)]">
                                <div className="flex items-center gap-2">
                                    <TagIcon
                                        size={20}
                                        color={corSelecionada.cor}
                                    />
                                    <h3 className="text-[#E5E1E4] font-semibold text-md truncate max-w-[180px]">
                                        {form.nome || "Nova Tag"}
                                    </h3>
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
                            <SquarePen size={22}/>
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}

export default EditarTag;