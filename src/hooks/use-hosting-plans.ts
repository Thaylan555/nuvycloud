import { queryOptions, useQuery } from "@tanstack/react-query";
import { hostingPlans } from "@/config/plans";
import { siteConfig } from "@/config/site";
import { getSupabaseClient } from "@/integrations/supabase/client";
import type { HostingPlan, HostingPlatform, ProductsResult } from "@/types/hosting";

type ProductRow = {
  category?: string;
  name?: string;
  short_description?: string | null;
  active?: boolean;
};

type PlanRow = {
  id: string | number;
  slug?: string | null;
  name?: string | null;
  tagline?: string | null;
  monthly_price_cents?: number | null;
  ram_mb?: number | null;
  disk_mb?: number | null;
  cpu_percent?: number | null;
  backups?: number | null;
  databases?: number | null;
  allocations?: number | null;
  featured?: boolean | null;
  active?: boolean | null;
  available?: boolean | null;
  badge?: string | null;
  checkout_url?: string | null;
  product?: ProductRow | ProductRow[] | null;
};

function bytesLabel(mb?: number | null) {
  if (!mb) return "—";
  if (mb >= 1024 && mb % 1024 === 0) return `${mb / 1024} GB`;
  if (mb >= 1024) return `${(mb / 1024).toFixed(1).replace(".0", "")} GB`;
  return `${mb} MB`;
}

function productOf(row: PlanRow): ProductRow | undefined {
  return Array.isArray(row.product) ? row.product[0] : row.product || undefined;
}

function platformFrom(category?: string): HostingPlatform {
  if (category === "bot_nodejs") return "nodejs";
  if (category === "minecraft_java") return "java";
  if (category === "minecraft_bedrock") return "bedrock";
  return "other";
}

function planFromRow(row: PlanRow): HostingPlan | null {
  const product = productOf(row);
  const platform = platformFrom(product?.category);
  const category = platform === "nodejs" ? "bot" : platform === "java" || platform === "bedrock" ? "minecraft" : null;
  if (!category) return null;

  const backups = row.backups ?? 0;
  const databases = row.databases ?? 0;
  const allocations = row.allocations ?? 0;
  const features = [
    category === "bot" ? "Console e arquivos" : "Painel, console e arquivos",
    backups > 0 ? `${backups} ${backups === 1 ? "backup" : "backups"}` : "Backups sob configuração",
    databases > 0 ? `${databases} ${databases === 1 ? "banco de dados" : "bancos de dados"}` : null,
    allocations > 1 ? `${allocations} alocações` : null,
    platform === "java" ? "Minecraft Java" : platform === "bedrock" ? "Minecraft Bedrock" : "Node.js",
  ].filter(Boolean) as string[];

  return {
    id: String(row.id),
    slug: row.slug || undefined,
    name: row.name || "Plano",
    category,
    platform,
    productLabel: product?.name,
    description: row.tagline || product?.short_description || "Hospedagem gerenciada pela NuvyCloud.",
    price: (row.monthly_price_cents ?? 0) / 100,
    currency: "BRL",
    interval: "month",
    ram: bytesLabel(row.ram_mb),
    ramMb: row.ram_mb ?? undefined,
    cpu: row.cpu_percent ? `${row.cpu_percent}%` : "—",
    cpuPercent: row.cpu_percent ?? undefined,
    storage: bytesLabel(row.disk_mb),
    storageMb: row.disk_mb ?? undefined,
    features,
    featured: Boolean(row.featured),
    badge: row.badge || undefined,
    available: row.active !== false && row.available !== false && product?.active !== false,
    checkoutUrl: row.checkout_url || siteConfig.clientAreaUrl || null,
  };
}

async function fetchHostingProducts(): Promise<ProductsResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { plans: hostingPlans, source: "fallback", message: "Configure as variáveis VITE_SUPABASE_* para carregar o catálogo online." };
  }

  const { data, error } = await supabase
    .from("solarhost_plans")
    .select("id,slug,name,tagline,monthly_price_cents,ram_mb,disk_mb,cpu_percent,backups,databases,allocations,featured,active,available,badge,checkout_url,sort_order,product:solarhost_products!inner(category,name,short_description,active,sort_order)")
    .eq("active", true)
    .eq("product.active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  const plans = ((data || []) as PlanRow[]).map(planFromRow).filter((plan): plan is HostingPlan => Boolean(plan));
  if (!plans.length) throw new Error("Catálogo público vazio");
  return { plans, source: "supabase" };
}

export function useHostingPlans() {
  return useQuery(queryOptions({
    queryKey: ["hosting-products", "supabase"],
    queryFn: fetchHostingProducts,
    staleTime: 180_000,
    retry: 1,
  }));
}
