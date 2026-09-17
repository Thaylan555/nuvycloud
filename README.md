# NuvyCloud • Rede Lua — Cloudflare Pages + Supabase

Frontend preservado e migrado da estrutura Lovable/TanStack Start para uma SPA estática com Vite + React + TanStack Router, pronta para Cloudflare Pages.

## Arquitetura

- Frontend: React 19 + Vite + TanStack Router + Tailwind CSS
- Hospedagem: Cloudflare Pages
- Dados públicos: Supabase
- Catálogo: `solarhost_products` + `solarhost_plans`
- Status: `solarhost_status_services`
- Novidades: `solarhost_changelog`
- Fallback: catálogo local em `src/config/plans.ts`

Não existe segredo de backend no bundle. Nunca coloque `service_role`, token administrativo do Paymenter ou credenciais privadas em variáveis `VITE_*`.

## Desenvolvimento local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha em `.env.local`:

```env
VITE_SUPABASE_URL=https://wpoftenqaeoliifrjsdr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=SEU_PUBLISHABLE_KEY
VITE_SITE_URL=http://localhost:5173
VITE_CLIENT_AREA_URL=
VITE_DISCORD_URL=
```

## Cloudflare Pages

Use estas configurações:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node.js: uma versão atual compatível com Vite 8

No Pages, configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`. `VITE_SITE_URL`, `VITE_CLIENT_AREA_URL` e `VITE_DISCORD_URL` são opcionais.

O arquivo `public/_redirects` contém o fallback SPA para que `/minecraft`, `/bots`, `/status` e outras rotas abram diretamente no Cloudflare Pages.

## Supabase

O projeto está configurado para o ref `wpoftenqaeoliifrjsdr`. As migrações em `supabase/migrations/20260917_nuvycloud_*.sql` documentam as extensões e ajustes usados pelo site público. Elas já foram aplicadas ao projeto conectado durante esta migração.

Os planos são lidos diretamente do banco respeitando RLS. Para liberar contratação por plano, preencha `checkout_url` em `solarhost_plans` ou configure `VITE_CLIENT_AREA_URL` como fallback geral.

## Melhorias incluídas

- catálogo dinâmico do Supabase;
- Minecraft Java e Bedrock separados;
- recomendador de plano;
- estimador de Minecraft com aviso de estimativa;
- status público sem números falsos;
- changelog público;
- comparação de planos adaptada para celular;
- headers básicos de segurança no Cloudflare Pages;
- remoção completa da estrutura `.lovable`, SSR e server functions do frontend.
