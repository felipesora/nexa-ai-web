export interface Tarefa {
    id: number;
    idUsuario: number;
    titulo: string;
    descricao: string;
    prioridade: string;
    status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";
    dificuldade: string;
    dataLimite: string;
    dataConclusao: string;
    criadoEm: string;
    atualizadoEm: string;
    ativo: boolean;
    idWorkspace: number;
    nomeWorkspace?: string;
    qntSubtarefas: number;
}