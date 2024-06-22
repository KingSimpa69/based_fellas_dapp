import styles from "@/styles/About.module.css"
import TEAM from "./TheTeam.json"
import TeamMember from "./TeamMember"

const TheTeam = () => {

    return(
        <div className={styles.container}>
            <h1>Our Team</h1>
            <div className={styles.team}>
                {
                    TEAM.slice().sort((a, b) => {
                        const dateA = new Date(a.Joined);
                        const dateB = new Date(b.Joined);
                    
                        return dateA - dateB;

                    }).map((e, index) => (
                        <TeamMember key={index + e.name} data={e} />
                    ))
                }
            </div>
        </div>
    )
}

export default TheTeam