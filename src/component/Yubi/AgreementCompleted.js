"use client";
import React, { useState, useEffect } from "react";
import "./KfsCompleted.css";
import axios from "axios";
import Image from "next/image";
import hdb from "../../../public/Jays/HDB.png";
import { useRouter, useSearchParams } from "next/navigation";
import { Roboto } from "next/font/google";
import Agreement from "../../component/Yubi/newplimages/Agreement.png";
import StickyWarning from "../../component/Yubi/StickyWarning";


const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Agreementcompleted = ({ clientLoanId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const salarySlipLink = searchParams.get("salarySlipLink");
  const paramId = searchParams.get("client_loan_id");


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
    <div className={`${roboto.className} pageContainerloanpage`}>
        <div className="loan-block">
      <div className="loan-head">
         <div className="hdb-logo">
                  <Image
                    src={hdb}
                    alt="Hdb tag"
                    style={{alignContent:"center",width:"auto",height:"auto"}}
                  />
                </div>
      </div>
       <div className="cardForm-loan">
            <div className="content-loan">
              <div className="formloanpage">
                <div className="sign-txt">
                  <div className="kfs-icon-container">
                    <div className="kfs-circle-bg"></div>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(45deg, #6039D2, #8B5FD6)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '36px',
                      fontWeight: 'bold',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      📄
                    </div>
                  </div>
                </div>
                
                <div className="status-container">
                  <div className="status-row">
                    <div className="status-icon status-completed">
                      ✓
                    </div>
                    <div className="status-text status-completed-text">
                      KFS Completed
                    </div>
                  </div>

                   <div className="status-row">
                    <div className="status-icon status-completed">
                      ✓
                    </div>
                    <div className="status-text status-completed-text">
                      Agreement Completed
                    </div>
                  </div>
                  
                  <div className="status-row">
                    <div className="status-icon status-pending">
                      📋
                    </div>
                    <div className="status-text status-pending-text">
                      Mandate
                      <div className="blinking-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="Long-button">
                  <button onClick={handleSubmit} className="form-submit">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <StickyWarning />
      </>
  );
};
export default Agreementcompleted;
