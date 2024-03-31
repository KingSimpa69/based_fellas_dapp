import styles from '@/styles/Nav.module.css'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useEffect,ues } from 'react'
import { useChainId, useAccount } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEthersProvider, useEthersSigner } from "@/hooks/useEthers";
import { shortenEthAddy } from '@/functions/shortenEthAddy';

const Web3Status = ({router,setWeb3Shit,web3Shit}) => {

    const {address, isConnected} = useAccount()
    const { open } = useWeb3Modal()
    const provider = useEthersProvider()
    const signer = useEthersSigner()

    const getChain = async () => {
        const { chainId } = await provider.getNetwork()
        setWeb3Shit({ chain: parseInt(chainId), address: address, isConnected: isConnected })
    }
  
    useEffect(() => {
            getChain()
    }, [address, isConnected,provider,signer])

    return(
        <div>
            {!web3Shit.isConnected ? <div className={styles.connectButton} onClick={() => open({view:'Connect'})}>Connect</div>:
            <div className={styles.connectedButton} onClick={() => open({ view: 'Account' })}>{shortenEthAddy(web3Shit.address)}</div>}
        </div>
    )
}

export default Web3Status