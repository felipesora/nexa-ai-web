import Logo from "../../assets/logos/logo-completa-nexa-ai.png";
import Demonstracao from "../../assets/images/demonstracao-nexa.png";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const PaginaInicial = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0A0A0C]">

      <header className="flex items-center justify-between border-b border-white/10 bg-[#121315] px-4 py-4 min-[560px]:px-6 min-[560px]:py-5 min-[975px]:px-10">
        <button className="cursor-pointer">
          <img src={Logo} alt="Logo Nexa AI" className="w-24 min-[560px]:w-28" />
        </button>

        <div className="flex items-center gap-2 min-[560px]:gap-5">
          <button
            onClick={() => navigate("/auth/login")}
            className="hidden cursor-pointer rounded-md px-3 py-2 font-medium text-white transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_12px_rgba(18,181,253,0.15)] min-[560px]:block"
          >
            Entrar
          </button>

          <button
            onClick={() => navigate("/auth/cadastro")}
            className="cursor-pointer rounded-md bg-[#12B5FD] px-3 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#2BC2FF] hover:shadow-[0_0_10px_rgba(18,181,253,0.35)] min-[560px]:px-4 min-[560px]:text-base"
          >
            Começe de graça
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0E1013] via-[#0E1219] to-[#0E1419] px-6 py-10 min-[560px]:py-12 min-[1490px]:px-12 min-[1490px]:py-12">
          <div
            className="firefly top-[12%] left-[8%] w-1 h-1"
            style={{ animationDuration: "12s" }}
          />

          <div
            className="firefly top-[20%] right-[15%] w-2 h-2"
            style={{ animationDuration: "9s" }}
          />

          <div
            className="firefly bottom-[15%] left-[18%] w-1.5 h-1.5"
            style={{ animationDuration: "15s" }}
          />

          <div
            className="firefly top-[60%] right-[28%] w-1 h-1"
            style={{ animationDuration: "13s" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8 min-[975px]:gap-12 min-[1490px]:flex-row min-[1490px]:justify-center min-[1490px]:gap-16">
            <div className="flex w-full max-w-[500px] flex-col items-center gap-5 text-center min-[975px]:max-w-[620px] min-[1490px]:max-w-[750px] min-[1490px]:items-start min-[1490px]:gap-6 min-[1490px]:text-left">
              <aside className="w-fit rounded-full border border-[#3A4C66] bg-[#121316] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8DB9FF] min-[975px]:px-4 min-[975px]:text-[10px] min-[1490px]:py-1.5 min-[1490px]:text-[11px]">
                Inteligência Artificial em Tempo Real
              </aside>

              <div>
                <h1 className="text-2xl font-semibold leading-tight text-white min-[560px]:text-[2rem] min-[975px]:text-3xl min-[1490px]:text-4xl">
                  Pare de organizar suas tarefas.
                </h1>

                <h1 className="text-3xl font-bold leading-tight text-[#12B5FD] min-[560px]:text-[2.5rem] min-[975px]:text-4xl min-[1490px]:text-5xl">
                  Deixe a IA fazer isso por você.
                </h1>
              </div>

              <p className="text-sm leading-6 text-[#C2C6D8] min-[560px]:text-[15px] min-[975px]:text-base min-[975px]:leading-7 min-[1490px]:text-base min-[1490px]:leading-8">
                O Nexa AI aprende sua rotina, organiza automaticamente suas
                tarefas e cria um planejamento inteligente para que você produza
                mais sem perder tempo organizando tudo manualmente.
              </p>

              <div className="flex flex-col gap-3 min-[640px]:flex-row">
                <button
                  className="cursor-pointer group flex w-full items-center justify-center rounded-[10px] bg-[#12B5FD] px-5 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#2BC2FF] hover:shadow-[0_0_10px_rgba(18,181,253,0.35)] min-[560px]:w-auto min-[975px]:px-6 min-[975px]:py-3.5 min-[975px]:text-[17px] min-[1490px]:px-7 min-[1490px]:py-4 min-[1490px]:text-lg">
                  Começar gratuitamente
                  <ChevronRight
                    size={18}
                    className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <button
                  className=" cursor-pointer w-full rounded-[10px] border border-white/10 bg-[#121316] px-5 py-3 text-base font-medium text-white transition-all duration-300 hover:border-[#12B5FD]/40 hover:bg-[#171A1F] hover:text-[#12B5FD] hover:shadow-[0_0_20px_rgba(18,181,253,0.12)] min-[560px]:w-auto min-[975px]:px-6 min-[975px]:py-3.5 min-[975px]:text-[17px] min-[1490px]:px-7 min-[1490px]:py-4 min-[1490px]:text-lg"
                >
                  Ver demonstração
                </button>
              </div>
            </div>

            <div>
              <img
                src={Demonstracao}
                alt="Imagem de demonstração"
                className="w-[300px] min-[560px]:w-[360px] min-[975px]:w-[420px] min-[1490px]:w-[560px]"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PaginaInicial;
