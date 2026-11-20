import type { Metadata, Viewport } from 'next'
import { PortalThemeProvider, THEME_STORAGE_KEY } from '@/components/portal-theme'
import './globals.css'

const themeScript = `(function(){try{var mode=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var path=location.pathname;if(mode==="dark"&&(path.indexOf("/portal")===0||path.indexOf("/admin")===0)){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark"}}catch(e){}})();`

export const metadata: Metadata = {
  title: 'E-Record | School Management System',
  description: 'School Management System for efficient record keeping',
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PortalThemeProvider>{children}</PortalThemeProvider>
      </body>
    </html>
  )
}
