"use client";
import React, { useState, useRef, use } from "react";
import Select from "react-select";
import { FaUser, FaBuilding, FaCreditCard,FaUniversity,FaLandmark } from "react-icons/fa";
import styles from "./NewPlFirstPage.module.css";
import "./Bank_Details.css";
import EmblaCarousel from'../Emblacarousel/js/EmblaCarousel';
// import EmblaCarousel from "../Emblacarousel/js/EmblaCarousel";
import listimage1 from "../../../public/happy.jpg";
import listimage2 from "../../../public/happy.jpg";
import listimage3 from "../../../public/happy.jpg";
// import KFSDocs from "./KfsDocs";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const OPTIONS = { direction: "rtl", loop: true };
const SLIDES = [
  { imageUrl: listimage1 },
  { imageUrl: listimage2 },
  { imageUrl: listimage3 },
];
const NewBankD = () => {
  const [formData, setFormData] = useState({
    accountname: "",
    IFSC: "",
    accountNumber: "",
    salarySlip: null, 
    bankName:"",
    branchName:"",
  });

  const [formErrors, setFormErrors] = useState({});
  const [activeContainer, setActiveContainer] = useState("BankDetails");
  // Refs for form fields
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

  const handleaccountnameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, accountname: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, accountname: "" }));
  };
  const handlebankNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, bankName: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, bankName: "" }));
  };
  const handlebranchNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, branchName: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, branchName: "" }));
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
      if (!formData.bankName) {
      errors.bankName = "Bank Name is required";
      isValid = false;
    } else if (formData.bankName.trim().length < 2) {
      errors.bankName = "Bank Name must be at least 2 characters";
      isValid = false;
    }
      if (!formData.branchName) {
      errors.branchName = "Branch Name is required";
      isValid = false;
    } else if (formData.branchName.trim().length < 2) {
      errors.branchName = "Branch Name must be at least 2 characters";
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
     if (formData.salarySlip) {
      data.append("salarySlip", formData.salarySlip);
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      setActiveContainer("KFSDocs");
    }
  };

  return (
    <>
      {activeContainer === "KFSDocs" ? (
        <KFSDocs />
      ) : (
        <div className={`${roboto.className} page-container-bankds`}>
          <div className="carousel-background">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </div>
          <div
            className="newfirstcard-container-bd"
            style={{ boxSizing: "content-box" }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Account name Field */}
              <div className={styles.formGroup}>
                <div
                  className={styles.formGroup}
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    id="accountname"
                    name="accountname"
                    placeholder="Account holder name"
                    value={formData.accountname}
                    className={styles.input}
                    onChange={handleaccountnameChange}
                  />
                  <span
                    className={styles.icon}
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
              {/*Bank Name Field */}
               <div className={styles.formGroup}>
                <div
                  className={styles.formGroup}
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    placeholder="Bank Name"
                    value={formData.bankName}
                    className={styles.input}
                    onChange={handlebankNameChange}
                  />
                  <span
                    className={styles.icon}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#00000061",
                    }}
                  >
                   <FaUniversity />
                  </span>
                </div>
                {formErrors.bankName && (
                  <span className="error">{formErrors.bankName}</span>
                )}
              </div>
              {/*Branch Name Field */}
               <div className={styles.formGroup}>
                <div
                  className={styles.formGroup}
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    id="branchName"
                    name="branchName"
                    placeholder="Branch Name"
                    value={formData.branchName}
                    className={styles.input}
                    onChange={handlebranchNameChange}
                  />
                  <span
                    className={styles.icon}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#00000061",
                    }}
                  >
                   <FaLandmark/>
                  </span>
                </div>
                {formErrors.branchName && (
                  <span className="error">{formErrors.branchName}</span>
                )}
              </div>
              {/* IFSC Field */}
              <div className={styles.formGroup}>
                <div
                  className={styles.inputWrapper}
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
                    className={styles.input}
                    autoCapitalize="words"
                  />

                  <span
                    className={styles.icon}
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
              <div className={styles.formGroup}>
                <div
                  className={styles.inputWrapper}
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
                    className={styles.input}
                  />
                  <span
                    className={styles.icon}
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
                   {/* Salary Slip Upload */}
              <div className={styles.formGroup}>
              <label
                 htmlFor="salarySlipUpload"
                 style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}
              >
                Upload Salary Slip
              </label>
              <input
               id="salarySlipUpload"
               type="file"
               accept=".pdf, .jpg, .jpeg, .png"
               onChange={(e) =>
               setFormData({ ...formData, salarySlip: e.target.files[0] })
               }
               className={styles.input}
              />
            </div>
              {/* Submit Button */}
              <div className={styles.stickyButton}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.submitButton}`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewBankD;
// "use client"
// import React, { useState, useRef } from "react";
// import listimage1 from './newplimages/finalimage2.png';
// import listimage2 from './newplimages/finalimage3.png';
// import listimage3 from './newplimages/plimage33.png';
// import styles from './NewPlFirstPage.module.css';
// import EmblaCarousel from './Emblacarousel/js/EmblaCarousel';
// import NewBlListPage from "../NewBlJourneyD/NewBlListPage";
// import axios from "axios";
// import "./BankDetails.css";
// import Loader from "../NewBlJourneyD/LendersLoader";
// import RedirectionLoader from "../NewBlJourneyD/RedirectionLoader";
// import ApplicationLoader from "../NewBlJourneyD/ApplicationLoader";
// import ErrorPopup from '../NewBlJourneyD/ErrorPopup';
// import { FaUser, FaBuilding, FaCreditCard} from 'react-icons/fa';
// import {Roboto} from '@next/font/google';

// const roboto = Roboto({
//   weight: ['400', '700'],
//   subsets: ['latin'],
// });

// const OPTIONS = { direction: 'rtl', loop: true };
// const SLIDES = [
//   { imageUrl: listimage1 },
//   { imageUrl: listimage2 },
//   { imageUrl: listimage3 },
// ];

// const NewBankD = (dobFlag) => {
//     const [formErrors, setFormErrors] = useState({
//         accountname: "",
//         accounttype: "",
//         banktype: "",
//         IFSC: "",
//         accountNumber: "",

//       });

//       const [formData, setFormData] = useState({
//         accountname: "",
//         accounttype: "",
//         banktype: "",
//         IFSC: "",
//         accountNumber: "",

//       });
//   const [consent, setConsent] = useState(false);
//   const [terms, setTerms] = useState(false);
//   const [showFullConsent, setShowFullConsent] = useState(false);
//   const [showConsent, setShowConsent] = useState(false);
//   const [errors, setErrors] = useState({}); // Object to store error messages
//   const formRef = useRef(null);

//   const[ActiveContainer, setActiveContainer]= useState("NewBlFirstPage");
//   const [isLoading, setIsLoading] = useState(false);
//   var json = null;
//   const [lenderDetails, setLenderDetails] = useState(null);

//   const [lenderProduct, setLenderProduct] = useState(null);
//   const [cpi,  setCpi] = useState(0);
//   const[redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
//   const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
//   const [errorPopup, setErrorPopup] = useState(false);

//   const validateForm = () => {
//     let valid = true;
//     const errors = {
//       accountname: "",
//       accounttype: "",
//       banktype: "",
//       IFSC: "",
//       accountNumber: "",

//     };

//     // Account holder Name validation
// if (!formData.accountname.trim()) {
//     errors.accountname = "Account holder Name is required";
//     valid = false;
//   } else if (!/^[a-zA-Z\s]*$/.test(formData.accountname.trim())) {
//     errors.accountname = "Account holder Name should contain only letters";
//     valid = false;
//   }

//     // Account type validation
//     if (!formData.accounttype.trim()) {
//         errors.accounttype = "Account type is required";
//         valid = false;
//       }

//     //bank type validation
//     if (!formData.banktype) {
//         errors.banktype = "Bank account type is required";
//         valid = false;
//       }

//     // IFSC code validation
//     if (!formData.IFSC.trim()) {
//         errors.IFSC = "IFSC is required";
//     } else if (
//         !/^[A-Z]{4}0[A-Z0-9]{11}$/.test(formData.IFSC)
//     ) {
//         errors.IFSC = "Invalid IFSC code. Format: ABCD0EFGH12";
//     }

//     //Account number validation
//     if (!formData.accountNumber.trim()) {
//         errors.accountNumber = "Account number is required";
//     } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
//         errors.accountNumber = "Invalid account number. Must be 9-18 digits";
//     }

//     setFormErrors(errors);
//     return valid;
//   };

//   const today = new Date();
//   const eighteenYearsAgo = new Date(
//     today.getFullYear() - 18,
//     today.getMonth(),
//     today.getDate()
//   );
//   const sixtyYearsAgo = new Date(
//     today.getFullYear() - 60,
//     today.getMonth(),
//     today.getDate()
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {

//       handleFormSubmit(e);

//     }
//   };

//   const handleFormSubmit = async (e) => {
//     console.log("Inside this function 1");
//     e.preventDefault();

//     console.log("Inside this function");
//     try {
//       const queryParams = new URLSearchParams(location.search);

//       // Retrieve values for the specified parameters
//       const channel = queryParams.get("channel") || "";
//       const dsa = queryParams.get("dsa") || "";
//       const source = queryParams.get("source") || "";
//       const subSource = queryParams.get("sub_source") || "";
//       const subDsa = queryParams.get("sub_dsa") || "";

//       const urllink = location.search?.split("?")[1] || "null";

//       const formData1 = new FormData();
//       formData1.append("accountname", formData.accountname);
//       formData1.append("accounttype",formData.accounttype);
//       formData1.append("banktype",formData.banktype);
//       formData1.append("IFSC",formData.IFSC);
//       formData1.append("accountNumber",formData.accountNumber);
//       formData1.append("dsa", dsa);
//       formData1.append("channel", channel);
//       formData1.append("source", source);
//       formData1.append("sub_source", subSource);
//       formData1.append("campaign", urllink);
//       formData1.append("sub_dsa", subDsa);

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/smart_coin_loanSubmitAPI`,
//         formData1
//       );

//       if (response.status === 200) {
//       } else {
//         console.error("Submission failed:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const getLoanBackendMethod=(e, lenderProduct)=>{

//     setCpi(0);
//     setLenderProduct(lenderProduct);
//     handleDataLayerStage(2); // Track step 2 when the form is submitted
//     apiExecutionBackend(lenderProduct, 0,0);

//   }

//   const handleaccountnameChange = (e) => {
//     // Allow only letters and spaces in the input
//     const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
//     setFormData({ ...formData, accountname: value });
//     // Clear error message when user starts typing valid input
//     if (formErrors.accountname) {
//       setFormErrors({ ...formErrors, accountname: "" });
//     }
//   };

//   const apiExecutionBackend = async (productname, lenderCpi, productId) => {

//     console.log(productname);

//     console.log("Cpi is : ",lenderCpi);
//     console.log("product id :: ",productId);

//     // If lenderCpi is 1, redirect to lender.applicationlink

//     console.log(cpi);

//     if (lenderCpi === 1) {
//       setRedirectionLinkLoader(true);

//       try{
//         const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/cpiClickNew_bl`, formData1);
//         // console.log("The response is : ",response);

//         console.log("After h5");

//       }catch(error)
//       {
//         console.log("The error is : ",error);
//       }

//       console.log("After response of cpiClickNew_bl")

//       const timer = setTimeout(() => {
//         setRedirectionLinkLoader(false);
//         console.log("Before redirect");
//         const lenderApplicationLink = localStorage.getItem('applicationLink');
//         console.log("Before getting application link");
//         window.location.href = lenderApplicationLink;
//         console.log("After Redirect");
//         // window.location.href = lenderApplicationLink;
//       }, 3000);

//     }else{
//       console.log("Inside get Loan Backend");
//     // e.preventDefault();

//     setApiExecutionLoader(true);

//     console.log("Inside get Loan Backend");

//     try {
//       const formData1 = new FormData();
//       formData1.append('mobilenumber', mobile);
//       formData1.append('product', productname);

//       // setlenderName(productname);

//       const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}apiExecution_bl_apply_prime_master`, formData1, {
//         headers: {
//           'Content-Type': 'application/json',
//           'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
//         }
//       });

//       if (response.data.code === 0) {
//         console.log("Inside get Loan Backend when code is 0");
//         // setIsCameFromBackend(true);
//         setApplicationPopup(true);
//         const timer = setTimeout(() => {
//           setApiExecutionLoader(false);
//         }, 3000);
//         var redirectionlink = response.data.data.lender_details[0].applicationlink;
//         setLink(redirectionlink);
//         // {!setIsLoading && <ApplicationPopup link={link}/>}
//       }
//       else if (response.data.code === -1) {
//         console.log(-1);
//         setErrorPopup(true);
//         const timer = setTimeout(() => {
//           setApiExecutionLoader(false);
//         }, 3000);

//         // setErrorPopup(true); //This will be true when the code will be -1
//       } else {
//         const timer = setTimeout(() => {
//           setApiExecutionLoader(false);
//         }, 3000);
//       }

//       console.log("for partner page", response);

//     } catch (error) {

//     }
//     }

//   };

//   return (
//     <>
//     {
//       errorPopup && <ErrorPopup lenderName={lenderProduct} mobileNumber={mobile} setErrorPopup={setErrorPopup} />
//     }
//     {
//       apiExecutionLoader && <ApplicationLoader/>
//     }
//     {
//       redirectionLinkLoader && <RedirectionLoader/>
//     }
//     {
//         ActiveContainer === "NewBlListPage" &&
//         // <LendersList companies={lenderDetails} formData={formData} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod}/>
//         <NewBlListPage companies={lenderDetails} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod} mobileNumber={mobile}/>
//       }
//     {
//         isLoading && <Loader/>
//       }

//     {
//         ActiveContainer === 'NewBlFirstPage' &&

//     <div className={`${roboto.className} page-container`}>
//       <div className="carousel-background">
//         <EmblaCarousel slides={SLIDES} options={OPTIONS} />
//       </div>
//       <div className="newfirstcard-container-bd" style={{ boxSizing: 'content-box' }}>
//         <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
// <div>
//               <div className={styles.formGroup} style={{ position: 'relative' }}>
//                 <input
//                     type="text"
//                     id="accountname"
//                     name="accountname"
//                     placeholder="Account holder name"
//                     value={formData.accountname}
//                     className={styles.input}
//                     onChange={handleaccountnameChange}
//                   />
//                    <span
//                     className={styles.icon}
//                     style={{
//                     position: 'absolute',
//                     right: '15px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     cursor: 'pointer',
//                     color: '#00000061',
//                   }}
//                 >
//                   <FaUser />
//                 </span>
//                 {formErrors.accountname && (
//                   <span className="error" style={{ position: 'absolute', top: '100%', left: 0 }}>
//                     {formErrors.accountname}
//                   </span>
//                 )}
//               </div>

//             <div className={styles.formGroup} style={{ position: 'relative' }}>

//             <select
//                 id="accounttype"
//                 name="accounttype"
//                 value={formData.accounttype}
//                 className={styles.input}
//                 onChange={(e) => {
//                 setFormData({ ...formData, accounttype: e.target.value });
//                 setFormErrors({ ...formErrors, accounttype: "" }); // Clear accounttype error on change
//                 }}
//                 onBlur={(e) =>
//                 setFormErrors({
//                     ...formErrors,
//                     accounttype: e.target.value ? "" : "Account type is required",
//                 })
//                 }
//             >
//                 <option value="NA">Account type</option>
//                 <option value="savings">savings</option>
// 				        <option value="checking">checking</option>
//             </select>
//             {formErrors.accounttype && (
//                   <span className="error" style={{ position: 'absolute', top: '100%', left: 0 }}>
//                     {formErrors.accounttype}
//                   </span>
//                 )}
//             </div>

//               <div className={styles.formGroup} style={{ position: 'relative' }}>
//                 <select
//                     id="banktype"
//                     name="banktype"
//                     value={formData.banktype}
//                     className={styles.input}
//                     onChange={(e) => {
//                       setFormData({ ...formData, banktype: e.target.value });
//                       setFormErrors({ ...formErrors, banktype: "" }); // Clear profession error on change
//                     }}
//                     onBlur={(e) =>
//                       setFormErrors({
//                         ...formErrors,
//                         banktype: e.target.value
//                           ? ""
//                           : " Bank Account type is required",
//                       })
//                     }
//                   >
//                     <option value="NA">Bank account type</option>
//                     <option value="individual">individual</option>
//                     <option value="joint">joint</option>
//                   </select>
//                   {formErrors.banktype && (
//                   <span className="error" style={{ position: 'absolute', top: '100%', left: 0 }}>
//                     {formErrors.banktype}
//                   </span>
//                 )}

//               </div>

//       <div className={styles.formGroup} style={{ position: 'relative' }}>
//         <input
//           type="text"
//           id="IFSC"
//           name="IFSC"
//           placeholder="Enter IFSC"
//           value={formData.IFSC}
//           className={styles.input}
//           onChange={(e) => {
//             // Allow only letters and numbers in the IFSC field and limit to 11 characters
//             const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11);
//             setFormData({ ...formData, IFSC: value });
//             if (formErrors.IFSC) {
//               setFormErrors({ ...formErrors, IFSC: "" });
//             }
//           }}
//         />
//                 <span
//                     className={styles.icon}
//                     style={{
//                     position: 'absolute',
//                     right: '15px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     cursor: 'pointer',
//                     color: '#00000061',
//                   }}
//                 >
//                   <FaBuilding />
//                 </span>
//                 {formErrors.IFSC && (
//                   <span className="error" style={{ position: 'absolute', top: '100%', left: 0 }}>
//                     {formErrors.IFSC}
//                   </span>
//                 )}
//       </div>

//       <div className={styles.formGroup} style={{ position: 'relative' }}>
//         <input
//           type="text"
//           id="accountNumber"
//           name="accountNumber"
//           placeholder="Enter account no."
//           value={formData.accountNumber}
//           className={styles.input}
//           onChange={(e) => {
//             const value = e.target.value.replace(/\D/g, ""); // Allow only digits
//             setFormData({ ...formData, accountNumber: value });
//             if (formErrors.accountNumber) {
//               setFormErrors({ ...formErrors, accountNumber: "" });
//             }
//           }}
//         />
//          <span
//                     className={styles.icon}
//                     style={{
//                     position: 'absolute',
//                     right: '15px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     cursor: 'pointer',
//                     color: '#00000061',
//                   }}
//                 >
//                   <FaCreditCard />
//                 </span>
//                 {formErrors.accountNumber && (
//                   <span className="error" style={{ position: 'absolute', top: '100%', left: 0 }}>
//                     {formErrors.accountNumber}
//                   </span>
//                 )}
//         </div>

//               <div className={styles.stickyButton}>
//               <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Next</button>
//               {/* className={`w-full  ${styles.submitButton}`} */}
//               </div>
//               </div>
//         </form>
//       </div>
//     </div>
// }
//     </>
//   );
// };

// export default NewBankD;
