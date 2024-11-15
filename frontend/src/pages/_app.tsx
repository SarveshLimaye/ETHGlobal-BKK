import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Providers } from "@/utils/providers";
import "@coinbase/onchainkit/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
