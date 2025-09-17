import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UIDProvider } from "@/component/Rysa/context/UIDProvider";
import { OnSearchProvider } from "@/component/Rysa/ONDC/context/OnSearchProvider";
import { SelectedLenderProvider } from "@/component/Rysa/ONDC/context/SelectedLenderProvider";
import { OnStatusProvider } from "@/component/Rysa/ONDC/context/OnStatusProvider";
import { FinalLoanOfferProvider } from "@/component/Rysa/ONDC/context/FinalLoanOfferProvider";
import {SelectedLoanProvider} from "@/component/Rysa/RysaContexts/SelectedLoanProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AryseFin",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <title>Rysa</title> */}
        <link rel="icon" href="/Aryse_Fin.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         {/* Google Tag Manager */}
         <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GT09YWSLG0"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GT09YWSLG0');
          `}
        </Script>
        {/* End Google Tag Manager */}
        <UIDProvider>
          <OnSearchProvider>
            <SelectedLenderProvider>
              <OnStatusProvider>
                <FinalLoanOfferProvider>
                  <SelectedLoanProvider>
                  {children}
                  </SelectedLoanProvider>
                </FinalLoanOfferProvider>
              </OnStatusProvider>
            </SelectedLenderProvider>
          </OnSearchProvider>
        </UIDProvider>
      </body>
    </html>
  );
}
