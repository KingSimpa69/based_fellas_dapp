import Breadcrumbs from "@/components/Breadcrumbs"
import WalletNotConnected from "@/components/WalletNotConnected"
import WalletWrongChain from "@/components/WalletWrongChain"
import AssetLoader from "@/components/wallet/AssetLoader"
import BalanceBar from "@/components/wallet/BalanceBar"
import FellasModal from "@/components/wallet/FellasModal"
import styles from "@/styles/Wallet.module.css"
import { useEffect,useState } from "react"


const Wallet = ({routeChange,router,windowSize,web3Shit,alert,setIsLoading}) => {

    const [page,setPage] = useState(0)
    const [fellasModal,toggleFellasModal] = useState(false)
    const [fellasModalShit,setFellasModalShit] = useState({})

    useEffect(() => {
        Object.keys(fellasModalShit).length !== 0 ? toggleFellasModal(true) : toggleFellasModal(false)
    }, [fellasModalShit])
    

    return( !web3Shit.isConnected ? <WalletNotConnected /> : web3Shit.isConnected && web3Shit.chain !== 8453 ? <WalletWrongChain /> :
        <div className={"wrapper"}>
            {fellasModal&&<FellasModal alert={alert} setIsLoading={setIsLoading} setFellasModalShit={setFellasModalShit} fellasModalShit={fellasModalShit}/>}
            <Breadcrumbs changeRoute={routeChange} route={router}  />
            <BalanceBar setPage={setPage} web3Shit={web3Shit}/>
            <AssetLoader setFellasModalShit={setFellasModalShit} alert={alert} setIsLoading={setIsLoading} web3Shit={web3Shit} page={page}/>
        </div> 
    )
}

export default Wallet