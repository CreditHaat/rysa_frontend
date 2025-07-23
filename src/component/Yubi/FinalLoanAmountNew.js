"use client";
import React, { useState, useRef, useEffect } from "react";
import "./FinalLoanAmountNew.css";
// import axios from "axios";
import { Roboto } from "@next/font/google";
import Image from "next/image";
import HeaderPart from "./HeaderPart";
import KFSDocs from "./KfsDocs";
import { useSearchParams, useRouter } from "next/navigation";
import hdb from "../Yubi/newplimages/HDB.png";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const FinalLoanAmountNew = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const clientLoanId = searchParams.get("clientLoanId") || "";

  useEffect(() => {
    // ✅ Fetch from localStorage after component mounts
    const storedLoanAmount = localStorage.getItem("sanctionLoanAmount");
    const storedTenure = localStorage.getItem("sanctionTenure");
    const storedInterestRate = localStorage.getItem("sanctionInterestRate");
    // const storedClientLoanId = localStorage.getItem("clientLoanId");

    if (storedLoanAmount) setLoanAmount(storedLoanAmount);
    if (storedTenure) setTenure(storedTenure);
    if (storedInterestRate) setInterestRate(storedInterestRate);
    // if (storedClientLoanId) setClientLoanId(storedClientLoanId);
  }, []);

  const handleAgree = () => {
    console.log("✅ User agreed to final sanction details");
    // ✅ Navigate immediately
    router.push(
      `/yubi/Smswaitingpage?clientLoanId=${clientLoanId}&loanAmount=${loanAmount}&tenure=${tenure}&interestRate=${interestRate}`
    );
  };

    // Format currency function
 const formatCurrency = (amount) => {
  return amount != null
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)
    : "";
};

  return (
    <>
      <div className={`${roboto.className} final-offer`}>
         <div className="final-card">
         <div className="loan-head">
         <div className="hdb-logo">
                  <Image
                    src={hdb}
                    alt="Hdb tag"
                    style={{alignContent:"center",width:"auto",height:"auto"}}
                  />
                </div>
      </div>
       <div className="cardForm-card">
        <div className="content-card">
          <div>
             <h5 style={{ paddingBottom: "20px",textAlign:"center" }}>
            Congratulations! Your final approved loan details are below
          </h5>
          </div>
        
            <div className="section">

            
            <div className="fieldGroup">
              <div className="field">
                <div className="labelBlock">
                  <span className="label">Loan Amount</span>
                </div>
                <div className="divDout">
                    <span className="centerDout">:</span>
                </div>
                <div className="divValue">
                <span className="value">{formatCurrency(loanAmount)}</span>
                </div>
              </div>
              
              <div className="field">
                <div className="labelBlock">
                  <span className="label">Interest Rate</span>
                 
                </div>
                <div className="divDout">
                    <span className="centerDout">:</span>
                </div>
                <div className="divValue">
                <span className="value">{interestRate}%</span>
                </div>
              </div>
              
              
              
              <div className="field">
                <div className="labelBlock">
                  <span className="label">EMI Tenure</span>
                </div>
                <div className="divDout">
                    <span className="centerDout">:</span>
                </div>
                <div className="divValue">
                <span className="value">{tenure ? `24 months` : ''}</span>
                </div>
              </div >
                {/* Submit Button */}
              {/* <div className="btnContainer">
                <button type="button"
                    className="nextBtn" >
              Next
            </button>
            </div> */}
             <div className="Long-button">
                <button
                  type="submit"
                  className="form-submit"
                >
                  Next
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default FinalLoanAmountNew;
