import Breadcrumbs from "@/components/Breadcrumbs";
import Holders from "@/components/collection/Holders";
import CollectionData from "@/components/collection/Collection";
import PageSwitcher from "@/components/collection/PageSwitcher";
import { useState } from "react";

const Collection = ({modal,routeChange,router,windowSize,setActiveMeta,modalOpen,setActive,active}) => {

  const [page,setPage] = useState("collection")

  return (
    <div className="wrapper">
      <Breadcrumbs changeRoute={routeChange} route={router} />
      <PageSwitcher page={page} setPage={setPage}/>
      {page === "holders" ? <Holders windowSize={windowSize} /> : <CollectionData active={active} setActiveMeta={setActiveMeta} modalOpen={modalOpen} setActive={setActive} router={router}/>}
    </div>
  )
}

export default Collection
