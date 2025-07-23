// hooks/useYubiStepsLogic.js
"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
// import axios from "axios";

export default function useYubiStepsLogic(setStepText) {
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("client_loan_id");

  const isRunning = useRef(false);

  useEffect(() => {
    const runSteps = async () => {
      if (isRunning.current) {
        console.warn("⚠️ runSteps already running, skipping duplicate call");
        return;
      }
      isRunning.current = true;

      try {
        console.log("✅ runSteps started for clientLoanId:", clientLoanId);

        localStorage.setItem("hdbClientLoanId", clientLoanId);

        setStepText("Getting request ID...");
        const reqIdResp = await axios.get(
          `http://localhost:8080/getRequestIdByClientLoanId`,
          { params: { clientLoanId } }
        );

        const requestId = reqIdResp.data?.obj;
        console.log("✅ requestId response:", requestId);

        if (!requestId) {
          setStepText("Invalid request ID.");
          return;
        }

        setStepText("Retrieving report...");
        const retrieveResp = await axios.post(
          `http://localhost:8080/retrieveReport`,
          { clientLoanId, requestId }
        );
        console.log("✅ retrieveReport response:", retrieveResp.data);

        setStepText("Waiting for report callback...");
      } catch (err) {
        console.error("❌ Error in runSteps:", err);
        setStepText("Something went wrong.");
      }
    };

    if (clientLoanId) {
      runSteps();
    } else {
      setStepText("Missing client loan ID.");
    }
  }, [clientLoanId]);
}
