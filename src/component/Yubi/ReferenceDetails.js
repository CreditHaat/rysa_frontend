"use client";
import React, { useState, useRef } from "react";
import Select from "react-select";
import { FaUser, FaBuilding, FaPhone } from "react-icons/fa";
import styles from "./NewPlFirstPage.module.css";
import "./ReferenceDetails.css";
import EmblaCarousel from "./Emblacarousel/js/EmblaCarousel";
import listimage1 from "./newplimages/finalimage2.png";
import listimage2 from "./newplimages/finalimage3.png";
import listimage3 from "./newplimages/plimage33.png";
// import KFSDocs from "./KfsDocs";
import SmsWaiting from "./SmsWaiting";
import axios from "axios";
import CallbackListener from "../CallbackListener";
import SelfieWaiting from "./WaitingPage";
import WaitingPageLoanAgreement from "./WaitingPageLoanAgreement";
import { useSearchParams, useRouter } from "next/navigation";

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

const NewReferenceDt = (
  {
    // salarySlipLink,
    // clientLoanId,
    // loanAmount,
    // tenure,
    // interestRate, // ✅ Receive it here
  }
) => {
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

  // ✅✅✅ ADD CALLBACK HANDLER
  const handleFinalSanctionReady = () => {
    console.log(
      "✅ Final Sanction webhooks received, showing final sanction page!"
    );
    const newUrl = `/yubi/Finalsanctiondetails?loanAmount=${loanAmount}&tenure=${tenure}&interestRate=${interestRate}&clientLoanId=${clientLoanId}`;
    router.push(newUrl);
  };

  const relationOptions = [
    { value: "friend", label: "Friend" },
    { value: "relative", label: "Relative" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
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
    input: (provided) => ({ ...provided, margin: "0px" }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa",
      fontSize: "14px",
    }),
    dropdownIndicator: (provided) => ({ ...provided, padding: "6px" }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.mothersName.trim()) {
      errors.mothersName = "Mother's name is required";
      isValid = false;
    }

    if (!formData.yearOfExperience.trim()) {
      errors.yearOfExperience = "Year Of Experience is required";
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

  // const handleAgree = () => {
  //   console.log("✅ User agreed to final sanction details");
  //   setActiveContainer("SmsWaiting");
  // };
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
      <CallbackListener
        onFinalSanctionReady={handleFinalSanctionReady}
        onLoanAgreementReady={() =>
          setActiveContainer("WaitingPageLoanAgreement")
        }
      />

      {activeContainer === "ReferenceDetails" && (
        <div className={`${roboto.className} page-container-bankds`}>
          <div className="carousel-background">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </div>

          <div className="newfirstcard-container-rf">
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Mother's Name */}
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="mothersName"
                  placeholder="Mother's Full Name"
                  className={styles.input}
                  value={formData.mothersName}
                  onChange={handleChange}
                />
                <span className={styles.icon}>
                  <FaUser />
                </span>
                {formErrors.mothersName && (
                  <span className="error">{formErrors.mothersName}</span>
                )}
              </div>

              {/* Year Of Experience */}
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="yearOfExperience"
                  placeholder="Year Of Experience"
                  className={styles.input}
                  value={formData.yearOfExperience}
                  onChange={handleChange}
                />
                <span className={styles.icon}>
                  <FaBuilding />
                </span>
                {formErrors.yearOfExperience && (
                  <span className="error">{formErrors.yearOfExperience}</span>
                )}
              </div>

              <h6 className="ref-heading">🔷 Reference 1</h6>

              {/* Reference 1 Fields */}
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="ref1Name"
                  placeholder="Full name"
                  className={styles.input}
                  value={formData.ref1Name}
                  onChange={handleChange}
                />
                <span className={styles.icon}>
                  <FaUser />
                </span>
                {formErrors.ref1Name && (
                  <span className="error">{formErrors.ref1Name}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="ref1Mobile"
                  placeholder="Mobile Number"
                  className={styles.input}
                  value={formData.ref1Mobile}
                  onChange={handleChange}
                />
                <span className={styles.icon}>
                  <FaPhone />
                </span>
                {formErrors.ref1Mobile && (
                  <span className="error">{formErrors.ref1Mobile}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Select
                  name="ref1Relation"
                  placeholder="Relation"
                  styles={customStyles}
                  options={relationOptions}
                  value={formData.ref1Relation}
                  onChange={handleSelectChange}
                />
                {formErrors.ref1Relation && (
                  <span className="error">{formErrors.ref1Relation}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="ref1Address"
                  placeholder="Address"
                  className={styles.input}
                  value={formData.ref1Address}
                  onChange={handleChange}
                />
                {formErrors.ref1Address && (
                  <span className="error">{formErrors.ref1Address}</span>
                )}
              </div>

              <h6 className="ref-heading">🔷 Reference 2</h6>

              {/* Reference 2 Fields */}
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="ref2Name"
                  placeholder="Full name"
                  className={styles.input}
                  value={formData.ref2Name}
                  onChange={handleChange}
                />
                <span className={styles.icon}>
                  <FaUser />
                </span>
                {formErrors.ref2Name && (
                  <span className="error">{formErrors.ref2Name}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="ref2Mobile"
                  placeholder="Mobile Number"
                  className={styles.input}
                  value={formData.ref2Mobile}
                  onChange={handleChange}
                />
                <span className={styles.icon}>
                  <FaPhone />
                </span>
                {formErrors.ref2Mobile && (
                  <span className="error">{formErrors.ref2Mobile}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Select
                  name="ref2Relation"
                  placeholder="Relation"
                  styles={customStyles}
                  options={relationOptions}
                  value={formData.ref2Relation}
                  onChange={handleSelectChange}
                />
                {formErrors.ref2Relation && (
                  <span className="error">{formErrors.ref2Relation}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="ref2Address"
                  placeholder="Address"
                  className={styles.input}
                  value={formData.ref2Address}
                  onChange={handleChange}
                />
                {formErrors.ref2Address && (
                  <span className="error">{formErrors.ref2Address}</span>
                )}
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
      {activeContainer === "FinalSanctionDetails" && (
        <div className={`${roboto.className} final-sanction-container`}>
          <h2>🎉 Final Sanction Details</h2>
          <p>
            <strong>Loan Amount:</strong> ₹
            {localStorage.getItem("sanctionLoanAmount")}
          </p>
          <p>
            <strong>Tenure:</strong> {localStorage.getItem("sanctionTenure")}{" "}
            months
          </p>
          <p>
            <strong>Interest Rate:</strong>{" "}
            {localStorage.getItem("sanctionInterestRate")}%
          </p>
          <button onClick={handleAgree}>I Agree & Continue</button>
        </div>
      )}

      {/* {activeContainer === "SmsWaiting" && <SmsWaiting />} */}
      {activeContainer === "SelfieWaiting" && <SelfieWaiting />}
      {activeContainer === "WaitingPageLoanAgreement" && (
        <WaitingPageLoanAgreement />
      )}
    </>
  );
};

export default NewReferenceDt;
