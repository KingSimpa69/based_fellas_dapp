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
import LazyStakingContracts from "@/LazyStakingContracts.json"

const FellasList = ({ web3Shit, setFellasModalShit,lSBalances,setLSBalances,togglePhone,toggleFellasModal,ownedList,setOwnedList }) => {

    const [firstLoad, setFirstLoad] = useState(true);

    const provider = useEthersProvider()

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

    const openFromMain = async(obj) => {
        try{
            setFellasModalShit(obj) 
            togglePhone(true)
        } catch (e){
            console.log(e)
        } finally {
            toggleFellasModal(false)
        }
    }

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
                    <div onClick={()=>setFellasModalShit({...e,index:index})} className={styles.assetOverlay}></div>
                    <div className={styles.idOverlay}>{e.id}</div>
                    <div onClick={()=>openFromMain({...e,index:index})} className={styles.lazyStakingOverlay}><Image alt={"fellacoinlogo"} src={"/images/icons/fella.png"} width={15} height={15} /></div> 
                </div>
                
            )
        })
    );
}

export default FellasList;
