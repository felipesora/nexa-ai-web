import type { LucideIcon } from "lucide-react";

export interface CardInformativoProps {
    icone: LucideIcon,
    titulo: string,
    descricao: string,
}

export interface EtapaFluxoProps {
    icone: LucideIcon,
    titulo: string,
    cor: string,
    mobile?: boolean;
    ativa: boolean
}

export interface DadosEtapaFluxo {
    icone: LucideIcon,
    titulo: string,
    cor: string,
}