import styles from "@/styles/Footer.module.css"
import HorizontalRule from "./HorizontalRule"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Footer = () => {

    let year =  new Date().getFullYear();

    return (
        <div className={styles.container}>
            <HorizontalRule />
            <div>
                <div>Based Fellas &copy; {year} </div>
                <div>
                <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
                <FontAwesomeIcon icon="fa-brands fa-discord" />
                <Image priority alt={"opensealogo"} src={'/images/opensea.png'} width={25} height={25} />
                <Image priority alt={"basescanlogo"} src={'/images/basescan.png'} width={25} height={25} />             
                <Image priority alt={"blockscoutlogo"} src={'/images/blockscout.png'} width={25} height={25} />             
                <FontAwesomeIcon icon="fa-brands fa-github" />
                </div>
            </div>
        </div>
    )
}

export default Footer