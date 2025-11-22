import { PortalHeader } from "@/components/portal/PortalHeader"

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50/50">
            <PortalHeader />
            <main className="relative">
                {children}
            </main>
        </div>
    )
}
