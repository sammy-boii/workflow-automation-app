'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const SideNav = () => {
    return (
        <aside className="hidden md:flex md:flex-col md:w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
            <div className="px-4 py-4 border-b border-sidebar-border">
                <Link href="/" className="font-semibold tracking-tight">
                    workflow-app
                </Link>
            </div>
            <nav className="flex-1 p-2 space-y-1">
                <Link href="/">
                    <Button variant="ghost" className="w-full justify-start">
                        Home
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="ghost" className="w-full justify-start">
                        Workflow editor
                    </Button>
                </Link>
                <Link href="/credentials">
                    <Button variant="ghost" className="w-full justify-start">
                        Credentials
                    </Button>
                </Link>
            </nav>
            <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-muted text-muted-foreground grid place-items-center text-sm font-medium">
                        DU
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium leading-none truncate">Demo User</p>
                        <p className="text-xs text-muted-foreground truncate">demo@example.com</p>
                    </div>
                </div>
                <Button
                    variant="secondary"
                    className="mt-3 w-full"
                    onClick={() => console.log("Logout clicked")}
                >
                    Logout
                </Button>
            </div>
        </aside>
    )
}

export default SideNav