'use client'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { Base, BaseSepolia } from '@/chains';
import { createPublicClient, http } from 'viem'

const projectId = '7e1ca3c31276b2eafe50979f4372d0cc';

const metadata = {
  name: 'Aetheria',
  description: 'Decentralized NFT marketplace',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};




const { chains } = configureChains([Base, BaseSepolia], [publicProvider()]);

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  enableAnalytics: true
})

export function Web3Modal({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}