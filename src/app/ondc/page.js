import React, {Suspense} from 'react'
import Ondclist from "../../component/Rysa/ONDC/ondclist";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const page = () => {
  return (
    // <Ondclist/>
    <div className={outfit.className}>
    <Suspense fallback={<div>Loading...</div>}><Ondclist/></Suspense>
    </div>
  )
}

export default page