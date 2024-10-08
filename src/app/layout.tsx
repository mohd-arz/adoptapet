import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { TRPCReactProvider } from "~/trpc/react";
import PrelineScript from "./_components/preline-script";
import { ThemeProvider } from '@mui/material/styles';
import theme from "~/app/_components/utils/theme";
import RecoilContextProvider from "./_components/recoil-context-provider";
import { Work_Sans } from "@next/font/google";
import NextNProgressClient from "./_components/progress-bar";
import { Providers } from "./_components/session-provider";

const pacifico = Work_Sans({
  weight: ["300","400","500","600","700"],
  subsets:["latin"],
});


export const metadata: Metadata = {
  title: "Best Friend",
  description: "Adopting Pet Application",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${pacifico.className}`}>
      <body>
      <AppRouterCacheProvider  options={{ key: 'css' }}>
        <ThemeProvider theme={theme}>
          <Providers>
            <RecoilContextProvider>
              <TRPCReactProvider>
                {children}
                <NextNProgressClient/>
              </TRPCReactProvider>
            </RecoilContextProvider>
          </Providers>
          <PrelineScript/>
        </ThemeProvider>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
