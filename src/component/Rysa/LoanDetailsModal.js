// LoanDetailsModal.js
"use client";

import React from "react";
import styles from "./LoanDetailsModal.module.css";

export default function LoanDetailsModal({ loan, onClose }) {
  if (!loan) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={styles.title}>Loan Details</span>
          <span
            className={`${styles.status} ${
              loan.status === "Active" ? styles.active : styles.closed
            }`}
          >
            {loan.status}
          </span>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.row}>
          <div>
            <div className={styles.label}>Amount</div>
            <div className={styles.value}>₹{loan.amount.toLocaleString()}</div>
          </div>
          <div>
            <div className={styles.label}>Interest Rate</div>
            <div className={styles.value}>{loan.interestRate}%</div>
          </div>
        </div>

        <div className={styles.rowDif}>
          <div>
            <div className={styles.label}>Duration</div>
            <div className={styles.value}>{loan.duration}</div>
          </div>
          <div>
            <div className={styles.label}>Monthly EMI</div>
            <div className={styles.value}>₹{loan.emi.toLocaleString()}</div>
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <div className={styles.label}>Loan Start Date</div>
            <div className={styles.value}>{loan.startDate}</div>
          </div>
          <div>
            <div className={styles.label}>Loan End Date</div>
            <div className={styles.value}>{loan.endDate}</div>
          </div>
        </div>

        <div className={styles.rowDif}>
          <div>
            <div className={styles.label}>Total Amount</div>
            <div className={styles.value}>₹{loan.totalAmount.toLocaleString()}</div>
          </div>
          <div>
            <div className={styles.label}>Remaining Amount</div>
            <div className={styles.value}>₹{loan.remainingAmount.toLocaleString()}</div>
          </div>
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.actionButton}>Repayment</button>
          <button className={styles.actionButtonOutline}>Pre-Closure</button>
          <button className={styles.actionButtonOutline}>Part Payment</button>
        </div>
      </div>
    </div>
  );
}
