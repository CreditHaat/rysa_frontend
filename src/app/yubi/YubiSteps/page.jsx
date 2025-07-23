"use client"; // ✅ This is needed for Client Component

import React from "react";
import YubiSteps from "../../../component/Yubi/WaitingpageAfterAA";
import { useSearchParams } from "next/navigation";

export default function Page({ params }) {
  const searchParams = useSearchParams(); // ✅ Correct way!
  const step = searchParams.get("step");
  const clientLoanId = searchParams.get("client_loan_id");

  console.log("step:", step);
  console.log("clientLoanId:", clientLoanId);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <YubiSteps params={params} step={step} clientLoanId={clientLoanId} />
    </div>
  );
}
