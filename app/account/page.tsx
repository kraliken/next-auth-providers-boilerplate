// app/account/page.tsx (vagy /settings, ahogy tetszik)
import { auth } from "@/auth"
import LinkAccountButtons from "@/components/LinkAccountButtons"
import { redirect } from "next/navigation"

export default async function AccountPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    return (
        <div className="max-w-md mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-semibold">Account Settings</h1>
            <p className="text-sm text-muted-foreground">
                Here you can link your GitHub and Microsoft Entra ID accounts.
            </p>

            <LinkAccountButtons />
        </div>
    )
}
