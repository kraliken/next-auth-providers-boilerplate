"use server"

import { signIn, signOut } from "@/auth"

export const login = async (provider: "github" | "microsoft-entra-id") => {
    await signIn(provider, { redirectTo: "/dashboard" }, { prompt: "select_account" })
}
export const logout = async () => {
    await signOut({ redirectTo: "/" })
}