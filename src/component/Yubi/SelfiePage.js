// "use client";
// import React, { useState } from "react";
// import { Roboto } from "@next/font/google";
// import styles from "../NewBlJourneyD/NewBlFirstFormPage.module.css";
// import { AlertCircle } from "lucide-react";
// import Image from "next/image";
// import "./SelfiePage.css";
// import selfieImage from "./newplimages/selfieimg.png";
// import SelfieVerifying from "./SelfieVerifying"; // Import the SelfieVerifying component
// import SelfieSuccess from "./SelfieSuccess"; // Import the SelfieSuccess component
// import axios from "axios";
// import { useSearchParams } from "next/navigation";

// const roboto = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// const SelfiePage = () => {
//   const [activeContainer, setActiveContainer] = useState("SelfiePage"); // Manage active container
//   const [error, setError] = useState("");
//   const searchParams = useSearchParams();
//   const clientLoanId = searchParams.get("client_loan_id");

// const handleCapture = async (event) => {
//   const file = event.target.files[0];
//   setError("");

//   if (file) {
//     if (!file.type.startsWith("image/")) {
//       setError("Please select only image files (jpg, png, etc).");
//       event.target.value = "";
//       return;
//     }

//     // Switch to verifying
//     const selfieUrl = URL.createObjectURL(file);
//     setActiveContainer("SelfieVerifying");

//     // ✅ Send selfie to your backend after 3 seconds
//     setTimeout(async () => {
//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}updateKYC`,
//           {
//             clientLoanId,
//             selfieImageUrl: selfieUrl,
//           }
//         );
//         console.log("Update KYC response:", response.data);
//         setActiveContainer("SelfieSuccess");
//       } catch (error) {
//         console.error("Error updating KYC:", error);
//         setError("Failed to update KYC. Please try again.");
//         setActiveContainer("SelfiePage"); // Let user retry
//       }
//     }, 3000);
//   }
// };

"use client";
import React, { useState, useEffect } from "react";
import { Roboto } from "@next/font/google";
import styles from "../NewBlJourneyD/NewBlFirstFormPage.module.css";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import "./SelfiePage.css";
import selfieImage from "./newplimages/selfieimg.png";
import SelfieVerifying from "./SelfieVerifying";
import SelfieWaiting from "./WaitingPage";
import SelfieSuccess from "./SelfieSuccess"; // ✅ final step!
import axios from "axios";
import { useSearchParams } from "next/navigation";
import CallbackListener from "../CallbackListener";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const SelfiePage = () => {
  const [activeContainer, setActiveContainer] = useState("SelfiePage");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("client_loan_id");

  const handleCapture = async (event) => {
    const file = event.target.files[0];
    setError("");

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select only image files (jpg, png, etc).");
        event.target.value = "";
        return;
      }

      localStorage.setItem("hdbClientLoanId", clientLoanId);

      setActiveContainer("SelfieWaiting");

      try {
        const presignResp = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generatePresignedUrl`,
          { params: { fileName: file.name } }
        );
        const { presignedUrl, publicUrl } = presignResp.data.obj;

        await axios.put(presignedUrl, file, {
          headers: { "Content-Type": file.type },
        });

        await axios.post(`http://localhost:8080/updateKYC`, {
          clientLoanId,
          selfieImageUrl: publicUrl,
        });

        setActiveContainer("SelfieWaiting");
      } catch (err) {
        console.error("Error updating KYC:", err);
        setError("Failed to update KYC. Please try again.");
        setActiveContainer("SelfiePage");
      }
    }
  };

  // ✅ Poll for KYC callback status
  useEffect(() => {
    if (activeContainer !== "SelfieWaiting") return;

    const interval = setInterval(() => {
      const kycStatus = localStorage.getItem("kycCallbackStatus");
      console.log("🔍 Polling kycCallbackStatus:", kycStatus);

      if (kycStatus && kycStatus.toLowerCase() === "success") {
        clearInterval(interval);
        setActiveContainer("SelfieSuccess");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeContainer]);

  return (
    <>
      <CallbackListener />

      <div className={`${roboto.className} page-container-selfie`}>
        {activeContainer === "SelfiePage" && (
          <div className="newfirstcard-container-selfie">
            <form className={styles.form}>
              <div>
                <Image
                  src={selfieImage}
                  alt="Selfie capture instruction"
                  height={300}
                  width={300}
                  style={{ marginTop: "50%" }}
                  className="selfie-image"
                />
              </div>

              <div className="texthead">
                <h1>Take a selfie</h1>
                <p>
                  Capture a clear selfie or choose an existing one for identity
                  verification. Avoid glasses and background lights.
                </p>
              </div>

              <div className={styles.stickyButton}>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={handleCapture}
                  style={{ display: "none" }}
                />

                <label
                  htmlFor="fileInput"
                  className={`${styles.button} ${styles.submitButton}`}
                  style={{ textAlign: "center" }}
                >
                  Next
                </label>
              </div>

              {error && (
                <div
                  className="errors"
                  style={{ color: "red", marginTop: "10px" }}
                >
                  <AlertCircle className="cps" />
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>
        )}

        {activeContainer === "SelfieVerifying" && <SelfieVerifying />}
        {activeContainer === "SelfieWaiting" && <SelfieWaiting />}
        {activeContainer === "SelfieSuccess" && <SelfieSuccess />}
      </div>
    </>
  );
};

export default SelfiePage;

// "use client";
// import React, { useState } from "react";
// import { Roboto } from "@next/font/google";
// import styles from "../NewBlJourneyD/NewBlFirstFormPage.module.css";
// import { AlertCircle } from "lucide-react";
// import Image from "next/image";
// import "./SelfiePage.css";
// import selfieImage from "./newplimages/selfieimg.png";
// import SelfieVerifying from "./SelfieVerifying"; // Import the SelfieVerifying component
// import SelfieSuccess from "./SelfieSuccess"; // Import the SelfieSuccess component
// import axios from "axios";
// import { useSearchParams } from "next/navigation";

// const roboto = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// const SelfiePage = () => {
//   const [activeContainer, setActiveContainer] = useState("SelfiePage"); // Manage active container
//   const [error, setError] = useState("");
//   const searchParams = useSearchParams();
//   const clientLoanId = searchParams.get("client_loan_id");

//   const handleCapture = async (event) => {
//     const file = event.target.files[0];
//     setError("");

//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         setError("Please select only image files (jpg, png, etc).");
//         event.target.value = "";
//         return;
//       }

//       // Switch to verifying
//       setActiveContainer("SelfieVerifying");

//       try {
//         // 1️⃣ Get presigned URL
//         const presignResp = await axios.get(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generatePresignedUrl`,
//           { params: { fileName: file.name } }
//         );

//         const { presignedUrl, publicUrl } = presignResp.data.obj;

//         // 2️⃣ Upload the file directly to S3
//         await axios.put(presignedUrl, file, {
//           headers: { "Content-Type": file.type },
//         });

//         // 3️⃣ Call your backend with the **real** S3 URL
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}updateKYC`,
//           {
//             clientLoanId,
//             selfieImageUrl: publicUrl,
//           }
//         );

//         setActiveContainer("SelfieSuccess");
//       } catch (err) {
//         console.error("Error updating KYC:", err);
//         setError("Failed to update KYC. Please try again.");
//         setActiveContainer("SelfiePage");
//       }
//     }
//   };

//   return (
//     <>
//       <div className={`${roboto.className} page-container-selfie`}>
//         {/* SelfiePage Container */}
//         {activeContainer === "SelfiePage" && (
//           <div
//             className="newfirstcard-container-selfie"
//             style={{ boxSizing: "content-box" }}
//           >
//             <form className={styles.form}>
//               <div>
//                 <Image
//                   src={selfieImage}
//                   alt="Selfie capture instruction"
//                   height={300}
//                   width={300}
//                   style={{ marginTop: "50%" }}
//                   className="selfie-image"
//                 />
//               </div>

//               {/* Instruction Text */}
//               <div className="texthead">
//                 <h1>Take a selfie</h1>
//                 <p>
//                   Capture a clear selfie or choose an existing one for identity
//                   verification. Avoid glasses and background lights.
//                 </p>
//               </div>

//               <div className={styles.stickyButton}>
//                 {/* Hidden file input */}
//                 <input
//                   id="fileInput"
//                   type="file"
//                   accept="image/*"
//                   capture="user" // Ensures the front camera is used
//                   onChange={handleCapture}
//                   style={{ display: "none" }} // Hide the file input
//                 />
//                 {/* <input
//                 id="fileInput"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleCapture}
//                 style={{ display: "none" }} // Hide the file input
//               /> */}

//                 {/* Styled label as button */}
//                 <label
//                   htmlFor="fileInput"
//                   className={`${styles.button} ${styles.submitButton}`}
//                   style={{
//                     textAlign: "center",
//                   }}
//                 >
//                   Upload Selfie
//                 </label>
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div
//                   className="errors"
//                   style={{ color: "red", marginTop: "10px" }}
//                 >
//                   <AlertCircle className="cps" />
//                   <span>{error}</span>
//                 </div>
//               )}
//             </form>
//           </div>
//         )}

//         {/* SelfieVerifying Container */}
//         {activeContainer === "SelfieVerifying" && <SelfieVerifying />}
//         {/* SelfieSuccess Container */}
//         {activeContainer === "SelfieSuccess" && <SelfieSuccess />}
//       </div>
//     </>
//   );
// };

// export default SelfiePage;
