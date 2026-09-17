import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/termos")({
  head: () => seo("Termos de Uso — NuvyCloud", "Condições gerais para contratar e usar os serviços de hospedagem da NuvyCloud.", "/termos"),
  component: TermsPage,
});

function TermsPage() {
  return <LegalPage title="Termos de Uso" updated="17 de setembro de 2026">
    <p>Estes termos descrevem as condições gerais para uso dos serviços da NuvyCloud • Rede Lua.</p>
    <h2>1. Uso dos serviços</h2><p>Você deve usar os serviços de forma lícita, respeitando a legislação brasileira, as regras das plataformas utilizadas e os limites do plano contratado.</p>
    <h2>2. Planos e recursos</h2><p>Memória, CPU, armazenamento e demais recursos variam conforme o plano. O desempenho de servidores Minecraft depende de versão, plugins, mods, mapas e otimização.</p>
    <h2>3. Pagamentos e ativação</h2><p>A contratação e os pagamentos são processados pela Área do Cliente e pelo sistema de billing conectado. A ativação pode ser automatizada após a confirmação do pagamento.</p>
    <h2>4. Conteúdo hospedado</h2><p>O cliente é responsável pelos arquivos, bots, plugins, configurações e conteúdos enviados ao serviço.</p>
    <h2>5. Suspensão</h2><p>Serviços podem ser suspensos em caso de inadimplência, abuso de recursos, risco à operação ou violação destes termos.</p>
    <h2>6. Alterações</h2><p>Estes termos podem ser atualizados conforme a NuvyCloud evolui. A versão publicada nesta página é a referência vigente.</p>
  </LegalPage>;
}
