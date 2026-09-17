import { Clock3, RadioTower } from "lucide-react";
import { useChangelog } from "@/hooks/use-site-data";
import { SectionHeading } from "./shared";

const date = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

export function SiteUpdates() {
  const query = useChangelog();
  if (query.isLoading || query.isError || !query.data?.length) return null;
  return <section className="section"><div className="site-container"><SectionHeading eyebrow="NuvyCloud agora" title="Mudanças que você consegue acompanhar" description="Novidades públicas do site, painel e infraestrutura — direto do Supabase."/>
    <div className="mt-8 grid gap-3 lg:grid-cols-3">{query.data.slice(0,3).map(item=><article key={item.id} className="rounded-lg border border-border bg-surface p-5"><div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-primary"><RadioTower className="size-3.5"/>{item.category}</span><span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground"><Clock3 className="size-3"/>{date.format(new Date(item.publishedAt))}</span></div><h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.summary}</p></article>)}</div>
  </div></section>;
}
