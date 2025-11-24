import { auth } from '@/auth'
import { SignOut } from '@/components/sign-out'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from "next/link"

const DashboardPage = async () => {
    const session = await auth()

    const name = session?.user?.name ?? "Unknown user"
    const email = session?.user?.email ?? "No email"
    const role = session?.user?.role ?? "member"

    return (
        <div className="min-h-[calc(100vh-68px)] flex flex-col items-center justify-center gap-6 p-6 md:p-10">

            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold">Account overview</CardTitle>
                    <CardDescription>
                        Basic information about your signed-in session.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Name</span>
                        <span>{name}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span>{email}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Role</span>
                        <span className="">{role}</span>
                    </div>
                </CardContent>
                <CardFooter className="justify-between">
                    <Button asChild>
                        <Link href="/account">Settings</Link>
                    </Button>
                    <SignOut />

                </CardFooter>
            </Card>

        </div>
    )
}

export default DashboardPage