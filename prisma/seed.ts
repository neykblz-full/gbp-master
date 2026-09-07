import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { evaluateAudit } from "../src/lib/audit";
const db=new PrismaClient();
async function main(){
 const user=await db.user.upsert({where:{email:"demo@gbpmaster.local"},update:{},create:{id:"demo-user",email:"demo@gbpmaster.local",name:"Conta compartilhada",passwordHash:await bcrypt.hash("gbpmaster2026",10)}});
 if(await db.business.count()) return;
 const entries=[
  {name:"Café Aurora",address:"Rua das Flores, 120",city:"São Paulo",state:"SP",phone:"(11) 3456-7890",website:"https://example.com",primaryCategory:"Cafeteria",description:"Cafeteria de bairro em São Paulo, com cafés especiais, brunch, bolos artesanais e atendimento acolhedor.",hours:'{"seg-sex":"08:00–19:00"}'},
  {name:"Clínica Horizonte",address:"Av. Central, 85",city:"Campinas",state:"SP",phone:"(19) 3333-1212",primaryCategory:"Clínica médica",description:"Clínica com atendimento humanizado e consultas agendadas.",hours:"{}"},
  {name:"Oficina Norte",city:"Guarulhos",state:"SP",primaryCategory:"Oficina mecânica",hours:"{}"}
 ];
 for(const data of entries){ const b=await db.business.create({data:{...data,ownerId:user.id}}); const r=evaluateAudit(b); await db.audit.create({data:{businessId:b.id,...r,items:{create:r.items.map(({evaluate,...i})=>i)}}}); }
}
main().finally(()=>db.$disconnect());
