import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { tarefas } from "../../data/tarefas";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import "./fullcalendar.css";
import { formatarPrioridadeDaTarefa } from "../../utils/formatters";

const Calendario = () => {
    const navigate = useNavigate();

    const eventos = tarefas.map((tarefa) => {
        const [dia, mes, ano] = tarefa.dataLimite.split("/");

        return {
            id: tarefa.id.toString(),
            title: tarefa.titulo,
            start: `${ano}-${mes}-${dia}`,
            extendedProps: {
                prioridade: tarefa.prioridade,
                status: tarefa.status,
            },
        };
    });

    const estilosPrioridadeDaTarefaParaCalendario = (prioridade: string) => {
        switch (prioridade) {
            case "BAIXA":
                return "bg-emerald-600 text-white";

            case "MEDIA":
                return "bg-amber-500 text-black";

            case "ALTA":
                return "bg-red-500 text-white";

            case "URGENTE":
                return "bg-[#7F1D1D] text-white";

            default:
                return "bg-[#353437] text-[#C5C6D0]";
        }
    };

    return(
        <MainLayout titulo="Calendário">
            <div>
                <h2 className="text-2xl font-bold text-[#E5E1E4]">
                    Calendário
                </h2>

                <p className="text-[#8E909A] mt-1 text-justify">
                    Visualize todas as suas tarefas organizadas pela data de prazo.
                </p>
            </div>

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
                    events={eventos}
                    eventClick={(info) => {
                        navigate(`/tarefa/${info.event.id}`);
                    }}
                    eventContent={(info) => {
                        const { prioridade, status } = info.event.extendedProps;

                        return (
                            <div
                                className={`cursor-pointer rounded-md px-2 py-1 text-white text-xs ${
                                    status === "CONCLUIDA"
                                        ? "bg-green-600"
                                        : "bg-[#12B5FD]"
                                }`}
                            >
                                <div className="font-medium truncate">
                                    {info.event.title}
                                </div>

                                <div className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] ${estilosPrioridadeDaTarefaParaCalendario(prioridade)}`}>
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

export default Calendario;