import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/Homes.module.css"
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { isAddress,parseEther } from "ethers";
import { useEthersProvider, useEthersSigner } from "@/hooks/useEthers";
import writeContract from "@/functions/writeContract";
import readContract from "@/functions/readContract";
import checkType from "@/functions/checkType";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import WalletButton from "@/components/homes/WalletButton";
const CountdownTimer = dynamic(() => import('../components/Countdown'), { ssr: false })

const Homes = ({routeChange,router,windowSize,web3Shit,alert,setIsLoading}) => {

  const { open } = useWeb3Modal()

  const [supply,setSupply] = useState(0)
  const [phase,setPhase] = useState(0)

  const [chain,setChain] = useState(0)
  
  const provider = useEthersProvider()
  const signer = useEthersSigner()

  const homesContract = [
    "0x89b76460172f88a851Fb17617f9dc3448646931A", //Base
    "0x9b2EcBb9fd655ac7eFB7789350B36bBF6cf048E7"  //Base-Sepolia
  ]

  const contractInfo = {
    addy: homesContract[chain],
    name: "homes"
  }

  const mint = async () => {

    const proof1Request = await fetch('https://raw.githubusercontent.com/KingSimpa69/homes_merkle_proofs/main/phase1Proofs.json');
    const PROOFS1 = await proof1Request.json(); 

    const proof2Request = await fetch('https://raw.githubusercontent.com/KingSimpa69/homes_merkle_proofs/main/phase2Proofs.json');
    const PROOFS2 = await proof2Request.json(); 
  
    const proofs = phase === 1 ? PROOFS1[web3Shit.address.toLowerCase()] :
      phase === 2 ? PROOFS2[web3Shit.address.toLowerCase()] : ["0x2ffdfb4fd44aedbdb7d700b871bc934f10b406b84abcbd1dc5c2890f8a12190b"]

    setIsLoading(true)
    try{
      if(web3Shit.chain === 8453 || web3Shit.chain === 84532){
        const tx = await writeContract(signer,contractInfo,"mint",proofs,{value:parseEther("0.008")})
        const type = checkType(tx)
        type === "string" ? alert("error",tx) : alert("success","Mint successful",tx.tx.hash)
      } else {
        alert("error","You're on the wrong chain fella!")
        open({view:"Networks"})
        return
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
  }, [web3Shit,chain])

  return (
    <div className="wrapper">
      <Breadcrumbs changeRoute={routeChange} route={router}  />
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
            {phase === 1 && <div className={styles.countdown}><CountdownTimer targetDate={"2024-04-01T00:00:00.000Z"} /></div>}
            <WalletButton routeChange={routeChange} />
        </div>
      </div>
    </div>
  )
}

export default Homes
