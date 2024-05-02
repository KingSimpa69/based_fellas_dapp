import { useWeb3Modal } from '@web3modal/wagmi/react'

const WalletWrongChain = () => {

    const { open } = useWeb3Modal()

    return(
        <div className={"wrapper"}>
            <div className={"walletNotConnected"}>
                <p onClick={()=>open({ view: 'Networks' })}>Please connect to BASE</p>
            </div>
        </div>
    )
}

export default WalletWrongChain