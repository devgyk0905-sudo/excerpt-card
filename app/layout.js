import { Noto_Serif_KR, Noto_Sans_KR, Nanum_Myeongjo, Nanum_Gothic } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans_KR({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-noto-sans' })
const notoSerif = Noto_Serif_KR({ subsets: ['latin'], weight: ['300', '400'], variable: '--font-noto-serif' })
const nanumMyeongjo = Nanum_Myeongjo({ subsets: ['latin'], weight: ['400'], variable: '--font-nanum-myeongjo' })
const nanumGothic = Nanum_Gothic({ subsets: ['latin'], weight: ['400'], variable: '--font-nanum-gothic' })

export const metadata = {
  title: '발췌 카드 만들기',
  description: '책 속 문장을 카드로 만들어 보세요',
  // manifest 파일 경로 추가
  manifest: 'manifest.json',
  icons: {
    // 기본 파비콘 (브라우저 탭용)
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✉️</text></svg>",
    // ios 홈 화면 아이콘 추가
    apple : 'apple-icon.png',
  },
  openGraph: {
    title: '✉️발췌 카드 만들기',
    description: '책 속 문장을 카드로 만들어 보세요',
    images: ['/og-image.jpg'],
  },
  // 웹앱 설정을 위해 추가하면 좋은 항목
  appleWebApp: {
    capable:  true, statusBarStyle: 'default', title:'발췌카드'
  }
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