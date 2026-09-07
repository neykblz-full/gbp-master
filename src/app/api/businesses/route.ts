import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { evaluateAudit } from "@/lib/audit";
const schema=z.object({name:z.string().min(2),address:z.string().optional(),city:z.string().optional(),state:z.string().optional(),phone:z.string().optional(),website:z.string().url().optional().or(z.literal("")),primaryCategory:z.string().optional(),description:z.string().optional()});
const ownerId="demo-user";
export async function POST(req:Request){
 try { const data=schema.parse(await req.json()); const business=await db.business.create({data:{...data,website:data.website||null,ownerId}}); const result=evaluateAudit(business); await db.audit.create({data:{businessId:business.id,...result,items:{create:result.items.map(({evaluate,...i})=>i)}}}); return NextResponse.json(business,{status:201}); }
 catch (error) { return NextResponse.json({error:error instanceof Error?error.message:"Dados inválidos"},{status:400}); }
}
export async function DELETE(req:Request){ const id=new URL(req.url).searchParams.get("id"); if(!id)return NextResponse.json({error:"id obrigatório"},{status:400}); await db.business.delete({where:{id}}); return NextResponse.json({ok:true}); }
