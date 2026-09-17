import { createFileRoute } from "@tanstack/react-router";
import { Activity, Cable, Cpu, Database, HardDrive, Server } from "lucide-react";
import { PageIntro } from "@/components/site/page";
import { CTASection, Infrastructure, SectionHeading } from "@/components/site/shared";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/infraestrutura")({
  head: () => seo("Infraestrutura — NuvyCloud", "Veja como a NuvyCloud organiza a base para bots Discord, Minecraft, painel e billing sem promessas artificiais.", "/infraestrutura"),
  component: InfrastructurePage,
});

const layers = [
  [Server, "Nós de hospedagem", "Ambientes preparados para separar bots, servidores Minecraft e serviços do painel."],
  [Cpu, "Recursos por plano", "CPU, memória e armazenamento são apresentados de forma clara antes da contratação."],
  [HardDrive, "Arquivos e console", "Acesso aos arquivos e console pelo painel do serviço, conforme o plano contratado."],
  [Database, "Billing externo", "Pedidos, pagamentos e acesso do cliente ficam no sistema de billing conectado."],
  [Cable, "Integrações seguras", "Tokens administrativos ficam somente no backend e nunca são enviados ao navegador."],
  [Activity, "Status preparado", "A página de status já existe para receber monitoramento real quando ele for conectado."],
] as const;

function InfrastructurePage() {
  return <><PageIntro eyebrow="Infraestrutura" title="Uma base simples, clara e pronta para evoluir." description="A NuvyCloud está começando com foco em estabilidade operacional, custos acessíveis e crescimento gradual."/><section className="section pt-0"><div className="site-container"><SectionHeading eyebrow="Camadas" title="O que já fica organizado desde o início" description="Nada de prometer uma estrutura maior do que a realidade. A proposta é começar bem e expandir com responsabilidade."/><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{layers.map(([Icon,title,text]) => <article key={title} className="metric-card"><Icon className="size-5 shrink-0 text-primary"/><div><h2 className="font-display text-lg font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div></article>)}</div></div></section><Infrastructure/><CTASection/></>;
}
