import styles from "@/styles/Wallet.module.css"
import Image from "next/image"

const FellasModal = ({fellasModalShit:data,setFellasModalShit,togglePhone}) => {

    return( Object.keys(data).length !== 0 &&
        <div onClick={()=>setFellasModalShit({})} className={styles.fellasModalWrap}>
            <div style={{fontFamily:"inter",color:"#ffffff"}}>CLICK OUTSIDE TO CLOSE</div>
            <div onClick={(e)=>e.stopPropagation()} className={styles.fellasModalCont}>
                <div className={styles.fellasModalTop}>
                    <div className={styles.fellasModalTopFifty}>
                        <div className={styles.fellasModalId}>{data.id}</div>
                        <Image alt={"fella"+data.id+"mug"} src={`/images/fellas/${data.id}.png`} width={150} height={150}/>
                    </div>
                    <div className={styles.fellasModalTopFifty}>
                        <div className={styles.traitsHeader}>Traits</div>
                        <div className={styles.traitsCont}>
                                {data.metadata.attributes.map((e,index)=>{
                                    return(
                                    <div key={index+index} className={styles.trait}>
                                        <div>{e.value}</div>
                                        <div>{e.trait_type}</div>
                                    </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
                
            
                <a className={styles.ipfsimage} target="_blank" href={`https://ipfs.basedfellas.io/ipfs/bafybeihox5skzzewbpyf6crsgxddcxkyrssy4wpbcc4dchpbyd55zaft5m/${data.id}.png`}><div className={styles.fellasModalButton}>Image</div></a>
                <a className={styles.ipfsmeta} target="_blank" href={`https://ipfs.basedfellas.io/ipfs/bafybeigr7b3cbyrhyjnmv6nx7itr7v25ghqqhfzb23owwvtmaj7vh5vlr4/${data.id}`}><div className={styles.fellasModalButton}>Metadata</div></a>
                <div onClick={()=>togglePhone(true)} className={styles.fellasModalButton}>Lazy Staking</div>
            </div>
        </div>
    )
}

export default FellasModal