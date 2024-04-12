import Breadcrumbs from "@/components/Breadcrumbs";
import { useEthersProvider, useEthersSigner } from "@/hooks/useEthers";
import writeContract from "@/functions/writeContract";
import readContract from "@/functions/readContract";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import checkType from "@/functions/checkType";
import styles from "@/styles/FellaPhase1.module.css"

const Fellaphase1 = ({routeChange,router,web3Shit,alert,setIsLoading}) => {

    const provider = useEthersProvider()
    const signer = useEthersSigner()

    const { open } = useWeb3Modal()

    const contractInfo = {
        addy: "0x122A3f185655847980639E8EdF0F0f66cd91C5fE",
        name: "fella"
      }

    const setMerkle = async () => {
        setIsLoading(true)
        const proofsRequest = await fetch('https://raw.githubusercontent.com/KingSimpa69/fella_merkle_proofs/main/phase1Proofs.json');
        const proofs = await proofsRequest.json(); 
        console.log(proofs[web3Shit.address.toLowerCase()])
        if (proofs[web3Shit.address.toLowerCase()] !== undefined) {
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
        } else {
          setIsLoading(false)
          alert("error","Fellas eat first!")
        }

    }

    return(
        <div className={'wrapper'}>
            <Breadcrumbs changeRoute={routeChange} route={router}  />
            {web3Shit.isConnected?
            <div className={styles.container}>
                <h1 className={styles.h1}>Phase 1</h1>
                <p className={styles.infobox}> Validate your wallet and activate phase 1.
                </p>
              <div className={styles.button} onClick={()=>setMerkle()}>Activate</div>  
            </div>:
            <div className={styles.h1} style={{marginTop:"50px",fontSize:"20px"}}>
                Please connect a wallet
            </div>}
        </div>
    )
}

export default Fellaphase1