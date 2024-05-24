import Breadcrumbs from "@/components/Breadcrumbs"
import { shortenEthAddy } from "@/functions/shortenEthAddy"
import styles from "@/styles/Homes.module.css"
import Image from "next/image"

const Homes = ({router,routeChange,alert,windowSize}) => {

    const copyToClipboard = () => {
        navigator.clipboard.writeText("0x122A3f185655847980639E8EdF0F0f66cd91C5fE");
        alert("success","Copied to clipboard")
    }

    return(
        <div className={"wrapper"}>
            <Breadcrumbs changeRoute={routeChange} route={router} />
            <div className={styles.h1}>HOMES</div>
            <div className={styles.container}>
                <div className={styles.item}>
                    <div className={styles.containerHeader}>What are HOMES?</div>
                    <div className={styles.containerP}>
                    Homes are the place where all Based Fellas and their friends reside inside of the Based Fella universe.
                    The purpose for homes is to provide an outlet for active staking for supported NFTS. 
                    By staking a Based Fella or any supported partner project NFT in home, you can start to reap the benefits of the Based Fella ecosystem.
                    </div>
                </div>
                <div className={`${styles.item} ${styles.offset}`} >
                    <div className={styles.containerHeader}>HOMES Info</div>
                    <div className={styles.tokenInfoItem}>
                    <div onClick={()=>copyToClipboard()} className={styles.addyButton}>{windowSize.width<=450?shortenEthAddy("0x89b76460172f88a851Fb17617f9dc3448646931A"):"0x89b76460172f88a851Fb17617f9dc3448646931A"}</div>
                    </div>
                    <div className={styles.statCont}>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>5000</div>
                            <div className={styles.statLabel}>Homes</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>32,000</div>
                            <div className={styles.statLabel}>Inhabitants</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>+10M FELLA</div>
                            <div className={styles.statLabel}>FELLA Allocation</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>8</div>
                            <div className={styles.statLabel}>Partner Projects</div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.item} ${styles.movetoFront}`} >
                    <div className={styles.containerHeader}>Partner Projects</div>
                    <div className={styles.partnerProjects}>
                    Based Nouns, *Onchain Dinos, Shredding Sassys, *Mystcl<br/> Base Brigade, onchain hunks, Base Pixel Gods, and Small Bros
                    </div>
                    <div className={styles.partnerDenote}>Projects marked with an asterisk (*) conatin more than one collection</div>
                </div>
            </div>
        </div>
    )

}

export default Homes