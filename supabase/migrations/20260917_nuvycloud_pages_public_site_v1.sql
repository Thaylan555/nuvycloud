-- Esta migração já foi aplicada ao projeto Supabase conectado.
alter table public.solarhost_plans
  add column if not exists checkout_url text,
  add column if not exists badge text,
  add column if not exists available boolean not null default true;

update public.solarhost_plans pl
set badge = case
  when pl.featured and p.category = 'bot_nodejs' then 'Mais escolhido'
  when pl.featured and p.category in ('minecraft_java', 'minecraft_bedrock') then 'Melhor custo-benefício'
  else pl.badge
end
from public.solarhost_products p
where p.id = pl.product_id and pl.badge is null;

create table if not exists public.solarhost_status_services (
  service_key text primary key,
  name text not null,
  description text,
  status text not null default 'unknown' check (status in ('operational','degraded','maintenance','offline','unknown')),
  latency_ms integer check (latency_ms is null or latency_ms >= 0),
  last_checked_at timestamptz,
  sort_order integer not null default 0,
  public boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.solarhost_changelog (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  category text not null default 'produto' check (category in ('produto','infraestrutura','painel','manutencao')),
  published_at timestamptz not null default now(),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
