import { siteConfig } from "@/config/site";

const fallbackOrigin = typeof window !== "undefined" ? window.location.origin : "https://nuvycloud.pages.dev";

function absoluteUrl(path: string) {
  const origin = siteConfig.siteUrl || fallbackOrigin;
  return `${origin.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export function seo(title: string, description: string, path = "/") {
  const url = absoluteUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/logo.png"),
    brand: "NuvyCloud",
    areaServed: "BR",
    sameAs: siteConfig.discordUrl ? [siteConfig.discordUrl] : [],
  };
}
