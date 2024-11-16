import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Providers } from "@/utils/providers";
import dynamic from "next/dynamic";
import "@coinbase/onchainkit/styles.css";

const Navbar = dynamic(() => import("@/components/Navbar/Navbar"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Navbar />
      <Component {...pageProps} />
    </Providers>
  );
}
