import { ethers } from "ethers"
import ABI from "./abi.json"

const writeContract = async (signer,contractInfo,call,args) => {
    try {
        
        let txLog = {}

        const contract = new ethers.Contract(contractInfo.addy, ABI[contractInfo.name], signer);

        const tx = await contract[call](args);

        const response = await tx.wait();

        const logs = await signer.provider.getLogs({blockHash:response.blockHash})

        for (const log of logs) {
            log.transactionHash === response.hash && (txLog = contract.interface.parseLog(log))
        }

        return({txLog,tx})

    } catch (e) {
        const regex = /^(?:execution reverted:\s*)?(.*?)\(/;
        const error = e.message.match(regex) 
        return error[1].toString().replace(/"/g, '')
    }
}

export default writeContract