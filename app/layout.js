import "./globals.css";

export const metadata = {
  title: "Meu Dev Robot",
  description: "Agente de IA para criação de sites e automações",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
