"use client";

import React, { useState, useEffect } from "react"; // ✅ useEffect add केला
import styles from "./loginPage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Outfit } from "next/font/google";
import axios from "axios";
// import RysaLoginContext from "../Rysa/context/UIDContext";
import RysaLoginContext from "./context/RysaLoginContext";
import { useContext } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function LoginPage() {

  const {isOtpVerified, setIsOtpVerified} = useContext(RysaLoginContext);

  const [otpError, setOtpError] = useState("");

  const router = useRouter();

  const [mobilenumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  // ✅ Timer Format Function - हा add करा
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleGetOtp = () => {
    try {
      if (!mobilenumber || mobilenumber.length !== 10) {
        // setMobileError(true); // show red border
        setMobileError("Enter valid number");
        return;
      }

      setMobileError("");

      // setMobileError(false); // clear error
      setShowOtpField(true);
      setTimer(54);
      setIsTimerActive(true);

      // console.log("OTP sent to:", mobilenumber);
      //function to send otp
      handleCheckEligibility();

    } catch (error) {
      console.log(error);
    }
  };
  const handleResendOtp = () => {
    if (timer > 0) return;

    setTimer(54);
    setIsTimerActive(true);
    console.log("Resending OTP to:", mobilenumber);

    handleCheckEligibility();

  };
  // const handleVerifyOtp = () => {
  //   if (!otp || otp.length !== 6) {
  //     return;
  //   }
  //   router.push(`/myContener/LoanRequestPage?mobilenumber=${mobilenumber}`);
  // };

  const handleCheckEligibility = async () => {

    try {
      const otpPayload = { Mobilenumber: mobilenumber }
      const otpResponse = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/sendOtpArysefin`,
        otpPayload,
        {
          headers: {
            "Content-Type": "application/json",
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI",
          },
        }
      );
      console.log("OTP API Response : ", otpResponse);
    } catch (error) {
      console.log("Error while generating otp : ", error);
    }

  };

  const verifyOtp = async() => {
    try {
      const payload = {
        Mobilenumber: mobilenumber,
        OTP: otp,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/verifyArysefinOtp`,
        payload
      );

      console.log("Verify OTP response is :: ",response);

      if (response.data.code === 0) {
        setIsOtpVerified(true);
        // setShowOTPbottomsheet(false);
        // setMainFormData((prev) => ({
        //   ...prev,
        //   mobileNumber: mainFormData.mobileNumber,
        // }));
        // setActiveContainer("NewPersonalDetailePage1");
        router.push(`/myContener/LoanRequestPage?mobilenumber=${mobilenumber}`);
      } else {
        console.log("Inside the else part of verifyOTP");
        setOtpError(res.data.msg || "Invalid OTP, please try again.");
        // resetOtp();
        setOtp("");
      }

      

    } catch (error) {
      console.log("Error in verify OTP : ",error);
      if(error.response.data.code === -1){
        setOtpError("Invalid OTP, please try again.");
        // resetOtp();
        setOtp("");
      }else{
        setOtpError("Verification failed, please try again.");
        setOtp("");
      }
      
    }
  }


  return (
    <div className={`${styles.container} ${outfit.className}`}>
      <div className={styles.card}>
        <div className={styles.topSection}>
          <div className={styles.topLeft}>
            <div className={styles.user1}>
              <Image
                src="/half-boy.png"
                alt="User 1"
                width={40}
                height={40}
                className={styles.profileImage}
              />
            </div>
            <div className={styles.user2}>
              <Image
                src="/half-girl.png"
                alt="User 2"
                width={40}
                height={40}
                className={styles.profileImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.formWrapper}>
          <h1 className={styles.heading}>Welcome Back!</h1>
          {/* <p className={styles.subheading}>Enter Your Username and Password.</p> */}

          {/* ✅ Mobile Input - value and onChange add केले */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Mobile No.</label>
            {/* <input 
              type="text" 
              className={styles.input}
              value={mobilenumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) setMobileNumber(value);
              }}
              maxLength={10}
              disabled={showOtpField}
            /> */}
            <input
              type="text"
              // type="number"
              // className={styles.input}
              className={`${styles.input} ${mobileError ? styles.inputError : ""
                }`}
              // numeric="true"
              maxLength={12}
              value={mobilenumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              // onChange={(e) => {
              //   const value = e.target.value.replace(/\D/g, ""); 
              //   if (value.length <= 10) setMobileNumber(value);
              //   if (value.length === 10) setMobileError(false);
              // }}
              disabled={showOtpField}
            />
            <label className={styles.label} style={{color:"red"}}>{mobileError}</label>
          </div>

          {/* ✅ OTP Input - फक्त showOtpField true असेल तर दाखवा */}
          {showOtpField && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Enter OTP</label>
              <input
                type="text"
                className={styles.input}
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 6) setOtp(value);
                }}
                maxLength={6}
                autoFocus
              />
              <label className={styles.label} style={{color:"red"}}>{otpError}</label>
            </div>
          )}

          {/* ✅ Button - condition based text */}
          <button
            className={styles.otpButton}
            onClick={showOtpField ? verifyOtp : handleGetOtp}
          >
            {showOtpField ? "Verify OTP" : "Get OTP"}
            {/* {showOtpField ? "Verify & Continue" : "Get OTP"} */}
          </button>

          {/* ✅ Timer/Resend - फक्त OTP field visible असेल तर दाखवा */}
          {showOtpField && (
            <div>
              <p className={styles.resendText}>
                {isTimerActive ? (
                  <>
                    Resend OTP in{" "}
                    <span className={styles.timer}>{formatTimer(timer)}</span>
                  </>
                ) : (
                  <span
                    className={styles.link}
                    onClick={handleResendOtp}
                    style={{ cursor: "pointer" }}
                  >
                    Resend OTP
                  </span>
                )}
              </p>
            </div>
          )}

          {/* <div className={styles.bottomText}>
            <span className={styles.link}>Resend OTP?</span> <b>OR</b>{" "}
            <span className={styles.link}>
              <a href="">Create a New Account</a>
            </span>
          </div> */}
        </div>

        <div className={styles.bottomShape}></div>
      </div>
    </div>
  );
}
