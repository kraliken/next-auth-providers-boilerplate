"use server"

import { signIn } from "@/auth"

export const linkProvider = async (provider: "github" | "microsoft-entra-id") => {
    // mivel a user már be van jelentkezve, ez NEM új usert hoz létre,
    // hanem összeköti a fiókot a meglévő userrel
    await signIn(provider, { redirectTo: "/account" })
}

// GitHub összekötés
export async function linkGithubAccount() {
    await signIn("github", { redirectTo: "/dashboard" })
}

// Microsoft Entra ID összekötés
export async function linkMicrosoftAccount() {
    await signIn("microsoft-entra-id", { redirectTo: "/dashboard" })
}