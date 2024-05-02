import styles from "@/styles/Wallet.module.css"
import Balance from "./Balance"
import { useEthersProvider } from "@/hooks/useEthers";
import readContract from "@/functions/readContract";
import { useEffect, useState } from "react"
import { isAddress,formatEther } from "ethers"

const BalanceBar = ({web3Shit}) => {

    const [balances,setBalances] = useState([0,0,0])

    const provider = useEthersProvider()

    const fellasContract = {
        addy: "0x217ec1ac929a17481446a76ff9b95b9a64f298cf",
        name: "fellas"
    }

    const fellaContract = {
        addy: "0x122A3f185655847980639E8EdF0F0f66cd91C5fE",
        name: "fella"
    }

    const homesContract = {
        addy: "0x89b76460172f88a851Fb17617f9dc3448646931A",
        name: "homes"
    }

    const getBalances = async() => {
        try{
            const fellasBalance = parseInt(await readContract(provider,fellasContract,"balanceOf",[web3Shit.address]))
            const fellaBalance = parseInt(formatEther(await readContract(provider,fellaContract,"balanceOf",[web3Shit.address])))
            const homesBalanceRead = await readContract(provider,homesContract,"balanceOfBatch",[Array(30).fill(web3Shit.address),[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]])
            const allHomesBalances = [...homesBalanceRead].map(value => parseInt(value));
            const homesBalance = allHomesBalances.reduce((accumulator, currentValue) => {return accumulator + currentValue;}, 0);
            setBalances([fellasBalance,fellaBalance,homesBalance])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        isAddress(web3Shit.address) && getBalances()
    }, [web3Shit])
    

    return(
        <div className={styles.balBarCont}>
            <Balance type={'homes'} balances={balances}/>
            <Balance type={'fellas'} balances={balances} />
            <Balance type={'fella'} balances={balances}/>
        </div>
    )
}

export default BalanceBar