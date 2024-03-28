import styles from "@/styles/Nav.module.css"
import HorizontalRule from "./HorizontalRule"
import Web3Status from "./Web3/Web3Status"

const Nav = ({routeChange,setWeb3Shit,web3Shit}) => {
    
    return(
        <div className={styles.container}>
            <div>
            <div onClick={()=>routeChange("/")}><h1>Based Fellas</h1></div>
            <Web3Status web3Shit={web3Shit} setWeb3Shit={setWeb3Shit}/>
            </div>
                <HorizontalRule />
        </div>
    )
}

export default Nav