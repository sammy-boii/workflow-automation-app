'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Tooltip } from '@/components/ui/tooltip'
import { Toaster } from 'sonner'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <Toaster richColors />
        <Tooltip>
          <SidebarProvider>{children}</SidebarProvider>
        </Tooltip>
      </ThemeProvider>
    </>
  )
}
