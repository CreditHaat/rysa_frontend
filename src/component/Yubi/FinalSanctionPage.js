"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Roboto } from "@next/font/google";
import axios from "axios";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function FinalSanctionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const loanAmount = searchParams.get("loanAmount") || "";
  const tenure = searchParams.get("tenure") || "";
  const interestRate = searchParams.get("interestRate") || "";
  const clientLoanId = searchParams.get("clientLoanId") || "";

  const handleAgree = async () => {
    console.log("✅ User agreed to final sanction details");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generateKfsDocument`,
        { clientLoanId }
      );
      console.log("✅ generateKfsDocument:", res.data);
    } catch (err) {
      console.error("❌ KFS API error:", err);
    }

    // Redirect to next step
    console.log(
      "➡️ Pushing to: ",
      `/yubi/Smswaitingpage?clientLoanId=${clientLoanId}`
    );
    router.push(`/yubi/Smswaitingpage?clientLoanId=${clientLoanId}`);
  };

  return (
    <div className={`${roboto.className} final-sanction-container`}>
      <h2>🎉 Final Sanction Details</h2>
      <p>
        <strong>Loan Amount:</strong> ₹{loanAmount}
      </p>
      <p>
        <strong>Tenure:</strong> {tenure} months
      </p>
      <p>
        <strong>Interest Rate:</strong> {interestRate}%
      </p>
      <button onClick={handleAgree}>I Agree & Continue</button>
    </div>
  );
}
