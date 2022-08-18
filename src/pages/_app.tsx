import '../styles/globals.css'
import type { AppProps } from 'next/app'

import {
  WagmiConfig,
  createClient,
  chain,
  configureChains,
} from "wagmi";

import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { AppWrapper } from '@components/utils/AppContext'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const { chains, provider, webSocketProvider } = configureChains([chain.polygon], [
  infuraProvider({ apiKey: infuraId }),
  publicProvider(),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Lensdrop",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>
    </AppWrapper>
  )
}

export default MyApp
