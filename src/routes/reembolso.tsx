import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/reembolso")({
  head: () => seo("Política de Reembolso — NuvyCloud", "Condições gerais para pedidos de reembolso em serviços digitais da NuvyCloud.", "/reembolso"),
  component: RefundPage,
});

function RefundPage() {
  return <LegalPage title="Política de Reembolso" updated="17 de setembro de 2026">
    <p>Esta política apresenta regras gerais para pedidos de reembolso relacionados aos serviços digitais da NuvyCloud.</p>
    <h2>1. Solicitações</h2><p>Pedidos de reembolso devem ser feitos pela Área do Cliente ou canal oficial de suporte, informando o serviço e o motivo da solicitação.</p>
    <h2>2. Serviços digitais</h2><p>Como a hospedagem pode ser ativada e disponibilizada rapidamente, solicitações são avaliadas conforme uso, tempo decorrido, consumo de recursos e situação do pedido.</p>
    <h2>3. Problemas técnicos</h2><p>Quando houver falha técnica comprovada relacionada ao serviço, a NuvyCloud poderá oferecer correção, compensação ou reembolso, conforme o caso.</p>
    <h2>4. Casos não elegíveis</h2><p>Podem não ser elegíveis pedidos ligados a mau uso, violação dos termos, arquivos do próprio cliente, plugins incompatíveis, mods pesados ou configurações externas.</p>
    <h2>5. Análise</h2><p>Cada solicitação será analisada pelo suporte. As condições finais podem depender do método de pagamento e do sistema de billing utilizado.</p>
  </LegalPage>;
}
