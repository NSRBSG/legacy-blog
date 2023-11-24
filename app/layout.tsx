import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NSRBSG',
  description: 'NSRBSG Blog',
  openGraph: {
    title: 'NSRBSG',
    description: 'NSRBSG Blog',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='kr' suppressHydrationWarning={true}>
      <head>
        <meta
          name='naver-site-verification'
          content='078235702d95ddd0a506a16aaf03f42a7ec323f3'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(
              function() {
                window.addEventListener('storage', (e) => {
                  if(e.key === 'theme') {
                    localStorage.setItem(e.key, e.newValue);
                    document.documentElement.classList.remove('dark', 'light');
                    document.documentElement.classList.add(e.newValue);
                  }
                })

                let theme = localStorage.getItem('theme');
                
                if(!theme) {
                  localStorage.setItem('theme', 'system');
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  return document.documentElement.classList.add(theme);
                }

                if(theme === 'system') {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }

                document.documentElement.classList.add(theme);
              }()
            )`,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className='relative mx-auto container min-h-screen flex flex-col'>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
