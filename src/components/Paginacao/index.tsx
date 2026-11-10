import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const OPCOES_TAMANHO_PAGINA = [5, 10, 20, 50];

interface PaginacaoProps {
    pagina: number;          // começa em 0, como no Spring
    totalPaginas: number;
    totalItens: number;
    tamanho: number;
    onMudarPagina: (pagina: number) => void;
    onMudarTamanho: (tamanho: number) => void;
    desabilitado?: boolean;
}

// Monta a lista de páginas visíveis, com "..." quando há muitas: 1 … 4 5 6 … 12
const montarPaginas = (atual: number, total: number): (number | "...")[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);

    const paginas: (number | "...")[] = [0];
    const inicio = Math.max(1, atual - 1);
    const fim = Math.min(total - 2, atual + 1);

    if (inicio > 1) paginas.push("...");
    for (let i = inicio; i <= fim; i++) paginas.push(i);
    if (fim < total - 2) paginas.push("...");

    paginas.push(total - 1);
    return paginas;
};

const classeBotao = "min-w-9 h-9 px-2 rounded-lg text-sm flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40";

const Paginacao = ({ pagina, totalPaginas, totalItens, tamanho, onMudarPagina, onMudarTamanho, desabilitado = false }: PaginacaoProps) => {
    if (totalItens === 0) return null;

    const primeiroItem = pagina * tamanho + 1;
    const ultimoItem = Math.min((pagina + 1) * tamanho, totalItens);

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-[#8E909A]">
            <div className="flex items-center gap-3 justify-between sm:justify-start">
                <p>
                    {primeiroItem}–{ultimoItem} de {totalItens}
                </p>

                <label className="flex items-center gap-2">
                    <span className="hidden min-[400px]:inline">Por página</span>
                    <div className="relative">
                        <select
                            value={tamanho}
                            disabled={desabilitado}
                            onChange={(e) => onMudarTamanho(Number(e.target.value))}
                            className="appearance-none cursor-pointer rounded-lg border border-white/8 bg-[#0F0F12] py-1.5 pl-3 pr-8 text-[#E5E1E4] focus:outline-none focus:border-[#12B5FD]"
                        >
                            {OPCOES_TAMANHO_PAGINA.map((opcao) => (
                                <option key={opcao} value={opcao}>{opcao}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
                    </div>
                </label>
            </div>

            {totalPaginas > 1 && (
                <nav aria-label="Paginação" className="flex items-center gap-1 justify-center">
                    <button
                        type="button"
                        aria-label="Página anterior"
                        disabled={desabilitado || pagina === 0}
                        onClick={() => onMudarPagina(pagina - 1)}
                        className={`${classeBotao} text-[#C5C6D0] hover:bg-white/5`}
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {montarPaginas(pagina, totalPaginas).map((item, index) =>
                        item === "..." ? (
                            <span key={`reticencias-${index}`} className="px-1">…</span>
                        ) : (
                            <button
                                key={item}
                                type="button"
                                disabled={desabilitado}
                                aria-current={item === pagina ? "page" : undefined}
                                onClick={() => onMudarPagina(item)}
                                className={`${classeBotao} ${item === pagina ? "bg-[#12B5FD]/15 text-[#12B5FD] font-medium" : "text-[#C5C6D0] hover:bg-white/5"}`}
                            >
                                {item + 1}
                            </button>
                        )
                    )}

                    <button
                        type="button"
                        aria-label="Próxima página"
                        disabled={desabilitado || pagina >= totalPaginas - 1}
                        onClick={() => onMudarPagina(pagina + 1)}
                        className={`${classeBotao} text-[#C5C6D0] hover:bg-white/5`}
                    >
                        <ChevronRight size={18} />
                    </button>
                </nav>
            )}
        </div>
    );
};

export default Paginacao;
