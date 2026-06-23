import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/language-context'
import { AssistantProvider } from '@/lib/assistant-context'
import AssistantWidget from '@/components/assistant-widget'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  title: 'UNIQLO - LifeWear（ライフウェア）| ユニクロ',
  description: 'ユニクロ公式オンラインストア。季節のアイテムや定番のベーシックアイテムを豊富にラインナップ。',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'only light',
  themeColor: '#FF0000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable}`} style={{ backgroundColor: "#FFFFFF", colorScheme: "light" }}>
      <body className="font-sans antialiased" style={{ backgroundColor: "#FFFFFF", color: "#222222" }}>
        <LanguageProvider>
          <AssistantProvider>
            {children}
            <AssistantWidget />
          </AssistantProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
