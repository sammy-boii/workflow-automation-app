'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </>
  )
}
