import { createFileRoute } from "@tanstack/react-router";
import { Compass, Handshake, Layers3, TrendingUp } from "lucide-react";
import { PageIntro } from "@/components/site/page";
import { CTASection, Infrastructure } from "@/components/site/shared";
import { seo } from "@/lib/seo";
export const Route=createFileRoute("/sobre")({head:()=>seo("Sobre a NuvyCloud — Rede Lua","Conheça a proposta da NuvyCloud: hospedagem brasileira simples, acessível e preparada para crescer.","/sobre"),component:About});
const values=[[Compass,"Clareza","Planos objetivos e comunicação sem promessas artificiais."],[Handshake,"Proximidade","Suporte humano para as questões que realmente importam."],[Layers3,"Simplicidade","Painel e contratação pensados para não complicar."],[TrendingUp,"Crescimento","Uma base que acompanha a evolução de cada projeto."]] as const;
function About(){return <><PageIntro eyebrow="NuvyCloud • Rede Lua" title="Nova por escolha. Organizada desde o começo." description="Somos uma hosting brasileira em fase inicial, focada em tornar a hospedagem de bots e Minecraft mais simples e acessível."/><section className="section pt-0"><div className="site-container grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">{values.map(([Icon,t,d])=><article key={t} className="bg-surface p-7"><Icon className="size-6 text-primary"/><h2 className="mt-5 font-display text-xl font-bold">{t}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p></article>)}</div></section><Infrastructure/><CTASection/></>}
