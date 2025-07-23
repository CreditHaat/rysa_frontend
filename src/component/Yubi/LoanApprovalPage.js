"use client";
import React, { useState, useEffect } from "react";
import styles from "./NewPlFirstPage.module.css";
import "./LoanApprovalPage.css";
import Image from "next/image";
import hdb from "../../../public/Jays/HDB.png";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function LoanApprovalPage({ clientLoanId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const salarySlipLink = searchParams.get("salarySlipLink");
  const paramId = searchParams.get("client_loan_id");
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");

  useEffect(() => {
    const storedLoanAmount = localStorage.getItem("sanctionLoanAmount");
    const storedTenure = localStorage.getItem("sanctionTenure");
    const storedInterestRate = localStorage.getItem("sanctionInterestRate");

    if (storedLoanAmount) setLoanAmount(Number(storedLoanAmount));
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
      `/yubi/Referencedetailspage` +
        `?loanAmount=${loanAmount}` +
        `&tenure=${tenure}` +
        `&interestRate=${interestRate}` +
        `&clientLoanId=${paramId}` +
        `&salarySlipLink=${encodeURIComponent(salarySlipLink)}`
    );
  };

  return (
    <div className="pageContainer">
      <div className="gradientHeader">
        <h2>Congratulations! You have been Approved a loan of</h2>
        <h1>₹{loanAmount ? loanAmount.toLocaleString() : "0"}</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="cardContainer">
          <Image src={hdb} alt="HDB Logo" width={140} height={80} />

          <label className="label">Choose loan amount</label>
          <input
            type="number"
            className="inputBox"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            min={100000}
            max={300000}
            required
          />

          <div className="sliderContainer">
            <span>₹1,00,000</span>
            <input
              type="range"
              min={100000}
              max={300000}
              step={5000}
              value={loanAmount || 100000}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider"
            />
            <span>₹3,00,000</span>
          </div>

          <label className="label">Choose loan tenure</label>
          <input
            type="number"
            className="inputBox"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            min={6}
            max={36}
            required
          />

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

          {/* ✅ interestRate stays hidden */}
          <input type="hidden" value={interestRate} readOnly />
        </div>

        <div className={styles.stickyButton}>
          <button
            type="submit"
            className={`${styles.button} ${styles.submitButton}`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
