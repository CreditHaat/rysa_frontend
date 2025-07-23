"use client";
import React, { useState, useEffect, useRef } from "react";
import "./SelfiePageNew.css";
// import axios from "axios";
import { Roboto } from "@next/font/google";
import Image from "next/image";
import HeaderPart from "./HeaderPart";
import Selfie from "./newplimages/selfieimg.png";
import SelfieWaiting from "./LoadingPage";
import SelfieSuccess from "./VerifiedSelfie";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
// import CallbackListener from "../CallbackListener";
import hdb from "../../../public/Jays/HDB.png";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const SelfiePageNew = () => {
  const [activeContainer, setActiveContainer] = useState("SelfiePageNew");
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
      {/* <CallbackListener /> */}
      {activeContainer === "SelfiePageNew" && (
        <div className={`${roboto.className} Four`}>
          <div className="selfie-card">
            <div className="header-selfie">
         <div className="LogoPart-selfie">
                  <Image
                    src={hdb}
                    alt="Hdb tag"
                    style={{alignContent:"center",width:"auto",height:"auto"}}
                  />
                </div>
      </div>
       <div className="selfieForm-card">
         <div className="selfiecontent-card">
            <form className="selfie-box">
              <div>
                <Image
                  src={Selfie}
                  alt="Selfie taking instruction"
                  height={200}
                  style={{ alignContent:"center",marginTop:"50px",marginLeft:"25px"
                    
                  }}
                />
              </div>

              <div className="texthead" style={{ marginTop: "50px",alignItems:"center" }}>
                <h3><b>Take a selfie</b></h3>
                <p>
                  Capture a clear selfie or choose an existing one for identity
                  verification. Avoid glasses and background lights.
                </p>
              </div>

              <div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={handleCapture}
                  style={{ display: "none" }}
                />

                {/* <div className="next-button-box">
                  <label htmlFor="fileInput" className="next-switch">
                    Next
                  </label>
                </div> */}
                 <div className="Long-button">
                <button
                  type="submit"
                  className="form-submit"
                >
                  Next
                </button>
              </div>
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
              {/* <div className="next-button-box">
              <button type="submit" className="next-switch">
                Take Selfie
              </button>
            </div> */}
            </form>
          </div>
          </div>
        </div>
        </div>
      )}
      {activeContainer === "SelfieWaiting" && <SelfieWaiting />}
      {activeContainer === "SelfieSuccess" && <SelfieSuccess />}
    </>
  );
};

export default SelfiePageNew;
