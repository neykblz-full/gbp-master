import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { evaluateAudit } from "@/lib/audit";
export async function POST(_:Request,{params}:{params:Promise<{id:string}>}) { const {id}=await params; const business=await db.business.findUnique({where:{id}}); if(!business)return NextResponse.json({error:"Empresa não encontrada"},{status:404}); const r=evaluateAudit(business); const audit=await db.audit.create({data:{businessId:id,...r,items:{create:r.items.map(({evaluate,...i})=>i)}}}); return NextResponse.json(audit); }
