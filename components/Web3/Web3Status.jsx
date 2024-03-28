import styles from '@/styles/Nav.module.css'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useEffect } from 'react'
import { useChainId, useAccount } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shortenEthAddy } from '@/functions/shortenEthAddy';

const Web3Status = ({router,setWeb3Shit,web3Shit}) => {

    const chainId = useChainId()
    const {address, isConnected} = useAccount()
    const { open } = useWeb3Modal()
  
    useEffect(() => {
        if (web3Shit.chain !== chainId || web3Shit.address !== address || web3Shit.isConnected !== isConnected) {
            setWeb3Shit({ chain: chainId, address: address, isConnected: isConnected })
        }
    }, [address, isConnected, chainId, setWeb3Shit, web3Shit])

    return(
        <div>
            {!web3Shit.isConnected ? <div className={styles.connectButton} onClick={() => open({view:'Connect'})}>Connect</div>:
            <div className={styles.connectedButton} onClick={() => open({ view: 'Account' })}>{shortenEthAddy(web3Shit.address)}</div>}
        </div>
    )
}

export default Web3Status