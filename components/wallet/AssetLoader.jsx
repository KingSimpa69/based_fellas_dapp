import styles from"@/styles/Wallet.module.css"
import FellasList from "./FellasList"

const AssetLoader = ({page,web3Shit,alert,setIsLoading,setFellasModalShit}) => {

    return(
        <div className={styles.assetContainer}>
            {page === 0 && <FellasList setFellasModalShit={setFellasModalShit} alert={alert} setIsLoading={setIsLoading} web3Shit={web3Shit} />}
        </div>    
    )
}

export default AssetLoader