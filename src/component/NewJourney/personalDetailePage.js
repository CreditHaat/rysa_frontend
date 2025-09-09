import React from 'react'
import styles from "./personalDetailePage.module.css";
import { useState } from 'react';
import Image from 'next/image';
import { FaChevronDown } from "react-icons/fa";
import { style } from '@mui/system';
import { useRouter } from "next/navigation"; 
import personalDetailePage2 from './personalDetailePage2';

function personalDetailePage() {
    // bottom sheet functin here
    const [showSheet, setShowSheet] = useState(false);
    const [employmentType, setEmploymentType] = useState('');
    const [showSheetPayment, setShowSheetPayment] = useState(false);
    const [paymentType, setPaymentType] = useState('');
    const router = useRouter(); 

    // form validation functions
    const [formErrors, setFormErrors] = useState({
        pinCode: "",
        address: "",
        employmentType: "",
        paymentType: "",
        monthlyIncome: "",
    });
    
    const [formData, setFormData] = useState({
        pinCode: "",
        address: "",
        employmentType: "",
        paymentType: "",
        monthlyIncome: "",
    });

    const validateForm = () => {
        let valid = true;
        const errors = {
            pinCode: "",
            address: "",
            employmentType: "",
            paymentType: "",
            monthlyIncome: "",
        };

        // validation for PIN Code
        if (!formData.pinCode) {
            errors.pinCode = "PIN Code is required";
            valid = false;
        } else if (!/^\d{6}$/.test(formData.pinCode)) {
            errors.pinCode = "PIN Code must be exactly 6 digits";
            valid = false;
        }

        // validation for address
        if (!formData.address) {
            errors.address = "Residential Address is required";
            valid = false;
        } else if (formData.address.trim().length < 10) {
            errors.address = "Address must be at least 10 characters long";
            valid = false;
        }

        // validation for employment type
        if (!formData.employmentType) {
            errors.employmentType = "Employment Type is required";
            valid = false;
        }

        // validation for payment type
        if (!formData.paymentType) {
            errors.paymentType = "Payment Type is required";
            valid = false;
        }

        // validation for monthly income
        if (!formData.monthlyIncome) {
            errors.monthlyIncome = "Monthly income is required";
            valid = false;
        } else if (isNaN(formData.monthlyIncome)) {
            errors.monthlyIncome = "Monthly income must be a number";
            valid = false;
        } else if (Number(formData.monthlyIncome) < 1000) {
            errors.monthlyIncome = "Monthly income must be at least 1000";
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    }

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear errors if any exist for this field
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // Handle profession selection
    const handleSelectProfession = (profession) => {
        setEmploymentType(profession);
        setFormData(prev => ({ ...prev, employmentType: profession }));
        setShowSheet(false);

        // Clear errors if any exist
        if (formErrors.employmentType) {
            setFormErrors(prev => ({ ...prev, employmentType: "" }));
        }
    };

    // Handle payment type
    const handleSelectPaymentType = (paymentType) => {
        setPaymentType(paymentType);
        setFormData(prev => ({ ...prev, paymentType: paymentType }));
        setShowSheetPayment(false);

        // Clear errors if any exist
        if (formErrors.paymentType) {
            setFormErrors(prev => ({ ...prev, paymentType: "" }));
        }
    };

    // Handle next button click
    const handleNext = () => {
        if (validateForm()) {
            console.log('Form is valid, proceeding to next step');
            console.log('Form Data:', formData);
            // Add your navigation logic here
            router.push("/personalDetailePage2");
        } else {
            console.log('Form has errors');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainHeaderPart} >
                <Image
                    src="/Aryse_Fin.png"
                    width={47}
                    height={47}
                    className={styles.logo}
                    alt="Aryse_Fin logo"
                    priority
                />
                <div className={styles.logoName}>AryseFin</div>
            </div>
            <div className={styles.mainForm}>
                <div className={styles.header}>
                    <div className={styles.progressBarContainer}>
                        {/* first no:1 progress bar */}
                        <div className={styles.progressBar}>
                            <div className={styles.stepNumber}>1</div>
                            <div
                                className={styles.progressBarFill}
                            // style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        {/* first no:2 progress bar */}
                        <div className={styles.progressBar}>
                            <div className={styles.stepNumber}>2</div>
                            <div
                                className={styles.progressBarFill2}
                            // style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        {/* first no:3 progress bar */}
                        <div className={styles.progressBarlast}>
                            <div className={styles.stepNumberLast}>3</div>
                        </div>
                    </div>
                    <div className={styles.headering}><h3>personal Details</h3></div>
                </div>
                {/* form field start form here */}

                <div className={styles.form}>
                    <div className={styles.formheading}>
                        Personal Details
                    </div>
                    {/* first field */}
                    <div className={`${styles.fields} ${formErrors.pinCode ? styles.fieldserror : ""}`}>
                        <span className={styles.fieldName}>PIN Code</span>
                        <input 
                            type='text' 
                            name='pinCode' 
                            value={formData.pinCode}
                            onChange={handleInputChange}
                            className={styles.inputfield} 
                            maxLength="6"
                        />
                    </div>
                    {/* second field */}
                    <div className={`${styles.fields} ${formErrors.address ? styles.fieldserror : ""}`}>
                        <span className={styles.fieldName}>Residential Address</span>
                        <input 
                            type='text' 
                            name='address' 
                            value={formData.address}
                            onChange={handleInputChange}
                            className={styles.inputfield} 
                        />
                        {/* {formErrors.address && (
                            <span className={styles.errorText}>{formErrors.address}</span>
                        )} */}
                    </div>
                    {/* third field */}
                    <div className={`${styles.fields} ${formErrors.employmentType ? styles.fieldserror : ""}`}>
                        <span className={styles.fieldName}>Employment Type</span>
                        <div className={styles.inputWrapper}>
                            <input
                                type='text'
                                name='employmentType'
                                value={employmentType}
                                // value={formData.employmentType || ""}
                                className={styles.inputfield1}
                                readOnly
                                onClick={() => setShowSheet(true)}
                            />
                            <div className={styles.iconContainer} onClick={() => setShowSheet(true)}>
                                <FaChevronDown className={styles.iconInput} />
                            </div>
                        </div>
                    </div>
                    {/* fourth field */}
                    <div className={`${styles.fields} ${formErrors.paymentType ? styles.fieldserror : ""}`}>
                        <span className={styles.fieldName}>Payment Type</span>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                name="paymentType"
                                // value={paymentType}
                                value={formData.paymentType || ""}
                                className={styles.inputfield1}
                                readOnly
                                onClick={() => setShowSheetPayment(true)}
                            />
                            <div className={styles.iconContainer} onClick={() => setShowSheetPayment(true)}>
                                <FaChevronDown className={styles.iconInput} />
                            </div>
                        </div>
                    </div>
                    {/* fifth field */}
                    <div className={`${styles.fields} ${formErrors.monthlyIncome ? styles.fieldserror : ""}`}>
                        <span className={styles.fieldName}>Monthly Income</span>
                        <input 
                            type='text' 
                            name='monthlyIncome' 
                            value={formData.monthlyIncome}
                            onChange={handleInputChange}
                            className={styles.inputfield} 
                        />
                    </div>
                    {/* button part here */}
                    <div className={styles.btn}>
                        {/* back button  */}
                        <div className={styles.backbtn}>Back</div>
                        {/* emptyspace */}
                        <div className={styles.emptyspace}></div>
                        {/* next button  */}
                        <div className={styles.nextbtn} onClick={handleNext}>Next</div>
                    </div>
                </div>
                {/* BottomSheet for employ type  */}
                {showSheet && (
                    <div
                        className={styles.bottomSheetOverlay}
                        onClick={() => setShowSheet(false)}
                    >
                        <div
                            className={styles.bottomSheet}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className={styles.sheetOption}
                                onClick={() => handleSelectProfession("Salaried")}
                            >
                                Salaried
                            </div>
                            <div
                                className={styles.sheetOption}
                                onClick={() => handleSelectProfession("Self employed")}
                            >
                                Self employed
                            </div>
                            <div
                                className={styles.sheetOption}
                                onClick={() => handleSelectProfession("Business")}
                            >
                                Business
                            </div>
                        </div>
                    </div>
                )}
                {/* bottom sheet payment */}
                {showSheetPayment && (
                    <div
                        className={styles.bottomSheetOverlay}
                        onClick={() => setShowSheetPayment(false)}
                    >
                        <div
                            className={styles.bottomSheet}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className={styles.sheetOption}
                                onClick={() => handleSelectPaymentType("Bank Transfer")}
                            >
                                Bank Transfer
                            </div>
                            <div
                                className={styles.sheetOption}
                                onClick={() => handleSelectPaymentType("Cash")}
                            >
                                Cash
                            </div>
                            <div
                                className={styles.sheetOption}
                                onClick={() => handleSelectPaymentType("Cheque")}
                            >
                                Cheque
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default personalDetailePage