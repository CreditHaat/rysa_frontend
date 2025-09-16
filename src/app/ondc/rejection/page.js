import React,{Suspense} from 'react'
// import NewRejectionPage from "@/component/Yubi/newrejectionpage"
import RejectionPage from '@/component/Rysa/ONDC/LoadingPages/rejectionpage'

const page = () => {
  return (
    <>
    <Suspense fallback={<></>}>
       <RejectionPage/> 
       </Suspense>
    </>
  )
}

export default page