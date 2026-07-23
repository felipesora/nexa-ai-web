import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { ArrowLeft, Plus, Type } from "lucide-react";

const CadastroSubtarefa = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        titulo: "",
    });

    const [erros, setErros] = useState({
        titulo: "",
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

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const novosErros = {
            titulo: "",
        };

        let valido = true;

        if (!form.titulo.trim()) {
            novosErros.titulo = "O título é obrigatório.";
            valido = false;
        } else if (form.titulo.trim().length < 3 || form.titulo.trim().length > 200) {
            novosErros.titulo = "O título deve ter entre 3 e 200 caracteres.";
            valido = false;
        }

        setErros(novosErros);

        if (!valido) return;

        console.log(form);
    };

    return(
        <MainLayout titulo="Criar Nova Subtarefa">
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
                        <label htmlFor="titulo" className="text-[#C2C6D8] text-sm">
                            Título da Subtarefa <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <Type
                                size={18} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />

                            <input
                                type="text"
                                name="titulo"
                                value={form.titulo}
                                onChange={handleChange}
                                placeholder="Digite o título da subtarefa"
                                className={`text-sm w-full rounded-md bg-[#0F0F11] py-2 pl-10 pr-3 text-white placeholder:text-gray-500 focus:outline-none transition-all duration-300 ${erros.titulo ? "border border-red-500" : "border border-white/10 focus:border-[#12B5FD]"}`}
                            />
                        </div>

                        {erros.titulo && (
                            <p className="text-red-400 text-xs mt-1">
                                {erros.titulo}
                            </p>
                        )}
                    </div>

                    <div className="my-6 h-px bg-white/8" />

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button type="button" onClick={() => navigate(-1)} className="w-full sm:w-auto px-5 py-3 cursor-pointer rounded-xl text-[#C5C6D0] transition-all duration-200 hover:bg-white/5 hover:text-white">
                            Cancelar
                        </button>

                        <button type="submit" className="w-full sm:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-[15px] text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                            <Plus size={22}/>
                            Criar Subtarefa
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}

export default CadastroSubtarefa;