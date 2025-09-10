"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from "./firstpage.module.css";
import Image from 'next/image';
import { useRouter } from "next/navigation";

function FirstPage() {
    const router = useRouter();
    const [showOTPbottomsheet, setShowOTPbottomsheet] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({
        mobileNumber: "",
    });

    // Create refs for OTP inputs
    const otpRefs = useRef([]);

    // Handle mobile number input
    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only numbers
        if (value.length <= 10) {
            setMobileNumber(value);
            // Clear error when user starts typing
            if (formErrors.mobileNumber) {
                setFormErrors({ mobileNumber: "" });
            }
        }
    };

    // Validation for mobile number 
    const validateForm = () => {
        let valid = true;
        const errors = {
            mobileNumber: ""
        };

        // Validation for mobile no 
        // if (!mobileNumber) {
        //     errors.mobileNumber = "Mobile number is required";
        //     valid = false;
        // } else if (mobileNumber.length !== 10) {
        //     errors.mobileNumber = "Mobile number must be exactly 10 digits";
        //     valid = false;
        // }

        // validatin for mobile no 
        if (!mobileNumber) {
            errors.mobileNumber = "Mobile number is required";
            valid = false;
        } else {

            if (digitsOnly.length < 14) {
                errors.mobileNumber = "Mobile number must be at least 10 digits";
                valid = false;
            }
        }

        setFormErrors(errors);
        return valid;
    };

    // Handle check eligibility button click
    const handleCheckEligibility = () => {
        if (isLoading) return; // Prevent multiple clicks

        if (validateForm()) {
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
                setShowOTPbottomsheet(true);
                // Auto-focus first OTP input
                setTimeout(() => {
                    otpRefs.current[0]?.focus();
                }, 100);
            }, 500);
        }
    };

    // Handle OTP input change
    // const handleOtpChange = (index, value) => {
    //     // Only allow single digit
    //     if (value.length <= 1 && /^\d*$/.test(value)) {
    //         const newOtp = [...otp];
    //         newOtp[index] = value;
    //         setOtp(newOtp);
    //         setOtpError('');

    //         // Auto-focus next input
    //         if (value && index < 5) {
    //             setTimeout(() => {
    //                 otpRefs.current[index + 1]?.focus();
    //             }, 10);
    //         }
    //     }
    // };
    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];

        if (value === '') {
            // backspace / delete case
            newOtp[index] = '';
            setOtp(newOtp);
            return;
        }

        if (/^[0-9]$/.test(value)) {
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < otp.length - 1) {
                otpRefs.current[index + 1]?.focus();
            }
        }
    };


    // Handle OTP input keydown (for backspace) - Fixed for mobile
    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            e.preventDefault(); // Prevent default backspace behavior

            const newOtp = [...otp];

            if (otp[index]) {
                // Clear current field if it has value
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                // Move to previous field and clear it
                newOtp[index - 1] = '';
                setOtp(newOtp);
                setTimeout(() => {
                    otpRefs.current[index - 1]?.focus();
                }, 10);
            }
        }
    };

    // Handle OTP input focus - Additional mobile support
    const handleOtpFocus = (index, e) => {
        // Select all text on focus for better mobile experience
        e.target.select();
    };

    // Handle OTP input paste
    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');

        if (pastedData.length <= 6) {
            const newOtp = ['', '', '', '', '', ''];
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i];
            }
            setOtp(newOtp);
            setOtpError('');

            // Focus on the next empty field or last field
            const nextIndex = Math.min(pastedData.length, 5);
            setTimeout(() => {
                otpRefs.current[nextIndex]?.focus();
            }, 10);
        }
    };

    // Handle OTP verification
    const handleVerifyOTP = () => {
        const enteredOtp = otp.join('');

        if (enteredOtp.length !== 6) {
            setOtpError('Please enter complete OTP');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const correctOtp = '123456'; // In real app, this would come from backend

            if (enteredOtp === correctOtp) {
                // OTP is correct, navigate to next page
                setIsLoading(false);
                setShowOTPbottomsheet(false);
                router.push('/personalDetailePage');
            } else {
                // OTP is incorrect, reset OTP inputs
                setIsLoading(false);
                setOtpError('Invalid OTP. Please try again.');
                resetOtp();
            }
        }, 1500);
    };

    // Reset OTP inputs
    const resetOtp = () => {
        setOtp(['', '', '', '', '', '']);
        setTimeout(() => {
            otpRefs.current[0]?.focus();
        }, 10);
    };

    // Handle resend OTP
    const handleResendOTP = () => {
        resetOtp();
        setOtpError('');
        // Here you would call API to resend OTP
        console.log('Resending OTP to:', mobileNumber);
        alert('OTP sent successfully!');
    };

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
                                        // inputMode="numeric"
                                        onChange={handleMobileChange}
                                        placeholder='Enter Mobile number'
                                        className={`${styles.inputfield} ${formErrors.mobileNumber ? styles.inputError : ''}`}
                                        maxLength={14}
                                    />
                                    {formErrors.mobileNumber && (
                                        <div className={styles.errorMessage}>
                                            {formErrors.mobileNumber}
                                        </div>
                                    )}
                                    <span>OTP will be send to your number for verification.</span>
                                </div>
                                <div>
                                    <button
                                        className={`${styles.btnelig} ${isLoading ? styles.loading : ''}`}
                                        onClick={handleCheckEligibility}
                                        disabled={isLoading || mobileNumber.length !== 10}
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
                                <div>Terms & Conditions</div>
                                <div>Privacy Policy</div>
                            </div>
                        </div>
                    </div>

                    {/* OTP Bottom Sheet */}
                    {showOTPbottomsheet && (
                        <div className={styles.bottomSheetOverlay} onClick={closeBottomSheet}>
                            <div className={styles.otpBottomSheet} onClick={(e) => e.stopPropagation()}>
                                <div className={styles.otpHeader}>
                                    <h2>Please check message</h2>
                                    <p>we've sent a code on <span className={styles.otpSpan}>{mobileNumber}</span></p>
                                </div>

                                <div className={styles.otpInputContainer}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => otpRefs.current[index] = el}
                                            type="tel"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            onFocus={(e) => handleOtpFocus(index, e)}
                                            onPaste={index === 0 ? handleOtpPaste : undefined}
                                            className={`${styles.otpInput} ${otpError ? styles.otpInputError : ''}`}
                                            maxLength="1"
                                            autoComplete="one-time-code"
                                        />
                                    ))}
                                </div>

                                {otpError && (
                                    <div className={styles.errorMessage}>
                                        {otpError}
                                    </div>
                                )}

                                <div className={styles.resendContainer}>
                                    <span>Didn't get a code? </span>
                                    <button className={styles.resendButton} onClick={handleResendOTP}>
                                        click to resend
                                    </button>
                                </div>

                                <button
                                    className={`${styles.nextButton} ${isLoading ? styles.loading : ''}`}
                                    onClick={handleVerifyOTP}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Verifying...' : 'Next'}
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