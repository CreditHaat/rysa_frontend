"use client";
import React, { useEffect, useRef, useState } from "react";
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

const RedirectingPageOnRysa = () => {
  const searchParams = useSearchParams();
  const mobileNumber = searchParams.get("mobileNumber"); // 🔍 extract from query param
  const [hasCalled, setHasCalled] = useState(false);
  const [clientLoanId, setClientLoanId] = useState("");

  // useEffect(() => {
  //   // ⏳ Redirect to WaitingPageAfterAA after 3 seconds
  //   const timer = setTimeout(() => {
  //     window.location.href = "/yubi/YubiSteps"; // 👈 Update this path
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (!mobileNumber || hasCalled) return;

    const callHDBFlow = async () => {
      try {
        console.log("👉 Starting HDB flow for", mobileNumber);

        // 🟢 STEP 1: Create Loan
        const createResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}createHDBLoan`,
          {
            params: {
              mobileNumber: mobileNumber,
            },
          }
        );
        console.log("✅ Loan Created:", createResponse.data);

        if (createResponse.data.code === -1) {
          console.warn("🚫 Loan creation rejected:");
          window.location.href = `/yubi/RejectionPage`;
          return;
        }

        if (createResponse.data.code !== 0) {
          console.error("❌ Failed to create loan:", createResponse.data.msg);
          return;
        }

        const clientLoanId = createResponse.data.obj.client_loan_id;

        // 🟢 STEP 2: Get Status
        // const statusResponse = await axios.get(
        //   `http://localhost:8080/getHDBLoanStatus`,
        //   {
        //     params: {
        //       clientLoanId: clientLoanId,
        //     },
        //   }
        // );
        // console.log("✅ Status Response:", statusResponse.data);

        // if (statusResponse.data.code !== 0) {
        //   console.error("❌ Failed to get loan status");
        //   return;
        // }

        // ✅ Store loan ID so the callback listener can use it
        localStorage.setItem("hdbClientLoanId", clientLoanId);
        setClientLoanId(clientLoanId);
        console.log("✅ Saved clientLoanId for AA step");
      } catch (err) {
        console.error("❌ HDB API Error:", err);
      }

      setHasCalled(true);
    };

    callHDBFlow();
  }, [mobileNumber, hasCalled]);

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
          <h1 style={{ color: "#777777", fontSize: "22px" }}>
            <b>Redirecting...</b>
          </h1>
          <h1 style={{ color: "#777777", fontSize: "22px" }}>
            <b>For Account Aggregator</b>
          </h1>
        </div>
        <CallbackListener clientLoanId={clientLoanId} />
      </div>
      <StickyWarning />
    </>
  );
};

export default RedirectingPageOnRysa;
