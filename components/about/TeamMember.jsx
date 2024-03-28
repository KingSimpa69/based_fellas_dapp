import styles from "@/styles/About.module.css"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const TeamMember = ({data}) => {

    return(<div className={styles.memberContainer}>
        <div className={styles.member}>
            <Image priority alt={data.name+"pfp"} sizes={"100%"} src={(data.image)} fill />
        </div>
        <div className={styles.memberInfo}>
            <div className={styles.memberName}>{data.name}</div>
            <div className={styles.memberTitle}>{data.title}</div>
            <div className={styles.memberSocial}>
                <Link target="_blank" href={data.socials.twitter}><FontAwesomeIcon icon="fa-brands fa-x-twitter" /></Link>
            </div>
        </div>
    </div>)
}

export default TeamMember