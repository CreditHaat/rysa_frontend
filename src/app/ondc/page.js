import React, {Suspense} from 'react'
import Ondclist from "../../component/Rysa/ONDC/ondclist";

const page = () => {
  return (
    // <Ondclist/>
    <Suspense fallback={<div>Loading...</div>}><Ondclist/></Suspense>
  )
}

export default page