import styles from "@/styles/Fella.module.css"
import Stat from "./Stat"

const Stats = ({stats}) => {

    return(
        <div className={styles.statContainer}>
            <Stat stats={stats} label={"Price"} />
            <Stat stats={stats} label={"Marketcap"}/>
            <Stat stats={stats} label={"Liquidity"}/>
            <Stat stats={stats} label={"Holders"}/>
            <Stat stats={stats} label={"Supply"}/>
        </div>
    )

}

export default Stats