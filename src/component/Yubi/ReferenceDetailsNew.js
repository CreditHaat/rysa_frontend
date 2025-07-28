"use client";
import React, { useState, useRef, useEffect } from "react";
// import Select from "react-select";
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
import { FaUser, FaBuilding, FaCreditCard, FaPhone } from "react-icons/fa";
import "./ReferenceDetailsNew.css";
// import axios from "axios";
import { Roboto } from "@next/font/google";
import Image from "next/image";
import HeaderPart from "./HeaderPart";
import SmsWaiting from "./SmsWaiting";
// import CallbackListener from "../CallbackListener";
import SelfieWaiting from "./WaitingPage";
import WaitingPageLoanAgreement from "./WaitingPageLoanAgreement";
import { useSearchParams, useRouter } from "next/navigation";
import hdb from "../Yubi/newplimages/HDB.png";
import "react-datepicker/dist/react-datepicker.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const NewReferenceDt = () => {
  const [formData, setFormData] = useState({
    mothersName: "",
    yearOfExperience: "",
    ref1Name: "",
    ref1Mobile: "",
    ref1Relation: null,
    ref1Address: "",
    ref2Name: "",
    ref2Mobile: "",
    ref2Relation: null,
    ref2Address: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [activeContainer, setActiveContainer] = useState("ReferenceDetails");
  const searchParams = useSearchParams();
  const router = useRouter();

  const loanAmount = searchParams.get("loanAmount") || "";
  const tenure = searchParams.get("tenure") || "";
  const interestRate = searchParams.get("interestRate") || "";
  const clientLoanId = searchParams.get("client_loan_id") || "";
  const salarySlipLink = searchParams.get("salarySlipLink") || "";

 const handleContactPicker = async (fieldName) => {
    try {
      // Check if Contact Picker API is supported

      if ('contacts' in navigator && 'select' in navigator.contacts) {
        const contacts = await navigator.contacts.select(['name', 'tel'], { multiple: false });
        if (contacts.length > 0) {
          const contact = contacts[0];
          const phoneNumber = contact.tel && contact.tel.length > 0 ? contact.tel[0] : '';
          const contactName = contact.name && contact.name.length > 0 ? contact.name[0] : '';
          // Update the mobile field
          setFormData(prev => ({
            ...prev,
            [fieldName]: phoneNumber
          }));

          // Also update the name field if it's empty
          const nameField = fieldName === 'ref1Mobile' ? 'ref1Name' : 'ref2Name';
          if (contactName && !formData[nameField]) {
            setFormData(prev => ({
              ...prev,
              [nameField]: contactName
            }));
          }
        }
      } else {
        // Fallback for devices that don't support Contact Picker API
        alert('Contact picker is not supported on this device. Please enter the number manually.');
      }
    } catch (error) {
      console.error('Error accessing contacts:', error);
      // Fallback - you could show a message or handle the error differently
      alert('Unable to access contacts. Please enter the number manually.');
    }
  };

  // ✅✅✅ ADD CALLBACK HANDLER
  const handleFinalSanctionReady = () => {
    console.log(
      "✅ Final Sanction webhooks received, showing final sanction page!"
    );
    const newUrl = `/yubi/Finalsanctiondetails?clientLoanId=${clientLoanId}`;
    router.push(newUrl);
  };

  const relationOptions = [
    { value: "friend", label: "Friend" },
    { value: "relative", label: "Relative" },
  ];
  const mothersNameRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
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
    ></div>
  );

  const handlemothersNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, mothersName: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, mothersName: "" }));
  };
  const handleyearOfExperienceChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, yearOfExperience: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, yearOfExperience: "" }));
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "50px",
      height: "50px",
      borderRadius: "10px",
      borderColor: state.isFocused ? "#aaa" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #aaa" : "none",
      fontSize: "14px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "50px",
      padding: "0 12px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa",
      fontSize: "14px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "6px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    const data = new FormData();

    if (!formData.mothersName) {
      errors.mothersName = "Mother's name is required";
      isValid = false;
    } else if (formData.mothersName.trim().length < 2) {
      errors.mothersName = "Mother's name must be at least 2 characters";
      isValid = false;
    }
    if (!formData.yearOfExperience) {
      errors.yearOfExperience = "Year Of Experience is required";
      isValid = false;
    } else if (formData.yearOfExperience.trim().length < 1) {
      errors.yearOfExperience =
        "year Of Experience must be at least 1 characters";
      isValid = false;
    }

    if (!formData.ref1Name.trim()) {
      errors.ref1Name = "Full Name is required";
      isValid = false;
    }

    if (!formData.ref1Mobile.trim()) {
      errors.ref1Mobile = "Mobile Number is required";
      isValid = false;
    }

    if (!formData.ref1Relation) {
      errors.ref1Relation = "Relation is required";
      isValid = false;
    }

    if (!formData.ref1Address.trim()) {
      errors.ref1Address = "Address is required";
      isValid = false;
    }

    if (!formData.ref2Name.trim()) {
      errors.ref2Name = "Full Name is required";
      isValid = false;
    }

    if (!formData.ref2Mobile.trim()) {
      errors.ref2Mobile = "Mobile Number is required";
      isValid = false;
    }

    if (!formData.ref2Relation) {
      errors.ref2Relation = "Relation is required";
      isValid = false;
    }

    if (!formData.ref2Address.trim()) {
      errors.ref2Address = "Address is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  console.log("✅ Payload being sent:", {
    clientLoanId,
    mothersName: formData.mothersName,
    yearOfExperience: formData.yearOfExperience,
    ref1Name: formData.ref1Name,
    ref1Mobile: formData.ref1Mobile,
    ref1Relation: formData.ref1Relation?.value,
    ref1Address: formData.ref1Address,
    ref2Name: formData.ref2Name,
    ref2Mobile: formData.ref2Mobile,
    ref2Relation: formData.ref2Relation?.value,
    ref2Address: formData.ref2Address,
    salarySlipLink: salarySlipLink || "",
    loanAmount: loanAmount || "",
    tenure: tenure || "",
    interestRate: interestRate || "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post(
          `http://localhost:8080/submitReferenceDetails`,
          {
            clientLoanId,
            mothersName: formData.mothersName,
            yearOfExperience: formData.yearOfExperience,
            ref1Name: formData.ref1Name,
            ref1Mobile: formData.ref1Mobile,
            ref1Relation: formData.ref1Relation?.value,
            ref1Address: formData.ref1Address,
            ref2Name: formData.ref2Name,
            ref2Mobile: formData.ref2Mobile,
            ref2Relation: formData.ref2Relation?.value,
            ref2Address: formData.ref2Address,
            salarySlipLink: salarySlipLink || "",
            loanAmount: loanAmount || "",
            tenure: tenure || "",
            interestRate: interestRate || "", // ✅ pass hidden interest rate
          }
        );

        if (res.data.code === 0) {
          console.log("✅ Reference details saved!", res.data);
          // setActiveContainer("KFSDocs");
          setActiveContainer("SelfieWaiting");
        } else {
          console.error("❌ API Error:", res.data.msg);
        }
      } catch (err) {
        console.error("❌ API error:", err);
      }
    }
  };

  const handleAgree = async () => {
    console.log("✅ User agreed to final sanction details");

    // ✅ Call Generate KFS API
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generateKfsDocument`,
        { clientLoanId }
      );
      console.log("✅ generateKfsDocument:", res.data);
    } catch (err) {
      console.error("❌ KFS API error:", err);
    }

    // ✅ Show SMS Waiting page for KFS webhook
    // setActiveContainer("SmsWaiting");
  };

  return (
    <>
      {/* ✅✅✅ PLUG IN THE CALLBACK LISTENER! */}
      {/* <CallbackListener
        onFinalSanctionReady={handleFinalSanctionReady}
        onLoanAgreementReady={() =>
          setActiveContainer("WaitingPageLoanAgreement")
        }
      /> */}
      {activeContainer === "ReferenceDetails" && (
        <div className={`${roboto.className} page-bankds`}>
           <div className="card-refer">
            
            <div className="header-refer">
         <div className="LogoPart-refer">
                  <Image
                    src={hdb}
                    alt="Hdb tag"
                    style={{alignContent:"center",width:"auto",height:"auto"}}
                  />
                </div>
      </div>
       <div className="cardForm-refer">
        <div className="content-refer">
        
          {/* <div className="Formal-Card" style={{ boxSizing: "content-box" }}> */}
           
            <form onSubmit={handleSubmit}>
              <p className="para-para">Please provide your reference details</p>
              {/* Mother's name Field */}
              <div className="fill-form">
                <div className="fill-form" style={{ position: "relative" }}>
                  <input
                    type="text"
                    id="mothersName"
                    name="mothersName"
                    placeholder="Mother's Full Name"
                    value={formData.mothersName}
                    className="enter-field"
                    onChange={handlemothersNameChange}
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
                {formErrors.mothersName && (
                  <div className="Message">{formErrors.mothersName}</div>
                )}
              </div>

              {/* Year Of Experience Field */}
              <div className="fill-form">
                <div className="fill-form" style={{ position: "relative" }}>
                  <input
                    type="text"
                    id="yearOfExperience"
                    name="yearOfExperience"
                    placeholder="Year Of Experience"
                    value={formData.yearOfExperience}
                    className="enter-field"
                    onChange={handleyearOfExperienceChange}
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
                    <FaBuilding />
                  </span>
                </div>
                {formErrors.yearOfExperience && (
                  <div className="Message">
                    {formErrors.yearOfExperience}
                  </div>
                )}
              </div>

              <h6 className="ref-heading">🔷 Reference 1</h6>

              {/* Full Name Field */}
              <div className="fill-form" style={{ position: "relative" }}>
                <input
                  type="text"
                  name="ref1Name"
                  placeholder="Full name"
                  className="enter-field"
                  value={formData.ref1Name}
                  onChange={handleChange}
                />
                <span
                  className="enter-icon"
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#00000061",
                  }}
                >
                  <FaUser />
                </span>
                {formErrors.ref1Name && (
                  <span className="error-msg">{formErrors.ref1Name}</span>
                )}
              </div>

              {/* Mobile Number Field */}
              <div className="fill-form" style={{ position: "relative" }}>
                <input
                  type="text"
                  name="ref1Mobile"
                  placeholder="Mobile Number"
                  className="enter-field"
                  value={formData.ref1Mobile}
                  onChange={handleChange}
                />
                <span
                  className="enter-icon"
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#00000061",
                  }}
                  onClick={() => handleContactPicker('ref1Mobile')}
                  title="Select from contacts"
                >
                  <FaPhone />
                </span>
                {formErrors.ref1Mobile && (
                  <span className="error-msg">{formErrors.ref1Mobile}</span>
                )}
              </div>

              <div className="fill-form">
                <Select
                  name="ref1Relation"
                  placeholder="Relation"
                  styles={customStyles}
                  options={relationOptions}
                  value={formData.ref1Relation}
                  onChange={handleSelectChange}
                />
                {formErrors.ref1Relation && (
                  <span className="error-msg">{formErrors.ref1Relation}</span>
                )}
              </div>

              <div className="fill-form">
                <input
                  type="text"
                  name="ref1Address"
                  placeholder="Address"
                  className="enter-field"
                  value={formData.ref1Address}
                  onChange={handleChange}
                />
                {formErrors.ref1Address && (
                  <span className="error-msg">{formErrors.ref1Address}</span>
                )}
              </div>

              {/* Reference 2 */}
              <h6 className="ref-heading">🔷 Reference 2</h6>

              {/* Full Name */}
              <div className="fill-form" style={{ position: "relative" }}>
                <input
                  type="text"
                  name="ref2Name"
                  placeholder="Full name"
                  className="enter-field"
                  value={formData.ref2Name}
                  onChange={handleChange}
                />
                <span
                  className="enter-icon"
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#00000061",
                  }}
                >
                  <FaUser />
                </span>
                {formErrors.ref2Name && (
                  <span className="error-msg">{formErrors.ref2Name}</span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="fill-form" style={{ position: "relative" }}>
                <input
                  type="text"
                  name="ref2Mobile"
                  placeholder="Mobile Number"
                  className="enter-field"
                  value={formData.ref2Mobile}
                  onChange={handleChange}
                />
                <span
                  className="enter-icon"
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#00000061",
                  }}
                  onClick={() => handleContactPicker('ref2Mobile')}
                  title="Select from contacts"
                >
                  <FaPhone />
                </span>
                {formErrors.ref2Mobile && (
                  <span className="error-msg">{formErrors.ref2Mobile}</span>
                )}
              </div>

              {/* Relation Dropdown */}
              <div className="fill-form">
                <Select
                  name="ref2Relation"
                  placeholder="Relation"
                  styles={customStyles}
                  options={relationOptions}
                  value={formData.ref2Relation}
                  onChange={handleSelectChange}
                />
                {formErrors.ref2Relation && (
                  <span className="error-msg">{formErrors.ref2Relation}</span>
                )}
              </div>

              <div className="fill-form">
                <input
                  type="text"
                  name="ref2Address"
                  placeholder="Address"
                  className="enter-field"
                  value={formData.ref2Address}
                  onChange={handleChange}
                />
                {formErrors.ref2Address && (
                  <span className="error-msg">{formErrors.ref2Address}</span>
                )}
              </div>

            
             {/* Submit Button */}
              
                {/* Submit Button */}
              
                <div className="next-button">
                <button
                  type="submit"
                  className="field-submit"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
          </div>
          </div>
        </div>
      )}
      {activeContainer === "SelfieWaiting" && <SelfieWaiting />}
      {activeContainer === "WaitingPageLoanAgreement" && (
        <WaitingPageLoanAgreement />
      )}
    </>
  );
};

export default NewReferenceDt;
