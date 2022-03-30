import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CryptContext, CryptProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CryptProvider>
      <Component {...pageProps} />
    </CryptProvider>
  );
}

export default MyApp;
