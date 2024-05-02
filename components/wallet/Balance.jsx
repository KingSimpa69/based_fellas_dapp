import Image from "next/image"
import styles from "@/styles/Wallet.module.css"

const Balance = ({type,balances}) => {

    return(
        <div className={styles.balWrapper}>
            <div className={styles.balanceItem}>
                <div className={styles.balLogo}><Image alt={`${type}-icon`} src={type === "fellas" ? "/images/icons/fellas.png" : type === "fella" ? "/images/icons/fella.png" : "/images/icons/homes.png"} width={25} height={25} /></div>
                <div className={styles.balValue}>{type === "fellas" ? balances[0].toLocaleString() : type === "fella" ? balances[1].toLocaleString() : balances[2].toLocaleString()}</div>
            </div>
            <div className={styles.balLabel}>{type}</div>
        </div>
    )
}

export default Balance