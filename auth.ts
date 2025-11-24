import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import client from "./lib/db"
import GitHub from "next-auth/providers/github"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import { ObjectId } from "mongodb"

interface ProviderProfile {
    email?: string | null
    mail?: string | null
    userPrincipalName?: string | null
    name?: string | null
    displayName?: string | null
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [
        GitHub,
        MicrosoftEntraID({
            clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
            clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
            issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!user || !account) return true

            // console.log(profile);

            const db = client.db()
            const p = profile as ProviderProfile | null | undefined

            const providerEmail: string | undefined =
                p?.email ?? p?.mail ?? p?.userPrincipalName ?? undefined

            const providerName: string | undefined =
                p?.name ?? p?.displayName ?? undefined

            // csak azokat a field-eket engedjük, amiket frissítünk
            type UserUpdate = {
                email?: string
                name?: string
            }

            const update: UserUpdate = {}

            // EMAIL: ha a provider emailje eltér az adatbázisban lévőtől → frissítjük
            if (providerEmail && providerEmail !== user.email) {
                update.email = providerEmail
            }

            // NAME: ha a provider neve eltér az adatbázisban lévőtől → frissítjük
            if (providerName && providerName !== user.name) {
                update.name = providerName
            }

            if (Object.keys(update).length > 0) {
                await db.collection("users").updateOne(
                    { _id: new ObjectId(user.id) },
                    { $set: update },
                )
            }

            return true
        },

        async session({ session, user }) {
            if (session.user && user.role) {
                session.user.role = user.role
            }
            return session
        },
    },

    events: {
        // async signIn(data) {
        //     // console.log(data);
        //     return
        // },
        async createUser(data) {
            const db = client.db()
            await db.collection("users").updateOne(
                { email: data.user.email },
                {
                    $set: {
                        role: "member"
                    }
                }
            )
        },
    }
})