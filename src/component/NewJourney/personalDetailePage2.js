import React from 'react'
import styles from "./personalDetailePage2.module.css";
import { useState } from 'react';
import Image from 'next/image';

function personalDetailePage2() {
    // PAN validation states
    const [panNumber, setPanNumber] = useState('');
    const [panError, setPanError] = useState('');
    
    // DOB Date Picker States
    const [selectedDate, setSelectedDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    
    // Gender selection state
    const [selectedGender, setSelectedGender] = useState('');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // PAN validation functions
    const validatePAN = (pan) => {
        // PAN format: 5 letters + 4 digits + 1 letter (e.g., HAGSF7384H)
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    };

    const formatPANInput = (value) => {
        // Remove all non-alphanumeric characters and convert to uppercase
        let formatted = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        
        // Limit to 10 characters
        if (formatted.length > 10) {
            formatted = formatted.substring(0, 10);
        }
        
        return formatted;
    };

    const handlePANChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatPANInput(inputValue);
        
        setPanNumber(formattedValue);
        
        // Clear error when user starts typing
        if (panError) {
            setPanError('');
        }
        
        // Validate if 10 characters are entered
        if (formattedValue.length === 10) {
            if (!validatePAN(formattedValue)) {
                setPanError('Invalid PAN format. Should be 5 letters + 4 digits + 1 letter (e.g., HAGSF7384H)');
            }
        }
    };

    const handlePANBlur = () => {
        if (panNumber.length > 0 && panNumber.length < 10) {
            setPanError('PAN number must be 10 characters long');
        } else if (panNumber.length === 10 && !validatePAN(panNumber)) {
            setPanError('Invalid PAN format. Should be 5 letters + 4 digits + 1 letter (e.g., HAGSF7384H)');
        }
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

    // Date validation and formatting
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

    const formatDateInput = (value) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, '');
        
        // Apply formatting
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
        setShowDatePicker(false);
    };

    const handleDateInputChange = (e) => {
        const formatted = formatDateInput(e.target.value);
        setSelectedDate(formatted);
        
        // If valid date is typed, update calendar to show that month/year
        if (isValidDate(formatted)) {
            const [day, month, year] = formatted.split('-').map(Number);
            setCurrentMonth(month - 1);
            setCurrentYear(year);
        }
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
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
        setShowDatePicker(false);
    };

    const handleClear = () => {
        setSelectedDate('');
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

    // Gender selection handler
    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
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
                    {/* first field - PAN No with validation */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>PAN No</span>
                        <input 
                            type='text' 
                            name='PAN' 
                            className={`${styles.inputfield} ${panError ? styles.inputError : ''}`}
                            value={panNumber}
                            onChange={handlePANChange}
                            onBlur={handlePANBlur}
                            // placeholder="HAGSF7384H"
                            maxLength={10}
                        />
                        {panError && (
                            <span className={styles.errorMessage}>{panError}</span>
                        )}
                        {/* {panNumber.length === 10 && validatePAN(panNumber) && (
                            <span className={styles.successMessage}>✓ Valid PAN format</span>
                        )} */}
                    </div>
                    {/* second field */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>Name as PAN</span>
                        <input
                            type='text'
                            name='fullname'
                            className={styles.inputfield} />
                    </div>
                    {/* third field */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>Email</span>
                        <input
                            type='text'
                            name='Email'
                            className={styles.inputfield} />
                    </div>
                    {/* fourth field - Modified Gender Selection */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>Gender</span>
                        <div className={styles.genderContainer}>
                            <div 
                                className={`${styles.genderOption} ${selectedGender === 'Male' ? styles.genderSelected : ''}`}
                                onClick={() => handleGenderSelect('Male')}
                            >
                                <div className={styles.genderIcon}>
                                    {/* Male Icon - Square shoulders */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="#9747FF"/>
                                        <path d="M12 14C8.67 14 2 15.67 2 19V20C2 20.55 2.45 21 3 21H21C21.55 21 22 20.55 22 20V19C22 15.67 15.33 14 12 14Z" fill="#9747FF"/>
                                    </svg>
                                </div>
                                <span className={styles.genderText}>Male</span>
                            </div>
                            <div 
                                className={`${styles.genderOption} ${selectedGender === 'Female' ? styles.genderSelected : ''}`}
                                onClick={() => handleGenderSelect('Female')}
                            >
                                <div className={styles.genderIcon}>
                                    {/* Female Icon - Curved/dress-like bottom */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="#9747FF"/>
                                        <path d="M12 14C9.5 14 7.5 14.5 6 15.5C5.5 15.8 5.2 16.3 5.2 16.9V17.5C5.2 18.3 5.9 19 6.7 19H8.5L9.5 21H14.5L15.5 19H17.3C18.1 19 18.8 18.3 18.8 17.5V16.9C18.8 16.3 18.5 15.8 18 15.5C16.5 14.5 14.5 14 12 14Z" fill="#9747FF"/>
                                    </svg>
                                </div>
                                <span className={styles.genderText}>Female</span>
                            </div>
                        </div>
                    </div>
                    {/* fifth field - Enhanced DOB with typing and calendar */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>DOB</span>
                        <div className={styles.dobInputContainer}>
                            <input
                                type='text'
                                name='dateOfBirth' 
                                className={`${styles.inputfield} ${styles.dobInput}`}
                                value={selectedDate}
                                placeholder="DD-MM-YYYY"
                                onChange={handleDateInputChange}
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
                    {/* button part here */}
                    <div className={styles.btn}>
                        {/* back button  */}
                        <div className={styles.backbtn}>Back</div>
                        {/* emptyspace */}
                        <div className={styles.emptyspace}></div>
                        {/* next button  */}
                        <div className={styles.nextbtn}>Next</div>
                    </div>
                </div>
                {/* Professional DOB Date Picker Modal */}
                {showDatePicker && (
                    <div
                        className={styles.datePickerOverlay}
                        onClick={() => setShowDatePicker(false)}
                    >
                        <div
                            className={styles.datePickerModal}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header with Month/Year Navigation */}
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

                            {/* Weekdays Header */}
                            <div className={styles.weekdaysGrid}>
                                {weekdays.map(day => (
                                    <div key={day} className={styles.weekdayHeader}>{day}</div>
                                ))}
                            </div>

                            {/* Calendar Days Grid */}
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

                            {/* Footer Action Buttons */}
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

export default personalDetailePage2