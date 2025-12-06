'use client'

import React, { useContext, useState, useEffect } from "react";
import RysaLoginContext from "./RysaLoginContext";


//BadgeProvider is responsible for passing the values of badges and any function needed in BadgeContext which we can share with any other component through BadgeContext

export const RysaLoginProvider = ({children}) =>{
    
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    return(
        <RysaLoginContext.Provider value={{isOtpVerified, setIsOtpVerified}}>
            {children}
        </RysaLoginContext.Provider>
    )

}