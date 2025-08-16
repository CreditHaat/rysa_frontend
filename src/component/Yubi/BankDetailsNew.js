"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { useSearchParams } from "next/navigation";
import {
  FaUser,
  FaBuilding,
  FaCreditCard,
  FaUniversity,
  FaLandmark,
  FaUpload,
} from "react-icons/fa";
import "./BankDetailsNew.css";
import axios from "axios";
import { Roboto } from "next/font/google";
import Image from "next/image";
import CallbackListener from "../CallbackListener";
import SelfieWaiting from "./WaitingPageforBankdetails";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import hdb from "../Yubi/newplimages/HDB.png";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const BankDetails = () => {
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
    IFSC: "",
    accountNumber: "",
    salarySlip: null,
    bankName: "",
    branchName: "",
    salarySlipLink: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [activeContainer, setActiveContainer] = useState("BankDetails");
  const accountnameRef = useRef(null);
  const bankNameRef = useRef(null);
  const branchNameRef = useRef(null);
  const IFSCRef = useRef(null);
  const accountNumberRef = useRef(null);
  const fileInputRef = useRef(null);

  // Function to scroll to first error field
  const scrollToFirstError = (errors) => {
    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) return;

    const firstErrorField = errorFields[0];
    let targetRef = null;

    // Map error field names to their corresponding refs
    switch (firstErrorField) {
      case "accountname":
        targetRef = accountnameRef;
        break;
      case "bankName":
        targetRef = bankNameRef;
        break;
      case "branchName":
        targetRef = branchNameRef;
        break;
      case "IFSC":
        targetRef = IFSCRef;
        break;
      case "accountNumber":
        targetRef = accountNumberRef;
        break;
      case "salarySlipLink":
        // For file upload, scroll to the file input
        const fileInput = document.getElementById("salarySlipUpload");
        if (fileInput) {
          // Find the scrollable container
          const cardForm = document.querySelector(".cardForm-block");
          if (cardForm) {
            const fieldPosition = fileInput.offsetTop;
            cardForm.scrollTo({
              top: fieldPosition - 100,
              behavior: "smooth",
            });
          }
        }
        return;
      default:
        break;
    }

    // Scroll to the target field within the card container
    if (targetRef && targetRef.current) {
      // Find the scrollable container (.cardForm-block)
      const cardForm = document.querySelector(".cardForm-block");
      if (cardForm) {
        const fieldPosition = targetRef.current.offsetTop;
        cardForm.scrollTo({
          top: fieldPosition - 100, // 100px offset from top
          behavior: "smooth",
        });
      }

      // Optional: Focus on the field after scrolling
      setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.focus();
        }
      }, 500);
    }
  };

  const [bankOptions, setBankOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/banks`)
      .then((res) => {
        setBankOptions(res.data.map((name) => ({ label: name, value: name })));
      })
      .catch((err) => {
        console.error("Failed to fetch bank names:", err);
      });
  }, []);

  const handleBankSelect = (selected) => {
    setFormData({ ...formData, bankName: selected.value });
    setFormErrors((prevErrors) => ({ ...prevErrors, bankName: "" }));
  };

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
        }}
      />
    </div>
  );

  // const customStyles = {
  //   input: (provided) => ({
  //     ...provided,
  //     padding: "8px",
  //     // width: "100%",
  //     // minHeight: "70px",
  //     border: "none",
  //     cursor: "pointer",
  //     borderRadius: "50px",
  //     fontSize: "16px",
  //   }),
  //   menu: (provided) => ({
  //     ...provided,
  //     position: "fixed",
  //     top: "57%",
  //     left: "50%",
  //     transform: "translate(-50%, -50%)",
  //     // width: "80%",
  //     // maxWidth: "400px",
  //     zIndex: 9999,
  //     boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  //     borderRadius: "10px",
  //     fontSize: "16px",
  //   }),
  //   control: (provided) => ({
  //     ...provided,
  //     // width: "100%",
  //     borderRadius: "10px",
  //     minHeight: "50px",
  //   }),
  //   placeholder: (provided) => ({
  //     ...provided,
  //     padding: "12px",
  //     fontSize: "16px",
  //   }),
  //   dropdownIndicator: (provided) => ({
  //     ...provided,
  //     padding: "0",
  //     fontSize: "16px",
  //   }),
  //   indicatorSeparator: () => ({
  //     display: "none",
  //   }),
  // };
  const customStyles = {
    input: (provided) => ({
      ...provided,
      padding: "8px", // Padding for input text
      // borderRadius: '10px',  // Border radius for input
      width: "100%", // Full width
      // minHeight: "70px",
      border: "none", // Remove border for input itself
      cursor: "pointer",
      borderRadius: "50px",
    }),
    menu: (provided) => ({
      ...provided,
      position: "fixed", // Make the dropdown fixed relative to the viewport
      top: "57%", // Vertically center the dropdown on the screen
      left: "50%", // Horizontally center the dropdown on the screen
      transform: "translate(-50%, -50%)", // Adjust the dropdown to be exactly centered
      width: "80%", // Set the width of the dropdown (you can adjust it)
      maxWidth: "400px", // Set a max width for the dropdown
      zIndex: 9999, // Ensure the dropdown appears on top of other content
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Optional: Add shadow for a popup effect
      borderRadius: "10px",
    }),
    control: (provided) => ({
      ...provided,
      width: "100%", // Full width of the control
      borderRadius: "10px",
      minHeight: "50px",
    }),
    placeholder: (provided) => ({
      ...provided,
      padding: "12px", // Padding for placeholder text
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0", // Optional: Adjust padding of the dropdown indicator
    }),
    indicatorSeparator: () => ({
      display: "none", // Hide the indicator separator (optional)
    }),
  };

  const handleSalarySlipUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormErrors((prevErrors) => ({ ...prevErrors, salarySlipLink: "" }));

    setFormData((prev) => ({
      ...prev,
      salarySlip: file,
    }));

    try {
      const presignRes = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generatePresignedUrl`,
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

  const handleFileClick = () => {
    fileInputRef.current?.click();
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
      errors.bankName = "Bank name is required";
      isValid = false;
    } else if (formData.bankName.trim().length < 2) {
      errors.bankName = "Bank name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.branchName) {
      errors.branchName = "Branch name is required";
      isValid = false;
    } else if (formData.branchName.trim().length < 2) {
      errors.branchName = "Branch name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.salarySlipLink) {
      errors.salarySlipLink = "Salary slip must be uploaded";
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

    if (!isValid) {
      setTimeout(() => {
        scrollToFirstError(errors);
      }, 100); // Small delay to ensure error messages are rendered
    }
    return isValid;
  };

  // const handleFinalSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     setActiveContainer("SelfieWaiting"); // ✅ This switches to waiting page

  //     setTimeout(() => {
  //       router.push(`/yubi/Referencedetailspage`);
  //     }, 1500);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      console.log("client load for bankdetailspage is:", clientLoanId);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}submitBankDetails`,
          {
            clientLoanId: clientLoanId,
            bankName: formData.bankName,
            branchName: formData.branchName,
            accountName: formData.accountname,
            ifscCode: formData.IFSC,
            accountNumber: formData.accountNumber,
          }
        );

        if (response.data.code === -1) {
          window.location.href = `/yubi/RejectionPage`;
          return;
        }

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
      <CallbackListener
        clientLoanId={clientLoanId}
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
      />
      {activeContainer === "SelfieWaiting" && <SelfieWaiting />}

      {activeContainer === "BankDetails" && (
        <div className={`${roboto.className} container-block`}>
          <div className="card-block">
            <div className="header-block">
              <div className="LogoPart-block">
                <Image
                  src={hdb}
                  alt="Hdb tag"
                  style={{
                    alignContent: "center",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
            </div>
            <div className="cardForm-block">
              <div className="content-block">
                <form onSubmit={handleSubmit}>
                  <p className="para">Please provide your bank details</p>
                  <div className="fill-form">
                    <div className="fill-form" style={{ position: "relative" }}>
                      <input
                        ref={accountnameRef}
                        type="text"
                        id="accountname"
                        name="accountname"
                        placeholder="Account Holder Name"
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
                      <div className="Message">{formErrors.accountname}</div>
                    )}
                  </div>
                  {/*Bank Name Field */}
                  <div className="fill-form">
                    <div className="fill-form" style={{ position: "relative" }}>
                      {/* <input
                        ref={bankNameRef}
                        type="text"
                        id="bankName"
                        name="bankName"
                        placeholder="Bank Name"
                        value={formData.bankName}
                        className="enter-field"
                        onChange={handlebankNameChange}
                      /> */}
                      <Select
                        options={bankOptions}
                        value={
                          bankOptions.find(
                            (opt) => opt.value === formData.bankName
                          ) || null
                        }
                        onChange={handleBankSelect}
                        placeholder="Select Bank Name"
                        styles={customStyles}
                        components={{
                          Option: CustomOption,
                          DropdownIndicator: () => null, // removes the arrow
                          IndicatorSeparator: () => null,
                        }}
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
                        <FaUniversity />
                      </span>
                    </div>
                    {formErrors.bankName && (
                      <div className="Message">{formErrors.bankName}</div>
                    )}
                  </div>
                  {/*Branch Name Field */}
                  <div className="fill-form">
                    <div className="fill-form" style={{ position: "relative" }}>
                      <input
                        ref={branchNameRef}
                        type="text"
                        id="branchName"
                        name="branchName"
                        placeholder="Branch Name"
                        value={formData.branchName}
                        className="enter-field"
                        onChange={handlebranchNameChange}
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
                        <FaLandmark />
                      </span>
                    </div>
                    {formErrors.branchName && (
                      <div className="Message">{formErrors.branchName}</div>
                    )}
                  </div>

                  {/* IFSC Field */}
                  <div className="fill-form">
                    <div style={{ position: "relative" }}>
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
                    <div style={{ position: "relative" }}>
                      <input
                        ref={accountNumberRef}
                        type="number"
                        id="accountNumber"
                        name="accountNumber"
                        placeholder="Enter Account Number"
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
                  {/* Custom Salary Slip Upload */}
                  <div className="fill-form">
                    <div
                      className="enter-field"
                      onClick={handleFileClick}
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: formData.salarySlip ? "#fff" : "#fff",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          color: formData.salarySlip ? "#000000" : "#777777",
                          fontWeight: formData.salarySlip ? "500" : "normal",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          paddingRight: "40px",
                        }}
                      >
                        {formData.salarySlip
                          ? ` ${formData.salarySlip.name}`
                          : "Upload Salary Slip"}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: formData.salarySlip
                            ? "#00000061"
                            : "#00000061",
                        }}
                      >
                        <FaUpload />
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        onChange={handleSalarySlipUpload}
                        style={{ display: "none" }}
                        id="salarySlipUpload"
                      />
                    </div>
                    {/* {formData.salarySlip && (
                      <div
                        style={{
                          color: "#4CAF50",
                          fontSize: "12px",
                          marginLeft: "2%",
                          marginTop: "5px",
                        }}
                      >
                        File selected successfully
                      </div>
                    )} */}
                    {formErrors.salarySlipLink && (
                      <div className="File-Error">
                        {formErrors.salarySlipLink}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="short-button">
                    <button type="submit" className="short-submit">
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BankDetails;
