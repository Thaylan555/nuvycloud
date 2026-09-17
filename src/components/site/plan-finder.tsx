import { useMemo, useState } from "react";
import { Bot, Gamepad2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHostingPlans } from "@/hooks/use-hosting-plans";
import type { HostingCategory, HostingPlan } from "@/types/hosting";
import { HostingPlanCard } from "./plans";
import { SectionHeading } from "./shared";

const levels = [
  { key: "leve", label: "Leve", helper: "Projeto pequeno ou começando" },
  { key: "medio", label: "Médio", helper: "Mais módulos, plugins ou uso" },
  { key: "forte", label: "Mais pesado", helper: "Projeto em crescimento" },
] as const;
type Level = typeof levels[number]["key"];

const minimumRam: Record<HostingCategory, Record<Level, number>> = {
  bot: { leve: 512, medio: 1024, forte: 2048 },
  minecraft: { leve: 2048, medio: 4096, forte: 8192 },
};

export function PlanFinder() {
  const [category, setCategory] = useState<HostingCategory>("minecraft");
  const [level, setLevel] = useState<Level>("leve");
  const query = useHostingPlans();

  const recommended = useMemo(() => {
    const candidates = (query.data?.plans || [])
      .filter((plan) => plan.category === category && (plan.ramMb || 0) >= minimumRam[category][level])
      .sort((a, b) => (a.ramMb || 0) - (b.ramMb || 0) || a.price - b.price);
    return candidates[0] || null;
  }, [category, level, query.data?.plans]);

  return <section className="section border-y border-border bg-surface-deep"><div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHeading eyebrow="Ajuda para escolher" title="Encontre uma base sem decorar especificações" description="Responda duas coisas e veja um plano compatível como ponto de partida. A recomendação é uma estimativa, não uma garantia de desempenho."/>
    <div className="mt-7 space-y-6"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">O que você quer hospedar?</p><div className="grid grid-cols-2 gap-2"><Button variant={category==="bot"?"default":"outline"} onClick={()=>setCategory("bot")}><Bot/> Bot</Button><Button variant={category==="minecraft"?"default":"outline"} onClick={()=>setCategory("minecraft")}><Gamepad2/> Minecraft</Button></div></div>
    <div><p className="mb-2 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Tamanho aproximado</p><div className="grid gap-2">{levels.map(item=><button type="button" key={item.key} onClick={()=>setLevel(item.key)} className={`rounded-lg border p-3 text-left transition ${level===item.key?"border-primary bg-primary/10":"border-border bg-surface hover:border-primary/40"}`}><strong className="text-sm">{item.label}</strong><span className="mt-1 block text-xs text-muted-foreground">{item.helper}</span></button>)}</div></div></div>
  </div><div>{query.isLoading?<div className="flex min-h-80 items-center justify-center rounded-lg border border-border bg-surface text-sm text-muted-foreground">Consultando catálogo…</div>:recommended?<><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"><Sparkles className="size-3.5"/> Sugestão inicial</div><HostingPlanCard plan={recommended}/></>:<div className="flex min-h-80 items-center justify-center rounded-lg border border-border bg-surface p-8 text-center text-sm text-muted-foreground">Nenhum plano compatível foi encontrado agora. Veja todos os planos ou tente outra opção.</div>}</div></div></section>;
}

export function MinecraftEstimator() {
  const query = useHostingPlans();
  const [edition, setEdition] = useState<"java"|"bedrock">("java");
  const [profile, setProfile] = useState<"vanilla"|"plugins"|"modpack">("plugins");
  const [size, setSize] = useState<"small"|"medium"|"large">("small");

  const targetRam = useMemo(() => {
    const base = edition === "bedrock" ? { vanilla: 1024, plugins: 2048, modpack: 4096 } : { vanilla: 2048, plugins: 4096, modpack: 6144 };
    const extra = size === "small" ? 0 : size === "medium" ? 2048 : 4096;
    return base[profile] + extra;
  }, [edition, profile, size]);

  const recommended = useMemo(() => (query.data?.plans || [])
    .filter((plan) => plan.platform === edition && (plan.ramMb || 0) >= targetRam)
    .sort((a,b)=>(a.ramMb||0)-(b.ramMb||0))[0] || null, [query.data?.plans, edition, targetRam]);

  return <section className="section"><div className="site-container"><SectionHeading eyebrow="Estimador Minecraft" title="Monte um ponto de partida para o seu servidor" description="Escolha edição e perfil de uso. Plugins, mods, geração de mundo e otimização podem mudar bastante o consumo real."/>
    <div className="mt-8 grid gap-6 rounded-xl border border-border bg-surface p-5 lg:grid-cols-[1fr_.8fr] lg:p-7"><div className="grid gap-5 sm:grid-cols-3"><Choice title="Edição" options={[["java","Java"],["bedrock","Bedrock"]]} value={edition} setValue={(v)=>setEdition(v as typeof edition)}/><Choice title="Perfil" options={[["vanilla","Vanilla/leve"],["plugins","Plugins/add-ons"],["modpack","Modpack/mais pesado"]]} value={profile} setValue={(v)=>setProfile(v as typeof profile)}/><Choice title="Escala" options={[["small","Pequena"],["medium","Média"],["large","Maior"]]} value={size} setValue={(v)=>setSize(v as typeof size)}/></div>
    <div className="rounded-lg border border-border bg-background/40 p-5"><p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Estimativa inicial</p><p className="mt-2 font-display text-3xl font-extrabold">{Math.ceil(targetRam/1024)} GB RAM</p>{recommended?<><p className="mt-3 text-sm text-muted-foreground">Primeiro plano do catálogo que atende essa faixa:</p><p className="mt-1 font-display text-lg font-bold text-primary">{recommended.name} · {recommended.ram}</p></>:<p className="mt-3 text-sm text-muted-foreground">Não há um plano dessa faixa disponível no catálogo atual.</p>}<p className="mt-4 text-xs leading-5 text-muted-foreground">Use isto apenas como referência inicial. Não é promessa de quantidade de jogadores nem de desempenho.</p></div></div>
  </div></section>;
}

function Choice({title,options,value,setValue}:{title:string;options:readonly (readonly [string,string])[];value:string;setValue:(value:string)=>void}){return <div><p className="mb-2 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">{title}</p><div className="grid gap-2">{options.map(([key,label])=><button key={key} type="button" onClick={()=>setValue(key)} className={`rounded-md border px-3 py-2 text-left text-sm transition ${value===key?"border-primary bg-primary/10 text-foreground":"border-border text-muted-foreground hover:border-primary/40"}`}>{label}</button>)}</div></div>}
