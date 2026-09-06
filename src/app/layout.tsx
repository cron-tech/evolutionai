import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evolution — Automação operacional com agentes de IA",
  description:
    "Conecte as ferramentas que sua equipe já usa e deixe agentes de IA cuidarem do trabalho repetitivo. Configuração em minutos, não semanas — com o time de negócio no controle.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
