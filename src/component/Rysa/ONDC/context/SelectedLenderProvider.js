"use client"
import {useState} from "react";
import SelectedLenderContext from "./SelectedLenderContext";

export const SelectedLenderProvider=({children})=>{
    
    const [SelectedLenderData, setSelectedLenderData] = useState({});
    const [selectedLenderBankDetails, setSelectedLenderBankDetails] = useState({});

    return(
        <SelectedLenderContext.Provider value={{SelectedLenderData, setSelectedLenderData, selectedLenderBankDetails, setSelectedLenderBankDetails}}>
            {children}
        </SelectedLenderContext.Provider>
    )
}