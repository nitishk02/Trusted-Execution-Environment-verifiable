"use client"
import "./globals.css";
import { UserProvider } from './contexts/UserContext';
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const client = new QueryClient();
  
  return (
    <html lang="en">
       <WagmiProvider config={config}>
       <QueryClientProvider client={client}>
        <RainbowKitProvider>
       <UserProvider>
      <body>
        {children}
      </body>
      </UserProvider>
      </RainbowKitProvider>
      </QueryClientProvider>
      </WagmiProvider>
    </html>
  );
}
