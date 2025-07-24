// PartPaymentPage.js
"use client";

import React, { useState } from "react";
import styles from "./PartPaymentPage.module.css";

export default function PartPaymentPage() {
  // Backend-provided values
  const outstandingBalance = 30000;
  const emiAmount = 5000;

  const [amountToPay, setAmountToPay] = useState("");
  const [adjustment, setAdjustment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amountToPay || isNaN(amountToPay) || amountToPay <= 0) {
      setError("Please enter a valid amount to pay.");
      return;
    }

    if (!adjustment) {
      setError("Please select an adjustment option.");
      return;
    }

    setError("");
    setSuccess("Part payment submitted successfully.");
    console.log("Submitted:", { amountToPay, adjustment });

    setTimeout(() => {
      setSuccess("");
      setAmountToPay("");
      setAdjustment("");
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingDiv}>
      <h2 className={styles.heading}>Part Payment</h2>
      </div>
      <form className={styles.card} onSubmit={handleSubmit}>

        <div className={styles.row}>
          <div className={styles.label}>Outstanding Balance</div>
          <div className={styles.value}>₹{outstandingBalance.toLocaleString()}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Your EMI</div>
          <div className={styles.value}>₹{emiAmount.toLocaleString()}</div>
        </div>

        <input
          type="text"
          placeholder={`[ Enter Amount to Pay: ₹${emiAmount} ]`}
          className={styles.input}
          value={amountToPay}
          onChange={(e) => setAmountToPay(e.target.value)}
        />

        <div className={styles.label} style={{ marginTop: "14px" }}>
          Choose Adjustment
        </div>

        <div className={styles.radioGroup}>
          {["Reduce EMI", "Reduce Tenure"].map((option) => (
            <label key={option} className={styles.radioLabel}>
              <input
                type="radio"
                name="adjustment"
                value={option}
                checked={adjustment === option}
                onChange={() => {
                  setAdjustment(option);
                  setError("");
                }}
              />
              <span className={styles.radioText}>{option}</span>
            </label>
          ))}
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        <div className={styles.btnContainer}>
        <button type="submit" className={styles.nextBtn}>
          Pay Now
        </button>
        </div>
      </form>
      <div className={styles.footer}>
          Note: This helps reduce your loan burden faster.
        </div>
    </div>
  );
}
