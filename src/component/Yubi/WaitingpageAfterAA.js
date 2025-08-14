"use client";
import React, { useState } from "react";
import "./WaitingPage.css";
import { Roboto } from "next/font/google";
import CallbackListener from "../CallbackListener";
import useYubiStepsLogic from "../Yubi/YubiStepsLogic";
import { useSearchParams } from "next/navigation";
import StickyWarning from "../../component/Yubi/StickyWarning";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const WaitingPageAfterAA = () => {
  const searchParams = useSearchParams();

  const clientLoanId = searchParams.get("client_loan_id");
  const [stepText, setStepText] = useState("Starting process...");

  useYubiStepsLogic(setStepText); // 🟢 Run logic ONCE using custom hook

  return (
    <>
      <div className={`${roboto.className} waiting-container`}>
        <CallbackListener clientLoanId={clientLoanId} />
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
        <div className="waiting-text">
          <b>{stepText}</b>
        </div>
      </div>
      <StickyWarning />
    </>
  );
};

export default WaitingPageAfterAA;

// "use client";
// import React, { useState, useEffect } from "react";
// import "./WaitingPage.css";
// import { Roboto } from "next/font/google";
// import CallbackListener from "../CallbackListener";
// import { useRouter } from "next/navigation";

// const roboto = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// const WaitingPageAfterAA = () => {
//   const router = useRouter();
//   const [stepText, setStepText] = useState("Please wait...");

//   // Optional: You can use useEffect to simulate dynamic updates if needed
//   useEffect(() => {
//     const steps = ["Verifying Details....", "Analyzing bank statement..."];
//     let step = 0;

//     const interval = setInterval(() => {
//       setStepText(steps[step]);
//       step++;
//       if (step >= steps.length) {
//         clearInterval(interval);

//         // Redirect after the last step
//         setTimeout(() => {
//           router.push("/yubi/Selfiepage"); // 👈 Change this to your actual selfie page route
//         }, 2000); // 2s after last message
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={`${roboto.className} waiting-container`}>
//       <CallbackListener />
//       <div className="loading-circle">
//         <svg className="hourglass-icon" viewBox="0 0 24 24" fill="none">
//           <path
//             d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"
//             fill="#6039D2"
//             stroke="#6039D2"
//             strokeWidth="2.5"
//           />
//         </svg>
//       </div>
//       <div className="waiting-text">
//         <b>{stepText}</b>
//       </div>
//     </div>
//   );
// };

// export default WaitingPageAfterAA;
