"use client";
import useWebSocket from "./hooks/useWebSocket";
import axios from "axios";

export default function CallbackListener({
  clientLoanId,
  onDisbursementSuccess,
  onFinalSanctionReady,
  onLoanAgreementReady,
  onEsignReady,
}) {
  useWebSocket(async ({ api, status, content, data }) => {
    console.log("📩 Received from WebSocket:", data);

    const parsedContent = content || {};

    // const storedLoanId = localStorage.getItem("hdbClientLoanId");
    const storedLoanId = clientLoanId;
    const incomingLoanId =
      parsedContent.client_loan_id || parsedContent.loan_id;

    if (!clientLoanId) {
      console.warn("⏳ Ignoring webhook — waiting for clientLoanId to be set.");
      return;
    }

    if (storedLoanId && incomingLoanId && storedLoanId !== incomingLoanId) {
      // console.warn(
      //   `🚫 Ignoring webhook — mismatched loan ID. Expected ${storedLoanId}, got ${incomingLoanId}`
      // );
      return;
    }

    // Decide status field based on API type
    if (data.api?.includes("YubiBankAccount")) {
      status = parsedContent.bank_accounts?.[0]?.account_status || "";
    } else {
      status = parsedContent.status || "";
    }

    if (!status) {
      console.warn(`⚠️ No status found in webhook for API: ${data.api}`);
    }

    localStorage.setItem("callbackStatus", status);
    console.log("✅ Stored callbackStatus:", status);

    // === ✅ 1) Handle Sanction Webhook ===
    if (data.api && data.api.includes("Yubi_Sanction")) {
      console.log("✅ Yubi_Sanction webhook received");

      const clientLoanId = parsedContent.client_loan_id;
      if (clientLoanId) {
        localStorage.setItem("hdbClientLoanId", clientLoanId);
      }

      // Save offer details if present
      const offers = parsedContent.offers || [];
      if (offers.length > 0) {
        const slab = offers[0].slabs[0];
        const loanAmount = slab.max_amount || slab.min_amount || "";
        const tenure = slab.tenure || slab.max_tenure || slab.min_tenure || "";
        const interestRate = slab.interest || "";

        if (loanAmount) localStorage.setItem("sanctionLoanAmount", loanAmount);
        if (tenure) localStorage.setItem("sanctionTenure", tenure);
        if (interestRate)
          localStorage.setItem("sanctionInterestRate", interestRate);

        console.log(
          `✅ Sanction details saved: Amount=${loanAmount}, Tenure=${tenure}, Rate=${interestRate}`
        );
      }

      const journeyStage = localStorage.getItem("journeyStage") || "initial";
      if (journeyStage === "AwaitingFinalSanction") {
        console.log("✅ Treating Sanction webhook as FINAL");
        localStorage.setItem("finalSanctionWebhookReceived", "true");
        checkIfFinalSanctionReady(onFinalSanctionReady);
      } else {
        const aaStarted = localStorage.getItem("aaStartedFor_" + clientLoanId);
        if (aaStarted === "true") {
          console.warn(
            "⚠️ AA already started — skipping duplicate initiateHDBAA"
          );
          return;
        }
        localStorage.setItem("aaStartedFor_" + clientLoanId, "true");
        console.log("✅ Treating Sanction webhook as INITIAL — Initiating AA");
        try {
          localStorage.setItem("journeyStage", "AA");
          const clientLoanIdLocal = localStorage.getItem("hdbClientLoanId");
          const aaResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}initiateHDBAA`,
            {
              params: {
                clientLoanId: clientLoanIdLocal,
                callbackStatus: status,
              },
            }
          );

          console.log("✅ initiateHDBAA response:", aaResponse.data);
          if (aaResponse.data.code === -1) {
            console.warn(
              "❌ AA initiation failed. Redirecting to rejection page..."
            );
            window.location.href = `/yubi/Rejectpage?clientLoanId=${clientLoanId}`;
            return;
          }
          const redirection_url = aaResponse.data?.obj?.redirection_url;
          if (redirection_url) {
            console.log("🌐 Redirecting to AA:", redirection_url);
            window.location.href = redirection_url;
          }
        } catch (err) {
          console.error("❌ Error during initiateHDBAA:", err);
        }
      }
    }

    // === ✅ 2) Handle Retrieve_Report Webhook ===
    if (data.api && data.api.includes("Yubi_Report_Status")) {
      console.log("✅ Yubi_Report_Status webhook received");
      localStorage.setItem("retrieveReportStatus", status);

      const clientLoanId = localStorage.getItem("hdbClientLoanId");
      if (!clientLoanId) return;

      // ✅✅✅ Check flag to ensure single KYC initiation
      const kycAlreadyStarted = localStorage.getItem(
        "kycStartedFor_" + clientLoanId
      );
      if (kycAlreadyStarted === "true") {
        console.warn(
          `⚠️ KYC already initiated for ${clientLoanId}, skipping duplicate.`
        );
        return;
      }
      localStorage.setItem("kycStartedFor_" + clientLoanId, "true");

      try {
        localStorage.setItem("journeyStage", "Report");
        const kycResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}initiateKYC`,
          { clientLoanId, callbackStatus: status }
        );

        if (kycResponse.data.code === -1) {
          window.location.href = `/yubi/Rejectpage?clientLoanId=${clientLoanId}`;
        }
        const kycRedirectUrl = kycResponse.data?.obj;
        if (kycRedirectUrl) {
          console.log("🌐 Redirecting to KYC:", kycRedirectUrl);
          window.location.href = kycRedirectUrl;
        }
      } catch (err) {
        console.error("❌ Error in initiateKYC:", err);
      }
    }

    // === ✅ 3) Handle KYC Status Webhook ===
    if (data.api && data.api.includes("Yubi_KYC_Status")) {
      console.log("✅ Yubi_KYC_Status webhook received");
      localStorage.setItem("kycCallbackStatus", status);

      const clientLoanId = localStorage.getItem("hdbClientLoanId");
      if (!clientLoanId) return;

      // if (status.toLowerCase() === "success") {
      //   console.log(
      //     "✅ Selfie KYC success! Waiting for bank account webhook..."
      //   );
      //   localStorage.setItem("journeyStage", "ReferenceDetails");
      // }
      if (status.toLowerCase() === "success") {
        console.log("✅ KYC success — proceeding to next step...");
        localStorage.setItem("journeyStage", "ReferenceDetails");
        return; // exit after success
      }

      // ❌ Case 2: KYC failed or rejected
      console.warn(`❌ KYC failed with status: ${status}`);
      localStorage.setItem("journeyStage", "Rejected");
      window.location.href = `/yubi/Rejectpage?clientLoanId=${clientLoanId}`;
    }

    // === ✅ 4) Handle Loan Status Webhook ===
    if (data.api && data.api.includes("Yubi_loan_status")) {
      const loanStatus = parsedContent.status?.toLowerCase() || "";
      if (loanStatus === "approved") {
        console.log("✅ Yubi_loan_status webhook received");
        localStorage.setItem("loanStatusWebhookReceived", "true");
        localStorage.setItem("journeyStage", "AwaitingFinalSanction");
        checkIfFinalSanctionReady(onFinalSanctionReady);
      }

      const esignDone =
        localStorage.getItem("esignCallbackReceived") === "true";
      const alreadySuccess =
        localStorage.getItem("successPageShown") === "true";

      if (esignDone && !alreadySuccess) {
        console.log(
          "🎉 Esign done and another loan status received — redirecting to success page"
        );
        localStorage.setItem("successPageShown", "true");
        window.location.href = `/yubi/SubmitePage?clientLoanId=${clientLoanId}`; // 👈 your actual success page path
      }
    }

    // === ✅ 5) Handle Disbursement (Bank Account) Webhook ===
    if (data.api && data.api.includes("YubiBankAccount")) {
      console.log("✅ YubiBankAccount webhook received:", parsedContent);

      const accountStatus = parsedContent.bank_accounts?.[0]?.account_status;
      const failureMessage =
        parsedContent.bank_accounts?.[0]?.account_status_failure_message;

      if (accountStatus?.toLowerCase() === "active") {
        console.log("✅ Disbursement successful!");
        localStorage.setItem("disbursementStatus", "success");
        onDisbursementSuccess?.();
      } else {
        console.error("❌ Disbursement failed:", failureMessage);
        localStorage.setItem("disbursementStatus", "failed");
        localStorage.setItem("disbursementFailureMessage", failureMessage);
        window.location.href = `/yubi/Rejectpage?clientLoanId=${clientLoanId}`;
      }
    }

    // === ✅ 6) KFS / Loan Agreement ===
    if (data.api?.includes("Yubi_Document_Status")) {
      const docType = parsedContent?.documents?.[0]?.document_type || "";
      console.log(`✅ Document Status: ${docType}`);
      localStorage.setItem("documentTypeStatus", docType);
      localStorage.setItem("clientLoanId", parsedContent.loan_id);

      if (docType === "kfs_doc") {
        console.log("✅ KFS done — show waiting page");
        onLoanAgreementReady?.();
      }

      if (docType === "loan_agreement_doc") {
        console.log("✅ Loan Agreement doc generated");
        onEsignReady?.();
      }
    }

    if (data.api?.includes("Yubi_esign_status_Webhook")) {
      console.log("✅ Esign completed — Mandate should be triggered");

      localStorage.setItem("esignCallbackReceived", "true");

      // Optional: redirect to mandate waiting page
      window.location.href = "/Agreementcompleted"; // 👈 your custom UI
    }
  });

  return null;
}

/**
 * Checks if both LoanStatus and FinalSanction webhooks have arrived.
 * If yes, calls the provided handler to show final sanction details.
 */
function checkIfFinalSanctionReady(onFinalSanctionReady) {
  const loanStatus = localStorage.getItem("loanStatusWebhookReceived");
  const sanction = localStorage.getItem("finalSanctionWebhookReceived");
  const esignDone = localStorage.getItem("esignCallbackReceived") === "true";
  const alreadySuccess = localStorage.getItem("successPageShown") === "true";

  console.log(
    `🔍 Checking FinalSanction readiness: loanStatus=${loanStatus}, sanction=${sanction}, esign=${esignDone}`
  );

  if (
    loanStatus === "true" &&
    sanction === "true" &&
    esignDone &&
    !alreadySuccess
  ) {
    console.log("🎉 All conditions met! Redirecting to SuccessPage...");
    localStorage.setItem("successPageShown", "true");
    window.location.href = `/yubi/SubmitePage?clientLoanId=${clientLoanId}`;
    return;
  }

  // Only call intermediate handler if you're still waiting for one piece
  if (loanStatus === "true" && sanction === "true") {
    onFinalSanctionReady?.();
  }
}
