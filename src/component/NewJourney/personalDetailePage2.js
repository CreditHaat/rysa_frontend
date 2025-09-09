"use client";
import React from 'react'
import styles from "./personalDetailePage2.module.css";
import { useState } from 'react';
import Image from 'next/image';


function PersonalDetailePage2({ mainFormData, setActiveContainer, setFormData }) {

    // Form field states - initialize with mainFormData values
    const [panNumber, setPanNumber] = useState(mainFormData?.panNumber || '');
    const [fullName, setFullName] = useState(mainFormData?.fullName || '');
    const [email, setEmail] = useState(mainFormData?.email || '');
    const [selectedGender, setSelectedGender] = useState(mainFormData?.selectedGender || '');
    const [selectedDate, setSelectedDate] = useState(mainFormData?.selectedDate || '');
    
    const [formErrors, setFormErrors] = useState({
        panNumber: "",
        fullName: "",
        email: "",
        selectedGender: "",
        selectedDate: "",
    });
    
    // Error states for all fields
    const [panError, setPanError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [dobError, setDobError] = useState('');
    
    // DOB Date Picker States
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Validation functions
    const validatePAN = (pan) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name) => {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
    };

    const isValidDate = (dateString) => {
        const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
        const match = dateString.match(regex);
        if (!match) return false;
        
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && 
               date.getMonth() === month - 1 && 
               date.getDate() === day &&
               year >= 1900 && year <= new Date().getFullYear();
    };

    // Field validation handlers
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'pan':
                if (!value.trim()) {
                    return 'PAN number is required';
                } else if (value.length !== 10) {
                    return 'PAN number must be 10 characters long';
                } else if (!validatePAN(value)) {
                    return 'Invalid PAN format. Should be 5 letters + 4 digits + 1 letter (e.g., HAGSF7384H)';
                }
                return '';
            
            case 'name':
                if (!value.trim()) {
                    return 'Name is required';
                } else if (!validateName(value)) {
                    return 'Please enter a valid name (only letters and spaces, minimum 2 characters)';
                }
                return '';
            
            case 'email':
                if (!value.trim()) {
                    return 'Email is required';
                } else if (!validateEmail(value)) {
                    return 'Please enter a valid email address';
                }
                return '';
            
            case 'gender':
                if (!value) {
                    return 'Please select your gender';
                }
                return '';
            
            case 'dob':
                if (!value.trim()) {
                    return 'Date of birth is required';
                } else if (!isValidDate(value)) {
                    return 'Please enter a valid date in DD-MM-YYYY format';
                }
                return '';
            
            default:
                return '';
        }
    };

    // Clear error when user starts typing/selecting
    const clearError = (fieldName) => {
        switch (fieldName) {
            case 'pan':
                setPanError('');
                break;
            case 'name':
                setNameError('');
                break;
            case 'email':
                setEmailError('');
                break;
            case 'gender':
                setGenderError('');
                break;
            case 'dob':
                setDobError('');
                break;
        }
    };

    // Form submission validation
    const validateAllFields = () => {
        const panErr = validateField('pan', panNumber);
        const nameErr = validateField('name', fullName);
        const emailErr = validateField('email', email);
        const genderErr = validateField('gender', selectedGender);
        const dobErr = validateField('dob', selectedDate);

        setPanError(panErr);
        setNameError(nameErr);
        setEmailError(emailErr);
        setGenderError(genderErr);
        setDobError(dobErr);

        return !panErr && !nameErr && !emailErr && !genderErr && !dobErr;
    };

    // PAN handling
    const formatPANInput = (value) => {
        let formatted = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        if (formatted.length > 10) {
            formatted = formatted.substring(0, 10);
        }
        return formatted;
    };

    const handlePANChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatPANInput(inputValue);
        
        setPanNumber(formattedValue);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            panNumber: formattedValue
        }));
        clearError('pan');
        
        if (formattedValue.length === 10) {
            const error = validateField('pan', formattedValue);
            setPanError(error);
        }
    };

    const handlePANBlur = () => {
        const error = validateField('pan', panNumber);
        setPanError(error);
    };

    // Name handling
    const handleNameChange = (e) => {
        const value = e.target.value;
        setFullName(value);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            fullName: value
        }));
        clearError('name');
    };

    const handleNameBlur = () => {
        const error = validateField('name', fullName);
        setNameError(error);
    };

    // Email handling
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            email: value
        }));
        clearError('email');
    };

    const handleEmailBlur = () => {
        const error = validateField('email', email);
        setEmailError(error);
    };

    // Gender handling
    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            selectedGender: gender
        }));
        clearError('gender');
    };

    // DOB Helper Functions
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const getPrevMonthDays = (month, year) => {
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        return getDaysInMonth(prevMonth, prevYear);
    };

    const formatDateInput = (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 2) {
            return digits;
        } else if (digits.length <= 4) {
            return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        } else {
            return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 8)}`;
        }
    };

    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const prevMonthDays = getPrevMonthDays(currentMonth, currentYear);

        const days = [];

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                day: prevMonthDays - i,
                isCurrentMonth: false,
                isPrevMonth: true
            });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day,
                isCurrentMonth: true,
                isPrevMonth: false
            });
        }

        const remainingCells = 42 - days.length;
        for (let day = 1; day <= remainingCells; day++) {
            days.push({
                day,
                isCurrentMonth: false,
                isPrevMonth: false
            });
        }

        return days;
    };

    const handleDateClick = (day, isCurrentMonth) => {
        if (!isCurrentMonth) return;

        const formattedDate = `${String(day).padStart(2, '0')}-${String(currentMonth + 1).padStart(2, '0')}-${currentYear}`;
        setSelectedDate(formattedDate);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            selectedDate: formattedDate
        }));
        setShowDatePicker(false);
        clearError('dob');
    };

    const handleDateInputChange = (e) => {
        const formatted = formatDateInput(e.target.value);
        setSelectedDate(formatted);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            selectedDate: formatted
        }));
        clearError('dob');
        
        if (isValidDate(formatted)) {
            const [day, month, year] = formatted.split('-').map(Number);
            setCurrentMonth(month - 1);
            setCurrentYear(year);
        }
    };

    const handleDateBlur = () => {
        const error = validateField('dob', selectedDate);
        setDobError(error);
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleYearChange = (direction) => {
        setCurrentYear(prevYear => direction === 'up' ? prevYear + 1 : prevYear - 1);
    };

    const handleToday = () => {
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        setSelectedDate(formattedDate);
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            selectedDate: formattedDate
        }));
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
        setShowDatePicker(false);
        clearError('dob');
    };

    const handleClear = () => {
        setSelectedDate('');
        // Update parent formData immediately
        setFormData(prev => ({
            ...prev,
            selectedDate: ''
        }));
        setShowDatePicker(false);
    };

    const isSelected = (day, isCurrentMonth) => {
        if (!isCurrentMonth || !selectedDate || !isValidDate(selectedDate)) return false;
        const [selectedDay, selectedMonth, selectedYear] = selectedDate.split('-').map(Number);
        return selectedDay === day &&
            selectedMonth === (currentMonth + 1) &&
            selectedYear === currentYear;
    };

    const isToday = (day, isCurrentMonth) => {
        if (!isCurrentMonth) return false;
        const today = new Date();
        return day === today.getDate() &&
               currentMonth === today.getMonth() &&
               currentYear === today.getFullYear();
    };

    // Handle next button click
    const handleNext = () => {
        if (validateAllFields()) {
            // Before moving to next page, ensure all data is saved in parent
            setFormData(prev => ({
                ...prev,
                panNumber: panNumber,
                fullName: fullName,
                email: email,
                selectedGender: selectedGender,
                selectedDate: selectedDate
            }));
            setActiveContainer("PersonalDetailePage3");
        }
    };

    const handleBack = () => {
        // Save current data before going back
        setFormData(prev => ({
            ...prev,
            panNumber: panNumber,
            fullName: fullName,
            email: email,
            selectedGender: selectedGender,
            selectedDate: selectedDate
        }));
        setActiveContainer("personalDetailePage");
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainHeaderPart} >
                <Image
                    src="/Aryse_Fin.png"
                    width={55}
                    height={55}
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
                    <div className={styles.headering}><h3>personal Details</h3></div>
                </div>

                <div className={styles.form}>
                    <div className={styles.formheading}>
                        Personal Details
                    </div>
                    
                    {/* PAN No field with validation */}
                    <div className={`${styles.fields} ${panError ? styles.fieldError : ''}`}>
                        <span className={styles.fieldName}>PAN No</span>
                        <input 
                            type='text' 
                            name='PAN' 
                            className={styles.inputfield}
                            value={panNumber}
                            onChange={handlePANChange}
                            onBlur={handlePANBlur}
                            maxLength={10}
                        />
                    </div>
                    
                    {/* Name as PAN field with validation */}
                    <div className={`${styles.fields} ${nameError ? styles.fieldError : ''}`}>
                        <span className={styles.fieldName}>Name as PAN</span>
                        <input
                            type='text'
                            name='fullname'
                            className={styles.inputfield}
                            value={fullName}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                        />
                    </div>
                    
                    {/* Email field with validation */}
                    <div className={`${styles.fields} ${emailError ? styles.fieldError : ''}`}>
                        <span className={styles.fieldName}>Email</span>
                        <input
                            type='email'
                            name='Email'
                            className={styles.inputfield}
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                        />
                    </div>
                    
                    {/* Gender field with validation */}
                    <div className={styles.fields1}>
                        <span className={styles.gendertitle} >Gender</span>
                        <div className={styles.genderContainer}>
                            <div 
                                className={`${styles.genderOption} ${selectedGender === 'Male' ? styles.genderSelected : ''} ${genderError ? styles.genderOptionError : ''}`}
                                onClick={() => handleGenderSelect('Male')}
                            >
                                <div className={styles.genderIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="#9747FF"/>
                                        <path d="M12 14C8.67 14 2 15.67 2 19V20C2 20.55 2.45 21 3 21H21C21.55 21 22 20.55 22 20V19C22 15.67 15.33 14 12 14Z" fill="#9747FF"/>
                                    </svg>
                                </div>
                                <span className={styles.genderText}>Male</span>
                            </div>
                            <div 
                                className={`${styles.genderOption} ${selectedGender === 'Female' ? styles.genderSelected : ''} ${genderError ? styles.genderOptionError : ''}`}
                                onClick={() => handleGenderSelect('Female')}
                            >
                                <div className={styles.genderIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="#9747FF"/>
                                        <path d="M12 14C9.5 14 7.5 14.5 6 15.5C5.5 15.8 5.2 16.3 5.2 16.9V17.5C5.2 18.3 5.9 19 6.7 19H8.5L9.5 21H14.5L15.5 19H17.3C18.1 19 18.8 18.3 18.8 17.5V16.9C18.8 16.3 18.5 15.8 18 15.5C16.5 14.5 14.5 14 12 14Z" fill="#9747FF"/>
                                    </svg>
                                </div>
                                <span className={styles.genderText}>Female</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* DOB field with validation */}
                    <div className={`${styles.fields} ${dobError ? styles.fieldError : ''}`}>
                        <span className={styles.fieldName}>DOB</span>
                        <div className={styles.dobInputContainer}>
                            <input
                                type='text'
                                name='dateOfBirth' 
                                className={`${styles.inputfield} ${styles.dobInput}`}
                                value={selectedDate}
                                placeholder="DD-MM-YYYY"
                                onChange={handleDateInputChange}
                                onBlur={handleDateBlur}
                                maxLength={10}
                            />
                            <button 
                                type="button"
                                className={styles.calendarButton}
                                onClick={() => setShowDatePicker(!showDatePicker)}
                            >
                                📅
                            </button>
                        </div>
                    </div>
                    
                    {/* Button part */}
                    <div className={styles.btn}>
                        <div className={styles.backbtn}onClick={handleBack}>Back</div>
                        <div className={styles.emptyspace}></div>
                        <div className={styles.nextbtn} onClick={handleNext}>Next</div>
                    </div>
                </div>
                
                {/* Date Picker Modal */}
                {showDatePicker && (
                    <div
                        className={styles.datePickerOverlay}
                        onClick={() => setShowDatePicker(false)}
                    >
                        <div
                            className={styles.datePickerModal}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.datePickerHeader}>
                                <div className={styles.monthYearSelector}>
                                    <div className={styles.monthSelector}>
                                        <button onClick={handlePrevMonth} className={styles.navButton}>‹</button>
                                        <span className={styles.monthDisplay}>{months[currentMonth]}</span>
                                        <button onClick={handleNextMonth} className={styles.navButton}>›</button>
                                    </div>
                                    <div className={styles.yearSelector}>
                                        <button onClick={() => handleYearChange('down')} className={styles.navButton}>‹</button>
                                        <span className={styles.yearDisplay}>{currentYear}</span>
                                        <button onClick={() => handleYearChange('up')} className={styles.navButton}>›</button>
                                    </div>
                                </div>
                                <button 
                                    className={styles.closeButton}
                                    onClick={() => setShowDatePicker(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className={styles.weekdaysGrid}>
                                {weekdays.map(day => (
                                    <div key={day} className={styles.weekdayHeader}>{day}</div>
                                ))}
                            </div>

                            <div className={styles.calendarGrid}>
                                {generateCalendarDays().map((dateObj, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleDateClick(dateObj.day, dateObj.isCurrentMonth)}
                                        disabled={!dateObj.isCurrentMonth}
                                        className={`${styles.calendarDay} ${
                                            !dateObj.isCurrentMonth ? styles.disabledDay : ''
                                        } ${
                                            isSelected(dateObj.day, dateObj.isCurrentMonth) ? styles.selectedDay : ''
                                        } ${
                                            isToday(dateObj.day, dateObj.isCurrentMonth) ? styles.todayDay : ''
                                        }`}
                                    >
                                        {dateObj.day}
                                    </button>
                                ))}
                            </div>

                            <div className={styles.datePickerFooter}>
                                <button onClick={handleClear} className={styles.clearButton}>Clear</button>
                                <button onClick={handleToday} className={styles.todayButton}>Today</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PersonalDetailePage2