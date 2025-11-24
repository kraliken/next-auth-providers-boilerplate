import { SignInForm } from "@/components/sign-in"

type LoginSearchParams = {
    error?: string | string[]
}

type LoginPageProps = {
    searchParams: Promise<LoginSearchParams>
}

const errorMessages: Record<string, string> = {
    OAuthAccountNotLinked:
        "An account with this email already exists with a different provider. " +
        "Sign in using your original provider, then link the other account from your Account page.",
}
const LoginPage = async ({ searchParams }: LoginPageProps) => {

    const resolvedSearchParams = await searchParams

    const rawError = resolvedSearchParams?.error
    const errorCode = Array.isArray(rawError) ? rawError[0] : rawError

    const errorMessage =
        (errorCode && errorMessages[errorCode]) ||
        (errorCode && "An unknown error occurred. Please try again.")

    return (
        <div className="min-h-[calc(100vh-68px)] flex flex-col items-center justify-center gap-6 p-6 md:p-10">
            {errorMessage && (
                <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {errorMessage}
                </div>
            )}
            <div className="flex w-full max-w-sm flex-col gap-6">
                <SignInForm />
            </div>
        </div>
    )
}

export default LoginPage