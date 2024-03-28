import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/Homes.module.css"
import Image from "next/image";
import dynamic from "next/dynamic";
const CountdownTimer = dynamic(() => import('../components/Countdown'), { ssr: false })

const Homes = ({routeChange,router,windowSize}) => {

  return (
    <div className="wrapper">
      <Breadcrumbs changeRoute={routeChange} route={router} />
      <div className={styles.wrapper}>
        <div className={windowSize.width < 1000 ? "hidden" : `${styles.container} ${styles.homeimg}`}>
          <p>HOMES</p>
          <Image src={"/images/6.png"} width={420} height={420}/>
        </div>
        <div className={`${styles.container} ${styles.mintCont}`}>
            <h1>MINT</h1>
            <p className={styles.mintDesc}>Mint a home! Own a residence in the Based Fellas universe!<br />
            These homes aren&apos;t just limited to Based Fellas residents, but many other Fella friend NFTs!</p>
            <div className={styles.button}>MINT</div>
            <p className={styles.mintSupply}>0/5000</p>
            <div className={styles.countdown}><CountdownTimer targetDate={"2024-03-31T00:00:00.000Z"} /></div>
        </div>
      </div>
    </div>
  )
}

export default Homes
