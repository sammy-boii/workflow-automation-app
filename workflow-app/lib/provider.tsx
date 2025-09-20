'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Tooltip } from '@/components/ui/tooltip'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <Tooltip>
          <SidebarProvider>{children}</SidebarProvider>
        </Tooltip>
      </ThemeProvider>
    </>
  )
}
