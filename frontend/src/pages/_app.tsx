import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Providers } from "@/utils/providers";
import Navbar from "@/components/Navbar/Navbar";
import "@coinbase/onchainkit/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Navbar />
      <Component {...pageProps} />
    </Providers>
  );
}
