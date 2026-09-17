import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacidade")({
  head: () => seo("Política de Privacidade — NuvyCloud", "Como a NuvyCloud trata dados necessários para atendimento, contratação e operação dos serviços.", "/privacidade"),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <LegalPage title="Política de Privacidade" updated="17 de setembro de 2026">
    <p>Esta política explica, de forma simples, como dados podem ser usados para atendimento, contratação e operação dos serviços.</p>
    <h2>1. Dados coletados</h2><p>Podem ser tratados dados informados na Área do Cliente, dados de contato, informações de pagamento processadas pelo billing e registros técnicos necessários para operação.</p>
    <h2>2. Finalidade</h2><p>Os dados são usados para criar e manter contas, processar pedidos, prestar suporte, proteger os serviços e cumprir obrigações legais.</p>
    <h2>3. Compartilhamento</h2><p>Dados podem ser compartilhados com provedores necessários para billing, hospedagem, segurança e suporte, sempre conforme a finalidade do serviço.</p>
    <h2>4. Segurança</h2><p>A NuvyCloud adota boas práticas para reduzir riscos, incluindo separação de credenciais administrativas e uso de integrações no backend.</p>
    <h2>5. Direitos do titular</h2><p>Você pode solicitar informações sobre seus dados e pedir correções ou exclusões quando aplicável.</p>
  </LegalPage>;
}
