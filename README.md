# GBP MASTER — Fase 1

Arquitetura: Next.js/TypeScript apresenta a interface e APIs; Prisma isola o acesso a dados; o `AuditEngine` avalia regras independentes e persiste snapshots; providers de Google/IA entram posteriormente atrás de interfaces, sem obrigar APIs pagas.

## Rodar localmente

1. Copie `.env.example` para `.env`.
2. Execute `npm install`, `npm run db:push`, `npm run db:seed`, `npm run dev`.

O projeto usa SQLite no desenvolvimento. Para Netlify/Vercel, altere `DATABASE_URL` para um PostgreSQL gerenciado e mude o provider em `prisma/schema.prisma` para `postgresql`, então execute uma migração. SQLite não fornece persistência confiável em funções serverless.

Para uso por duas pessoas, defina `GBP_ACCESS_USER` e `GBP_ACCESS_PASSWORD` nas variáveis da hospedagem. O navegador pedirá essas mesmas credenciais aos dois usuários; o login multiusuário por OAuth é uma evolução planejada.

Implementado: dashboard, empresas (criar/excluir), auditoria configurável, score que exclui itens desconhecidos, snapshots/histórico e dados seed. Módulos ainda não implementados devem exibir "Disponível quando a integração for configurada" quando forem adicionados à navegação.
