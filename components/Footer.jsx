import styles from "@/styles/Footer.module.css"
import HorizontalRule from "./HorizontalRule"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {

    let year =  new Date().getFullYear();

    return (
        <div className={styles.container}>
            <HorizontalRule />
            <div>
                <div>Based Fellas &copy; {year} </div>
                <div>
                <Link href={"https://twitter.com/based_fellas"} target={"_blank"}><FontAwesomeIcon icon="fa-brands fa-x-twitter" /></Link>
                <Link href={"https://discord.com/invite/EVk2Zk2N3z"} target={"_blank"}><FontAwesomeIcon icon="fa-brands fa-discord" /></Link>
                <Link href={"https://opensea.io/collection/based-fellas"} target={"_blank"}><Image priority alt={"opensealogo"} src={'/images/opensea.png'} width={25} height={25} /></Link>
                <Link href={"https://basescan.org/token/0x217ec1ac929a17481446a76ff9b95b9a64f298cf"} target={"_blank"}><Image priority alt={"basescanlogo"} src={'/images/basescan.png'} width={25} height={25} /></Link>             
                <Link href={"https://base.blockscout.com/token/0x217Ec1aC929a17481446A76Ff9B95B9a64F298cF"} target={"_blank"}><Image priority alt={"blockscoutlogo"} src={'/images/blockscout.png'} width={25} height={25} /></Link>      
                <Link href={"https://github.com/KingSimpa69"} target={"_blank"}><FontAwesomeIcon icon="fa-brands fa-github" /></Link>
                </div>
            </div>
        </div>
    )
}

export default Footer