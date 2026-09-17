import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Benefits, CTASection, Hero, Infrastructure, SectionHeading } from "@/components/site/shared";
import { FAQBlock } from "@/components/site/faq";
import { PlansSection } from "@/components/site/plans";
import { PlanFinder } from "@/components/site/plan-finder";
import { SiteUpdates } from "@/components/site/site-updates";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
export const Route=createFileRoute("/")({head:()=>seo("NuvyCloud — Hospedagem para Minecraft e Bots","Hospedagem acessível para servidores Minecraft e bots Discord. Comece pequeno e aumente seus recursos conforme seu projeto cresce.","/"),component:Home});
function Home(){return <><Hero/><Benefits/><PlansSection category="bot"/><PlanFinder/><section className="section border-y border-border bg-surface-deep"><div className="site-container grid items-center gap-10 lg:grid-cols-2"><div className="minecraft-scene"><div className="pixel-moon"/><div className="server-stack"><span/><span/><span/></div></div><div><SectionHeading eyebrow="Minecraft Hosting" title="Java ou Bedrock, seu mundo continua sendo seu." description="Comece com o necessário e aumente os recursos quando versão, plugins, mods ou comunidade pedirem."/><Button className="mt-7" asChild><Link to="/minecraft">Conhecer planos <ArrowRight/></Link></Button></div></div></section><Infrastructure/><SiteUpdates/><FAQBlock limit={5}/><CTASection/></>}
