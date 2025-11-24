"use client"

import { Button } from "@/components/ui/button"
import { TfiMicrosoftAlt } from "react-icons/tfi"
import { FaGithub } from "react-icons/fa"
import { linkGithubAccount, linkMicrosoftAccount } from "@/lib/actions/link-provider"

export default function LinkAccountButtons() {
    return (
        <div className="space-y-2">
            <Button onClick={() => linkGithubAccount()} variant="outline" className="w-full justify-between">
                <span>Link GitHub account</span>
                <FaGithub />
            </Button>

            <Button onClick={() => linkMicrosoftAccount()} variant="outline" className="w-full justify-between">
                <span>Link Microsoft Entra ID account</span>
                <TfiMicrosoftAlt />
            </Button>
        </div>
    )
}
