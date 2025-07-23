"use client";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import "./LoanAmount.css";
import axios from "axios";
import { Roboto } from "@next/font/google";
import Image from "next/image";
import HeaderPart from "./HeaderPart";
import KFSDocs from "./KfsDocs";
import { useRouter, useSearchParams } from "next/navigation";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const OPTIONS = { direction: "rtl", loop: true };
const LoanamountDT = ({ clientLoanId }) => {
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "50px",
      height: "50px",
      borderRadius: "10px",
      borderColor: state.isFocused ? "#aaa" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #aaa" : "none",
      fontSize: "14px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "50px",
      padding: "0 12px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa",
      fontSize: "14px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "6px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <>
      <div className={`${roboto.className} page-loanamountnew`}>
        <HeaderPart />
        <div
          className="Form-Card-loanamountnew"
          style={{ boxSizing: "content-box" }}
        >
          <form onSubmit={handleSubmit}>
            <h4>Congratulations ! You have been Approved a loan of</h4>
            <h3>
              {" "}
              ₹{approvedLoanAmount ? approvedLoanAmount.toLocaleString() : "0"}
            </h3>

            {/* Loan Amount Field */}
            <label className="view">Select loan amount</label>
            <input
              type="number"
              className="inputBox-field"
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
              oninput="validateAmount(this)"
              required
            />

            {/* <p className="Text">You can enter up to 3,00,000</p> */}
            <p className="helperText">
              {approvedLoanAmount === 100000
                ? "Loan amount is fixed at ₹1,00,000"
                : `You can enter up to ₹${approvedLoanAmount.toLocaleString()}`}
            </p>

            {/* Loan Amount Slider */}
            <div className="sliderContainer-loanamount">
              <span>₹1,00,000</span>
              <input
                type="range"
                min={100000}
                max={approvedLoanAmount}
                step={1000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="slider-loanamount"
                disabled={approvedLoanAmount === 100000}
                title={
                  approvedLoanAmount === 100000
                    ? "Loan amount is fixed and cannot be changed"
                    : ""
                }
              />
              <span>₹{approvedLoanAmount.toLocaleString()}</span>
            </div>

            {/* Tenure Input Field */}
            <label className="view">Select loan tenure</label>
            <input
              type="number"
              className="inputBox-field"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter Tenure in Months"
              min={6}
              max={36}
              step={1}
              required
            />

            <p className="Text">You can enter up to 36 months</p>

            {/* Tenure Slider */}
            <div className="sliderContainer-loanamount">
              <span>6</span>
              <input
                type="range"
                min={6}
                max={36}
                step={1}
                value={tenure || 6}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="slider-loanamount"
              />
              <span>36</span>
            </div>

            {/* Submit Button */}
            <div className="Loan-button">
              <button type="submit" className="form-submit">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoanamountDT;
