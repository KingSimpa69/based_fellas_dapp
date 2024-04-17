import styles from "@/styles/Fella.module.css"

const Stat = ({label,stats}) => {

    const displayedStat = label === "Price" ? stats[0] :
    label === "Marketcap" ? parseFloat(stats[0]) * parseInt(stats[3]) :
    label === "Liquidity" ? stats[1] :
    label === "Holders" ? stats[2] :
    label === "Supply" ? stats[3] : null

    const prefix = label === "Price" ? "$" : 
    label === "Marketcap" ? "$" :
    label === "Liquidity" ? "$" :
    label === "Holders" ? "" :
    label === "Supply" ? "" : null

    return(
    <div className={styles.statItem}>
        <div className={styles.statValue}>{prefix+displayedStat?.toLocaleString()}</div>
        <div className={styles.statLabel}>{label}</div>
    </div>
    )
}

export default Stat