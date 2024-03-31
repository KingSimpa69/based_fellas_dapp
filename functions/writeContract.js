import { ethers } from "ethers"
import ABI from "./abi.json"

const writeContract = async (signer,contractInfo,call,args,params) => {
    try {
        
        let txLog = {}

        const contract = new ethers.Contract(contractInfo.addy, ABI[contractInfo.name], signer);

        const tx = await contract[call](args,params);

        const response = await tx.wait();

        const logs = await signer.provider.getLogs({blockHash:response.blockHash})

        for (const log of logs) {
            log.transactionHash === response.hash && (txLog = contract.interface.parseLog(log))
        }

        return({txLog,tx})

    } catch (e) {
        const regex = /^(?:execution reverted:\s*)?(.*?)\(/;
        const error = e.message.match(regex) 
        const errorFormatted = error[1].toString().replace(/"/g, '')
        const final = errorFormatted.includes("missing revert data") ? "Not enough ETH in your wallet" : errorFormatted
        return final;
    }
}

export default writeContract