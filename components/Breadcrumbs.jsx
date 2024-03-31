const Breadcrumbs = ({changeRoute,route,custom}) => {

    return(
        <div className="breadcrumbs">
            <div onClick={()=>changeRoute(custom?custom:"/")} className="backButton">BACK</div>
            <div>{route.pathname}</div>
        </div>
    )
}

export default Breadcrumbs