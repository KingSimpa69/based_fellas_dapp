import styles from "@/styles/Wallet.module.css"
import Image from "next/image"
import { useState,useEffect } from "react";
import { useEthersProvider, useEthersSigner } from "@/hooks/useEthers";
import readContract from "@/functions/readContract";
import writeContract from "@/functions/writeContract";
import formatETH from "@/functions/formatEth";
import { isAddress,formatEther } from "ethers"
import checkType from "@/functions/checkType";

const FellasModal = ({fellasModalShit:data,setFellasModalShit,alert,setIsLoading}) => {

    const provider = useEthersProvider()
    const signer = useEthersSigner()

    const lazyStakingContract = {
        addy: "0x04259a4FE9b04768e1323d005042E3B62D8D2611",
        name: "lazy"
    }

    const [lsBalance,setLsBalance] = useState(0)

    const getBalance = async() => {
            try{
                const bals = await readContract(provider,lazyStakingContract,"fellaUnpaid",[parseInt(data.id)])
                setLsBalance(formatETH(formatEther(bals)))
            } catch (e) {
                console.log(e)
            }
    }

    const claim = async() => {
        setIsLoading(true)
        try{
            const tx = await writeContract(signer,lazyStakingContract,"claim",parseInt(data.id),{})
            const type = checkType(tx)
            type === "string" ? alert("error",tx) : alert("success","Lazy stake claimed",tx.tx.hash) 
        } catch (e) {
            console.log(e)
        } finally {
            getBalance();
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getBalance()
        const intervalId = setInterval(() => {
            getBalance()
        }, 10000); 
        return () => clearInterval(intervalId);
    }, [])

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
                        <div className={styles.traitsHeader}>Lazy Staking Balance</div>
                        <div className={styles.traitsCont} style={{marginRight:"0"}}>
                            <div className={styles.modalLazyStakingBalance}><Image alt={"fellacoinlogo"} src={"/images/icons/fella.png"} width={20} height={20} /><div style={{fontFamily:"numbas"}}>{lsBalance}</div></div>
                        </div>
                    </div>
                </div>
                
            
                <a className={styles.ipfsimage} target="_blank" href={`https://ipfs.basedfellas.io/ipfs/bafybeihox5skzzewbpyf6crsgxddcxkyrssy4wpbcc4dchpbyd55zaft5m/${data.id}.png`}><div className={styles.fellasModalButton}>Image</div></a>
                <a className={styles.ipfsmeta} target="_blank" href={`https://ipfs.basedfellas.io/ipfs/bafybeigr7b3cbyrhyjnmv6nx7itr7v25ghqqhfzb23owwvtmaj7vh5vlr4/${data.id}`}><div className={styles.fellasModalButton}>Metadata</div></a>
                <div onClick={()=>claim()} className={styles.fellasModalButton}>Claim Stake</div>
            </div>
        </div>
    )
}

export default FellasModal