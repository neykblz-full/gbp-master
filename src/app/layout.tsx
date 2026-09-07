import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"GBP Master",description:"Gestão local de perfis de empresas" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
