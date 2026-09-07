import { NextRequest, NextResponse } from "next/server";

// Proteção simples para uma instalação pessoal compartilhada. Troque por OAuth
// multiusuário quando a gestão por usuário for ativada.
export function proxy(request: NextRequest) {
  const expectedUser = process.env.GBP_ACCESS_USER;
  const expectedPassword = process.env.GBP_ACCESS_PASSWORD;
  if (!expectedUser || !expectedPassword) return NextResponse.next();
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Basic ")) {
    const [user, password] = atob(authorization.slice(6)).split(":");
    if (user === expectedUser && password === expectedPassword) return NextResponse.next();
  }
  return new NextResponse("Acesso protegido", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="GBP MASTER"' } });
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
