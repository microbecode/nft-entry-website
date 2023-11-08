import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
  name: "Next Starter Template",
  description: "A Next.js starter template with Web3Modal v3 + Wagmi",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

if (!process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
  console.error("No NFT address specified. Fix your .env");
}
if (!process.env.NEXT_PUBLIC_PROVIDER_URL) {
  console.error("No provider specified. Fix your .env");
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  projectId,
});

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <>
          <Component {...pageProps} />
        </>
      ) : null}
    </>
  );
}
