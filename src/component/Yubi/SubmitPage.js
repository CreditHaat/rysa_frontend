'use client';
import React, { useEffect, useState } from 'react';
import styles from './SubmitPage.module.css';
import confetti from 'canvas-confetti';

export default function SubmitPage() {
  const [refNo, setRefNo] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    //  Confetti animation
    confetti({
      particleCount: 200,
      spread: 50,
      origin: { y: 0.6 }
    });

    // 🟩 Simulate backend fetch (you can replace with fetch/axios)
    const fetchData = async () => {
      const data = {
        ref: 'D1102345',
        amount: '50000',
        accountNumber: '1298656789'
      };

      setRefNo(data.ref);
      setAmount(data.amount);
      setAccount(maskAccount(data.accountNumber));
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

      <h1 className={styles.title}>Congratulations!<br />Your loan of <strong>{amount}</strong> has been successfully approved</h1>

      {/* <p className={styles.ref}>
        Reference number is<br />
        <strong>{refNo}</strong>.
      </p> */}

      <p className={styles.message}>
        The amount will be credited to your bank account <strong>{account}</strong> within 24 hours.
      </p>

      <br></br>
      
      <p className={styles.message}>
         ✅ Sit back and relax — we’ll notify you once the funds are transferred.
      </p>
    </div>
  );
}
