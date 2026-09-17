import type { HostingPlan } from "@/types/hosting";

export const hostingPlans: HostingPlan[] = [
  {
    id: "bot-nano", name: "Bot Nano", category: "bot", platform: "nodejs",
    description: "O essencial para colocar seu primeiro bot no ar.", price: 4.99, currency: "BRL", interval: "month",
    ram: "512 MB", ramMb: 512, cpu: "50%", storage: "2 GB", featured: false, available: true,
    features: ["Gerenciamento de arquivos", "Console em tempo real", "Reinicialização automática", "Acesso ao painel", "Instalação por arquivos ou Git quando disponível"],
  },
  {
    id: "bot-start", name: "Bot Start", category: "bot", platform: "nodejs",
    description: "Equilíbrio para bots pequenos e médios.", price: 7.99, currency: "BRL", interval: "month",
    ram: "1 GB", ramMb: 1024, cpu: "100%", storage: "5 GB", featured: true, badge: "Mais escolhido", available: true,
    features: ["Console em tempo real", "Gerenciador de arquivos", "Reinicialização automática", "Acesso ao painel", "Indicado para bots pequenos e médios"],
  },
  {
    id: "bot-pro", name: "Bot Pro", category: "bot", platform: "nodejs",
    description: "Mais espaço para aplicações em crescimento.", price: 12.99, currency: "BRL", interval: "month",
    ram: "2 GB", ramMb: 2048, cpu: "Até 150%", storage: "10 GB", featured: false, available: true,
    features: ["Console em tempo real", "Gerenciamento de arquivos", "Reinicialização automática", "Maior capacidade para aplicações", "Acesso ao painel"],
  },
  {
    id: "minecraft-start", name: "Minecraft Start", category: "minecraft", platform: "java",
    description: "Ideal para servidores pequenos e projetos começando.", price: 14.99, currency: "BRL", interval: "month",
    ram: "2 GB", ramMb: 2048, cpu: "100%", storage: "10 GB", featured: false, available: true,
    features: ["Java, Paper, Purpur, Spigot ou Vanilla", "Console em tempo real", "Gerenciamento de arquivos", "Suporte para plugins", "Painel de controle"],
  },
  {
    id: "minecraft-plus", name: "Minecraft Plus", category: "minecraft", platform: "java",
    description: "Mais capacidade para um mundo em expansão.", price: 24.99, currency: "BRL", interval: "month",
    ram: "4 GB", ramMb: 4096, cpu: "Até 200%", storage: "20 GB", featured: true, badge: "Melhor custo-benefício", available: true,
    features: ["Java, Paper, Purpur, Spigot ou Vanilla", "Suporte a plugins", "Gerenciamento de arquivos", "Console em tempo real", "Backups quando configurados", "Maior capacidade de expansão"],
  },
];
