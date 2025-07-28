'use client';
import React, { useEffect, useState } from 'react';
import styles from './SubmitPage.module.css';
// import confetti from 'canvas-confetti';

export default function SubmitPage() {
  const [refNo, setRefNo] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [tenure, setTenure] = useState('');
  const [interestRate, setInterestRate] = useState('');

  useEffect(() => {

    // 🟩 Simulate backend fetch (you can replace with fetch/axios)
    const fetchData = async () => {
      const data = {
        ref: 'D1102345',
        amount: '₹2,50,000',
        accountNumber: '1298656789',
        tenure: '24 months',
        interestRate: '12.5%'
      };

      setRefNo(data.ref);
      setAmount(data.amount);
      setAccount(maskAccount(data.accountNumber));
      setTenure(data.tenure);
      setInterestRate(data.interestRate);
    };

    fetchData();
  }, []);

  // ✅ Mask account number: show first 2 and last 4 digits only
  const maskAccount = (accNum) => {
    if (!accNum || accNum.length < 6) return accNum;
    const first2 = accNum.slice(0, 2);
    const last4 = accNum.slice(-4);
    return `${first2}XX${last4}`;
  };

  return (
    <div className={styles.container}>
      <svg className={styles.animatedCheck} viewBox="0 0 52 52">
        <circle className={styles.checkCircle} cx="26" cy="26" r="25" fill="none" />
        <path className={styles.checkmark} fill="none" d="M14 27l7 7 16-16" />
      </svg>

      <h1 className={styles.title}>Congratulations!<br />Your final approved loan details are below</h1>

      <div className={styles.loanDetails}>
        <p className={styles.loanAmount}>
          Loan Amount<br />
          <strong>{amount}</strong>
        </p>
           <br></br>
        <p className={styles.tenure}>
          Tenure<br />
          <strong>{tenure}</strong>
        </p>
           <br></br>

        <p className={styles.interestRate}>
          Interest Rate<br />
          <strong>{interestRate}</strong>
        </p>
      </div>
    </div>
  );
}