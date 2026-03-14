import { Noto_Serif_KR, Noto_Sans_KR, Nanum_Myeongjo, Nanum_Gothic } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans_KR({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-noto-sans' })
const notoSerif = Noto_Serif_KR({ subsets: ['latin'], weight: ['300', '400'], variable: '--font-noto-serif' })
const nanumMyeongjo = Nanum_Myeongjo({ subsets: ['latin'], weight: ['400'], variable: '--font-nanum-myeongjo' })
const nanumGothic = Nanum_Gothic({ subsets: ['latin'], weight: ['400'], variable: '--font-nanum-gothic' })

export const metadata = {
  title: '✉️발췌 카드 만들기',
  description: '책 속 문장을 카드로 만들어 보세요',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✉️</text></svg>",
  },
  openGraph: {
    title: '✉️ 발췌 카드 생성하기',
    description: '책 속 문장을 카드로 만들어 보세요',
    images: ['/og-image.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${notoSans.variable} ${notoSerif.variable} ${nanumMyeongjo.variable} ${nanumGothic.variable}`}>
        {children}
      </body>
    </html>
  )
}