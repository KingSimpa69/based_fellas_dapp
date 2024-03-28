import Image from "next/image"
import styles from "@/styles/Collection.module.css"

const Fella = ({nft}) => {
  
    return(
    <div className={`${styles.fella}`}>
    <div className={styles.fellaoverlay}><h1>{nft._id}</h1></div>
      <Image
        src={`/images/fellas/${nft._id}.png`}
        fill={true}
        alt={nft._id}
        unoptimized
      />
    </div>
    )
}

export default Fella