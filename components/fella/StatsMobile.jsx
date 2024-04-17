import styles from "@/styles/Fella.module.css"
import MobileStat from "./MobileStat"

const StatsMobile = ({stats}) => {

    return(
        <div className={styles.mobileStats}>
            <MobileStat stats={stats} label={"Price"} />
            <MobileStat stats={stats} label={"Marketcap"}/>
            <MobileStat stats={stats} label={"Liquidity"}/>
            <MobileStat stats={stats} label={"Holders"}/>
            <MobileStat stats={stats} label={"Supply"}/>
        </div>
    )
}

export default StatsMobile