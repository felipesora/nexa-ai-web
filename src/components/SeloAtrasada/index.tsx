import { AlarmClock } from "lucide-react";

// "Atrasada" é calculado pelo backend (prazo vencido e não concluída) e convive com o status real
const SeloAtrasada = ({ className = "" }: { className?: string }) => (
    <span className={`inline-flex w-fit shrink-0 items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[12px] text-red-400 ${className}`}>
        <AlarmClock size={12} />
        Atrasada
    </span>
);

export default SeloAtrasada;
