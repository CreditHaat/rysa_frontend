"use client";
import React, { useState } from "react";
import styles from "./personalDetailePage3.module.css";
import Image from "next/image";

function PersonalDetailePage3({ mainFormData, setActiveContainer, setFormData }) {
  // State for validation errors only (keep local)
  const [errors, setErrors] = useState({
    companyName: false,
    workEmail: false,
    workPINCode: false,
  });

  // Handle input changes → update parent formData
  const handleInputChange = (e) => {
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
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      companyName: !mainFormData.companyName?.trim(),
      workEmail: !mainFormData.workEmail?.trim(),
      workPINCode: !mainFormData.workPINCode?.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Handle Next
  const handleNext = () => {
    if (validateForm()) {
      console.log("All form data so far:", mainFormData);
      // TODO: final API call or confirmation page
    } else {
      console.log("Form has validation errors");
    }
  };

  const handleBack = () => {
    setActiveContainer("PersonalDetailePage2");
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainHeaderPart}>
        <Image
          src="/Aryse_Fin.png"
          width={47}
          height={47}
          className={styles.logo}
          alt="Aryse_Fin logo"
          priority
        />
        <div className={styles.logoName}></div>
      </div>

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
          {/* <div className={styles.headering}>
            <h3>Personal Details</h3>
          </div> */}
        </div>

        <div className={styles.form}>
          <div className={styles.formheading}>Work Details</div>

          {/* Company Name */}
          <div className={`${styles.fields} ${errors.companyName ? styles.errorField : ""}`}>
            <span className={styles.fieldName}>Company Name</span>
            <input
              type="text"
              name="companyName"
              value={mainFormData.companyName || ""}
              onChange={handleInputChange}
              className={styles.inputfield}
            />
          </div>

          {/* Work Email */}
          <div className={`${styles.fields} ${errors.workEmail ? styles.errorField : ""}`}>
            <span className={styles.fieldName}>Work Email</span>
            <input
              type="email"
              name="workEmail"
              value={mainFormData.workEmail || ""}
              onChange={handleInputChange}
              className={styles.inputfield}
            />
          </div>

          {/* Work PIN Code */}
          <div className={`${styles.fields} ${errors.workPINCode ? styles.errorField : ""}`}>
            <span className={styles.fieldName}>Work PIN Code</span>
            <input
              type="number"
              name="workPINCode"
              value={mainFormData.workPINCode || ""}
              onChange={(e) => {
                        if (e.target.value.length <= 6) {
                        handleInputChange(e);
                         }
                         }}
              className={styles.inputfield}
            />
            {errors.workPINCode &&
              mainFormData.workPINCode &&
              mainFormData.workPINCode.length !== 6 && (
                <span className={styles.errorText}>PIN Code must be exactly 6 digits</span>
              )}
          </div>

          {/* Buttons */}
          <div className={styles.btn}>
            <div className={styles.backbtn} onClick={handleBack}>
              Back
            </div>
            <div className={styles.emptyspace}></div>
            <div className={styles.nextbtn} onClick={handleNext}>
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetailePage3;


// "use client";
// import React from 'react'
// import styles from "./personalDetailePage3.module.css";
// import { useState } from 'react';
// import Image from 'next/image';
// import { style } from '@mui/system';

// function PersonalDetailePage3({ mainFormData, setActiveContainer, setFormData }) {
//     // State for form data
//     const [formData, setFormData] = useState({
//         companyName: '',
//         workEmail: '',
//         workPINCode: ''
//     });

//     // State for validation errors
//     const [errors, setErrors] = useState({
//         companyName: false,
//         workEmail: false,
//         workPINCode: false
//     });

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));

//         // Clear error when user starts typing
//         if (errors[name]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: false
//             }));
//         }
//     };

//     // Validate form
//     const validateForm = () => {
//         const newErrors = {
//             companyName: !formData.companyName.trim(),
//             workEmail: !formData.workEmail.trim(),
//             workPINCode: !formData.workPINCode.trim()
//         };

//         setErrors(newErrors);

//         // Return true if no errors
//         return !Object.values(newErrors).some(error => error);
//     };

// // Handle next button click
// const handleNext = () => {
//     if (validateForm()) {
//         console.log("All form data so far:", mainFormData);
//         // final step: send to API or show confirmation
//     } else {
//         console.log("Form has validation errors");
//     }
// };

// const handleBack = () => {
//     setActiveContainer("PersonalDetailePage2");
// };


//     return (
//         <div className={styles.container}>
//             <div className={styles.mainHeaderPart} >
//                 <Image
//                     src="/Aryse_Fin.png"
//                     width={47}
//                     height={47}
//                     className={styles.logo}
//                     alt="Aryse_Fin logo"
//                     priority
//                 />
//                 <div className={styles.logoName}></div>
//             </div>
//             <div className={styles.mainForm}>
//                 <div className={styles.header}>
//                     <div className={styles.progressBarContainer}>
//                         {/* first no:1 progress bar */}
//                         <div className={styles.progressBar}>
//                             <div className={styles.stepNumber}>1</div>
//                             <div
//                                 className={styles.progressBarFill}
//                             // style={{ width: `${progress}%` }}
//                             ></div>
//                         </div>
//                         {/* first no:2 progress bar */}
//                         <div className={styles.progressBar}>
//                             <div className={styles.stepNumber}>2</div>
//                             <div
//                                 className={styles.progressBarFill2}
//                             // style={{ width: `${progress}%` }}
//                             ></div>
//                         </div>
//                         {/* first no:3 progress bar */}
//                         <div className={styles.progressBarlast}>
//                             <div className={styles.stepNumberLast}>3</div>
//                         </div>
//                     </div>
//                     <div className={styles.headering}><h3>personal Details</h3></div>
//                 </div>
//                 {/* form field start form here */}

//                 <div className={styles.form}>
//                     <div className={styles.formheading}>
//                         Personal Details
//                     </div>
//                     {/* first field */}
//                     <div className={`${styles.fields} ${errors.companyName ? styles.errorField : ''}`}>
//                         <span className={styles.fieldName}>Company Name</span>
//                         <input
//                             type='text'
//                             name='companyName'
//                             value={formData.companyName}
//                             onChange={handleInputChange}
//                             className={styles.inputfield} 
//                         />
//                     </div>
//                     {/* second field */}
//                     <div className={`${styles.fields} ${errors.workEmail ? styles.errorField : ''}`}>
//                         <span className={styles.fieldName}>Work Email</span>
//                         <input
//                             type='email'
//                             name='workEmail'
//                             value={formData.workEmail}
//                             onChange={handleInputChange}
//                             className={styles.inputfield} 
//                         />
//                     </div>
//                     {/* third field */}
//                     <div className={`${styles.fields} ${errors.workPINCode ? styles.errorField : ''}`}>
//                         <span className={styles.fieldName}>Work PIN Code</span>
//                         <input
//                             type='text'
//                             name='workPINCode'
//                             value={formData.workPINCode}
//                             onChange={handleInputChange}
//                             className={styles.inputfield}
//                             // placeholder="123456"
//                             maxLength="6"
//                         />
//                         {errors.workPINCode && formData.workPINCode && formData.workPINCode.length !== 6 && (
//                             <span className={styles.errorText}>PIN Code must be exactly 6 digits</span>
//                         )}
//                     </div>
//                     {/* button part here */}
//                     <div className={styles.btn}>
//                         {/* back button  */}
//                         <div className={styles.backbtn}onClick={handleBack}>Back</div>
//                         {/* emptyspace */}
//                         <div className={styles.emptyspace}></div>
//                         {/* next button  */}
//                         <div className={styles.nextbtn} onClick={handleNext}>Next</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PersonalDetailePage3