import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/Homes.module.css"
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { isAddress } from "ethers";
import { useEthersProvider, useEthersSigner } from "@/hooks/useEthers";
import writeContract from "@/functions/writeContract";
import readContract from "@/functions/readContract";
import checkType from "@/functions/checkType";
const CountdownTimer = dynamic(() => import('../components/Countdown'), { ssr: false })

const Homes = ({routeChange,router,windowSize,web3Shit,alert,setIsLoading}) => {

  const [supply,setSupply] = useState(0)
  const [phase,setPhase] = useState(0)

  const [chain,setChain] = useState(0)
  
  const provider = useEthersProvider()
  const signer = useEthersSigner()

  const homesContract = [
    "",                                           //Base
    "0xb8a73426eF30F84a79FcBA4156e9A71B251c0362"  //Base-Sepolia
  ]

  const contractInfo = {
    addy: homesContract[chain],
    name: "homes"
  }

  const mint = async () => {

    const proofRequest = await fetch('https://raw.githubusercontent.com/KingSimpa69/homes_merkle_proofs/main/phase1Proofs.json');
    const proofResponse = await proofRequest.json(); 
  
    const proofs = phase === 1 ? proofResponse[web3Shit.address] :
      phase === 2 ? proofResponse[web3Shit.address] : ["0x2ffdfb4fd44aedbdb7d700b871bc934f10b406b84abcbd1dc5c2890f8a12190b"]

    setIsLoading(true)
    try{
      if (isAddress(homesContract[chain])) {
        const tx = await writeContract(signer,contractInfo,"mint",proofs)
        const type = checkType(tx)
        type === "string" ? alert("error",tx) : alert("success","Mint successful",tx.tx.hash)
      } else {
        console.log("No valid contract for this network")
      }
    } finally {
      setIsLoading(false)
      getSupply()
    }
  }

  const getPhase = async () =>{
    try{
      if (isAddress(homesContract[chain])) {
        const result = await readContract(provider,contractInfo,"phase",[])
        console.log(result)
        setPhase(parseInt(result))
      } else {
        console.log("No valid contract for this network")
        setPhase(parseInt(0))
      }
    } catch (e) {
      console.log(error)
    }
  }

  const getSupply = async () => {
    try{
      if (isAddress(homesContract[chain])) {
        const result = await readContract(provider,contractInfo,"totalSupply",[])
        setSupply(parseInt(result))
      } else {
        console.log("No valid contract for this network")
        setSupply(parseInt(0))
      }
    } catch (e) {
      console.log(error)
    }
  }

  useEffect(() => {
    web3Shit.chain === 8453 ? setChain(0) :
    web3Shit.chain === 84532 ? setChain(1) :
    setChain(0)
  }, [web3Shit])

  useEffect(() => {
    getSupply()
    getPhase()
  }, [web3Shit])

  useEffect(() => {
    getSupply()
    getPhase()
  }, [])
  

  return (
    <div className="wrapper">
      <Breadcrumbs changeRoute={routeChange} route={router} />
      <div className={styles.wrapper}>
        <div className={windowSize.width < 1000 ? "hidden" : `${styles.container} ${styles.homeimg}`}>
          <p>HOMES</p>
          <Image alt={"home"} src={"/images/6.png"} width={420} height={420}/>
        </div>
        <div className={`${styles.container} ${styles.mintCont}`}>
            <h1>MINT</h1>
            <p className={styles.mintDesc}>Mint a home! Own a residence in the Based Fellas universe!<br />
            These homes aren&apos;t just limited to Based Fellas residents, but many other Fella friend NFTs!</p>
            <div onClick={()=>mint()} className={!isAddress(homesContract[chain]) ? styles.disabled : styles.button}>MINT</div>
            <p  className={styles.mintSupply}>{supply}/5000</p>
            {!isAddress(homesContract[chain]) && <div className={styles.countdown}><CountdownTimer targetDate={"2024-03-31T00:00:00.000Z"} /></div>}
        </div>
      </div>
    </div>
  )
}

export default Homes
