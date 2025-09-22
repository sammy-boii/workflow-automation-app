import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex'>
      <div className='absolute top-4 right-4 z-10'>
        <AnimatedThemeToggler />
      </div>
      <main className='grow'>{children}</main>
    </main>
  )
}
