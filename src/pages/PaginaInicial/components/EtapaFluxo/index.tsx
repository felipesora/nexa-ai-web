import type { EtapaFluxoProps } from "../../types/types";

const EtapaFluxo = ({ icone: Icon, titulo, cor, mobile = false, ativa }: EtapaFluxoProps) => {
    if (mobile) {
        return(
            <div className="relative z-10 flex flex-col items-center gap-3 bg-[#0A0A0C] px-4">
                <div 
                    className="relative z-10 rounded-full border bg-[#0A0A0C] p-3 transition-all duration-700" 
                    style={{ borderColor: cor, boxShadow: ativa ? `0 0 18px ${cor}, 0 0 35px ${cor}55` : "none" }}
                >
                    <Icon size={22} style={{ color: cor }} />
                </div>

                <h3 className="text-[14px] font-medium text-white text-center min-[675px]:text-base">
                    {titulo}
                </h3>
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center gap-2">
            <div 
                className="rounded-full bg-[#101012] border w-fit p-3 transition-all duration-700" 
                style={{ borderColor: cor, boxShadow: ativa ? `0 0 18px ${cor}, 0 0 35px ${cor}55` : "none" }}
            >
                <Icon size={24} style={{ color: cor }} />
            </div>

            <h3 className="text-[#E5E1E4] font-medium">
                {titulo}
            </h3>
        </div>
    );
}

export default EtapaFluxo;