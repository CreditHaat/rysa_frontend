"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaBuilding,
  FaCreditCard,
  FaUniversity,
  FaLandmark,
} from "react-icons/fa";
import styles from "./NewPlFirstPage.module.css";
import "./BankDetails.css";
import EmblaCarousel from "./Emblacarousel/js/EmblaCarousel";
import listimage1 from "./newplimages/finalimage2.png";
import listimage2 from "./newplimages/finalimage3.png";
import listimage3 from "./newplimages/plimage33.png";
import LoanApprovalPage from "./LoanApprovalPage";
// import CallbackListener from "../CallbackListener";
import SelfieWaiting from "./WaitingPage";
// import axios from "axios";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";

// import {Roboto} from '@next/font/google';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("clientLoanId");
  const loanAmount = searchParams.get("loanAmount");
  const tenure = searchParams.get("tenure");
  const interestRate = searchParams.get("interestRate");

  console.log("clientloanidinbankpage as:", clientLoanId);
  console.log("tenure=", tenure);
  console.log("interest rate=", interestRate);

  const [formData, setFormData] = useState({
    accountname: "",
    // accounttype: "",
    // banktype: "",
    IFSC: "",
    accountNumber: "",
    salarySlip: null,
    bankName: "",
    branchName: "",
    salarySlipLink: "", // 👈 ADD THIS!
  });

  const [formErrors, setFormErrors] = useState({});
  // const [isaccounttypeMenuOpen, setIsaccounttypeMenuOpen] = useState(false);
  // const [isbanktypeMenuOpen, setIsbanktypeMenuOpen] = useState(false);
  const [activeContainer, setActiveContainer] = useState("BankDetails");
  // Refs for form fields
  const accountnameRef = useRef(null);
  const bankNameRef = useRef(null);
  const branchNameRef = useRef(null);
  // const accounttypeRef = useRef(null);
  // const banktypeRef = useRef(null);
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

  // const accounttypeOptions = [
  //   { value: "", label: "Select account type" },
  //   { value: "savings", label: "Savings" },
  //   { value: "checking", label: "Checking" },
  // ];

  // const banktypeOptions = [
  //   { value: "", label: "Select bank type" },
  //   { value: "individual", label: "Individual" },
  //   { value: "joint", label: "Joint" },
  // ];

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

  const handleSalarySlipUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const presignRes = await axios.get(
        `http://localhost:8080/generatePresignedUrl`,
        { params: { fileName: file.name } }
      );

      console.log("Presign response:", presignRes.data);

      const { presignedUrl, publicUrl } = presignRes.data.obj;

      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
      });

      setFormData((prev) => ({
        ...prev,
        salarySlip: file,
        salarySlipLink: publicUrl,
      }));

      console.log("Payslip uploaded to:", publicUrl);
    } catch (err) {
      console.error("Payslip upload failed:", err);
    }
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
    }
    if (!formData.salarySlipLink) {
      errors.salarySlipLink = "Salary slip must be uploaded";
      isValid = false;
    } else if (formData.branchName.trim().length < 2) {
      errors.branchName = "Branch Name must be at least 2 characters";
      isValid = false;
    }

    // if (!formData.accounttype) {
    //   errors.accounttype = "Account type is required";
    //   isValid = false;
    // }

    // if (!formData.banktype) {
    //   errors.banktype = "Bank type is required";
    //   isValid = false;
    // }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      console.log("client load for bankdetailspage is:", clientLoanId);

      try {
        const response = await axios.post(
          `http://localhost:8080/submitBankDetails`,
          {
            clientLoanId: clientLoanId, // 👈 Safe and dynamic
            bankName: formData.bankName,
            branchName: formData.branchName,
            accountName: formData.accountname,
            ifscCode: formData.IFSC,
            accountNumber: formData.accountNumber,
          }
        );

        if (response.data.code === 0) {
          console.log("Disbursement API Response:", response.data.obj);
          // ✅ Redirect or show success
          // setActiveContainer("LoanApprovalPage");
          setActiveContainer("SelfieWaiting");
        } else {
          console.error("Error:", response.data.msg);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  return (
    <>
      {/* <CallbackListener
        onDisbursementSuccess={() => {
          console.log("✅ Disbursement success webhook received");
          if (clientLoanId) {
            router.push(
              `/yubi/Referencedetailspage` +
                `?client_loan_id=${clientLoanId}` +
                `&loanAmount=${loanAmount}` +
                `&tenure=${tenure}` +
                `&interestRate=${interestRate}` +
                `&salarySlipLink=${encodeURIComponent(formData.salarySlipLink)}`
            );
          } else {
            console.error("No clientLoanId found for LoanApproval redirect!");
          }
        }}
      /> */}
      {activeContainer === "SelfieWaiting" && <SelfieWaiting />}

      {activeContainer === "LoanApprovalPage" && (
        <LoanApprovalPage
          salarySlipLink={formData.salarySlipLink}
          clientLoanId={clientLoanId}
        />
      )}
      {activeContainer === "BankDetails" && (
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
                    <FaLandmark />
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
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  Upload Salary Slip
                </label>
                <input
                  id="salarySlipUpload"
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png"
                  onChange={handleSalarySlipUpload}
                  className={styles.input}
                />
              </div>
              {/* Submit Button */}
              <div className={styles.stickyButton}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.submitButton}`}
                >
                  Next
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
