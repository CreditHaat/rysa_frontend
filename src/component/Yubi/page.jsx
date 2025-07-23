"use client";

import React from "react";
import NewPlPage from "../../components/Yubi/NewPlPage";
// import NewPlPage from "../../components/Yubi/MandateCompleted";
import SelfiePage from "../../components/Yubi/SelfiePage";
import YubiSteps from "../../components/Yubi/YubiSteps";
import { useSearchParams } from "next/navigation";
// import SuccessPage from "../../components/Yubi/SelfieSuccess";

function Page({ params }) {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const clientLoanId = searchParams.get("client_loan_id");

  return (
    <div>
      {step === "step" ? (
        <YubiSteps params={params} />
      ) : step === "selfie" || clientLoanId ? (
        // Pass the clientLoanId to SelfiePage if available
        <SelfiePage clientLoanId={clientLoanId} />
      ) : (
        <NewPlPage params={params} searchParams={searchParams} />
      )}
    </div>
  );
}

export default Page;
