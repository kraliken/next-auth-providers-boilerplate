"use client"

import { logout } from "@/lib/actions/auth"
import { Button } from "./ui/button"

export function SignOut() {
    return (
        <>
            <Button variant="secondary" onClick={() => logout()}>Sign Out</Button>
        </>
    )
}