"use client";
import React from 'react';
import './WaitingPage3.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const WaitingPage = () => {
  return (
     <div className={`${roboto.className} waiting-container`}>
      <div className="loading-circle">
        <svg className="hourglass-icon" viewBox="0 0 24 24" fill="none">
          <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z" 
                fill="#6039D2" stroke="#6039D2" strokeWidth="2.5"/>
        </svg>
      </div>
      <div className="waiting-text">
        <b>Waiting.....</b>
      </div>
       <div className="sms-divider"></div>

        <div className="sms-message-container">
          <p className="sms-message">
           ✅ kfs completed
            <br />
            ✅Sign Aggrement
            <br />
            ✅completed mandate
          </p>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px'}}>
        <button className="bt"style={{background:"#6039D2",color:"white",border:"none",padding:"10px 10px 10px 10px",borderRadius:"16px 16px 16px 16px"}} >Submit</button>
      </div>
    </div>
  );
};

export default WaitingPage;