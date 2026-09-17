import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page";
import { FAQBlock } from "@/components/site/faq";
import { CTASection } from "@/components/site/shared";
import { seo } from "@/lib/seo";
export const Route=createFileRoute("/faq")({head:()=>seo("Perguntas Frequentes — NuvyCloud","Tire suas dúvidas sobre ativação, upgrades, painel, plugins e suporte da NuvyCloud.","/faq"),component:FAQ});
function FAQ(){return <><PageIntro eyebrow="Central de ajuda" title="Dúvidas frequentes" description="O que você precisa saber para escolher e usar sua hospedagem."/><FAQBlock/><CTASection/></>}
