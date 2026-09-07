import { db } from "@/lib/db";
import { Shell } from "@/components/shell";
import { BusinessManager } from "@/components/business-manager";
export default async function Businesses(){const businesses=await db.business.findMany({include:{audits:{select:{score:true,createdAt:true},orderBy:{createdAt:'desc'},take:1}},orderBy:{updatedAt:'desc'}});return <Shell><header className="mb-8"><p className="text-sm font-semibold text-[#6157e8]">BASE LOCAL</p><h1 className="mt-1 text-3xl font-bold">Empresas</h1><p className="mt-2 text-sm text-gray-500">Cadastre e mantenha seus perfis organizados para auditorias consistentes.</p></header><BusinessManager initial={businesses}/></Shell>}
