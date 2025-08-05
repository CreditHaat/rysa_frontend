"use client";
import React, { useState, useRef, useCallback, useContext } from "react";
import Select from "react-select";
import { useSearchParams } from "next/navigation";
import {
  FaUser,
  FaBuilding,
  FaCreditCard,
  FaUniversity,
  FaLandmark,
} from "react-icons/fa";
// import "./BankDetails.css";
import "./BankDetailsNew.css"
import axios from "axios";
// import { Roboto } from "next/font/google";
import Image from "next/image";
import HeaderPart from "./HeaderPart";
import { init } from "./apis/ondcapi";
import useWebSocketONDCInit from "./Websocket/useWebSocketONDCInit";
// import useWebSocketONDCstatus from "./Websocket/useWebSocketONDCstatus";
import OnStatusContext from "./context/OnStatusContext";
import { bankDetailsForm } from "./formSubmitApis/FormSubmitApi";
import SelectedLenderContext from "./context/SelectedLenderContext";
import useWebSocketONDCstatus from "./Websocket/useWebSocketONDCstatus";
// import HittingApisLoader from "./LoadingPages/HittingApisLoader";
import HittingApisLoader from "./LoadingPages/HittingApisLoader";
import { useRouter } from 'next/navigation';
import OnSearchContext from "./context/OnSearchContext";
import logo from "../../Rysa/ONDC/images/ondc_registered_logo.png";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Bankdetails = () => {

  const { SelectedLenderData, setSelectedLenderData } = useContext(SelectedLenderContext);//added this to send the product name from this data to init api for saving logger
  const { formSubmissionData, setFormSubmissionData, payloadForSelect, setPayloadForSelect } = useContext(OnSearchContext);

  const router = useRouter();

  const lastInitRef = useRef(false);
  // 1. Define ref at the top of your component
  const externalFormWindowRef = useRef(null);
  // const externalFormWindowRef2 = useRef(null);

  const [waitingLoader, setWaitingLoader] = useState(false);

  const { onStatusData, setOnStatusData, initPayload, setInitPayload, onOnitData, setOnInitData } = useContext(OnStatusContext);
  const { selectedLenderBankDetails, setSelectedLenderBankDetails } = useContext(SelectedLenderContext);

  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("client_loan_id");
  const [formData, setFormData] = useState({
    accountname: "",
    accountType: "",
    IFSC: "",
    accountNumber: "",
    // salarySlip: null,
    // bankName: "",
    // branchName: "",
    // salarySlipLink: "",
  });

  const formDataRef = useRef(formData);

  const [formErrors, setFormErrors] = useState({});
  const [activeContainer, setActiveContainer] = useState("BankDetails");
  const accountnameRef = useRef(null);
  const bankNameRef = useRef(null);
  const branchNameRef = useRef(null);
  const IFSCRef = useRef(null);
  const accountNumberRef = useRef(null);

  const CustomOption = ({
    data,
    innerRef,
    innerProps,
    selectOption,
    isSelected,
  }) => (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        padding: "10px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{data.label}</span>
        <input
          type="radio"
          name={data.group}
          value={data.value}
          checked={isSelected}
          onChange={() => selectOption(data)}
        />
      </div>
      <hr
        style={{
          margin: "5px 0",
          border: "0",
          borderTop: "1px solid #ddd",
          width: "100%",
        }}
      />
    </div>
  );

  const customStyles = {
    input: (provided) => ({
      ...provided,
      padding: "8px",
      width: "100%",
      minHeight: "70px",
      border: "none",
      cursor: "pointer",
      borderRadius: "50px",
    }),
    menu: (provided) => ({
      ...provided,
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: "400px",
      zIndex: 9999,
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
    }),
    control: (provided) => ({
      ...provided,
      width: "100%",
      borderRadius: "10px",
      minHeight: "50px",
    }),
    placeholder: (provided) => ({
      ...provided,
      padding: "12px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const customStyles2 = {
    control: (provided) => ({
      ...provided,
      minHeight: 'unset',
      height: '36px', // set your desired height
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '2px 8px',
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '36px',
    }),
  };



  const handleaccountnameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, accountname: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, accountname: "" }));
  };


  const handleIFSCChange = (e) => {
    const value = e.target.value.toUpperCase();
    setFormData({ ...formData, IFSC: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, IFSC: "" }));

    if (value && value.length === 11) {
      if (accountNumberRef.current) {
        accountNumberRef.current.focus();
      }
    }
  };

  const handleaccountNumberChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, accountNumber: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, accountNumber: "" }));
  };


  const validateForm = () => {
    const errors = {};
    let isValid = true;
    const data = new FormData();


    if (!formData.accountname) {
      errors.accountname = "Account holder name is required";
      isValid = false;
    } else if (formData.accountname.trim().length < 2) {
      errors.accountname = "Account holder name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.accountType) {
      errors.accountType = "Please select account type";
      isValid = false;
    }

    if (!formData.IFSC) {
      errors.IFSC = "IFSC code is required";
      isValid = false;
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSC)) {
      errors.IFSC = "Please enter a valid IFSC code";
      isValid = false;
    }

    if (!formData.accountNumber) {
      errors.accountNumber = "Account number is required";
      isValid = false;
    } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      errors.accountNumber =
        "Please enter a valid account number (9-18 digits)";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {

    // externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");

    formDataRef.current = formData;
    console.log("The formData while hitting the init api is : ", formData);
    e.preventDefault();

    console.log("Inside handleSubmit");

    if (validateForm()) {
      externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");
      console.log("Form submitted successfully", formData);

      //here we will save the data into userInfo table
      // const response = .{process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}saveUserInfo`);

      //init1 call -- calling init first time
      const updatedInitPayload = {
        ...initPayload,
        bankCode: formData.IFSC,//this fields are optional for the api
        accountNumber: formData.accountNumber,//this fields are optional for the api

        mobileNumber: formSubmissionData.contactNumber,
        stage: 4, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
        productName: SelectedLenderData.message.order.provider.descriptor.name,

        //form data to save
        formType: "KYC Form",//1 is for bank Details
        version: SelectedLenderData.context.version

        // vpa: "user@upi",
        // settlementAmount: "1666.67"
      };
      setWaitingLoader(true);
      // callinng handle init for first init1 call
      handleInit(updatedInitPayload);

    }
  };

  //Code for ONDC ------------------------------------------------------------------------------------

  const handleInit = async (initPayload) => {

    // console.log("The init payload is : ", initPayload);
    // setSelectedLenderBankDetails(formData);

    try {

      // setWaitingLoader(true);

      console.log("The init payload before hitting is : ", initPayload);

      const initResponse = await init(initPayload);
      if (initResponse.status === 200) {
        console.log("The init Respose that we got is :: ", initResponse);
      }

    } catch (error) {
      console.log("Error while calling init api");
    }

  }

  const handleWebsocketMessageForInit = useCallback((data) => {

    console.log("Got oninit");

    // console.log("received response id of the third onselct form & i.e : ", data);
    try {

      const parsedData = JSON.parse(data.content);
      setOnInitData(parsedData);
      //here we should be creating one global variable or context which will hold this onstatus callback
      if (parsedData?.message?.order?.items?.[0]?.xinput?.form?.url) {
        setInitPayload(prev => ({
          ...prev,
          formId: parsedData?.message?.order?.items?.[0]?.xinput?.form?.id,
          // initAttempt: 2,
          paymentId: parsedData?.message?.order?.payments?.[0]?.id
        }));

        //we will be passing this id in the param of handleBankDetailsForm so that from their we can call another init api with the form id of first form submission
        const formIdForParam = parsedData?.message?.order?.items?.[0]?.xinput?.form?.id;
        console.log("Before if else ,", parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur);
        // if (parsedData?.message?.order?.items?.[0]?.xinput?.head?.descriptor?.name === "Account Information") {
        if (parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur === 0) {

          console.log("Inside if for Account Information Form");
          console.log("parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur for Account Information is : ", parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur);
          const formUrl = parsedData?.message?.order?.items?.[0]?.xinput?.form?.url.replace("/get/", "/post/");
          const paymentId = parsedData?.message?.order?.payments?.[0]?.id;
          // here we will call the bankDetailsform function
          handleBankDetailsForm(formUrl, formDataRef, formIdForParam, paymentId);//inside this we will call the init2 api
          //here inside we will hit init2 where we will get the oninit api in which we get the link of emandate form
          //where else if after  this will be executed from where we will get the response of that emandate form in onStatus callback where we will call the init3 api i.e. the last init api
        }
        // else if (parsedData?.message?.order?.items?.[0]?.xinput?.head?.descriptor?.name === "Emandate") {
        else if (parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur === 1) {
          const formUrl = parsedData?.message?.order?.items?.[0]?.xinput?.form?.url;
          // 3. Use in handleWebSocketMessageForSelect
          if (formUrl && externalFormWindowRef.current) {
            const redirectUrl = `${formUrl}`;
            externalFormWindowRef.current.location = redirectUrl;
          }
        } else if (parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur === 2) {

          console.log("Inside else if for LoanAggrement form");
          console.log("parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur for LoanAggrement is : ", parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur);
          const formUrl = parsedData?.message?.order?.items?.[0]?.xinput?.form?.url;

          if (formUrl) {
            router.push("/ondc/loanaggrement");
          } else {
            console.log("No form URL found for Loan Agreement form");
          }
        }



      } else {
        console.log("form not found in onInit");
      }

    } catch (error) {
      console.log("Error while getting onInit : ", error);
    }

  }, []);

  useWebSocketONDCInit(handleWebsocketMessageForInit);

  const handleBankDetailsForm = async (formUrl, formDataRef, formIdForParam, paymentId) => {
    try {

      console.log("here the form url and the id should be the same : ", formUrl, " id is : ", formIdForParam);

      const response = await bankDetailsForm(formUrl, formDataRef);
      if (response.status === 200) {
        // externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");
        // externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");
        console.log("Got the response from bankDetails form : ", response);

        if (response.data.status === "Successful" && response.data.submission_id) {

          const updatedInitPayload = {
            ...initPayload,
            formId: formIdForParam,
            submissionId: response.data.submission_id,
            //here we will write the stage and mobile number and product name

            mobileNumber: formSubmissionData.contactNumber,
            stage: 4, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
            productName: SelectedLenderData.message.order.provider.descriptor.name,

            //form data to save
            formType: "Bank Details",//1 is for bank Details
            accountname: formDataRef.current.accountname,
            accountType: formDataRef.current.accountType,
            IFSC: formDataRef.current.IFSC,
            accountNumber: formDataRef.current.accountNumber,
            version: SelectedLenderData.context.version,
            initAttempt: 2,
            paymentId: paymentId
          };

          //here we are calling init2
          await handleInit(updatedInitPayload);
          // externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");
          // externalFormWindowRef2.current = window.open("/ondc/redirecting", "_blank");

        } else {
          console.log("Not hitting any apis now because of incorrect response");
        }

      }
    } catch (error) {
      console.log("error in calling bankDetails form from BankDetails.js : ", error);
    }
  }

  const handleWebSocketMessageForStatus = useCallback((data) => {

    console.log("received response id of form & i.e : ", data);
    try {

      const parsedData = JSON.parse(data.content);
      //here we should be creating one global variable or context which will hold this onstatus callback

      if (parsedData?.message?.order?.items?.[0]?.xinput?.form_response?.status === "APPROVED" && parsedData?.message?.order?.items?.[0]?.xinput?.form_response?.submission_id) {
        //so here we will take that submission id and then will hit that init api

        //here we will store the onSelect callback
        setOnStatusData(parsedData);

        //   //here we will call the init api with the values(taken from onStatus ) which it will need
        //here we are calling the 3rd init api that is the last init3 api
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
          mobileNumber: formSubmissionData.contactNumber,
          stage: 4, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
          productName: SelectedLenderData.message.order.provider.descriptor.name,

          //form data to save
          formType: "Emandate form",//1 is for bank Details
          version: SelectedLenderData.context.version,
          initAttempt: 3,
          paymentId: parsedData?.message?.order?.payments?.[0]?.id
        }

        setInitPayload(initPayload);

        if (!lastInitRef.current) {
          console.log("caling handle init from onStatus and lastInitRef is : ", lastInitRef.current);
          handleInit(initPayload);
          // router.push("/ondc/loanaggrement");
          // openNewPage();
        }

        // we will get an problem if we call our init api here as we will get to this callback function again after this when we get the onstatus for our next redirected form but their we dont want to call init

        // router.push("/ondc/bankdetails");

        // const initResponse = await init(initPayload);
        // handleInit(initPayload);

        //for temporarily we are calling our init api from here but after we will be calling init api on another page after taking the bank details
        // const submissionId = parsedData.message.order.items[0].xinput.form_response.submission_id;
        // console.log("The submission id that we got is : ",submissionId);
      } else {
        console.log("Not gone in if part of handleWebSocketMessageForStatus");
      }

    } catch (error) {
      console.log("Error while getting onstatus : ", error);
    }

  }, []);

  useWebSocketONDCstatus(handleWebSocketMessageForStatus);

  // const openNewPage=()=>{
  //   externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");
  // }

  //------------------------------------------------------------------------------------------------------




  return (
    <>

      {
        !waitingLoader ?
          (<>
            <div className={`${roboto.className} container-block`}>
              <div className="card-block">
                <div className="header-block">
                  <div className="LogoPart-block">
                    <Image
                      src={logo}
                      alt="Hdb tag"
                      style={{ alignContent: "center", width: "auto", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="cardForm-block">
                  <div className="content-block">
                    <form onSubmit={handleSubmit}>
                      <p className="para">Please provide your bank details</p>

                      {/* Account holder name field */}
                      <div className="fill-form">
                        <div
                          className="fill-form"
                          style={{ position: "relative" }}
                        >
                          <input
                            type="text"
                            id="accountname"
                            name="accountname"
                            placeholder="Account holder name"
                            value={formData.accountname}
                            className="enter-field"
                            onChange={handleaccountnameChange}
                          />
                          <span
                            className="enter-icon"
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              color: "#00000061",
                            }}
                          >
                            <FaUser />
                          </span>
                        </div>
                        {formErrors.accountname && (
                          <span className="error">{formErrors.accountname}</span>
                        )}
                      </div>

                      {/* Account Type */}
                      {/* Account Type Dropdown */}
                      <div className="fill-form">
                        {/* <label htmlFor="accountType" style={{ marginBottom: "8px", fontWeight: "500", display: "block" }}>
                          Select Account Type
                        </label> */}
                        <Select
                          classNamePrefix="myselect"
                          id="accountType"
                          name="accountType"
                          placeholder="Choose account type"
                          options={[
                            { value: "Saving", label: "Saving" },
                            { value: "Current", label: "Current" },
                          ]}
                          value={
                            formData.accountType
                              ? { value: formData.accountType, label: formData.accountType }
                              : null
                          }
                          onChange={(selectedOption) =>
                            setFormData((prev) => ({
                              ...prev,
                              accountType: selectedOption.value,
                            }))
                          }
                        // styles={customStyles}
                        />

                        {formErrors.accountType && (
                          <span className="error">{formErrors.accountType}</span>
                        )}

                      </div>
                      {/* </div> */}

                      {/* IFSC Field */}
                      <div className="fill-form">
                        <div
                          //   className={styles.inputWrapper}
                          style={{ position: "relative" }}
                        >
                          <input
                            ref={IFSCRef}
                            type="text"
                            id="IFSC"
                            name="IFSC"
                            placeholder="Enter IFSC"
                            value={formData.IFSC}
                            onChange={handleIFSCChange}
                            className="enter-field"
                            autoCapitalize="words"
                          />

                          <span
                            className="enter-icon"
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#00000061",
                            }}
                          >
                            <FaBuilding />
                          </span>
                        </div>
                        {formErrors.IFSC && (
                          <span className="error">{formErrors.IFSC}</span>
                        )}
                      </div>

                      {/* Account number Field */}
                      <div className="fill-form">
                        <div
                          //   className={styles.inputWrapper}
                          style={{ position: "relative" }}
                        >
                          <input
                            ref={accountNumberRef}
                            type="number"
                            id="accountNumber"
                            name="accountNumber"
                            placeholder="Enter account number"
                            value={formData.accountNumber}
                            onChange={handleaccountNumberChange}
                            className="enter-field"
                          />
                          <span
                            className="enter-icon"
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#00000061",
                            }}
                          >
                            <FaCreditCard />
                          </span>
                        </div>
                        {formErrors.accountNumber && (
                          <span className="error">{formErrors.accountNumber}</span>
                        )}
                      </div>

                      {/* Submit Button */}
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
            </div >
          </>) :
          (<>
            {/* Processing APIs... */}
            <HittingApisLoader />

          </>)
      }



    </>
  );
};

export default Bankdetails;

// "use client";
// import React, { useState, useRef, useCallback, useContext } from "react";
// import Select from "react-select";
// import { useSearchParams } from "next/navigation";
// import {
//   FaUser,
//   FaBuilding,
//   FaCreditCard,
// } from "react-icons/fa";
// import "./BankDetails.css";
// import axios from "axios";
// import { Roboto } from "next/font/google";
// import HeaderPart from "./HeaderPart";
// import { init } from "./apis/ondcapi";
// import useWebSocketONDCInit from "./Websocket/useWebSocketONDCInit";
// import useWebSocketONDCstatus from "./Websocket/useWebSocketONDCstatus";
// import OnStatusContext from "./context/OnStatusContext";
// import { bankDetailsForm } from "./formSubmitApis/FormSubmitApi";
// import SelectedLenderContext from "./context/SelectedLenderContext";

// const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

// const BankDetails = () => {
//   const lastInitRef = useRef(false);
//   const externalFormWindowRef = useRef(null); // ref to hold the external window

//   const [waitingLoader, setWaitingLoader] = useState(false);
//   const { onStatusData, setOnStatusData, initPayload, setInitPayload } = useContext(OnStatusContext);
//   const { setSelectedLenderBankDetails } = useContext(SelectedLenderContext);
//   const searchParams = useSearchParams();
//   const clientLoanId = searchParams.get("client_loan_id");

//   const [formData, setFormData] = useState({
//     accountname: "",
//     accountType: "",
//     IFSC: "",
//     accountNumber: "",
//   });
//   const formDataRef = useRef(formData);
//   const [formErrors, setFormErrors] = useState({});
//   const accountNumberRef = useRef(null);

//   const validateForm = () => {
//     const errors = {};
//     let isValid = true;

//     if (!formData.accountname || formData.accountname.trim().length < 2) {
//       errors.accountname = "Account holder name is required and must be at least 2 characters";
//       isValid = false;
//     }
//     if (!formData.accountType) {
//       errors.accountType = "Please select account type";
//       isValid = false;
//     }
//     if (!formData.IFSC || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSC)) {
//       errors.IFSC = "Please enter a valid IFSC code";
//       isValid = false;
//     }
//     if (!formData.accountNumber || !/^\d{9,18}$/.test(formData.accountNumber)) {
//       errors.accountNumber = "Enter valid account number (9-18 digits)";
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     formDataRef.current = formData;

//     if (validateForm()) {
//       // ✅ Open the popup early (will be reused)
//       if (!externalFormWindowRef.current || externalFormWindowRef.current.closed) {
//         externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");
//       }

//       const updatedInitPayload = {
//         ...initPayload,
//         bankCode: formData.IFSC,
//         accountNumber: formData.accountNumber,
//       };
//       setWaitingLoader(true);
//       handleInit(updatedInitPayload);
//     }
//   };

//   const handleInit = async (payload) => {
//     try {
//       const initResponse = await init(payload);
//       if (initResponse.status === 200) {
//         console.log("Init success:", initResponse);
//       }
//     } catch (err) {
//       console.log("Init error:", err);
//     }
//   };

//   const handleWebsocketMessageForInit = useCallback((data) => {
//     try {
//       const parsedData = JSON.parse(data.content);
//       const formItem = parsedData?.message?.order?.items?.[0]?.xinput;

//       if (formItem?.form?.url) {
//         const formId = formItem.form.id;
//         setInitPayload(prev => ({ ...prev, formId }));

//         const formUrl = formItem.form.url;
//         const index = formItem.head?.index?.cur;

//         if (index === 0) {
//           handleBankDetailsForm(formUrl.replace("/get/", "/post/"), formDataRef, formId);
//         } else if (index === 1 || index === 2) {
//           if (formUrl) {
//             if (externalFormWindowRef.current && !externalFormWindowRef.current.closed) {
//               externalFormWindowRef.current.location = formUrl;
//             } else {
//               console.warn("Popup was closed — reopening");
//               externalFormWindowRef.current = window.open(formUrl, "_blank");
//             }
//           }
//         }
//       }
//     } catch (err) {
//       console.log("onInit callback error:", err);
//     }
//   }, []);

//   const handleBankDetailsForm = async (formUrl, formDataRef, formId) => {
//     try {
//       const response = await bankDetailsForm(formUrl, formDataRef);
//       if (response.status === 200 && response.data.status === "Successful") {
//         const updatedPayload = {
//           ...initPayload,
//           formId,
//           submissionId: response.data.submission_id,
//         };
//         await handleInit(updatedPayload);
//       }
//     } catch (err) {
//       console.log("Bank details form error:", err);
//     }
//   };

//   const handleWebSocketMessageForStatus = useCallback((data) => {
//     try {
//       const parsedData = JSON.parse(data.content);
//       const item = parsedData?.message?.order?.items?.[0];

//       if (item?.xinput?.form_response?.status === "APPROVED") {
//         const initPayload = {
//           transactionId: parsedData.context.transaction_id,
//           bppId: parsedData.context.bpp_id,
//           bppUri: parsedData.context.bpp_uri,
//           providerId: parsedData.message.order.provider.id,
//           itemId: item.id,
//           formId: item.xinput.form.id,
//           submissionId: item.xinput.form_response.submission_id,
//           bankCode: "HDFC",
//           accountNumber: "1234567890",
//           vpa: "user@upi",
//           settlementAmount: "0"
//         };

//         setInitPayload(initPayload);
//         setOnStatusData(parsedData);

//         if (!lastInitRef.current) {
//           lastInitRef.current = true;
//           handleInit(initPayload);
//         }
//       }
//     } catch (err) {
//       console.log("onStatus callback error:", err);
//     }
//   }, []);

//   useWebSocketONDCInit(handleWebsocketMessageForInit);
//   useWebSocketONDCstatus(handleWebSocketMessageForStatus);

//   return (
//     <>
//       {!waitingLoader ? (
//         <div className={`${roboto.className} bankdetails-block`}>
//           <HeaderPart />
//           <div className="Bank-Card">
//             <form onSubmit={handleSubmit}>
//               <div className="fill-form">
//                 <input
//                   type="text"
//                   name="accountname"
//                   placeholder="Account holder name"
//                   value={formData.accountname}
//                   onChange={(e) => setFormData({ ...formData, accountname: e.target.value })}
//                   className="enter-field"
//                 />
//                 {formErrors.accountname && <span className="error">{formErrors.accountname}</span>}
//               </div>

//               <div className="fill-form">
//                 <Select
//                   placeholder="Choose account type"
//                   options={[
//                     { value: "Saving", label: "Saving" },
//                     { value: "Current", label: "Current" },
//                   ]}
//                   value={
//                     formData.accountType
//                       ? { value: formData.accountType, label: formData.accountType }
//                       : null
//                   }
//                   onChange={(option) => setFormData((prev) => ({ ...prev, accountType: option.value }))}
//                 />
//                 {formErrors.accountType && <span className="error">{formErrors.accountType}</span>}
//               </div>

//               <div className="fill-form">
//                 <input
//                   type="text"
//                   name="IFSC"
//                   placeholder="Enter IFSC"
//                   value={formData.IFSC}
//                   onChange={(e) => setFormData({ ...formData, IFSC: e.target.value.toUpperCase() })}
//                   className="enter-field"
//                 />
//                 {formErrors.IFSC && <span className="error">{formErrors.IFSC}</span>}
//               </div>

//               <div className="fill-form">
//                 <input
//                   ref={accountNumberRef}
//                   type="number"
//                   name="accountNumber"
//                   placeholder="Enter account number"
//                   value={formData.accountNumber}
//                   onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
//                   className="enter-field"
//                 />
//                 {formErrors.accountNumber && <span className="error">{formErrors.accountNumber}</span>}
//               </div>

//               <div className="Long-button">
//                 <button type="submit" className="form-submit">Next</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       ) : (
//         <>Processing APIs...</>
//       )}
//     </>
//   );
// };

// export default BankDetails;
