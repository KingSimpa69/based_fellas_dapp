const Breadcrumbs = ({changeRoute,route}) => {

    return(
        <div className="breadcrumbs">
            <div onClick={()=>changeRoute("/")} className="backButton">BACK</div>
            <div>{route.pathname}</div>
        </div>
    )
}

export default Breadcrumbs