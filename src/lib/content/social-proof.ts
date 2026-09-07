export interface SocialProofContent {
  disclaimer: string
  logos: { name: string; src: string }[]
  testimonials: { quote: string; name: string; role: string; company: string }[]
}

export const socialProofContent: SocialProofContent = {
  disclaimer:
    "Empresas, nomes e depoimentos ilustrativos, criados para este case de " +
    "portfólio — o Evolution é um produto fictício e não possui clientes reais.",
  logos: [
    { name: "Norte Distribuidora", src: "/images/social-proof/logo-norte-distribuidora.svg" },
    { name: "Cedro Alimentos", src: "/images/social-proof/logo-cedro-alimentos.svg" },
    { name: "Vetta Seguros", src: "/images/social-proof/logo-vetta-seguros.svg" },
    { name: "Mareal Logística", src: "/images/social-proof/logo-mareal-logistica.svg" },
    { name: "Portal Engenharia", src: "/images/social-proof/logo-portal-engenharia.svg" },
  ],
  testimonials: [
    {
      quote:
        "Configuramos o primeiro agente em uma tarde. O que levava dias de fila " +
        "com a TI agora roda sozinho todo santo dia.",
      name: "Renata Aquino",
      role: "Gerente de Operações",
      company: "Norte Distribuidora (ilustrativo)",
    },
    {
      quote:
        "Nossa equipe de suporte parou de copiar dado de planilha para CRM. O " +
        "agente faz isso e ainda avisa quando algo foge do padrão.",
      name: "Diego Salgado",
      role: "Coordenador de Atendimento",
      company: "Cedro Alimentos (ilustrativo)",
    },
    {
      quote:
        "Como TI, o que mais importa é ter visibilidade de tudo que o agente faz. " +
        "O Evolution deu isso sem exigir um projeto de integração enorme.",
      name: "Bianca Ferraz",
      role: "Head de TI",
      company: "Vetta Seguros (ilustrativo)",
    },
  ],
}
