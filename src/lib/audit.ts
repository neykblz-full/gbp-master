import { AuditStatus, type Business } from "@prisma/client";
type Rule = { category: string; title: string; description: string; recommendation: string; weight: number; evaluate: (b: Business) => AuditStatus };
const present = (value?: string | null) => value?.trim() ? "GOOD" : "BAD" as AuditStatus;
export const auditRules: Rule[] = [
 {category:"INFORMAÇÕES",title:"Telefone",description:"Telefone de contato cadastrado.",recommendation:"Adicione um telefone local atualizado.",weight:10,evaluate:b=>present(b.phone)},
 {category:"INFORMAÇÕES",title:"Endereço",description:"Endereço cadastrado.",recommendation:"Inclua o endereço completo.",weight:10,evaluate:b=>present(b.address)},
 {category:"WEBSITE",title:"Website",description:"Site associado ao perfil.",recommendation:"Adicione uma URL segura do website.",weight:10,evaluate:b=>present(b.website)},
 {category:"CATEGORIAS",title:"Categoria principal",description:"Categoria principal definida.",recommendation:"Defina a categoria mais específica.",weight:10,evaluate:b=>present(b.primaryCategory)},
 {category:"DESCRIÇÃO",title:"Descrição",description:"Descrição comercial disponível.",recommendation:"Escreva uma descrição clara com serviços e localização.",weight:15,evaluate:b=>b.description && b.description.length >= 80 ? "GOOD" : b.description ? "WARNING" : "BAD"},
 {category:"HORÁRIOS",title:"Horários",description:"Horários operacionais informados.",recommendation:"Preencha os horários de atendimento.",weight:10,evaluate:b=>b.hours !== "{}" ? "GOOD" : "UNKNOWN"},
];
export function evaluateAudit(b: Business) {
 const items = auditRules.map(rule => ({...rule,status:rule.evaluate(b)}));
 const verified = items.filter(i=>i.status!=="UNKNOWN");
 const available = verified.reduce((sum,i)=>sum+i.weight,0);
 const earned = verified.reduce((sum,i)=>sum+(i.status==="GOOD"?i.weight:i.status==="WARNING"?i.weight*.55:0),0);
 const count=(s:AuditStatus)=>items.filter(i=>i.status===s).length;
 return {score: available ? Math.round(earned/available*100) : 0,items,goodCount:count("GOOD"),warningCount:count("WARNING"),badCount:count("BAD"),unknownCount:count("UNKNOWN")};
}
