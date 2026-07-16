import Logo from "../../assets/logos/logo-completa-nexa-ai.png";
import Demonstracao from "./images/demonstracao-nexa.png";
import Antes from "./images/antes-de-Nexa-AI.png";
import Depois from "./images/depois-de-Nexa-AI.png";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import CardInformativo from "./components/CardInformativo";
import { dadosCardsInformativos } from "./data/dataCardsInformativos";
import { dadosEtapasFluxo } from "./data/dataEtapasFluxo";
import EtapaFluxo from "./components/EtapaFluxo";
import { useEffect, useRef, useState } from "react";

const PaginaInicial = () => {
  const [etapaAtiva, setEtapaAtiva] = useState<number>(0);
  const [mostrarComparacao, setMostrarComparacao] = useState(false);
  const [mostrarCards, setMostrarCards] = useState(false);
  const [mostrarFluxo, setMostrarFluxo] = useState(false);
  const [mostrarCTA, setMostrarCTA] = useState(false);
  const navigate = useNavigate();
  const topoRef = useRef<HTMLDivElement>(null);
  const secaoDemonstracaoRef = useRef<HTMLDivElement>(null);
  const secaoCardsRef = useRef<HTMLDivElement>(null);
  const secaoFluxoRef = useRef<HTMLDivElement>(null);
  const secaoCTARef = useRef<HTMLDivElement>(null);

  const delays = [
    "card-delay-1",
    "card-delay-2",
    "card-delay-3",
    "card-delay-4",
    "card-delay-5",
  ];

  const workflowDelays = [
    "workflow-step-delay-1",
    "workflow-step-delay-2",
    "workflow-step-delay-3",
    "workflow-step-delay-4",
    "workflow-step-delay-5",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setEtapaAtiva((prev) => (prev + 1) % dadosEtapasFluxo.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const scrollParaDemonstracao = () => {
    secaoDemonstracaoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollParaTopo = () => {
    topoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setMostrarComparacao(true);
            }
        },
        {
            threshold: .3,
        }
    );

    if (secaoDemonstracaoRef.current) {
        observer.observe(secaoDemonstracaoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMostrarCards(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (secaoCardsRef.current) {
      observer.observe(secaoCardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMostrarFluxo(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (secaoFluxoRef.current) {
      observer.observe(secaoFluxoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
      const observer = new IntersectionObserver(
          ([entry]) => {
              if (entry.isIntersecting) {
                  setMostrarCTA(true);
                  observer.disconnect();
              }
          },
          {
              threshold: .25,
          }
      );

      if (secaoCTARef.current) {
          observer.observe(secaoCTARef.current);
      }

      return () => observer.disconnect();
  }, []);

  return (
    <div ref={topoRef} className="bg-[#0A0A0C]">

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
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0E1013] via-[#0E1219] to-[#0E1419] px-6 py-28 min-[560px]:py-28 min-[1490px]:px-12 min-[1490px]:py-36">
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

              <aside className="fade-up-pagina-inicial w-fit rounded-full border border-[#3A4C66] bg-[#121316] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8DB9FF] min-[975px]:px-4 min-[975px]:text-[10px] min-[1490px]:py-1.5 min-[1490px]:text-[11px]">
                Inteligência Artificial em Tempo Real
              </aside>

              <div>
                <h1 className="fade-up-pagina-inicial delay-1 text-2xl font-semibold leading-tight text-white min-[560px]:text-[2rem] min-[975px]:text-3xl min-[1490px]:text-4xl">
                  Pare de organizar suas tarefas.
                </h1>

                <h1 className="fade-up-pagina-inicial delay-2 text-3xl font-bold leading-tight text-[#12B5FD] min-[560px]:text-[2.5rem] min-[975px]:text-4xl min-[1490px]:text-5xl">
                  Deixe a IA fazer isso por você.
                </h1>
              </div>

              <p className="fade-up-pagina-inicial delay-3 text-sm leading-6 text-[#C2C6D8] min-[560px]:text-[15px] min-[975px]:text-base min-[975px]:leading-7 min-[1490px]:text-base min-[1490px]:leading-8">
                O Nexa AI aprende sua rotina, organiza automaticamente suas
                tarefas e cria um planejamento inteligente para que você produza
                mais sem perder tempo organizando tudo manualmente.
              </p>

              <div className="fade-up-pagina-inicial delay-4 flex flex-col gap-3 min-[640px]:flex-row">
                <button
                  onClick={() => navigate("/auth/cadastro")}
                  className="cursor-pointer group flex w-full items-center justify-center rounded-[10px] bg-[#12B5FD] px-5 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#2BC2FF] hover:shadow-[0_0_10px_rgba(18,181,253,0.35)] min-[560px]:w-auto min-[975px]:px-6 min-[975px]:py-3.5 min-[975px]:text-[17px] min-[1490px]:px-7 min-[1490px]:py-4 min-[1490px]:text-lg">
                  Começar gratuitamente
                  <ChevronRight
                    size={18}
                    className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <button
                  onClick={scrollParaDemonstracao}
                  className=" cursor-pointer w-full rounded-[10px] border border-white/10 bg-[#121316] px-5 py-3 text-base font-medium text-white transition-all duration-300 hover:border-[#12B5FD]/40 hover:bg-[#171A1F] hover:text-[#12B5FD] hover:shadow-[0_0_20px_rgba(18,181,253,0.12)] min-[560px]:w-auto min-[975px]:px-6 min-[975px]:py-3.5 min-[975px]:text-[17px] min-[1490px]:px-7 min-[1490px]:py-4 min-[1490px]:text-lg"
                >
                  Como funciona
                </button>
              </div>
            </div>

            <div>
              <img
                src={Demonstracao}
                alt="Imagem de demonstração"
                className="image-enter w-[300px] min-[560px]:w-[360px] min-[975px]:w-[420px] min-[1490px]:w-[560px]"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#0D0D0F] flex flex-col items-center gap-10 px-6 py-28 min-[560px]:py-28 min-[1090px]:gap-16 min-[1490px]:px-12 min-[1490px]:py-36">
          <div ref={secaoDemonstracaoRef} className="flex flex-col gap-2 items-center">
            <h2 className={`font-bold text-lg text-center text-white min-[560px]:text-xl ${mostrarComparacao ? "fade-up-pagina-inicial" : ""}`}>
              Mais que um gerenciador
            </h2>
            <p className={`max-w-[700px] text-center text-sm leading-6 text-[#C2C6D8] min-[560px]:text-[15px] min-[975px]:text-base min-[975px]:leading-7 min-[1490px]:leading-8 min-[1490px]:max-w-full ${mostrarComparacao ? "fade-up-pagina-inicial" : ""}`}>Nexa AI não apenas lista suas tarefas, ele entende o seu fluxo de trabalho e remove o atrito da organização manual.</p>
          </div>

          <div className="flex flex-col items-center gap-10 min-[1090px]:flex-row min-[1090px]:gap-14 min-[1090px]:items-start">
            <img src={Antes} alt="Antes de Nexa AI" className={`w-full max-w-[480px] min-[1490px]:max-w-[580px] ${mostrarComparacao ? "slide-left" : ""}`} />
            <img src={Depois} alt="Depois de Nexa AI" className={`w-full max-w-[480px] min-[1490px]:max-w-[580px] ${mostrarComparacao ? "slide-right" : ""}`} />
          </div>
        </section>

        <section className="bg-[#0A0A0C] flex flex-col items-center gap-10 px-20 py-28 min-[560px]:py-28 min-[1090px]:gap-16 min-[1490px]:px-30 min-[1490px]:py-36">
          <div ref={secaoCardsRef} className="flex flex-col gap-2 items-center">
            <h2 className={`text-lg font-bold text-white text-center min-[560px]:text-xl ${mostrarCards ? "fade-up-pagina-inicial" : "opacity-0"}`}>
              Tudo o que você precisa em uma interface
            </h2>
            <p className={`max-w-[700px] text-center text-sm leading-6 text-[#C2C6D8] min-[560px]:text-[15px] min-[975px]:text-base min-[975px]:leading-7 min-[1490px]:leading-8 ${mostrarCards ? "fade-up-pagina-inicial delay-1" : "opacity-0"}`}>
              Organize sua rotina, converse com a IA e mantenha sua produtividade em um só lugar.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 min-[700px]:grid-cols-2 min-[1090px]:grid-cols-6">
              {dadosCardsInformativos.map((dadosCard, index) => ( 
                <div key={dadosCard.titulo} 
                  className={`
                  ${
                    index < 3
                      ? "min-[1090px]:col-span-2"
                      : "min-[1090px]:col-span-3"
                  }
                  ${
                    mostrarCards
                      ? `card-enter ${delays[index]}`
                      : "opacity-0"
                  }
                `}>
                    <CardInformativo 
                      key={dadosCard.titulo} 
                      icone={dadosCard.icone}
                      titulo={dadosCard.titulo}
                      descricao={dadosCard.descricao}
                    />
                </div>
              ))}
          </div>
        </section>

        <section className="bg-[#0A0A0C] flex flex-col items-center gap-10 px-20 py-28 min-[560px]:py-56 min-[1090px]:gap-16 min-[1490px]:px-30">
          <div ref={secaoFluxoRef} className="flex flex-col gap-2 items-center">
            <h2 className={`text-lg font-bold text-white text-center min-[560px]:text-xl ${mostrarFluxo ? "fade-up-pagina-inicial" : "opacity-0"}`}>
              Fluxo de Trabalho Nexa
            </h2>
            <p className={`max-w-[700px] text-center text-sm leading-6 text-[#C2C6D8] min-[560px]:text-[15px] min-[975px]:text-base min-[975px]:leading-7 min-[1490px]:leading-8 min-[1490px]:max-w-[900px] ${mostrarFluxo ? "fade-up-pagina-inicial delay-1" : "opacity-0"}`}>
              Veja como o Nexa AI interpreta suas solicitações e organiza sua rotina em poucos segundos.
            </p>
          </div>

          {/* Mobile */}
          <div className="relative flex w-full max-w-sm flex-col items-center gap-8 min-[1090px]:hidden">
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />

            {dadosEtapasFluxo.map((etapa, index) => (
              <EtapaFluxo
                key={etapa.titulo}
                icone={etapa.icone}
                titulo={etapa.titulo}
                cor={etapa.cor}
                mobile
                ativa={index === etapaAtiva}
              />
            ))}
          </div>

          {/* Desktop */}
          <div className="relative hidden w-full min-[1090px]:block">

          <div className={`workflow-line absolute left-0 right-0 top-6 h-px overflow-hidden bg-white/10 ${mostrarFluxo ? "workflow-line-enter" : "scale-x-0"}`}/>

              <div className="relative flex justify-between">
                {dadosEtapasFluxo.map((etapa, index) => (
                  <div className={`${mostrarFluxo ? `workflow-step-enter ${workflowDelays[index]}` : "opacity-0"}`}>
                    <EtapaFluxo
                      key={etapa.titulo}
                      icone={etapa.icone}
                      titulo={etapa.titulo}
                      cor={etapa.cor}
                      ativa={index === etapaAtiva}
                    />
                  </div>
                ))}
              </div>
          </div>

        </section>

        <section className="relative overflow-hidden bg-[#0A0A0C] flex flex-col items-center gap-10 px-10 py-28 min-[560px]:py-56 min-[1490px]:px-30">

          <div className={`absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#1A2A45] opacity-40 blur-[140px] ${mostrarCTA ? "cta-glow-enter" : "opacity-0"}`} />

          <div className={`absolute -bottom-48 -right-40 h-[420px] w-[420px] rounded-full bg-[#12B5FD] opacity-15 blur-[140px] ${mostrarCTA ? "cta-glow-enter delay-2" : "opacity-0"}`} />

          <div ref={secaoCTARef} className="relative z-10 flex flex-col gap-2 items-center">
            <h2 className={`text-lg font-bold text-white text-center min-[560px]:text-xl ${mostrarCTA ? "fade-up-pagina-inicial" : "opacity-0"}`}>
              Pronto para viver no <span className="text-[#12B5FD]">Futuro?</span>
            </h2>
            <p className={`max-w-[700px] text-center text-sm leading-6 text-[#C2C6D8] min-[560px]:text-[15px] min-[975px]:text-base min-[975px]:leading-7 min-[1490px]:leading-8 min-[1490px]:max-w-[900px] ${mostrarCTA ? "fade-up-pagina-inicial delay-1" : "opacity-0"}`}>
              Comece hoje a trabalhar com uma IA que entende sua rotina melhor que você.
            </p>
          </div>

          <button
            onClick={() => navigate("/auth/cadastro")}
            className={`relative z-10 ${mostrarCTA ? "cta-button" : "opacity-0"} cursor-pointer group flex w-full items-center justify-center rounded-[10px] bg-[#12B5FD] px-5 py-3 text-[14px] font-medium text-white transition-all duration-300 hover:bg-[#2BC2FF] hover:shadow-[0_0_10px_rgba(18,181,253,0.35)] min-[440px]:text-base min-[560px]:w-auto min-[975px]:px-6 min-[975px]:py-3.5 min-[975px]:text-[17px] min-[1490px]:px-7 min-[1490px]:py-4 min-[1490px]:text-lg`}>
            Criar conta gratuitamente
            <ChevronRight
              size={18}
              className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </section>
      </main>

      <footer className="bg-[#131315] border-t border-white/10">
        <div className="mx-auto flex flex-col gap-12 px-6 py-16 min-[900px]:flex-row min-[900px]:justify-between min-[900px]:gap-20 min-[1490px]:px-12">

          <div className="flex max-w-[340px] flex-col gap-4">
            <button onClick={scrollParaTopo} className="cursor-pointer">
              <img src={Logo} alt="Logo Nexa AI" className="w-28" />
            </button>

            <p className="text-sm leading-7 text-[#A9AFBF]">
              Elevando a produtividade humana através da inteligência artificial,
              transformando tarefas em resultados.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Recursos
            </h3>

            <a
              href="#"
              className="text-sm text-[#A9AFBF] transition-colors hover:text-[#12B5FD]"
            >
              Documentação
            </a>

            <a
              href="#"
              className="text-sm text-[#A9AFBF] transition-colors hover:text-[#12B5FD]"
            >
              GitHub
            </a>

            <a
              href="#"
              className="text-sm text-[#A9AFBF] transition-colors hover:text-[#12B5FD]"
            >
              LinkedIn
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Empresa
            </h3>

            <p
              className="cursor-pointer text-sm text-[#A9AFBF] transition-colors hover:text-[#12B5FD]"
            >
              Sobre
            </p>

            <p
              className="cursor-pointer text-sm text-[#A9AFBF] transition-colors hover:text-[#12B5FD]"
            >
              Contato
            </p>

            <p
              className="cursor-pointer text-sm text-[#A9AFBF] transition-colors hover:text-[#12B5FD]"
            >
              Política de Privacidade
            </p>
          </div>

        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-[#8A90A2] min-[700px]:flex-row min-[1490px]:px-12">
            <p className="text-center">© 2026 Nexa AI. Todos os direitos reservados.</p>

            <p>Desenvolvido por Felipe Sora</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaginaInicial;
