"use client";
import React, { useState } from "react";
import styles from "./personalDetailePage3.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

function PersonalDetailePage3({
  mainFormData = {},
  setActiveContainer,
  setFormData,
}) {
  const router = useRouter();

  // State for validation errors only (keep local)
  const [errors, setErrors] = useState({
    companyName: false,
    workEmail: false,
    workPINCode: false,
    fatherName: false,
    maritalStatus: false,
    spouseName: false,
  });

  // Autocomplete state
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSheetMaritalStatus, setShowSheetMaritalStatus] = useState(false);

  // Handle input changes → update parent formData
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }

    //  Fetch company suggestions only for companyName field
    if (name === "companyName" && value.trim().length > 1) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}company/getCompanyNames`,
          {
            params: { query: value },
          }
        );
        setSuggestions(response.data || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching company names:", error);
        setSuggestions([]);
      }
    } else if (name === "companyName") {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectMaritalStatus = (status) => {
    setFormData((prev) => ({ ...prev, maritalStatus: status }));
    setShowSheetMaritalStatus(false);

    // Clear errors if any exist
    if (errors.maritalStatus) {
      setErrors((prev) => ({ ...prev, maritalStatus: false }));
    }

    // If not married, clear spouse name
    if (status !== "Married") {
      setFormData((prev) => ({ ...prev, spouseName: "" }));
    }
  };

  // When user selects a suggestion
  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      companyName: suggestion,
    }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Validate form
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      companyName: !mainFormData.companyName?.trim(),
      workEmail:
        !mainFormData.workEmail?.trim() ||
        !validateEmail(mainFormData.workEmail),
      workPINCode:
        !mainFormData.workPINCode?.trim() ||
        mainFormData.workPINCode.length !== 6,
      fatherName: !mainFormData.fatherName?.trim(),
      maritalStatus: !mainFormData.maritalStatus?.trim(),
      spouseName:
        mainFormData.maritalStatus === "Married" &&
        !mainFormData.spouseName?.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const mapMaritalStatus = (status) => {
    if (!status) return null;
    switch (status.trim().toLowerCase()) {
      case "married":
        return 1;
      case "unmarried":
        return 2;
      case "divorced":
        return 3;
      case "widowed":
        return 4;
      default:
        return null;
    }
  };

  const handleNext = async () => {
    if (validateForm()) {
      try {
        const payload = {
          mobileNumber: mainFormData.mobileNumber, // page 1
          companyName: mainFormData.companyName,
          workEmail: mainFormData.workEmail,
          workPincode: mainFormData.workPINCode,
          fatherName: mainFormData.fatherName,
          maritalStatus: mapMaritalStatus(mainFormData.maritalStatus),
          spouseName: mainFormData.spouseName || "",
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/page4`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
            },
          }
        );

        // console.log("Page3 API URL:", `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/page4`);
        // console.log("Payload Sent:", payload);
        // console.log("Full Backend Response:", response.data);

        // window.location.href = `https://www.arysefin.com/ondc?mobilenumber=${mainFormData.mobileNumber}`;
        // router.push(`/ondc/getData?mobilenumber=${mainFormData.mobileNumber}`);
        router.push(`/ondc?mobilenumber=${mainFormData.mobileNumber}`);
      } catch (error) {
        console.error("Error in Page4 API:", error);
      }
    }
  };

  const handleBack = () => {
    setActiveContainer("PersonalDetailePage2");
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.mainHeaderPart}>
        <div className={styles.topchildren}>
          <div className={styles.logoContainer}>
            <Image
              src="/AryseFin_logo.png"
              width={80}
              height={80}
              className={styles.logo2}
              alt="Aryse_Fin logo"
              priority
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={styles.mainForm}>
        <div className={styles.header}>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.progressBarFill}></div>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.progressBarFill2}></div>
            </div>
            <div className={styles.progressBarlast}>
              <div className={styles.stepNumberLast}>3</div>
            </div>
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.formheading}>Work Details</div>

          {/* Company Name */}
          <div
            className={`${styles.fields} ${
              errors.companyName ? styles.errorField : ""
            }`}
          >
            <span className={styles.fieldName}>Company name</span>
            <input
              type="text"
              name="companyName"
              value={mainFormData.companyName || ""}
              onFocus={() =>
                mainFormData.companyName && setShowSuggestions(true)
              }
              onChange={handleInputChange}
              className={styles.inputfield}
            />
            {/* Suggestions Dropdown */}
            {/* {showSuggestions && suggestions.length > 0 && (
              <div className={styles.companyList}>
              <ul className={styles.suggestionBox}>
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
              </>
            )} */}
            {showSuggestions && suggestions.length > 0 && (
              <ul className={styles.suggestionBox}>
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Work Email */}
          <div
            className={`${styles.fields} ${
              errors.workEmail ? styles.errorField : ""
            }`}
          >
            <span className={styles.fieldName}>Work email</span>
            <input
              type="email"
              name="workEmail"
              value={mainFormData.workEmail || ""}
              onChange={handleInputChange}
              className={styles.inputfield}
            />
          </div>

          {/* Work PIN Code */}
          <div
            className={`${styles.fields} ${
              errors.workPINCode ? styles.errorField : ""
            }`}
          >
            <span className={styles.fieldName}>Work pincode</span>
            <input
              type="number"
              name="workPINCode"
              maxLength={6}
              value={mainFormData.workPINCode || ""}
              onChange={(e) => {
                if (e.target.value.length <= 6) {
                  handleInputChange(e);
                }
              }}
              className={styles.inputfield}
            />
          </div>

          <div
            className={`${styles.fields} ${
              errors.fatherName ? styles.errorField : ""
            }`}
          >
            <span className={styles.fieldName}>Father name</span>
            <input
              type="text"
              name="fatherName"
              value={mainFormData.fatherName || ""}
              onChange={handleInputChange}
              className={styles.inputfield}
            />
          </div>

          {/* maritalStatus */}
          <div
            className={`${styles.fields2} ${
              errors.maritalStatus ? styles.errorField : ""
            }`}
          >
            <span className={styles.fieldName}>Marital status</span>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="maritalStatus"
                value={mainFormData.maritalStatus || ""}
                className={styles.inputfield1}
                readOnly
                onClick={() => setShowSheetMaritalStatus(true)}
              />
              <div
                className={styles.iconContainer}
                onClick={() => setShowSheetMaritalStatus(true)}
              >
                <FaChevronDown className={styles.iconInput} />
              </div>
            </div>
          </div>

          {/* spouseName - Only show if Married */}
          {mainFormData.maritalStatus === "Married" && (
            <div
              className={`${styles.fields} ${
                errors.spouseName ? styles.errorField : ""
              }`}
            >
              <span className={styles.fieldName}>Spouse name</span>
              <input
                type="text"
                name="spouseName"
                value={mainFormData.spouseName || ""}
                onChange={handleInputChange}
                className={styles.inputfield}
              />
            </div>
          )}

          {/* Buttons */}
          <div className={styles.btn}>
            <div className={styles.backbtn} onClick={handleBack}>
              <span> Back </span>
            </div>
            <div className={styles.emptyspace}></div>
            <div className={styles.nextbtn} onClick={handleNext}>
              <span> Submit </span>
            </div>
          </div>
          {showSheetMaritalStatus && (
            <div
              className={styles.bottomSheetOverlay}
              onClick={() => setShowSheetMaritalStatus(false)}
            >
              <div
                className={styles.bottomSheet}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={styles.sheetOption}
                  onClick={() => handleSelectMaritalStatus("Married")}
                >
                  Married
                </div>
                <div
                  className={styles.sheetOption}
                  onClick={() => handleSelectMaritalStatus("Unmarried")}
                >
                  Unmarried
                </div>
                <div
                  className={styles.sheetOption}
                  onClick={() => handleSelectMaritalStatus("Divorced")}
                >
                  Divorced
                </div>
                <div
                  className={styles.sheetOption}
                  onClick={() => handleSelectMaritalStatus("Widowed")}
                >
                  Widowed
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalDetailePage3;

// "use client";
// import React, { useState } from "react";
// import styles from "./personalDetailePage3.module.css";
// import Image from "next/image";
// import axios from "axios";

// function PersonalDetailePage3({ mainFormData, setActiveContainer, setFormData }) {
//   // State for validation errors only (keep local)
//   const [errors, setErrors] = useState({
//     companyName: false,
//     workEmail: false,
//     workPINCode: false,
//   });

//   // Handle input changes → update parent formData
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: false,
//       }));
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {
//       companyName: !mainFormData.companyName?.trim(),
//       workEmail: !mainFormData.workEmail?.trim(),
//       workPINCode: !mainFormData.workPINCode?.trim(),
//     };

//     setErrors(newErrors);
//     return !Object.values(newErrors).some((error) => error);
//   };

//   // Handle Next
//   // const handleNext = () => {
//   //   if (validateForm()) {
//   //     console.log("All form data so far:", mainFormData);
//   //     // TODO: final API call or confirmation page
//   //   } else {
//   //     console.log("Form has validation errors");
//   //   }
//   // };

//   // const handleBack = () => {
//   //   setActiveContainer("PersonalDetailePage2");
//   // };
//     const handleNext = async () => {
//   if (validateForm()) {
//     try {
//       const payload = {
//         mobileNumber: mainFormData.mobileNumber,//page 1
//         companyName: mainFormData.companyName,
//         workEmail: mainFormData.workEmail,
//         workPincode: mainFormData.workPINCode
//             };

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/page4`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
//           },
//         }
//       );

//       // 👇 Console logs for debugging
//       console.log("Page3 API URL:", `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/page4`);
//       console.log("Payload Sent:", payload);
//       console.log("Full Backend Response:", response.data);
//       console.log("Status:", response.data.status);
//       console.log("Reason:", response.data.reason);
//     } catch (error) {
//       console.error("Error in Page4 API:", error);
//     }
//   }
// };

//   const handleBack = () => {
//     setActiveContainer("PersonalDetailePage2");
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.mainHeaderPart}>
//          {/* mynew */}
//             <div className={styles.topchildren}>
//                             <div className={styles.logoContainer}>
//                                 <Image
//                                     src="/AryseFin_logo.png"
//                                     width={80}
//                                     height={80}
//                                     className={styles.logo2}
//                                     alt="Aryse_Fin logo"
//                                     priority
//                                 />
//                             </div>
//                         </div>

//                         {/* mynew */}

//       </div>

//       <div className={styles.mainForm}>
//         <div className={styles.header}>
//           <div className={styles.progressBarContainer}>
//             <div className={styles.progressBar}>
//               <div className={styles.stepNumber}>1</div>
//               <div className={styles.progressBarFill}></div>
//             </div>
//             <div className={styles.progressBar}>
//               <div className={styles.stepNumber}>2</div>
//               <div className={styles.progressBarFill2}></div>
//             </div>
//             <div className={styles.progressBarlast}>
//               <div className={styles.stepNumberLast}>3</div>
//             </div>
//           </div>
//           {/* <div className={styles.headering}>
//             <h3>Personal Details</h3>
//           </div> */}
//         </div>

//         <div className={styles.form}>
//           <div className={styles.formheading}>Work Details</div>

//           {/* Company Name */}
//           <div className={`${styles.fields} ${errors.companyName ? styles.errorField : ""}`}>
//             <span className={styles.fieldName}>Company name</span>
//             <input
//               type="text"
//               name="companyName"
//               value={mainFormData.companyName || ""}
//               onFocus={() => mainFormData.companyName && setShowSuggestions(true)}
//               onChange={handleInputChange}
//               className={styles.inputfield}
//             />
//             {/* Suggestions Dropdown */}
//             {showSuggestions && suggestions.length > 0 && (
//               <ul className={styles.suggestionBox}>
//                 {suggestions.map((s, i) => (
//                   <li
//                     key={i}
//                     className={styles.suggestionItem}
//                     onClick={() => handleSuggestionClick(s)}
//                   >
//                     {s}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Work Email */}
//           <div className={`${styles.fields} ${errors.workEmail ? styles.errorField : ""}`}>
//             <span className={styles.fieldName}>Work email</span>
//             <input
//               type="email"
//               name="workEmail"
//               value={mainFormData.workEmail || ""}
//               onChange={handleInputChange}
//               className={styles.inputfield}
//             />
//           </div>

//           {/* Work PIN Code */}
//           <div className={`${styles.fields} ${errors.workPINCode ? styles.errorField : ""}`}>
//             <span className={styles.fieldName}>Work pincode</span>
//             <input
//               type="number"
//               name="workPINCode"
//               value={mainFormData.workPINCode || ""}
//               onChange={(e) => {
//                         if (e.target.value.length <= 6) {
//                         handleInputChange(e);
//                          }
//                          }}
//               className={styles.inputfield}
//             />
//             {errors.workPINCode &&
//               mainFormData.workPINCode &&
//               mainFormData.workPINCode.length !== 6 && (
//                 <span className={styles.errorText}>PIN Code must be exactly 6 digits</span>
//               )}
//           </div>

//           {/* Buttons */}
//           <div className={styles.btn}>
//             <div className={styles.backbtn} onClick={handleBack}>
//               Back
//             </div>
//             <div className={styles.emptyspace}></div>
//             <div className={styles.nextbtn} onClick={handleNext}>
//               Submit
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PersonalDetailePage3;
