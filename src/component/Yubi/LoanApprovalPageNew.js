"use client";
import React, { useState, useEffect } from "react";
import "./LoanApprovalPageNew.css";
import EmblaCarousel from "./Emblacarousel/js/EmblaCarousel";
import listimage1 from "./newplimages/finalimage2.png";
import listimage2 from "./newplimages/finalimage3.png";
import listimage3 from "./newplimages/plimage33.png";
import KFSDocs from "./KfsDocs";
// import axios from "axios";
import Image from "next/image";
import hdb from "../../../public/Jays/HDB.png";
import { useRouter, useSearchParams } from "next/navigation";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const LoanApprovalPage = ({ clientLoanId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const salarySlipLink = searchParams.get("salarySlipLink");
  const paramId = searchParams.get("client_loan_id");
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [approvedLoanAmount, setApprovedLoanAmount] = useState(0);

  useEffect(() => {
    const storedLoanAmount = localStorage.getItem("sanctionLoanAmount");
    const storedTenure = localStorage.getItem("sanctionTenure");
    const storedInterestRate = localStorage.getItem("sanctionInterestRate");

    if (storedLoanAmount) {
      const amount = Number(storedLoanAmount);
      setApprovedLoanAmount(amount); // ✅ fixed display
      setLoanAmount(amount); // ✅ user-editable
    }

    if (storedTenure) setTenure(Number(storedTenure));
    if (storedInterestRate) setInterestRate(Number(storedInterestRate));
  }, []);

  useEffect(() => {
    if (loanAmount) localStorage.setItem("sanctionLoanAmount", loanAmount);
  }, [loanAmount]);

  useEffect(() => {
    if (tenure) localStorage.setItem("sanctionTenure", tenure);
  }, [tenure]);

  useEffect(() => {
    if (interestRate)
      localStorage.setItem("sanctionInterestRate", interestRate);
  }, [interestRate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "✅ Submitting with:",
      "loanAmount:",
      loanAmount,
      "tenure:",
      tenure,
      "interestRate:",
      interestRate
    );

    router.push(
      `/yubi/Bankdetailspage` +
        `?loanAmount=${loanAmount}` +
        `&tenure=${tenure}` +
        `&interestRate=${interestRate}` +
        `&clientLoanId=${paramId}`
      // `&salarySlipLink=${encodeURIComponent(salarySlipLink)}`
    );
  };

  return (
    <div className={`${roboto.className} pageContainerloanpage`}>
        <div className="loan-block">
      <div className="loan-head">
         <div className="hdb-logo">
                  <Image
                    src={hdb}
                    alt="Hdb tag"
                    style={{alignContent:"center",width:"auto",height:"auto"}}
                  />
                </div>
      </div>
      <div className="cardForm-loan">
        <div className="content-loan">
      <form onSubmit={handleSubmit} className="formloanpage">
        <div
          className="cardContainerloanpage"
        >
          <h3 style={{textAlign:"center",color:"#777777"}}>Congratulations ! You have been Approved a loan of</h3>
        <h1 style={{color:"#777777"}}>
            ₹{approvedLoanAmount ? approvedLoanAmount.toLocaleString('en-IN') : "0"}
        </h1>

          {/* Loan Amount Field */}
          {/* Loan Amount Field */}
          <label className="label">Select loan amount</label>
          <input
            type="number"
            className="inputBox"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            placeholder="Enter Loan Amount"
            min={100000}
            max={approvedLoanAmount}
            disabled={approvedLoanAmount === 100000}
            title={
              approvedLoanAmount === 100000
                ? "Loan amount is fixed and cannot be changed"
                : ""
            }
            required
          />

          <p className="helperText">
            {approvedLoanAmount === 100000
              ? "Loan amount is fixed at ₹1,00,000"
             : `You can enter up to ₹${approvedLoanAmount.toLocaleString('en-IN')}`}
          </p>

          {/* Loan Amount Slider */}
          <div className="sliderContainer">
            <span>₹1,00,000</span>
            <input
              type="range"
              min={100000}
              max={approvedLoanAmount}
              step={5000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider"
              disabled={approvedLoanAmount === 100000}
              title={
                approvedLoanAmount === 100000
                  ? "Loan amount is fixed and cannot be changed"
                  : ""
              }
            />
            <span>₹{approvedLoanAmount.toLocaleString('en-IN')}</span>
          </div>

          {/* Tenure Input Field */}
          <label className="label">Select loan tenure</label>
          <input
            type="number"
            className="inputBox"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="Enter Tenure in Months"
            min={6}
            max={36}
            step={1}
            required
          />

          <p className="helperText">You can enter up to 36 months</p>

          {/* Tenure Slider */}
          <div className="sliderContainer">
            <span>6</span>
            <input
              type="range"
              min={6}
              max={36}
              step={1}
              value={tenure || 6}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="slider"
            />
            <span>36</span>
          </div>
        
      
          {/* Submit Button */}
             <div className="Long-button">
                <button
                  type="submit"
                  className="form-submit"
                >
                  Next
                </button>
              </div>
            </div>
      
      </form>
      </div>
      </div>
      </div>
    </div>
  );
};
export default LoanApprovalPage;
