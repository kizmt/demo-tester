'use client'

import { ThemeProvider } from 'next-themes'

export default function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='dark' enableSystem={false} attribute='class'>
      {children}
    </ThemeProvider>
  )
}