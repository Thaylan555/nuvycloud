import { Check, Cpu, HardDrive, MemoryStick, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useHostingPlans } from "@/hooks/use-hosting-plans";
import type { HostingCategory, HostingPlan } from "@/types/hosting";
import { SectionHeading } from "./shared";

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const platformLabel: Record<HostingPlan["platform"], string> = { nodejs: "Bot Node.js", java: "Minecraft Java", bedrock: "Minecraft Bedrock", other: "Hospedagem" };

export function ProductSkeleton(){return <div className="plan-card space-y-4"><Skeleton className="h-5 w-24"/><Skeleton className="h-10 w-36"/><Skeleton className="h-20 w-full"/><Skeleton className="h-10 w-full"/></div>}
export function ErrorFallback(){return <div className="rounded-lg border border-border bg-surface p-5 text-sm text-muted-foreground"><WifiOff className="mb-3 size-5 text-brand-yellow"/>Não foi possível atualizar o catálogo agora. Os planos locais continuam disponíveis para consulta.</div>}

export function HostingPlanCard({ plan }: { plan: HostingPlan }) {
  return <article className={cn("plan-card",plan.featured&&"plan-card-featured")}>
    {plan.badge&&<span className="plan-badge">{plan.badge}</span>}
    <div className="pt-2"><p className="text-xs font-bold uppercase tracking-[.16em] text-muted-foreground">{platformLabel[plan.platform]}</p><h3 className="mt-3 font-display text-2xl font-extrabold">{plan.name}</h3><p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{plan.description}</p></div>
    <div className="mt-6"><span className="font-display text-4xl font-extrabold">{money.format(plan.price)}</span><span className="text-sm text-muted-foreground">/mês</span></div>
    <div className="mt-6 grid grid-cols-3 gap-2"><Metric icon={MemoryStick} value={plan.ram} label="RAM"/><Metric icon={Cpu} value={plan.cpu} label="CPU"/><Metric icon={HardDrive} value={plan.storage} label="Storage"/></div>
    <ul className="mt-6 space-y-3">{plan.features.map(feature=><li key={feature} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-brand-green"/>{feature}</li>)}</ul>
    <div className="mt-auto pt-7">{plan.available && plan.checkoutUrl ? <Button className="w-full" variant={plan.featured?"default":"outline"} asChild><a href={plan.checkoutUrl}>Contratar {plan.name}</a></Button> : <Button className="w-full" variant="outline" disabled>{plan.available ? "Contratação em breve" : "Temporariamente indisponível"}</Button>}</div>
  </article>;
}
function Metric({icon:Icon,value,label}:{icon:typeof Cpu;value:string;label:string}){return <div className="rounded-md border border-border bg-background/50 p-2"><Icon className="size-3.5 text-primary"/><strong className="mt-2 block text-xs">{value}</strong><span className="text-[10px] text-muted-foreground">{label}</span></div>}

export function PlansGrid({ category, compact=false, platform }: { category?:HostingCategory; compact?:boolean; platform?: HostingPlan["platform"] }) {
  const query=useHostingPlans();
  if(query.isLoading)return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><ProductSkeleton/><ProductSkeleton/><ProductSkeleton/></div>;
  const plans=(query.data?.plans||[]).filter(p=>(!category||p.category===category)&&(!platform||p.platform===platform));
  if(query.isError)return <ErrorFallback/>;
  if(!plans.length)return <div className="rounded-lg border border-border p-8 text-center text-muted-foreground">Nenhum plano disponível nesta categoria.</div>;
  return <><div className={cn("grid gap-4",plans.length===2?"mx-auto max-w-4xl md:grid-cols-2":"md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}>{plans.map(p=><HostingPlanCard key={p.id} plan={p}/>)}</div>{query.data?.source==="fallback"&&<p className="mt-4 text-center text-xs text-muted-foreground">{compact?"Catálogo de contingência exibido.":query.data.message || "Catálogo local exibido enquanto o Supabase não responde."}</p>}</>;
}

export function PlansSection({category}:{category:HostingCategory}){const bot=category==="bot";return <section className="section"><div className="site-container"><SectionHeading eyebrow={bot?"Bot Hosting":"Minecraft Hosting"} title={bot?"Seu bot online sem complicação.":"Seu mundo online sem pagar uma fortuna."} description={bot?"Planos acessíveis para bots Discord e aplicações Node.js.":"Escolha uma base para começar. O desempenho varia conforme versão, plugins, mods, mapas e otimização."}/><div className="mt-10"><PlansGrid category={category}/></div></div></section>}

const rowNames={ram:"RAM",cpu:"CPU",storage:"Armazenamento"} as const;
export function PlanComparison({category}:{category:HostingCategory}){
  const query=useHostingPlans();
  const plans=(query.data?.plans||[]).filter(p=>p.category===category);
  const rows=["ram","cpu","storage"] as const;
  if(!plans.length)return null;
  return <section className="section border-y border-border bg-surface-deep"><div className="site-container"><SectionHeading eyebrow="Compare" title={category==="bot"?"Planos para cada fase do seu bot":"Compare recursos sem tabela apertada no celular"}/>
    <div className="mt-8 grid gap-3 md:hidden">{plans.map(plan=><article className="rounded-lg border border-border bg-surface p-4" key={plan.id}><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">{platformLabel[plan.platform]}</p><h3 className="mt-1 font-display text-lg font-bold">{plan.name}</h3></div><strong className="text-sm">{money.format(plan.price)}/mês</strong></div><dl className="mt-4 grid grid-cols-3 gap-2">{rows.map(row=><div className="rounded-md border border-border p-3" key={row}><dt className="text-[10px] uppercase text-muted-foreground">{rowNames[row]}</dt><dd className="mt-1 text-sm font-bold">{plan[row]}</dd></div>)}</dl></article>)}</div>
    <div className="mt-8 hidden overflow-x-auto rounded-lg border border-border md:block"><table className="w-full min-w-[620px] border-collapse text-sm"><thead><tr className="bg-surface"><th className="p-4 text-left text-muted-foreground">Recursos</th>{plans.map(p=><th key={p.id} className="p-4 text-left font-display text-base">{p.name}</th>)}</tr></thead><tbody>{rows.map(row=><tr key={row} className="border-t border-border"><td className="p-4 uppercase text-xs font-bold text-muted-foreground">{rowNames[row]}</td>{plans.map(p=><td key={p.id} className="p-4">{p[row]}</td>)}</tr>)}{["Console","Arquivos","Reinicialização automática","Painel"].map(item=><tr key={item} className="border-t border-border"><td className="p-4 text-muted-foreground">{item}</td>{plans.map(p=><td key={p.id} className="p-4"><Check className="size-4 text-brand-green"/><span className="sr-only">Incluído</span></td>)}</tr>)}</tbody></table></div>
  </div></section>;
}
