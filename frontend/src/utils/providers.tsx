"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  sepolia,
  polygonAmoy,
  polygonZkEvmCardona,
  arbitrumSepolia,
  scrollSepolia,
  lineaSepolia,
} from "wagmi/chains";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider, createConfig, http } from "wagmi";

import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
const connectkitConfig: any = createConfig(
  getDefaultConfig({
    chains: [
      sepolia,
      polygonAmoy,
      polygonZkEvmCardona,
      arbitrumSepolia,
      scrollSepolia,
      lineaSepolia,
    ],
    transports: {
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
      [polygonAmoy.id]: http(
        `https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
      [polygonZkEvmCardona.id]: http(
        `https://polygonzkevm-cardona.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
      [arbitrumSepolia.id]: http(
        `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
      [scrollSepolia.id]: http(
        `https://scroll-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
      [lineaSepolia.id]: http(
        `https://linea-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
    },

    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    appName: "ETHGlobal Bangkok",

    appDescription: "Your App Description.",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  })
);

const queryClient = new QueryClient();
export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [session] = useState<Session | null>(null);

  return (
    <SessionProvider session={session}>
      <WagmiProvider
        config={connectkitConfig}
        initialState={props.initialState}
      >
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <OnchainKitProvider
                apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
                chain={sepolia}
              >
                {props.children}
              </OnchainKitProvider>
            </div>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
