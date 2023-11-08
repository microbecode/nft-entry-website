import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

import {
  WagmiConfig,
  configureChains,
  createConfig,
  sepolia,
  useAccount,
  useContractRead,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

export default function Home() {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia], // TODO: Choose network
    [publicProvider()]
  );

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });

  const { address } = useAccount();

  if (address) {
  }

  const nft = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

  const { data, isError, isLoading, refetch } = useContractRead({
    address: nft as `0x${string}`,
    abi: [
      {
        name: "balanceOf",
        inputs: [{ name: "owner", type: "address" }],
        outputs: [{ name: "balance", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: [address],
    watch: false,
    enabled: !!address,
  });

  console.log("USING", address, data);

  const contents = (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1>Next.js Starter Template</h1>
          <div className={styles.content}>
            <ul>
              <li>
                Edit <code>pages/index.tsx</code> and save to reload.
              </li>
              <li>
                Click{" "}
                <span
                  onClick={() => {
                    setIsConnectHighlighted(!isConnectHighlighted);
                    setIsNetworkSwitchHighlighted(false);
                  }}
                  className={styles.button}
                >
                  Connect Wallet
                </span>{" "}
                to connect to a WalletConnect v2.0 compatible wallet.
              </li>
              <li>
                Click{" "}
                <span
                  onClick={() => {
                    setIsNetworkSwitchHighlighted(!isNetworkSwitchHighlighted);
                    setIsConnectHighlighted(false);
                  }}
                  className={styles.button}
                >
                  Select Network
                </span>{" "}
                to change networks.
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            height={16}
            width={16}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
          <a
            href="https://docs.walletconnect.com/web3modal/react/about?utm_source=next-starter-template&utm_medium=github&utm_campaign=next-starter-template"
            target="_blank"
          >
            Check out the full documentation here
          </a>
        </div>
      </div>
    </main>
  );

  const header = (
    <>
      <WagmiConfig config={config}>
        <Head>
          <title>WalletConnect | Next Starter Template</title>
          <meta name="description" content="Generated by create-wc-dapp" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <div
            className={styles.backdrop}
            style={{
              opacity:
                isConnectHighlighted || isNetworkSwitchHighlighted ? 1 : 0,
            }}
          />
          <div className={styles.header}>
            <div className={styles.buttons}>
              {/*  <div
                onClick={closeAll}
                className={`${styles.highlight} ${
                  isNetworkSwitchHighlighted ? styles.highlightSelected : ``
                }`}
              >
                <w3m-network-button />
              </div> */}
              {/* <div
                onClick={closeAll}
                className={`${styles.highlight} ${
                  isConnectHighlighted ? styles.highlightSelected : ``
                }`}
              > */}

              {/*  </div> */}
            </div>
          </div>
        </header>
      </WagmiConfig>
      {!address ? <w3m-connect-button /> : ""}
      {!!address ? <w3m-account-button balance="hide" /> : ""}

      {address && data && BigInt(data as any) > 0 ? contents : "Access denied"}
    </>
  );

  return header;
}
