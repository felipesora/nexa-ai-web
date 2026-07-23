export interface Tarefa {
    id: number;
    idUsuario: number;
    titulo: string;
    descricao: string;
    prioridade: string;
    status: string;
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