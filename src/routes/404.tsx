import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/site/page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/404")({
  head: () => seo("Página não encontrada — NuvyCloud", "A página solicitada não foi encontrada no site da NuvyCloud.", "/404"),
  component: NotFoundPage,
});
