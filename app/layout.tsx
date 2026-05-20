import type { Metadata } from 'next';
import Script from 'next/script';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import ogImage from '@/public/OG.png';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { I18nProvider } from '@/lib/i18n/context';
import { cn } from '@/lib/utils';
import SmoothScroll from '@/components/SmoothScroll';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

// Local custom font - Ocera
const ocera = localFont({
  src: '../components/fonts/ocerapersonnaluse.otf',
  variable: '--font-ocera',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sigclr.com'),
  title: {
    template: '%s | SIGCLR',
    default: 'SIGCLR 澄讯空间 | 产品型开发者与 AI 工具开发',
  },
  description:
    'SIGCLR 澄讯空间 — 产品型开发者的个人网站。专注 AI 工具开发、前端产品体验与全栈交付，分享技术思考与开发实践。',
  keywords: [
    '产品型开发者',
    'AI 工具开发',
    '前端开发',
    '全栈开发',
    'TypeScript',
    'React',
    'Vue',
    'Node.js',
  ],
  authors: [{ name: 'Qiu' }],
  creator: 'Qiu',
  alternates: {
    canonical: 'https://sigclr.com',
  },
  openGraph: {
    title: 'SIGCLR 澄讯空间 | 产品型开发者与 AI 工具开发',
    description:
      'SIGCLR 澄讯空间 — 产品型开发者的个人网站。专注 AI 工具开发、前端产品体验与全栈交付。',
    type: 'website',
    siteName: 'SIGCLR',
    locale: 'zh_CN',
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: 'SIGCLR - 澄讯空间',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIGCLR 澄讯空间 | 产品型开发者与 AI 工具开发',
    description:
      'SIGCLR 澄讯空间 — 产品型开发者的个人网站。专注 AI 工具开发、前端产品体验与全栈交付。',
    creator: '@logic_zy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Qiu',
  alternateName: 'SIGCLR',
  jobTitle: '产品型开发者 / Builder',
  url: 'https://sigclr.com',
  sameAs: ['https://github.com/xiqiuqiu', 'https://twitter.com/logic_zy'],
  knowsAbout: ['AI 工具开发', '前端产品体验', '全栈交付', 'TypeScript', 'React', 'Vue.js', 'Node.js'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SIGCLR 澄讯空间',
  url: 'https://sigclr.com',
  description: '产品型开发者的个人网站，专注 AI 工具开发、前端产品体验与全栈交付。',
  inLanguage: 'zh-CN',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html
      lang='zh-CN'
      className={cn(spaceGrotesk.variable, spaceMono.variable, ocera.variable)}
      suppressHydrationWarning
    >
      <head>
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy='afterInteractive'
            />
            <Script
              id='ga-gtag'
              strategy='afterInteractive'
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
`.trim(),
              }}
            />
          </>
        ) : null}
      </head>

      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('user-theme');if(t&&['dark','light','minimal'].indexOf(t)!==-1){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();",
          }}
        />
        <div className='antialiased min-h-screen'>
          <SmoothScroll>
            <I18nProvider>
              <QueryProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  {children}
                </TooltipProvider>
              </QueryProvider>
            </I18nProvider>
          </SmoothScroll>
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(personJsonLd),
            }}
          />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteJsonLd),
            }}
          />
        </div>
      </body>
    </html>
  );
}
