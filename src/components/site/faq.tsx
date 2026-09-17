import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "./shared";
export const faqs=[
["O serviço é ativado automaticamente?","A ativação poderá ocorrer automaticamente após a confirmação do pagamento, dependendo do produto e da integração configurada."],
["Posso fazer upgrade depois?","Sim. Os planos foram planejados para permitir crescimento conforme seu projeto precisar."],
["Vocês hospedam bots Discord?","Sim. Existem planos específicos para aplicações e bots compatíveis."],
["Posso instalar plugins no Minecraft?","Nos planos compatíveis, sim. O resultado depende da versão, dos plugins e da configuração do servidor."],
["Tenho acesso aos arquivos?","Sim, através do painel de gerenciamento disponibilizado para o serviço."],
["Onde acesso minha hospedagem?","Após contratar, você poderá acessar o serviço pela Área do Cliente e pelo painel correspondente."],
["O que acontece se meu projeto precisar de mais recursos?","Você poderá solicitar ou contratar um plano superior conforme a disponibilidade."],
["Vocês possuem suporte?","Sim. O suporte oficial da NuvyCloud atende as questões mais importantes do seu serviço."],
] as const;
export function FAQBlock({limit}:{limit?:number}){const items=limit?faqs.slice(0,limit):faqs;return <section className="section"><div className="site-container grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><SectionHeading eyebrow="Dúvidas frequentes" title="Sem enrolação." description="Respostas diretas antes de você contratar."/>{siteConfig.discordUrl&&<Button className="mt-6" variant="outline" asChild><a href={siteConfig.discordUrl}>Entrar no Discord</a></Button>}</div><Accordion type="single" collapsible className="border-t border-border">{items.map(([q,a],i)=><AccordionItem key={q} value={`faq-${i}`}><AccordionTrigger className="py-5 text-left text-base hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-5 leading-6 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>}
