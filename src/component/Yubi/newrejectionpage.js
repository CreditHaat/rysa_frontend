"use client";
import React from 'react';
import styles from "./newrejectionpage.module.css";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from 'react-icons/fa';
import { Outfit } from "next/font/google";
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

function NewRejectionPage() {
    const [refNo, setRefNo] = useState("");
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState("");
    const [tenure, setTenure] = useState("");
    const [interestRate, setInterestRate] = useState("");

    const handleNextClick = () => {
        window.location.href = "https://app.credithaat.com/pl_journey";
    };
    return (
        <div className={styles.MainContainer}>
            <div className={styles.container}>

                <div className={styles.wrongDiv}>
                    <div className={styles.Xcross}>
                        <div className={styles.red}>
                            {/* <div className={`${styles.statusicon} ${styles.statusfailed}`}>✕</div> */}
                            < FaExclamationCircle />
                        </div>
                    </div>
                    {/* <div> */}
                    <h3>Oop&apos;s sorry!</h3>
                    <h3>Your loan application could not be approved.</h3>
                    <p>But don&apos;t worry — you can still explore offers from other trusted
                        partners!</p>
                    {/* </div> */}
                </div>
                <div className={styles.stickyButton}>
                    <button
                        type="submit"
                        className={styles.button}
                        onClick={handleNextClick}
                    >
                        <span>Check Offers</span>
                    </button>
                </div>

            </div>

        </div>
    )
}

export default NewRejectionPage;