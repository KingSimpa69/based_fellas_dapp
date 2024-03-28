import styles from "@/styles/Collection.module.css"
const PageSwitcher = ({page,setPage}) => {

    return(
        <div className={styles.pageSwitcher}>
            <div onClick={()=>setPage("collection")} className={page === "collection" ? styles.activePage : null}>Collection</div>
            <div onClick={()=>setPage("holders")} className={page === "holders" ? styles.activePage : null}>Holders</div>
        </div>
    )
}

export default PageSwitcher