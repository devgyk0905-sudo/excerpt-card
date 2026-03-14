import { Noto_Serif_KR, Noto_Sans_KR, Nanum_Myeongjo, Nanum_Gothic } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans_KR({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-noto-sans' })
const notoSerif = Noto_Serif_KR({ subsets: ['latin'], weight: ['300', '400'], variable: '--font-noto-serif' })
const nanumMyeongjo = Nanum_Myeongjo({ subsets: ['latin'], weight: ['400'], variable: '--font-nanum-myeongjo' })
const nanumGothic = Nanum_Gothic({ subsets: ['latin'], weight: ['400'], variable: '--font-nanum-gothic' })

export const metadata = {
  title: '발췌 카드',
  description: '책 발췌 이미지 생성기',
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