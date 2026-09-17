import { QueryClient } from "@tanstack/react-query";
import { HeadContent, Link, Outlet, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/layout";

function NotFoundComponent() {
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><span className="font-display text-8xl font-black text-primary/30">404</span><h1 className="mt-3 font-display text-3xl font-extrabold">Essa rota saiu de órbita.</h1><p className="mt-3 text-sm text-muted-foreground">A página que você procura não existe ou foi movida.</p><Button className="mt-7" asChild><Link to="/">Voltar ao início</Link></Button></div></div>;
}

function ErrorComponent({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><h1 className="font-display text-2xl font-bold">Esta página não carregou</h1><p className="mt-3 text-sm text-muted-foreground">Ocorreu um problema. Tente novamente ou volte ao início.</p><div className="mt-6 flex justify-center gap-2"><Button onClick={() => { router.invalidate(); reset(); }}>Tentar novamente</Button><Button variant="outline" asChild><Link to="/">Ir ao início</Link></Button></div></div></div>;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#090b17" },
      { name: "author", content: "NuvyCloud • Rede Lua" },
    ],
    links: [{ rel: "icon", href: "/favicon.png", type: "image/png" }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return <><HeadContent /><SiteLayout><Outlet /></SiteLayout></>;
}
