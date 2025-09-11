"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from "./firstpage.module.css";
import Image from 'next/image';
import { useRouter } from "next/navigation";

function FirstPage() {
    const router = useRouter();
    const [showOTPbottomsheet, setShowOTPbottomsheet] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState(''); // Changed from array to string
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({
        mobileNumber: "",
    });

    // Create ref for single OTP input
    const otpRef = useRef();

    // Handle mobile number input
    const handleMobileChange = (e) => {
        const value = e.target.value;
        if (value.length <= 13) {
            setMobileNumber(value);
            // Clear error when user starts typing
            if (formErrors.mobileNumber) {
                setFormErrors({ mobileNumber: "" });
            }
        }
    };
    

    // Enhanced validation for mobile number 
    const validateForm = () => {
        let valid = true;
        const errors = {
            mobileNumber: ""
        };

        if (!mobileNumber.trim()) {
            errors.mobileNumber = "Mobile number is required";
            valid = false;
        } else {
            const digitsOnly = mobileNumber.replace(/\D/g, '');
            
            if (digitsOnly.length < 10) {
                errors.mobileNumber = "Mobile number must be at least 10 digits";
                valid = false;
            }
        }

        setFormErrors(errors);
        return valid;
    };

    // Handle check eligibility button click
    const handleCheckEligibility = () => {
        if (isLoading) return;

        // Always validate form when button is clicked
        if (validateForm()) {
            const digitsOnly = mobileNumber.replace(/\D/g, '');
            const finalMobile = digitsOnly.slice(-10); // last 10 digits

            console.log("OTP sending to:", finalMobile);

            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setShowOTPbottomsheet(true);
                setTimeout(() => {
                    otpRef.current?.focus();
                }, 100);
            }, 500);
        }
        // If validation fails, the error state will automatically make the input red
    };

    // Handle single OTP input change
    const handleOtpChange = (e) => {
        const value = e.target.value;
        // Only allow numeric input and limit to 6 digits
        const numericValue = value.replace(/[^0-9]/g, '').slice(0, 6);
        setOtp(numericValue);
        
        // Clear error when user starts typing
        if (otpError) {
            setOtpError('');
        }
    };

    // Handle OTP verification
    const handleVerifyOTP = () => {
        if (otp.length !== 6) {
            setOtpError('Please enter complete 6-digit OTP');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const correctOtp = '123456'; // In real app, this would come from backend

            if (otp === correctOtp) {
                // OTP is correct, navigate to next page
                setIsLoading(false);
                setShowOTPbottomsheet(false);
                router.push('/personalDetailePage');
            } else {
                // OTP is incorrect, reset OTP input
                setIsLoading(false);
                setOtpError('Invalid OTP. Please try again.');
                resetOtp();
            }
        }, 1500);
    };

    // Reset OTP input
    const resetOtp = () => {
        setOtp('');
        setTimeout(() => {
            otpRef.current?.focus();
        }, 10);
    };

    // Handle resend OTP
    // const handleResendOTP = () => {
    //     resetOtp();
    //     setOtpError('');
    //     // Here you would call API to resend OTP
    //     console.log('Resending OTP to:', mobileNumber);
    //     alert('OTP sent successfully!');
    // };

    // Close bottom sheet
    const closeBottomSheet = () => {
        setShowOTPbottomsheet(false);
        resetOtp();
        setOtpError('');
    };

    return (
        <>
            <div className={styles.topdiv}>
                <div className={styles.mainContainer}>
                    <div className={styles.container}>
                        {/* first div */}
                        <div className={styles.topchildren}>
                            <div className={styles.logoContainer}>
                                <Image
                                    src="/Aryse_Fin_n_w.png"
                                    width={80}
                                    height={80}
                                    className={styles.logo}
                                    alt="Aryse_Fin logo"
                                    priority
                                />
                            </div>
                        </div>

                        {/* second div */}
                        <div className={styles.children}>
                            <div className={styles.section}>
                                <h3>Loans Upto  <span className={styles.spanSection}>₹25 Lacs,</span> <br />Start <span className={styles.spanSection}>@  10.99 % p.a</span>  </h3>
                            </div>
                            <div className={styles.imageSection}>
                                <div className={styles.imageComponet}>
                                    <Image
                                        src="/clock2.png"
                                        width={40}
                                        height={40}
                                        className={styles.logosection}
                                        alt="timer"
                                        priority
                                    />
                                    <h3>Fast Approval<br /> <span>In 2 minutes</span></h3>
                                </div>
                                <div className={styles.imageComponet}>
                                    <Image
                                        src="/calendar2.png"
                                        width={40}
                                        height={40}
                                        className={styles.logosection2}
                                        alt="calender"
                                        priority
                                    />
                                    <h3>Flexible EMI tenure <br /><span>upto 60 months</span></h3>
                                </div>
                            </div>
                        </div>

                        {/* third div */}
                        <div className={styles.children}>
                            <div className={styles.mobilefield}>
                                <h3>Enter Mobile Number</h3>
                                <div>
                                    <input
                                        type='tel'
                                        name='mobileNo'
                                        value={mobileNumber}
                                        inputMode="numeric"
                                        onChange={handleMobileChange}
                                        placeholder='Enter Mobile number'
                                        className={`${styles.inputfield} ${formErrors.mobileNumber ? styles.inputError : ''}`}
                                        maxLength={13}
                                    />
                                    <span>OTP will be send to your number for verification.</span>
                                </div>
                                <div>
                                    <button
                                        className={`${styles.btnelig} ${isLoading ? styles.loading : ''}`}
                                        onClick={handleCheckEligibility}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Checking...' : 'Check eligibility'}
                                    </button>

                                    <h3 className={styles.termText}>By proceeding, you agree to our <a href='/TermAndCondition'>Terms & Conditions</a> and <a href='/PrivacyAndPolicy'>Privacy Policy</a></h3>
                                </div>
                            </div>
                        </div>

                        {/* fourth div */}
                        <div className={styles.children}>
                            <div className={styles.textContainer}>
                                <h3 className={styles.hedingEliText}>Instant Loan Eligibility Criteria</h3>
                                <ul className={styles.customList} type='none'>
                                    <li>Loan Amount Up to 25 lacks.</li>
                                    <li>Tenure: 3 to 60 months.</li>
                                    <li>Rate of Interest (ROI): Starting from 12% per year.</li>
                                    <li>Maximum APR: 45%.</li>
                                    <li>Processing Fee: 2.5% of loan amount + taxes as applicable.</li>
                                </ul>
                            </div>
                        </div>

                        {/* fifth div */}
                        <div className={styles.children}>
                            <div className={styles.textContainer1}>
                                <h3 className={styles.hedingEliText}>Credit Score Partner</h3>
                                <Image
                                    src="/Experiannew.png"
                                    width={100}
                                    height={100}
                                    className={styles.logoExperian}
                                    alt="Experiannew"
                                    priority
                                />
                            </div>
                        </div>

                        {/* sixth div */}
                        <div className={styles.children}>
                            <div className={styles.textContainer2}>
                                <h3>calculation</h3><br />
                                <p>Calculation:CreditHaat does not charge any fees from the user.A sample loan calculation
                                    for ₹1,00,000 borrowed for 1 year, with interest rate @13% per annum*,
                                    is as provided below:<br />Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360</p>
                            </div>
                        </div>

                        {/* seventh div */}
                        <div className={styles.footer}>
                            <div className={styles.companyText}>
                                <h3>© Vibhuprada Services Private Limited | All
                                    Rights Reserved with Copyright & TradeMarks</h3>
                            </div>
                            <div className={styles.tandC}>
                                <div><a href='/TermAndCondition'>Terms & Conditions</a></div>
                                <div><a href='/PrivacyAndPolicy'>Privacy Policy</a></div>
                            </div>
                        </div>
                    </div>

                    {/* OTP Bottom Sheet */}
{showOTPbottomsheet && (
    <div className={styles.bottomSheetOverlay} onClick={closeBottomSheet}>
        <div className={styles.otpBottomSheet} onClick={(e) => e.stopPropagation()}>
            {/* Cross Button */}
            <button className={styles.crossButton} onClick={closeBottomSheet}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <div className={styles.otpHeader}>
                <h2>Please check message</h2>
                <p>we've sent a code on <span className={styles.otpSpan}>
                    {mobileNumber.replace(/\D/g, '').slice(-10)}
                </span></p>
            </div>

            <div className={styles.otpInputContainer}>
                <input
                    ref={otpRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter 6-digit OTP"
                    className={`${styles.otpSingleInput} ${otpError ? styles.otpInputError : ''}`}
                    maxLength="6"
                    autoComplete="one-time-code"
                />
            </div>

            {otpError && (
                <div className={styles.errorMessage}>
                    {otpError}
                </div>
            )}

            <button
                className={`${styles.nextButton} ${isLoading ? styles.loading : ''}`}
                onClick={handleVerifyOTP}
                disabled={isLoading}
            >
                {isLoading ? 'Verifying...' : 'Verify'}
            </button>
        </div>
    </div>
)}
                </div>
            </div>
        </>
    );
}

export default FirstPage;