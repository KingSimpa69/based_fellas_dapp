import { useMemo, useEffect, useState } from "react";
import BLOCKSCOUT from "@/blockscout.json";
import { isAddress,formatEther } from "ethers"
import AssetsLoading from "./AssetsLoading";
import NoAssets from "./NoAssets";
import { debounce } from "lodash";
import styles from "@/styles/Wallet.module.css"
import Image from "next/image";
import { useEthersProvider, useEthersSigner } from "@/hooks/useEthers";
import readContract from "@/functions/readContract";
import writeContract from "@/functions/writeContract";
import formatETH from "@/functions/formatEth";
import checkType from "@/functions/checkType";

const FellasList = ({ web3Shit,alert,setIsLoading, setFellasModalShit }) => {
    const [ownedList, setOwnedList] = useState([]);
    const [lSBalances,setLSBalances] = useState([])
    const [firstLoad, setFirstLoad] = useState(true);

    const provider = useEthersProvider()
    const signer = useEthersSigner()

    const lazyStakingContract = {
        addy: "0x04259a4FE9b04768e1323d005042E3B62D8D2611",
        name: "lazy"
    }

    const claim = async(id) => {
        setIsLoading(true)
        try{
            const tx = await writeContract(signer,lazyStakingContract,"claim",id,{})
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

    const getBalances = async (idArray) => {
        try{
            const bals = await readContract(provider,lazyStakingContract,"batchFellaUnpaid",[idArray])
            setLSBalances(bals)
        } catch (e) {
            console.log(e)
        }
    }

    const pullOwned = async () => {
        try {
            let uniqueToken = null;
            let owned = [];
            console.log("requesting")
            do {
                const result = await fetch(`${BLOCKSCOUT[web3Shit.chain]}/api/v2/tokens/0x217Ec1aC929a17481446A76Ff9B95B9a64F298cF/instances?holder_address_hash=${web3Shit.address}${uniqueToken ? `&unique_token=${uniqueToken}` : ''}`);
                const formatted = await result.json();
                owned = owned.concat(formatted.items);
                uniqueToken = formatted.next_page_params?.unique_token;
            } while (uniqueToken !== undefined);
            const ownedSorted = owned.sort((a, b) => parseInt(a.id) - parseInt(b.id));
            setOwnedList(ownedSorted);
            setFirstLoad(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (ownedList.length > 0) {
            const idArray = ownedList.map(e=>e.id)
            if (idArray.length > 0) {
                getBalances(idArray);
                const intervalId = setInterval(() => {
                    getBalances(idArray);
                }, 30000); 
                return () => clearInterval(intervalId);
            }
        }
    }, [ownedList])
    

    useEffect(() => {
        const debouncedPullOwned = debounce(() => {
            if (isAddress(web3Shit.address)) {
                pullOwned();
            }
        }, 300);

        debouncedPullOwned();
        
        return () => {
            debouncedPullOwned.cancel();
        };
    }, [web3Shit]); 

    return (
        firstLoad ? <AssetsLoading /> :
        ownedList.length === 0 ? <NoAssets type={"Fellas"} /> :
        ownedList.map((e,index)=>{
            return(
                <div key={index} className={styles.asset}>
                    <Image alt={"fella"+e.id} fill sizes={"width:100%"} src={`/images/fellas/${e.id}.png`}/>
                    <div onClick={()=>setFellasModalShit(e)} className={styles.assetOverlay}></div>
                    <div className={styles.idOverlay}>{e.id}</div>
                    <div onClick={()=>claim(parseInt(e.id))} className={styles.lazyStakingOverlay}><Image alt={"fellacoinlogo"} src={"/images/icons/fella.png"} width={15} height={15} />{lSBalances[index] && formatETH(formatEther(lSBalances[index]))}</div>
                </div>
                
            )
        })
    );
}

export default FellasList;
