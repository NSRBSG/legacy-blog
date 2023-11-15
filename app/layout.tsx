import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nonsense',
  description: 'Nonsense Blog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='kr' suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(
              function() {
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

                window.addEventListener('storage', (e) => {
                  if(e.key === 'theme') {
                    localStorage.setItem(e.key, e.newValue);
                    document.documentElement.classList.remove('dark', 'light');
                    document.documentElement.classList.add(e.newValue);
                  }
                })
              }()
            )`,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className='flex justify-center'>
          <div className='container min-h-screen flex flex-col'>
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
