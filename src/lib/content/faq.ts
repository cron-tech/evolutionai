export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: "O Evolution precisa de uma equipe de TI para funcionar?",
    answer:
      "Não. A configuração é feita pelo próprio time de negócio, direto pelas " +
      "ferramentas que já usa — sem exigir um time de engenharia dedicado para " +
      "manter em funcionamento.",
  },
  {
    question:
      "Quais sistemas o Evolution consegue integrar (CRM, ERP, planilhas, e-mail)?",
    answer:
      "O Evolution se conecta às ferramentas que sua equipe já usa no dia a dia " +
      "— planilhas, CRM, ERP e e-mail — sem exigir integração customizada por " +
      "parte da TI.",
  },
  {
    question: "Como o Evolution lida com segurança e permissões de acesso?",
    answer:
      "Cada agente opera com permissões próprias e todas as ações ficam " +
      "registradas em uma trilha de auditoria completa, visível para o time de " +
      "TI a qualquer momento.",
  },
  {
    question: "Quanto tempo leva para colocar o Evolution em produção?",
    answer:
      "Minutos, não semanas. A promessa central do Evolution é reduzir a " +
      "configuração que normalmente levaria semanas para um processo que roda " +
      "em minutos.",
  },
  {
    question: "Que tipo de suporte está incluído nos planos?",
    answer:
      "Todo plano inclui suporte — de e-mail nos planos de entrada a chat " +
      "prioritário e gerente de conta dedicado nos planos superiores e no " +
      "Enterprise.",
  },
  {
    question: "É possível trocar de plano ou cancelar depois?",
    answer:
      "Sim. Não há fidelidade — o plano pode ser ajustado a qualquer momento " +
      "conforme o volume de tarefas automatizadas cresce ou diminui.",
  },
]
