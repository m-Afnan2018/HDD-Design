import './globals.scss';
import {Jost, Roboto,Charm,Oregano} from 'next/font/google';
import Script from 'next/script';
import Providers from '@/components/provider';

export const metadata = {
  title: 'HD design Fashion Hub - Premium Fashion E-commerce',
  description: 'Discover the latest fashion trends at HD design Fashion Hub. Premium quality clothing, accessories, and lifestyle products with exceptional customer service.',
}

const body = Jost({
  weight: ["300","400", "500", "600", "700", "800","900"],
  subsets: ["latin"],
  variable: "--tp-ff-body",
});
const heading = Jost({
  weight: ["300","400", "500", "600", "700", "800","900"],
  subsets: ["latin"],
  variable: "--tp-ff-heading",
});
const p = Jost({
  weight: ["300","400", "500", "600", "700", "800","900"],
  subsets: ["latin"],
  variable: "--tp-ff-p",
});
const jost = Jost({
  weight: ["300","400", "500", "600", "700", "800","900"],
  subsets: ["latin"],
  variable: "--tp-ff-jost",
});
const roboto = Roboto({
  weight: ["300","400","500","700","900"],
  subsets: ["latin"],
  variable: "--tp-ff-roboto",
});
const oregano = Oregano({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--tp-ff-oregano",
});
const charm = Charm({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-charm",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </head>
      <body className={`${body.variable} ${heading.variable} ${p.variable} ${jost.variable} ${roboto.variable} ${oregano.variable} ${charm.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
