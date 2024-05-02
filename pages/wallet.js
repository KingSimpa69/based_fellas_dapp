import Breadcrumbs from "@/components/Breadcrumbs"
import WalletNotConnected from "@/components/WalletNotConnected"
import WalletWrongChain from "@/components/WalletWrongChain"
import AssetLoader from "@/components/wallet/AssetLoader"
import BalanceBar from "@/components/wallet/BalanceBar"
import { useEffect,useState } from "react"


const Wallet = ({routeChange,router,windowSize,web3Shit,alert,setIsLoading,setFellasModalShit,fellasModalShit,toggleFellasModal}) => {

    const [page,setPage] = useState(0)


    useEffect(() => {
        Object.keys(fellasModalShit).length !== 0 ? toggleFellasModal(true) : toggleFellasModal(false)
    }, [fellasModalShit])
    
    return( !web3Shit.isConnected ? <WalletNotConnected /> : web3Shit.isConnected && web3Shit.chain !== 8453 ? <WalletWrongChain /> :
        <div className={"wrapper"}>
            
            <Breadcrumbs changeRoute={routeChange} route={router}  />
            <BalanceBar setPage={setPage} web3Shit={web3Shit}/>
            <AssetLoader setFellasModalShit={setFellasModalShit} alert={alert} setIsLoading={setIsLoading} web3Shit={web3Shit} page={page}/>
        </div> 
    )
}

export default Wallet