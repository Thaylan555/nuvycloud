import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page";
import { PlanComparison, PlansGrid } from "@/components/site/plans";
import { PlanFinder } from "@/components/site/plan-finder";
import { CTASection, SectionHeading } from "@/components/site/shared";
import { seo } from "@/lib/seo";
export const Route=createFileRoute("/planos")({head:()=>seo("Planos de Hospedagem — NuvyCloud","Compare planos para bots Discord e servidores Minecraft da NuvyCloud.","/planos"),component:Plans});
function Plans(){return <><PageIntro eyebrow="Planos simples" title="Escolha o tamanho certo para começar." description="O catálogo é carregado do Supabase e pode ser atualizado sem reconstruir o site."/><PlanFinder/><section className="section"><div className="site-container"><SectionHeading eyebrow="Bots Discord" title="Planos para aplicações"/><div className="mt-8"><PlansGrid category="bot" compact/></div><div className="mt-20"><SectionHeading eyebrow="Minecraft Java" title="Para plugins, Paper e projetos Java"/></div><div className="mt-8"><PlansGrid category="minecraft" platform="java" compact/></div><div className="mt-20"><SectionHeading eyebrow="Minecraft Bedrock" title="Para celular, console e Bedrock"/></div><div className="mt-8"><PlansGrid category="minecraft" platform="bedrock" compact/></div></div></section><PlanComparison category="bot"/><PlanComparison category="minecraft"/><CTASection/></>}
