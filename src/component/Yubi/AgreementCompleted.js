"use client";
import React, { useState, useEffect } from "react";
import "./KfsCompleted.css";
// import KFSDocs from "./KfsDocs";
// import axios from "axios";
import Image from "next/image";
import hdb from "../../../public/Jays/HDB.png";
import { useRouter, useSearchParams } from "next/navigation";
import { Roboto } from "@next/font/google";
import Agreement from "../../component/Yubi/newplimages/Agreement.png";


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
      <form onSubmit={handleSubmit} className="formloanpage">
           <div className="sign-txt">
                           <Image
                            src={Agreement}
                            alt="Selfie taking instruction"
                            height={100}
                            // style={{ alignContent:"center",marginTop:"50px" }}
                          />
                        </div>
                        <br></br>
                        <br></br>

                         
        <div className="status-row">
          <div className="status-icon">✅</div>
          <div className="status-text">KFS Completed</div>
        </div>
        <div className="status-row">
          <div className="status-icon">✅</div>
          <div className="status-text">Agreement Completed</div>
        </div>
        <div className="status-row">
          <div className="status-icon"></div>
          <div className="status-text">Complete Mandate...</div>
        </div>
     

          
      
          {/* Submit Button */}
              {/* <div className="btnContainer">
                <button type="button"
                    className="nextBtn" >
              Next
            </button>
            </div> */}
             <div className="Long-button">
                <button
                  type="submit"
                  className="form-submit"
                >
                  Next
                </button>
              </div>
            
      
      </form>
      </div>
      </div>
      </div>
    </div>
  );
};
export default Agreementcompleted;
