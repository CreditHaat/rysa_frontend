"use client";
import React, { useState } from "react";
import "./WaitingPage.css";
import { Roboto } from "next/font/google";
import CallbackListener from "../CallbackListener";
import useYubiStepsLogic from "../Yubi/YubiStepsLogic";
import StickyWarning from "../../component/Yubi/StickyWarning";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const WaitingPageAfterAA = () => {
  const [stepText, setStepText] = useState("Starting process...");

  useYubiStepsLogic(setStepText); // 🟢 Run logic ONCE using custom hook

  return (
    <>
    <div className={`${roboto.className} waiting-container`}>
      <CallbackListener />
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
