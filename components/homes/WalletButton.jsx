import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@/styles/Homes.module.css"


const WalletButton = ({routeChange}) => {

    return(
        <div onClick={()=>routeChange("/homes/wallet")} className={styles.walletButton}>
            <FontAwesomeIcon icon="fa-solid fa-wallet" />
        </div>
    )
}

export default WalletButton