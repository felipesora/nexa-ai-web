import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import type { EventInput, EventSourceFuncArg } from "@fullcalendar/core";
import { useCallback, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import "./fullcalendar.css";
import { estilosPrioridadeDaTarefa, formatarPrioridadeDaTarefa } from "../../utils/formatters";
import { listarTarefasAgenda } from "../../services/tarefaService";
import { getIdUsuario } from "../../services/localStorageService";

const Agenda = () => {
    const navigate = useNavigate();
    const idUsuario = getIdUsuario();
    const [erro, setErro] = useState<string | null>(null);

    // O FullCalendar chama esta função a cada troca de período (prev/next/hoje) com o intervalo visível
    const buscarEventos = useCallback(
        async (info: EventSourceFuncArg): Promise<EventInput[]> => {
            try {
                // startStr/endStr vêm em ISO; o backend espera só a data (fim exclusivo, igual ao FullCalendar)
                const tarefas = await listarTarefasAgenda(
                    idUsuario,
                    info.startStr.slice(0, 10),
                    info.endStr.slice(0, 10),
                );
                setErro(null);

                return tarefas.map((tarefa) => ({
                    id: String(tarefa.id_tarefa),
                    title: tarefa.titulo,
                    start: tarefa.data_limite,
                    allDay: true,
                    extendedProps: {
                        prioridade: tarefa.prioridade,
                        status: tarefa.status,
                    },
                }));
            } catch (e) {
                setErro(e instanceof Error ? e.message : "Falha ao carregar a agenda.");
                return [];
            }
        },
        [idUsuario],
    );

    return(
        <MainLayout titulo="Agenda">
            <div>
                <h2 className="text-2xl font-bold text-[#E5E1E4]">
                    Agenda
                </h2>

                <p className="text-[#8E909A] mt-1 text-justify">
                    Visualize todas as suas tarefas organizadas pela data de prazo.
                </p>
            </div>

            {erro && (
                <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                    {erro}
                </p>
            )}

            <div className="rounded-xl bg-[#111114] p-5 border border-white/10 mt-8">

                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                    ]}
                    buttonText={{
                        today: "Hoje",
                        month: "Mês",
                        week: "Semana",
                        day: "Dia",
                    }}
                    headerToolbar={{
                        left: "title",
                        center: "",
                        right: "today prev,next"
                    }}
                    displayEventTime={false}
                    dayMaxEvents={3}
                    initialView="dayGridMonth"
                    locale={ptBrLocale}
                    contentHeight="auto"
                    aspectRatio={1.8}
                    events={buscarEventos}
                    eventClick={(info) => {
                        navigate(`/tarefa/${info.event.id}`);
                    }}
                    eventContent={(info) => {
                        const { prioridade, status } = info.event.extendedProps;

                        return (
                            <div
                                className={`cursor-pointer rounded-lg border px-2 py-1 text-[#E5E1E4] text-xs ${
                                    status === "CONCLUIDA"
                                        ? "border-green-700 bg-green-600"
                                        : "border-white/10 bg-[#1A1A1F]"
                                }`}
                            >
                                <div className="font-medium truncate">
                                    {info.event.title}
                                </div>

                                <div className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] ${status === "CONCLUIDA" ? "bg-white/20 text-white" : estilosPrioridadeDaTarefa(prioridade)}`}>
                                    {formatarPrioridadeDaTarefa(prioridade)}
                                </div>
                            </div>
                        );
                    }}
                />

            </div>
        </MainLayout>
    );
};

export default Agenda;