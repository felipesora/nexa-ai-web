interface CarregandoProps {
    texto?: string;
    // "md": spinner centralizado com o texto embaixo (listas e páginas)
    // "sm": spinner pequeno ao lado do texto (trechos de formulário)
    tamanho?: "sm" | "md";
    className?: string;
}

const Carregando = ({ texto = "Carregando...", tamanho = "md", className = "" }: CarregandoProps) => {
    const pequeno = tamanho === "sm";
    const dimensao = pequeno ? "w-5 h-5" : "w-11 h-11";
    const espessura = pequeno ? "border-2" : "border-[3px]";

    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex items-center text-[#8E909A] ${pequeno ? "gap-3 text-sm" : "flex-col justify-center gap-4 py-12 text-sm"} ${className}`}
        >
            <div className={`relative ${dimensao}`}>
                {/* Trilho */}
                <div className={`absolute inset-0 rounded-full ${espessura} border-[#12B5FD]/15`} />
                {/* Arco girando, com brilho na cor do Nexa */}
                <div
                    className={`absolute inset-0 rounded-full ${espessura} border-transparent border-t-[#12B5FD] border-r-[#12B5FD]/60 animate-spin ${pequeno ? "" : "shadow-[0_0_18px_-4px_#12B5FD]"}`}
                    style={{ animationDuration: "0.8s" }}
                />
                {!pequeno && (
                    <div className="absolute inset-[30%] rounded-full bg-[#12B5FD]/20 animate-pulse" />
                )}
            </div>

            <span>{texto}</span>
        </div>
    );
};

export default Carregando;
