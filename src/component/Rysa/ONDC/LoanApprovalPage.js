"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
// import "./LoanApprovalPage.css";
// import "../../Yubi/LoanApprovalPageNew.css";
import "./LoanApprovalPageNew.css";
import axios from "axios";
import Image from "next/image";
// import hdb from "../../components/Yubi/newplimages/HDB.png";
import ondclogo from "./images/ondc_registered_logo.png";
// import { Roboto } from "@next/font/google";
import SelectedLenderContext from "./context/SelectedLenderContext";
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { selectLoanAmountForm } from "./formSubmitApis/FormSubmitApi";
import { select } from "./apis/ondcapi";
import OnSearchContext from "./context/OnSearchContext";
import useWebSocketONDCSelect from "./Websocket/useWebSocketONDCSelect";
import useWebSocketONDCstatus from "./Websocket/useWebSocketONDCstatus";
import OnStatusContext from "./context/OnStatusContext";
import { init } from "./apis/ondcapi";
import useWebSocketONDCInit from "./Websocket/useWebSocketONDCInit";
import CallbackLoader from "./LoadingPages/CallbackLoader";
import FinalLoanOfferContext from "./context/FinalLoanOfferContext";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const LoanApprovalPage = () => {

  // 1. Define ref at the top of your component
  const externalFormWindowRef = useRef(null);

  const { finalLoanOffer, setFinalLoanOffer } = useContext(FinalLoanOfferContext);
  const { formSubmissionData, setFormSubmissionData, payloadForSelect, setPayloadForSelect } = useContext(OnSearchContext);
  const { onStatusData, setOnStatusData, initPayload, setInitPayload } = useContext(OnStatusContext);

  const router = useRouter();

  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("0 months");

  const [minAmt, setMinAmt] = useState(0);
  const [maxAmt, setMaxAmt] = useState(0);

  const [enteredTenure, setEnteredTenure] = useState();

  const { SelectedLenderData, setSelectedLenderData } = useContext(SelectedLenderContext);

  const [onSelectResponse, setOnSelectResponses] = useState(null);
  const [waitingForCallback, setWaitingForCallback] = useState(false);
  const [hittingInitApi, setHittingInitApi] = useState(false);

  // let externalFormWindow = null; // define this outside the function or in component scope

  useEffect(() => {
    console.log("After loading the loanapproval page the selectedLenderData is :: ", SelectedLenderData);
    if (SelectedLenderData != null) {
      // setMaxAmt(SelectedLenderData.message.order.items[0].price.value);
      setMaxAmt(SelectedLenderData.message.order.quote.breakup[0].price.value);
      setTenure(SelectedLenderData.message.order.items[0].tags[0].list[1].value);
    }

    console.log("The payload for select is : ", payloadForSelect);
  }, [])

  // const handleApplyRecord = async() => {
  //   try{
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}createApplyRecord`,{
  //       "productName": "ONDC",
  //       "mobileNumber": formSubmissionData.contactNumber,
  //       "stage": 2
  //     },{
  //       headers:{
  //         "Content-Type": "application/json"
  //       }
  //     });
  //     console.log("handle apply record is : ",response);
  //   }catch(error){
  //     console.log("error in saving apply record : ",error);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // externalFormWindowRef.current = window.open("", "_blank");
    // externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");
    externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");


    try {

      const formUrl = SelectedLenderData.message.order.items[0].xinput.form.url.replace("/get/", "/post/");
      const response = await selectLoanAmountForm(formUrl, loanAmount);
      console.log("The response of loanAmount form is : ", response);
      if (response.data.status === "Successful" && response.data.submission_id) {

        // await handleApplyRecord();

        const updatedPayload = {
          bppId: SelectedLenderData.context.bpp_id,
          bppUri: SelectedLenderData.context.bpp_uri,
          formId: SelectedLenderData.message.order.items[0].xinput.form.id,
          itemId: SelectedLenderData.message.order.items[0].id,
          providerId: SelectedLenderData.message.order.provider.id,
          status: "SUCCESS",
          submissionId: response.data.submission_id,
          transactionId: SelectedLenderData.context.transaction_id,
          mobileNumber: formSubmissionData.contactNumber,
          stage: 2, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
          productName: SelectedLenderData.message.order.provider.descriptor.name,
          loanAmount: loanAmount, //this loan amount will be stored in userInfo table
          version: SelectedLenderData.context.version
        };

        console.log("The updated payload before sending to the select is : ", updatedPayload);
        setWaitingForCallback(true);
        const selectResponse = await select(updatedPayload);


        console.log("The select response that we got is : ", selectResponse);

        if (selectResponse.status === 200) {
          if (selectResponse.data.gateway_response.message.ack.status === "ACK") {

            console.log("Got the success response of select and that is : ", selectResponse);

          }

        }
      }
      //else to write a logger of form problem
      else {
        //here we will write the user in apply fail as we haven't created the apply record for the user
        // await handleApplyFail();
      }

    } catch (error) {
      console.log("The error is : ", error);
    }

  };

  //code to get the latest callback
  const handleWebSocketMessageForSelect = useCallback((data) => {
    console.log('Received from WebSocket for 3rd onselect callback:', data);
    try {
      const parsedData = JSON.parse(data.content);
      console.log("The callback that we got from the 3rd on_select is :: ", parsedData);
      setOnSelectResponses(parsedData);

      if ((parsedData.message.order.items[0].xinput.form.url)) {

        console.log("When we got the url of the form");

        // window.location.href = parsedData.message.order.items[0].xinput.form.url;
        //         const returnUrl = encodeURIComponent(window.location.href); // or a specific route
        // const formUrl = parsedData?.message?.order?.items?.[0]?.xinput?.form?.url;

        // if (formUrl) {
        //   const redirectUrl = `${formUrl}?return_url=${returnUrl}`;
        //   console.log("Redirecting to:", redirectUrl);
        //   // window.location.href = redirectUrl;
        //   window.open(redirectUrl);
        // }

        const formUrl = parsedData?.message?.order?.items?.[0]?.xinput?.form?.url;
        console.log("The form url is : ", formUrl);
        const returnUrl = encodeURIComponent(window.location.href);
        console.log("The return url of the form is : ", returnUrl);

        // 3. Use in handleWebSocketMessageForSelect
        if (formUrl && externalFormWindowRef.current) {
          const redirectUrl = `${formUrl}`;
          externalFormWindowRef.current.location = redirectUrl;
        }

      }

      // setWaitingForCallback(false);

    } catch (error) {
      console.error("Error parsing on_select content:", error);
    }
  }, []);

  useWebSocketONDCSelect(handleWebSocketMessageForSelect);

  const handleWebSocketMessageForStatus = useCallback((data) => {

    console.log("received response id of the third onselct form & i.e : ", data);
    try {

      const parsedData = JSON.parse(data.content);
      //here we should be creating one global variable or context which will hold this onstatus callback

      if (parsedData.message.order.items[0].xinput.form_response.status === "APPROVED" && parsedData.message.order.items[0].xinput.form_response.submission_id) {
        //so here we will take that submission id and then will hit that init api

        //here we will store the onSelect callback
        setOnStatusData(parsedData);

        //   //here we will call the init api with the values(taken from onStatus ) which it will need
        //here we are only setting the value which we get from onStatus needed for calling init1 api which we call in bankDetails page
        const initPayload = {
          transactionId: parsedData.context.transaction_id,
          bppId: parsedData.context.bpp_id,
          bppUri: parsedData.context.bpp_uri,
          providerId: parsedData.message.order.provider.id,
          itemId: parsedData.message.order.items[0].id,
          formId: parsedData.message.order.items[0].xinput.form.id,
          submissionId: parsedData.message.order.items[0].xinput.form_response.submission_id,
          bankCode: "HDFC",
          accountNumber: "1234567890",
          vpa: "user@upi",
          settlementAmount: "1666.67",
          initAttempt: 1
        }

        setInitPayload(initPayload);
        // setFinalLoanOffer(parsedData);
        setFinalLoanOffer({
          loanAmount: parsedData.message.order.quote.breakup[0].price.value,//This is the principal loan amount
          processingFees: parsedData.message.order.quote.breakup[2].price.value, //This is processing_fee
          interest: parsedData.message.order.quote.breakup[1].price.value, //Interest
          otherUpfrontCharges: parsedData.message.order.quote.breakup[3].price.value,
          insuranceCharges: parsedData.message.order.quote.breakup[4].price.value,
          netDisbursedAmount: parsedData.message.order.quote.breakup[5].price.value,
          otherCharges: parsedData.message.order.quote.breakup[6].price.value,

          //Loan Information
          interestRate: parsedData.message.order.items[0].tags[0].list[0].value,
          tenure: parsedData.message.order.items[0].tags[0].list[1].value, //emi tenure
          foreClosurePenalty: parsedData.message.order.items[0].tags[0].list[4].value,
          delayPaymentPenalty: parsedData.message.order.items[0].tags[0].list[6].value,
          repaymentInstallments: parsedData.message.order.items[0].tags[0].list[10].value, //no of installments
          installmentAmount: parsedData.message.order.items[0].tags[0].list[13].value, //emiAmount
          tncLink: parsedData.message.order.items[0].tags[0].list[11].value,
          kfsLink: parsedData.message.order.items[0].tags[0].list[14].value,
          TotalAmountPayable: parsedData.message.order.items[0].price.value,

          //GRO Information
          groName: parsedData.message.order.provider.tags[0].list[0].value,
          groDesignation: parsedData.message.order.provider.tags[0].list[3].value,
          groContactNo: parsedData.message.order.provider.tags[0].list[2].value,
          groAddress: parsedData.message.order.provider.tags[0].list[4].value,
          groEmail: parsedData.message.order.provider.tags[0].list[1].value

          // emiAmount: ,
          // emiTenure: 
        })

        // router.push("/ondc/bankdetails");
        router.push("/ondc/loanoffer");
        // here instead of redirecting the user to the bank details page firstly we will show him the loan offer and then from that loanoffer page user will be redirected to bankDetails page

        // const initResponse = await init(initPayload);
        // handleInit(initPayload);

        //for temporarily we are calling our init api from here but after we will be calling init api on another page after taking the bank details
        const submissionId = parsedData.message.order.items[0].xinput.form_response.submission_id;
        console.log("The submission id that we got is : ", submissionId);
      }

    } catch (error) {
      console.log("Error while getting onstatus : ", error);
    }

  }, []);


  useWebSocketONDCstatus(handleWebSocketMessageForStatus);



  return (

    <>
      {/* {
      hittingInitApi && (<>processing.....</>)
    } */}
      {
        !waitingForCallback ? (<>
          <div className={`${roboto.className} pageContainerloanpage`}>
            <div className="loan-block">
              <div className="loan-head">
                <div className="hdb-logo">
                  <Image
                    src={ondclogo}
                    alt="Hdb tag"
                    style={{ alignContent: "center", width: "auto", height: "auto" }}
                  />
                </div>
              </div>
              <div className="cardForm-loan">
                <div className="content-loan">
                  <form onSubmit={handleSubmit} className="formloanpage">
                    <div className="cardContainerloanpage" >
                      {/* <h2>Congratulations ! You have been Approved a loan of</h2>
                      <h1>₹{maxAmt}</h1> */}
                      <h3 style={{ textAlign: "center", color: "#777777" }}>Congratulations ! You have been Approved a loan of</h3>
                      <h1 style={{ color: "#777777" }}>₹{maxAmt}
                      </h1>

                      {/* Loan Amount Field */}
                      <label className="label">Choose loan amount</label>
                      <input
                        type="number"
                        className="inputBox"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="Enter Loan Amount"
                        min={100000}
                        max={maxAmt}
                        // onInput="validateAmount(this)"
                        required
                      />

                      <p className="helperText">You can enter up to {maxAmt}</p>

                      {/* Loan Amount Slider */}
                      <div className="sliderContainer">
                        <span>₹1,00,000</span>
                        <input
                          type="range"
                          min={100000}
                          max={maxAmt}
                          step={5000}
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="slider"
                        />
                        <span>₹{maxAmt}</span>
                      </div>

                      {/* Tenure Input Field */}
                      {/* <label className="label">Choose loan tenure</label>
                          <input
                            type="number"
                            className="inputBox"
                            value={enteredTenure}
                            onChange={(e) => setEnteredTenure(e.target.value)}
                            placeholder="Enter Tenure in Months"
                            min={0}
                            max={tenure}
                            step={1}
                            required
                          />

                              <p className="helperText">You can enter up to {tenure.match(/\d+/)[0]} months</p> */}

                      {/* Tenure Slider */}
                      {/* <div className="sliderContainer">
                                        <span>0</span>
                                        <input
                                          type="range"
                                          min={0}
                                          max={tenure.match(/\d+/)[0]}
                                          step={1}
                                          value={enteredTenure}
                                          onChange={(e) => setEnteredTenure(Number(e.target.value))}
                                          className="slider"
                                        />
                                        <span>{tenure.match(/\d+/)[0]}</span>
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

                  </form>
                </div>
              </div>
            </div>
          </div>
        </>) :
          (<>
            {/* waiting for callback */}
            <CallbackLoader />
          </>)
      }

    </>
  )

};
export default LoanApprovalPage;