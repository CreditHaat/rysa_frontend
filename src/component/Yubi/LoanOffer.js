"use client";
import React, { useState } from "react";
import "./LoanOffer.css"; 
import EmblaCarousel from "./Emblacarousel/js/EmblaCarousel";
import listimage1 from "./newplimages/finalimage2.png";
import listimage2 from "./newplimages/finalimage3.png";
import listimage3 from "./newplimages/plimage33.png";
import KFSDocs from "./KfsDocs";
import axios from "axios";
import Image from "next/image";
import hdb from "../../components/Yubi/newplimages/HDB.png";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const LoanApprovalPage = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      // setActiveContainer("KFSDocs");
    }
  };

  return (
     <div className={`${roboto.className} pageContainer`}>
      <div className="gradientHeader"style={{ backgroundColor: "#f7f6fd", marginTop:"10%" }}>
        <div className="logoheader" style={{background: "linear-gradient(to right, #8ca8e6, #ECDDFE, #FEE1A2)"}}>
          <Image
             src={hdb}
             alt="HDB Logo"
             className="logoap"
             style={{ marginTop: "-10%"}}
              width={200} 
              height={170}
          />
        </div>
        
      </div>
      <form onSubmit={handleSubmit} className="formloan">
      <div className="cardContainer" style={{ backgroundColor: "#f7f6fd",maxWidth:"450px", marginBottom: "-30%" }}>
        <h2 style={{paddingBottom:"20px"}}>
  Congratulations! Your final approved loan details are below
</h2>

        {/* Loan Amount Field */}
        <label className="label">Loan amount</label>
        <input
          type="number"
          className="inputBox"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="300000"
          min={100000}
          max={300000}
          oninput="validateAmount(this)"
          required
        />

        {/* Tenure Input Field */}
        <label className="label" style={{paddingTop:"20px"}} >Loan tenure</label>
        <input
          type="number"
          className="inputBox"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          placeholder="24"
          min={6}
          max={36}
          step={1}
          required
        />

         <label className="label"style={{paddingTop:"20px"}}>Loan interest</label>
        <input
          type="number"
          className="inputBox"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          placeholder="10%"
          min={6}
          max={36}
          step={1}
          required
        />
      </div>
       <div className="stickyButton">
                <button
                  type="submit"
                  className="submitButton"
                >
                  Next
                </button>
              </div>
              </form>
    </div>
     )
    
};
export default LoanApprovalPage;