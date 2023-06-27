import AppContextProvider from "@/contexts/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const activeChain = ChainId.Goerli;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <ThirdwebProvider activeChain={activeChain} autoConnect>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </AppContextProvider>
  );
}
