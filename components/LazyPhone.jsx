import styles from "@/styles/Wallet.module.css"
import Image from "next/legacy/image"
import LazyStakingContracts from "@/LazyStakingContracts.json"
import formatETH from "@/functions/formatEth"
import { formatEther } from "ethers"
import readContract from "@/functions/readContract";
import writeContract from "@/functions/writeContract"
import { useEthersProvider, useEthersSigner } from "@/hooks/useEthers";
import checkType from "@/functions/checkType"

const LazyPhone = ({open,togglePhone,fellasModalShit,lSBalances,alert,setIsLoading,ownedList,setLSBalances,toggleFellasModal}) => {

    const provider = useEthersProvider()
    const signer = useEthersSigner()

    const getBalances = async (idArray) => {
        let balances = []
        try {
            const promises = LazyStakingContracts.map(async (e) => {
                const contract = {
                    addy: e.contract,
                    name: "lazy"
                }
                const bals = await readContract(provider, contract, "batchFellaUnpaid", [idArray])
                return bals
            })
            balances = await Promise.all(promises)
        } catch (error) {
            console.log(error)
        } finally {
            setLSBalances(balances)
        }
    
    }

    return( open &&
        <div onClick={()=>togglePhone(false)} className={styles.phoneWrapper}>
            <div className={styles.phoneContainer}>
            <Image priority src={"/images/phone.png"} layout="fill" objectFit="contain" />
                <div onClick={(e)=>e.stopPropagation()} className={styles.phoneScreen}>
                    <div className={styles.phoneHeader}>My Rewards</div>
                    {LazyStakingContracts.map((e,index)=>{
                        let contract = {
                            addy: LazyStakingContracts[index].contract,
                            name: "lazy"
                        }
                        const claim = async(id) => {
                            setIsLoading(true)
                            try{
                                const tx = await writeContract(signer,contract,"claim",id,{})
                                const type = checkType(tx)
                                type === "string" ? alert("error",tx) : alert("success","Lazy stake claimed",tx.tx.hash) 
                            } catch (e) {
                                console.log(e)
                            } finally {
                                const idArray = ownedList.map(e=>e.id)
                                getBalances(idArray);
                                setIsLoading(false)
                            }
                        }
                        return(
                        <div key={index} className={styles.phoneItem}>
                            <div className={styles.projectLogo}><Image src={`${e.image}`} width={30} height={30} /></div>
                            <div className={styles.projectName}>{e.name}</div>
                            {e.name === "FELLA" ||  e.name === "RIKY" ? 
                            <div onClick={()=>claim(parseInt(fellasModalShit.id))} className={styles.claimButton}>{formatETH(formatEther(lSBalances[index][parseInt(fellasModalShit.index)]))}</div> :
                            <div onClick={()=>alert("info","Coming soon")} className={styles.greyedOutButton}>0</div>
                        }
                            
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default LazyPhone