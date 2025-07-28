"use client";
import React, { useState, useEffect } from "react";
import "./VerifiedSelfie.css";
import { Roboto } from "next/font/google";
import NewBankD from "./BankDetailsNew";
import { useRouter, useSearchParams } from "next/navigation";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const VerifiedSelfie = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("client_loan_id");
  const [activeContainer, setActiveContainer] = useState("SelfieSuccess");

  const handleNext = () => {
    console.log("Next button clicked");
    setActiveContainer("BankDetails");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (clientLoanId) {
        router.push(`/yubi/Loanapprovalpage?client_loan_id=${clientLoanId}`);
      } else {
        console.error("No clientLoanId found in URL!");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [clientLoanId, router]);
  return (
    <>
      {activeContainer === "BankDetails" && <NewBankD />}
      {activeContainer === "SelfieSuccess" && (
        <div className={`${roboto.className} waiting-table`}>
          <div class="checkmark-circle">
            <div class="background"></div>
            <div class="checkmark"></div>
          </div>

          <br></br>

          <div className="loading-text" style={{ textAlign: "center" }}>
            {/* <h3> <b>Please Wait...</b> </h3> */}
            <h3>
              {" "}
              <b>Successfully Verified Selfie</b>{" "}
            </h3>
            <br></br>
            <p className="para">
              Do not press the back button or refresh the page
            </p>
          </div>

          {/* Submit Button */}
          {/* <div className="Long-button">
        <button type="submit" className="form-submit">
          Next
        </button>
      </div> */}
        </div>
      )}
    </>
  );
};

export default VerifiedSelfie;
