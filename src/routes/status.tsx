import { createFileRoute } from "@tanstack/react-router";
import { Bot, CreditCard, Gamepad2, LayoutDashboard } from "lucide-react";
import { PageIntro } from "@/components/site/page";
import { useSiteStatus } from "@/hooks/use-site-data";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";
import type { ServiceStatus } from "@/types/hosting";

export const Route=createFileRoute("/status")({head:()=>seo("Status dos Serviços — NuvyCloud","Consulte a situação informada dos serviços da NuvyCloud.","/status"),component:Status});
const icons={bots:Bot,minecraft:Gamepad2,panel:LayoutDashboard,billing:CreditCard} as const;
const statusText:Record<ServiceStatus,string>={operational:"Operacional",degraded:"Instabilidade",maintenance:"Manutenção",offline:"Indisponível",unknown:"Não monitorado"};
const date=new Intl.DateTimeFormat("pt-BR",{dateStyle:"short",timeStyle:"short"});

function Status(){
  const query=useSiteStatus();
  const services=query.data||[];
  return <><PageIntro eyebrow="Status" title="Situação dos serviços" description="Os estados abaixo vêm do Supabase. Quando não houver verificação automática, o serviço aparece claramente como não monitorado."/><section className="section pt-0"><div className="site-container"><div className="mb-5 rounded-lg border border-brand-yellow/30 bg-brand-yellow/5 p-4 text-sm text-muted-foreground">Este painel não inventa uptime nem latência: um serviço só aparece como operacional quando o status é registrado no monitoramento.</div>{query.isError&&<div className="mb-4 rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">Não foi possível atualizar o status agora.</div>}<div className="grid gap-3 sm:grid-cols-2">{services.map(service=>{const Icon=icons[service.serviceKey as keyof typeof icons]||LayoutDashboard;return <article key={service.serviceKey} className="status-service"><div className="flex items-start gap-3"><Icon className="mt-0.5 size-5 text-primary"/><div><strong>{service.name}</strong>{service.description&&<p className="mt-1 text-xs text-muted-foreground">{service.description}</p>}{service.lastCheckedAt&&<p className="mt-2 text-[10px] text-muted-foreground">Última verificação: {date.format(new Date(service.lastCheckedAt))}</p>}</div></div><span className="inline-flex shrink-0 items-center gap-2 text-xs font-bold text-muted-foreground"><i className={cn("size-2 rounded-full bg-muted-foreground",service.status==="operational"&&"bg-brand-green",service.status==="degraded"&&"bg-brand-yellow",service.status==="offline"&&"bg-destructive")}/>{statusText[service.status]}{service.latencyMs!=null&&` · ${service.latencyMs} ms`}</span></article>})}</div></div></section></>;
}
