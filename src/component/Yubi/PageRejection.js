'use client';
import React, { useEffect, useState } from 'react';
import styles from './SubmitPage.module.css';

export default function RejectPage() {
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
      <div className="mb-8">
        <svg 
          className="w-20 h-20" 
          viewBox="0 0 52 52"
        >
          <circle 
            cx="26" 
            cy="26" 
            r="25" 
            fill="none" 
            stroke="#DC2626" 
            strokeWidth="2"
          />
          <path 
            fill="none" 
            stroke="#DC2626" 
            strokeWidth="3" 
            strokeLinecap="round"
            d="M16 16l20 20M36 16l-20 20"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-white text-center mb-2">
        We're Sorry!
      </h1>
      
      <p className="text-white text-center mb-8 opacity-90 leading-relaxed">
        Your loan application could not be approved.
      </p>
      
      <p className="text-white text-center opacity-80 text-sm leading-relaxed max-w-xs">
        But don't worry — you can still explore offers from other trusted lenders!
      </p>

       {/* Next Button */}
       <div style={{ position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "40px",
    paddingTop: "20px",
    paddingBottom: "20px",
    backgroundColor: "white",
    borderTop: "1px solid #e5e7eb"}}>
      <button 
        // onClick={handleNextClick}
        style={{
         width: "100%",
      padding: "10px",
      backgroundColor: "#6039D2",
      color: "white",
      border: "none",
      borderRadius: "15px",
      cursor: "pointer",
      fontSize: "16px"
        }}
      >
        Next
      </button>
      </div>
    </div>
  );
}