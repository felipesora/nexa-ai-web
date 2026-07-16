import { BrainCog } from "lucide-react";

interface CardInsightIAProps {
    insight: string
}

const CardInsightIA = ({ insight }: CardInsightIAProps) => {
    return(
        <div className="bg-[#0F0F12] rounded-xl border border-white/8 px-3 py-4 flex flex-col gap-5">
            <div className="flex items-center gap-2">
                <BrainCog size={24} className="text-[#E5E1E4]"/>
                <p className="text-[#E5E1E4] font-medium text-[17px]">Insight da IA</p>
            </div>

            <div className="bg-[#1B1B1E] rounded-xl p-4">
                <p className="text-[#C5C6D0] text-justify">
                    {`"${insight}"`}
                </p>
            </div>
        </div>
    );
}

export default CardInsightIA;