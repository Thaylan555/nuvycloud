import { Link } from "@tanstack/react-router";
import { ExternalLink, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Brand } from "./brand";
import { siteConfig } from "@/config/site";

const nav = [["Início", "/"], ["Hospedagem Minecraft", "/minecraft"], ["Bots", "/bots"], ["Infraestrutura", "/infraestrutura"], ["Status", "/status"], ["FAQ", "/faq"]] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md"><div className="site-container flex h-16 items-center justify-between">
    <Brand compact />
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">{nav.map(([label,to]) => <Link key={to} to={to} activeProps={{className:"nav-link-active"}} className="nav-link">{label}</Link>)}</nav>
    <div className="hidden items-center gap-2 md:flex">{siteConfig.clientAreaUrl && <Button variant="ghost" asChild><a href={siteConfig.clientAreaUrl}>Entrar</a></Button>}<Button asChild><Link to="/planos">Começar agora</Link></Button></div>
    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X/> : <Menu/>}</Button>
  </div>{open && <div className="border-t border-border bg-background px-5 py-4 lg:hidden"><nav className="grid gap-1">{nav.map(([label,to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground">{label}</Link>)}<div className="mt-3 grid grid-cols-2 gap-2">{siteConfig.clientAreaUrl && <Button variant="outline" asChild><a href={siteConfig.clientAreaUrl}>Entrar</a></Button>}<Button asChild><Link to="/planos">Ver planos</Link></Button></div></nav></div>}</header>;
}

export function Footer() {
  const groups = [
    ["Produtos", [["Bot Hosting","/bots"],["Minecraft Hosting","/minecraft"],["Planos","/planos"]]],
    ["Empresa", [["Sobre","/sobre"],["Infraestrutura","/infraestrutura"],["Status","/status"]]],
    ["Suporte", [["FAQ","/faq"],...(siteConfig.discordUrl ? [["Discord",siteConfig.discordUrl]] : []),...(siteConfig.clientAreaUrl ? [["Área do Cliente",siteConfig.clientAreaUrl]] : [])]],
    ["Legal", [["Termos","/termos"],["Privacidade","/privacidade"],["Reembolso","/reembolso"]]],
  ] as const;
  return <footer className="border-t border-border bg-surface-deep"><div className="site-container py-12"><div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]"><div><Brand/><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">Hospedagem brasileira simples para bots, servidores Minecraft e projetos em crescimento.</p></div>{groups.map(([title,links]) => <div key={title}><h2 className="text-xs font-bold uppercase tracking-[0.16em] text-foreground">{title}</h2><ul className="mt-4 space-y-3">{links.map(([label,to]) => <li key={label}>{to.startsWith("http") ? <a className="footer-link" href={to} rel="noreferrer">{label} <ExternalLink className="inline size-3"/></a> : <Link className="footer-link" to={to}>{label}</Link>}</li>)}</ul></div>)}</div><div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">© 2026 NuvyCloud • Rede Lua. Todos os direitos reservados.</div></div></footer>;
}

export function SiteLayout({ children }: { children: ReactNode }) { return <><Navbar/><main>{children}</main><Footer/></>; }
