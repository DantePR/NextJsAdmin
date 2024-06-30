
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';
import Loading from './loading';
import NextAuthProvider from './authprovider';
export const metadata = {
  title: 'Admin Site',
  description:
    'Admin Site'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback={<Loading />}>
          <Nav />
       
        <NextAuthProvider layoutchildren={children}/>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
