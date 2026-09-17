import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page";
import { PlanComparison, PlansGrid } from "@/components/site/plans";
import { Benefits, CTASection } from "@/components/site/shared";
import { seo } from "@/lib/seo";
export const Route=createFileRoute("/bots")({head:()=>seo("Hospedagem de Bots Discord — NuvyCloud","Planos simples para manter seu bot Discord online, com console, arquivos e upgrade fácil.","/bots"),component:Bots});
function Bots(){return <><PageIntro eyebrow="Bot Hosting" title="Seu bot online sem complicação." description="Hospedagem acessível para bots Discord em Node.js e outras aplicações compatíveis."/><section className="section pt-0"><div className="site-container"><PlansGrid category="bot"/></div></section><PlanComparison category="bot"/><Benefits/><CTASection/></>}
