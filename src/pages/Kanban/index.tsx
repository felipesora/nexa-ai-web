import MainLayout from "../../layouts/MainLayout";
import KanbanBoard from "./components/KanbanBoard";

const Kanban = () => {
    return(
        <MainLayout titulo="Kanban">
            <div>
                <h2 className="text-2xl font-bold text-[#E5E1E4]">
                    Kanban
                </h2>

                <p className="text-[#8E909A] mt-1 text-justify">
                    Visualize e organize suas tarefas por status.
                </p>
            </div>

            <div className="mt-8">
                <KanbanBoard />
            </div>
        </MainLayout>
    );
}

export default Kanban;