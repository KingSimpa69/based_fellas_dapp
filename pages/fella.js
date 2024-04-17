import Breadcrumbs from "@/components/Breadcrumbs"
import Stats from "@/components/fella/Stats"
import StatsMobile from "@/components/fella/StatsMobile"
import { shortenEthAddy } from "@/functions/shortenEthAddy"
import styles from "@/styles/Fella.module.css"
import Image from "next/image"
import { useState,useEffect } from "react"

const Fella = ({router,routeChange,alert,windowSize}) => {

    // Stat array legend
    //
    // 0. Price
    // 1. Liquidity
    // 2. Holders
    // 3. Supply

    const [stats,setStats] = useState([])

    const copyToClipboard = () => {
        navigator.clipboard.writeText("0x122A3f185655847980639E8EdF0F0f66cd91C5fE");
        alert("success","Copied to clipboard")
    }

    const getTheShit = async () => {
        const request1 = await fetch("https://api.dexscreener.com/latest/dex/pairs/base/0xe883478f462a3d2006ea7200cc9a970537ba3ec0")
        const response1 = await request1.json()
        const request2 = await fetch("https://base.blockscout.com/api/v2/tokens/0x122A3f185655847980639E8EdF0F0f66cd91C5fE")
        const response2 = await request2.json()
        setStats([
            response1.pairs[0].priceUsd,
            parseInt(response1.pairs[0].liquidity.usd),
            response2.holders,
            response2.total_supply / 10 ** 18
        ])
    }

    useEffect(()=>{
        getTheShit()
    },[])

    return(
        <div className={"wrapper"}>
            <Breadcrumbs changeRoute={routeChange} route={router} />
            <div className={styles.h1}>FELLA TOKEN</div>
            {windowSize.width < 1169 ? <StatsMobile stats={stats}/> : <Stats stats={stats}/>}
            <div className={styles.tokenInfo}>
                <div className={styles.tokenInfoItem}>
                    <Image src={"/images/coin_logo.png"} width={100} height={100} />
                    <div onClick={()=>copyToClipboard()} className={styles.addyButton}>{windowSize.width<=450?shortenEthAddy("0x122A3f185655847980639E8EdF0F0f66cd91C5fE"):"0x122A3f185655847980639E8EdF0F0f66cd91C5fE"}</div>
                </div>
                <div className={styles.tokenInfoItem}>
                    <div className={styles.tokenInfoContainer}>
                    <div className={styles.tokenInfoHeader}>
                        What is FELLA?
                    </div>
                    <div className={styles.tokenInfoP}>
                        {`FELLA is the official currency of the Based Fellas universe. 
                        Backed by various Web3 applications (dApps), including tools, games, and utilities that engage and assist users within the ecosystem. 
                        Each application collects micro-fees in ETH, which are then used to purchase FELLA on the open market. 
                        The acquired FELLA is distributed among all the Homes in the Based Fellas universe. 
                        In summary, FELLA is a liquid asset that funnels utility fees back to Home owners in the Based Fellas universe.
`}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Fella