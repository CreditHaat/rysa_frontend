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

const SMSWaiting = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientLoanId = searchParams.get("clientLoanId") || "";

  const callbackReceivedRef = useRef(false);
  const hasCalledApi = useRef(false);
  const timerRef = useRef(null);

  const [mobile, setMobile] = useState("");

  // ✅ Step 1: Fetch mobile + generate KFS only once
  useEffect(() => {
    if (!clientLoanId || hasCalledApi.current) return;
    hasCalledApi.current = true;

    const fetchMobile = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getMobileByClientLoanId`,
          { params: { clientLoanId } }
        );
        if (res.data) {
          console.log("📱 Got mobile from backend:", res.data);
          setMobile(res.data);
        }
      } catch (err) {
        console.error("❌ Error fetching mobile:", err);
      }
    };

    const generateKfs = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generateKfsDocument`,
          { clientLoanId }
        );
        console.log("✅ generateKfsDocument:", res.data);
        if (res.data.code === -1) {
          router.push(`/yubi/RejectionPage`);
          return;
        }
      } catch (err) {
        console.error("❌ generateKfsDocument error:", err);
      }
    };

    fetchMobile();
    generateKfs();
  }, [clientLoanId]);

  // ✅ Step 2: Start fallback timer only when mobile is available and callback not received
  useEffect(() => {
    if (!mobile) return;

    timerRef.current = setTimeout(() => {
      if (!callbackReceivedRef.current) {
        console.log("⏱️ 5 minutes passed. Sending fallback SMS...");
        axios
          .get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/sms_pl_journey`, {
            params: {
              phone: mobile,
              dsa: "214394238",
            },
          })
          .then((res) => {
            console.log("✅ Fallback SMS sent:", res.data);
          })
          .catch((err) => {
            console.error("❌ Fallback SMS error:", err);
          });
      } else {
        console.log("✅ Callback received. No SMS needed.");
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(timerRef.current);
  }, [mobile]);

  // ✅ Callback from WebSocket
  const handleCallback = () => {
    callbackReceivedRef.current = true;
    clearTimeout(timerRef.current); // stop the fallback
    console.log("✅ Moving to Loan Agreement Waiting Page");
    router.push(`/yubi/Waitingpageloanagreement?clientLoanId=${clientLoanId}`);
  };

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

          <h1
            style={{ fontSize: "22px", color: "#777777", textAlign: "center" }}
          >
            <b>Please Approve Offer Details</b>
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#777777",
              textAlign: "center",
              padding: "10px",
            }}
          >
            We have sent you a link via SMS.
            <br />
            Please open the link and give your consent to proceed.
          </p>
        </div>
        <CallbackListener
          clientLoanId={clientLoanId}
          onLoanAgreementReady={() => {
            console.log("📞 handleCallback triggered from CallbackListener");
            handleCallback();
          }}
        />
      </div>
      <StickyWarning />
    </>
  );
};

export default SMSWaiting;
