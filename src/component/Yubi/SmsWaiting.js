"use client";
import React, { useEffect, useRef } from "react";
import "./SmsWaiting.css";
import { Roboto } from "next/font/google";
import { useSearchParams, useRouter } from "next/navigation";
import CallbackListener from "../CallbackListener";
import axios from "axios";
import StickyWarning from "../../component/Yubi/StickyWarning";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const SMSWaiting = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientLoanId = searchParams.get("clientLoanId") || "";

  const hasCalledApi = useRef(false);

  useEffect(() => {
    if (!clientLoanId || hasCalledApi.current) return;

    hasCalledApi.current = true;

    const generateKfs = async () => {
      console.log("📨 Waiting page mounted — hitting generateKfsDocument");
      try {
        const res = await axios.post(
          `http://localhost:8080/generateKfsDocument`,
          { clientLoanId }
        );
        console.log("✅ generateKfsDocument:", res.data);
      } catch (err) {
        console.error("❌ generateKfsDocument error:", err);
      }
    };

    generateKfs();
  }, [clientLoanId]);

  return (
    <>
    <div className={`${roboto.className} sms-container`}>
      <div className="sms-content">
        <div className="loading-circle">
          <svg className="hourglass-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"
              fill="#6039D2"
              stroke="#6039D2"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <h1 style={{fontSize:'22px',color:'#777777',textAlign:'center'}}>
          <b>Please Approve Offer Details</b>
        </h1>
        <br></br>
        <p style={{fontSize:'15px',color:'#777777',textAlign:'center',padding:'10px'}}>We have sent you a link via SMS.
          <br />
          Please open the link and give your consent to proceed.</p>
      </div>
      <CallbackListener
        onLoanAgreementReady={() => {
          console.log("✅ Moving to Loan Agreement Waiting Page");
          router.push(
            `/yubi/Waitingpageloanagreement?clientLoanId=${clientLoanId}`
          );
        }}
      />
    </div>
    <StickyWarning />
    </>
  );
};

export default SMSWaiting;
