import styles from"@/styles/Wallet.module.css"
import FellasList from "./FellasList"

const AssetLoader = ({page,web3Shit,alert,setIsLoading,setFellasModalShit,lSBalances,setLSBalances,togglePhone,toggleFellasModal,ownedList,setOwnedList}) => {

    return(
        <div className={styles.assetContainer}>
            {page === 0 && <FellasList ownedList={ownedList} setOwnedList={setOwnedList} toggleFellasModal={toggleFellasModal} togglePhone={togglePhone} lSBalances={lSBalances} setLSBalances={setLSBalances} setFellasModalShit={setFellasModalShit} alert={alert} setIsLoading={setIsLoading} web3Shit={web3Shit} />}
        </div>    
    )
}

export default AssetLoader