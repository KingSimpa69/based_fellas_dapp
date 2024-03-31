import { ethers } from "ethers"
import ABI from "./abi.json"

const readContract = async (provider,contractInfo,call,args) => {

    try {

        const contract = new ethers.Contract(contractInfo.addy, ABI[contractInfo.name], provider);

        const tx = args.length > 0 ? await contract[call](...args) : await contract[call]()

        return(tx)

    } catch (e) {
        console.log(e)
    }

}

export default readContract