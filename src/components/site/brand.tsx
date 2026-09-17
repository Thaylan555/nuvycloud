import { Link } from "@tanstack/react-router";
import logo from "@/assets/nuvycloud-logo.png";

export function Brand({ compact = false }: { compact?: boolean }) {
  return <Link to="/" className="inline-flex items-center gap-2.5" aria-label="NuvyCloud — início">
    <img src={logo} alt="" className={compact ? "h-9 w-9 object-contain" : "h-11 w-11 object-contain"} />
    <span className="leading-none"><strong className="block font-display text-base uppercase text-foreground">NuvyCloud</strong><small className="mt-1 block text-[9px] font-bold uppercase tracking-[0.22em] text-brand-yellow">Rede Lua</small></span>
  </Link>;
}
