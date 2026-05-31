import '../styles/globals.css';
import { Tajawal, Cairo } from 'next/font/google';

const tajawal = Tajawal({ 
  subsets: ['arabic'], 
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-tajawal',
});

const cairo = Cairo({ 
  subsets: ['arabic'], 
  weight: ['300', '400', '600', '700', '900'],
  variable: '--font-cairo',
});

export const metadata = {
  title: 'استراحة السينما - تجربة سينمائية ذكية',
  description: 'دليل وموقع استراحة السينما العربي المطور بالذكاء الاصطناعي',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${cairo.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
