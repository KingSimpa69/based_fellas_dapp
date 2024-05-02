import { useWeb3Modal } from '@web3modal/wagmi/react'

const WalletNotConnected = () => {

    const { open } = useWeb3Modal()

    return(
        <div className={"wrapper"}>
            <div className={"walletNotConnected"}>
                <p onClick={()=>open({ view: 'Connect' })}>Please connect a wallet</p>
            </div>
        </div>
    )
}

export default WalletNotConnected