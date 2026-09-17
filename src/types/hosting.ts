export type HostingCategory = "bot" | "minecraft";
export type HostingPlatform = "nodejs" | "java" | "bedrock" | "other";

export interface HostingPlan {
  id: string;
  slug?: string | undefined;
  name: string;
  category: HostingCategory;
  platform: HostingPlatform;
  productLabel?: string | undefined;
  description: string;
  price: number;
  currency: "BRL";
  interval: "month";
  ram: string;
  ramMb?: number | undefined;
  cpu: string;
  cpuPercent?: number | undefined;
  storage: string;
  storageMb?: number | undefined;
  features: string[];
  featured: boolean;
  badge?: string | undefined;
  available: boolean;
  checkoutUrl?: string | null | undefined;
}

export interface ProductsResult {
  plans: HostingPlan[];
  source: "supabase" | "fallback";
  message?: string;
}

export type ServiceStatus = "operational" | "degraded" | "maintenance" | "offline" | "unknown";

export interface StatusService {
  serviceKey: string;
  name: string;
  description?: string | null;
  status: ServiceStatus;
  latencyMs?: number | null;
  lastCheckedAt?: string | null;
}

export interface ChangelogItem {
  id: string;
  title: string;
  summary: string;
  category: "produto" | "infraestrutura" | "painel" | "manutencao" | string;
  publishedAt: string;
}
