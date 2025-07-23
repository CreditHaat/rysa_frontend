"use client";
import React, { useState } from "react";
import styles from "./PreCloserPage.module.css";

export default function PreCloserPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!paymentMethod) {
      setError("Please select a payment method.");
    } else {
      setError("");
      alert(`Payment method selected: ${paymentMethod}`);
    }
  };

  return (
    <div className={styles.firstContainer}>
    <div className={styles.container}>
      <div  className={styles.header}>
      <h1 className={styles.heading}>Loan Pre-Closure</h1>
      </div>
      <div className={styles.card}>
        <div className={styles.row}>
          <div className={styles.item}>
            <p className={styles.label}>Total Loan Taken</p>
            <p className={styles.value}>₹50,000</p>
          </div>
          <div className={styles.item}>
            <p className={styles.label}>Interest</p>
            <p className={styles.value}>₹6,000</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.item}>
            <p className={styles.label}>Total Paid</p>
            <p className={styles.value}>₹30,000</p>
          </div>
          <div className={styles.item}>
            <p className={styles.label}>Remaining Amount</p>
            <p className={styles.value}>₹26,000</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.item}>
            <p className={styles.label}>Next EMI Date</p>
            <p className={styles.value}>15 July 2025</p>
          </div>
          <div className={styles.item}>
            <p className={styles.label}>Last EMI</p>
            <p className={styles.value}>15 June 2025</p>
          </div>
        </div>

        <div className={styles.payment}>
          <p className={styles.label}>Payment Method</p>
          <label className={styles.radio}>
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="payment"
              value="Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="payment"
              value="NetBanking"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            NetBanking
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.btnContainer}>
            <button className={styles.nextBtn} onClick={handleSubmit}>
          Pay Now
        </button>
          </div>
        </div>
      </div>
      <div className={styles.newContainer}>
      <p className={styles.note}>
          Note: Closing now cancels auto-debit/EMI schedul
        </p>
      </div>
    </div>
    </div>
  );
}
