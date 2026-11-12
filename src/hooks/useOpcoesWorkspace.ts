import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { CorWorkspace, IconeWorkspace } from "../types/workspaceTypes";
import { listarTodasCoresWorkspace, listarTodosIconesWorkspace } from "../services/workspaceService";
import { buscarIconeWorkspace } from "../data/workspaceOptions";

export interface OpcaoIcone extends IconeWorkspace {
    icon: LucideIcon;
}

export function useOpcoesWorkspace() {
    const [icones, setIcones] = useState<OpcaoIcone[]>([]);
    const [cores, setCores] = useState<CorWorkspace[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>("");

    useEffect(() => {
        const carregar = async () => {
            try {
                setLoading(true);
                setErro("");

                const [paginaIcones, paginaCores] = await Promise.all([
                    listarTodosIconesWorkspace(),
                    listarTodasCoresWorkspace(),
                ]);

                // Só mostra os ícones que o front sabe desenhar (caminho existe no workspaceOptions)
                const iconesValidos = paginaIcones.content
                    .filter(i => i.ativo)
                    .flatMap(i => {
                        const icone = buscarIconeWorkspace(i.caminho);
                        return icone ? [{ ...i, icon: icone.icon }] : [];
                    });

                setIcones(iconesValidos);
                setCores(paginaCores.content.filter(c => c.ativo));
            } catch (error) {
                console.error(error);
                setErro(error instanceof Error ? error.message : "Erro ao carregar ícones e cores.");
            } finally {
                setLoading(false);
            }
        };

        carregar();
    }, []);

    return { icones, cores, loading, erro };
}
