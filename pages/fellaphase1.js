import Breadcrumbs from "@/components/Breadcrumbs";
import { useEthersProvider, useEthersSigner } from "@/hooks/useEthers";
import writeContract from "@/functions/writeContract";
import readContract from "@/functions/readContract";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import checkType from "@/functions/checkType";
import styles from "@/styles/FellaPhase1.module.css"

const fellaphase1 = ({routeChange,router,web3Shit,alert,setIsLoading}) => {

    const provider = useEthersProvider()
    const signer = useEthersSigner()

    const { open } = useWeb3Modal()

    const contractInfo = {
        addy: "0x122A3f185655847980639E8EdF0F0f66cd91C5fE",
        name: "fella"
      }

    const setMerkle = async () => {
        const proofsRequest = await fetch('https://raw.githubusercontent.com/KingSimpa69/fella_merkle_proofs/main/phase1Proofs.json');
        const proofs = await proofsRequest.json(); 
        console.log(proofs[web3Shit.address.toLowerCase()])
        try{
            if(web3Shit.chain === 8453){
              const tx = await writeContract(signer,contractInfo,"setMerkleProof",proofs[web3Shit.address.toLowerCase()],{})
              const type = checkType(tx)
              type === "string" ? alert("error",tx) : alert("success","You're ready for phase 1",tx.tx.hash)
            } else {
              alert("error","You're on the wrong chain fella!")
              open({view:"Networks"})
              return
            }
          } finally {
            setIsLoading(false)
          }
    }

    return(
        <div className={'wrapper'}>
            <Breadcrumbs changeRoute={routeChange} route={router}  />
            {web3Shit.isConnected?
            <div className={styles.container}>
                <h1 className={styles.h1}>Phase 1 Wallet Validation</h1>
                <p className={styles.infobox}>In a scenario where we own the backend, we can supply the frontend with the merkle proofs.<br/>Unfortuntley, we do not own SushiSwap. In order to have your merkle proofs made
                    available outside of our dapp, each wallet can retreive them via this page and submit them to the FELLA smart contract with the click of a button!<br/>This way your wallet will be validated in the merkletree directly onchain 
                    at token swap.
                </p>
              <div className={styles.button} onClick={()=>setMerkle()}>Write Proofs</div>  
            </div>:
            <div className={styles.h1} style={{marginTop:"50px",fontSize:"20px"}}>
                Please connect a wallet
            </div>}
        </div>
    )
}

export default fellaphase1