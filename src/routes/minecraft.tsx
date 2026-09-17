import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page";
import { PlanComparison, PlansGrid } from "@/components/site/plans";
import { MinecraftEstimator } from "@/components/site/plan-finder";
import { CTASection, Infrastructure, SectionHeading } from "@/components/site/shared";
import { seo } from "@/lib/seo";
export const Route=createFileRoute("/minecraft")({head:()=>seo("Minecraft Hosting — NuvyCloud","Hospedagem Minecraft Java e Bedrock com painel, console, arquivos e espaço para crescer.","/minecraft"),component:Minecraft});
function Minecraft(){return <><PageIntro eyebrow="Minecraft Hosting" title="Seu mundo online sem pagar uma fortuna." description="Java e Bedrock no mesmo catálogo. O desempenho depende da versão, plugins, mods, mapas e otimização."/><MinecraftEstimator/><section className="section border-y border-border bg-surface-deep"><div className="site-container"><SectionHeading eyebrow="Minecraft Java" title="Paper, Purpur, Spigot, Vanilla e mais"/><div className="mt-8"><PlansGrid category="minecraft" platform="java"/></div><div className="mt-16"><SectionHeading eyebrow="Minecraft Bedrock" title="Planos para jogar também no ecossistema Bedrock"/></div><div className="mt-8"><PlansGrid category="minecraft" platform="bedrock"/></div></div></section><PlanComparison category="minecraft"/><Infrastructure/><CTASection/></>}
