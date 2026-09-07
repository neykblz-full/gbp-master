import { Sidebar } from "./sidebar";
export function Shell({children}:{children:React.ReactNode}){return <div className="flex"><Sidebar/><main className="min-h-screen flex-1 p-5 md:p-9">{children}</main></div>}
