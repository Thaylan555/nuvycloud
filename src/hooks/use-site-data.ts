import { queryOptions, useQuery } from "@tanstack/react-query";
import { getSupabaseClient } from "@/integrations/supabase/client";
import type { ChangelogItem, ServiceStatus, StatusService } from "@/types/hosting";

const fallbackStatus: StatusService[] = [
  { serviceKey: "bots", name: "Bots", description: "Hospedagem de bots e aplicações", status: "unknown" },
  { serviceKey: "minecraft", name: "Minecraft", description: "Hospedagem de servidores Minecraft", status: "unknown" },
  { serviceKey: "panel", name: "Painel", description: "Área do cliente e gerenciamento", status: "unknown" },
  { serviceKey: "billing", name: "Billing / API", description: "Contratação e faturamento", status: "unknown" },
];

async function fetchStatus(): Promise<StatusService[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackStatus;
  const { data, error } = await supabase
    .from("solarhost_status_services")
    .select("service_key,name,description,status,latency_ms,last_checked_at,sort_order")
    .eq("public", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data || []).map((row) => ({
    serviceKey: String(row.service_key),
    name: String(row.name),
    description: row.description as string | null,
    status: row.status as ServiceStatus,
    latencyMs: row.latency_ms as number | null,
    lastCheckedAt: row.last_checked_at as string | null,
  }));
}

async function fetchChangelog(): Promise<ChangelogItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("solarhost_changelog")
    .select("id,title,summary,category,published_at")
    .eq("active", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(6);
  if (error) throw error;
  return (data || []).map((row) => ({
    id: String(row.id),
    title: String(row.title),
    summary: String(row.summary),
    category: String(row.category),
    publishedAt: String(row.published_at),
  }));
}

export function useSiteStatus() {
  return useQuery(queryOptions({ queryKey: ["site-status"], queryFn: fetchStatus, staleTime: 60_000, retry: 1 }));
}

export function useChangelog() {
  return useQuery(queryOptions({ queryKey: ["site-changelog"], queryFn: fetchChangelog, staleTime: 300_000, retry: 1 }));
}
