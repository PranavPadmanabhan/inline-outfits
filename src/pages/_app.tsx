import AppContextProvider from "@/contexts/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import AuthLayout from "@/layout/AuthLayout";

const activeChain = ChainId.Goerli;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <ThirdwebProvider activeChain={activeChain} autoConnect>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </ThirdwebProvider>
    </AppContextProvider>
  );
}
