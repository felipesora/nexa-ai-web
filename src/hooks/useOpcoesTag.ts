import { useEffect, useState } from "react";
import type { CorTag } from "../types/tagTypes";
import { listarTodasCoresTag } from "../services/tagService";

export function useOpcoesTag() {
    const [cores, setCores] = useState<CorTag[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>("");

    useEffect(() => {
        const carregar = async () => {
            try {
                setLoading(true);
                setErro("");

                const paginaCores = await listarTodasCoresTag();
                setCores(paginaCores.content.filter(c => c.ativo));
            } catch (error) {
                console.error(error);
                setErro(error instanceof Error ? error.message : "Erro ao carregar cores.");
            } finally {
                setLoading(false);
            }
        };

        carregar();
    }, []);

    return { cores, loading, erro };
}
