import styles from "@/styles/Homes.module.css"
import Breadcrumbs from "@/components/Breadcrumbs"
import { useState,useEffect } from "react"
import Image from "next/image"
import { useEthersProvider, useEthersSigner } from "@/hooks/useEthers";
import writeContract from "@/functions/writeContract";
import readContract from "@/functions/readContract";


const Wallet = ({routeChange,router,web3Shit}) => {

    const provider = useEthersProvider()
    const signer = useEthersSigner()

    const [holdings,setHoldings] = useState([])
    const [chain,setChain] = useState(0)

    const homesContract = [
        "0x89b76460172f88a851Fb17617f9dc3448646931A", //Base
        "0x9b2EcBb9fd655ac7eFB7789350B36bBF6cf048E7"  //Base-Sepolia
    ]

    const contractInfo = {
        addy: homesContract[chain],
        name: "homes"
      }

      const pullOwned = async (chain) => {
        setChain(chain);
        try {
            const holding = [];
            let uniqueToken = null;
            do {
                const result = await fetch(`https://base.blockscout.com/api/v2/tokens/${homesContract[chain]}/instances?holder_address_hash=${web3Shit.address}${uniqueToken ? `&unique_token=${uniqueToken}` : ''}`);
                const formatted = await result.json();
                for (const item of formatted.items) {
                    const result = await readContract(provider, contractInfo, "balanceOf", [web3Shit.address, parseInt(item.id)]);
                    holding.push({ id: item.id, amount: parseInt(result) });
                }
                uniqueToken = formatted.next_page_params?.unique_token;
            } while (uniqueToken !== undefined);
            setHoldings(holding);
        } catch (error) {
            console.log(error);
        }
    };
    

    useEffect(() => {
        web3Shit.chain === 8453 ? pullOwned(0) :
        web3Shit.chain === 84532 ? pullOwned(1) :
        null
    }, [web3Shit]) 

    return(
        <div className={"wrapper"}>
            <Breadcrumbs changeRoute={routeChange} route={router} custom={"/homes"} />
            {!web3Shit.isConnected ? <div className={styles.loadingMsg}>Please connect a wallet!</div> : 
            holdings.length === 0 ? <div className={styles.loadingMsg}>Loading...</div>:null}
            <div className={styles.homesInWalletWrap}>
                {
                    holdings.map((e,index) =>{
                        return(
                            <div key={index} className={styles.homesInWallet}>
                                <Image alt={index} src={`/images/homes/${e.id}.png`} fill sizes="100%" />
                                <h1>x{e.amount}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Wallet