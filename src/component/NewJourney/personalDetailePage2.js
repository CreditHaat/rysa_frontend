import React from 'react'
import styles from "./personalDetailePage2.module.css";
import { useState } from 'react';
import Image from 'next/image';
import { style } from '@mui/system';

function personalDetailePage2() {
    // DOB Date Picker States
    const [selectedDate, setSelectedDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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
        if (!isCurrentMonth || !selectedDate) return false;
        const [selectedDay, selectedMonth, selectedYear] = selectedDate.split('-');
        return parseInt(selectedDay) === day &&
            parseInt(selectedMonth) === (currentMonth + 1) &&
            parseInt(selectedYear) === currentYear;
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
                                className={styles.progressBarFill}
                            // style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        {/* first no:3 progress bar */}
                        <div className={styles.progressBar}>
                            <div className={styles.stepNumber}>3</div>
                            <div
                                className={styles.progressBarFill}
                            // style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        {/* first no:4 progress bar */}
                        <div className={styles.progressBarlast}>
                            <div className={styles.stepNumberLast}>4</div>
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
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>PAN No</span>
                        <input type='text' 
                        name='PAN' 
                        className={styles.inputfield} />
                    </div>
                    {/* second field */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>Name as PAN</span>
                        <input
                            type='text'
                            name='fullname'
                            className={styles.inputfield} />
                    </div>
                    {/* thierd field */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>Email</span>
                        <input
                            type='text'
                            name='Email'
                            className={styles.inputfield} />
                    </div>
                                        {/* fourth field */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>Gender</span>
                        <input
                            type='text'
                            name='Gender'
                            className={styles.inputfield} />
                    </div>
                    {/* fifth field */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>DOB</span>
                        <input
                            type='text'
                            name='dateOfBirth' 
                            className={styles.inputfield}
                            value={selectedDate}
                            placeholder="dd-mm-yyyy"
                            readOnly
                            onClick={() => setShowDatePicker(!showDatePicker)}/>
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
                {/* DOB Date Picker Modal */}
                {showDatePicker && (
                    <div
                        className={styles.bottomSheetOverlay}
                        onClick={() => setShowDatePicker(false)}
                    >
                        <div
                            className={styles.datePickerSheet}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className={styles.datePickerHeader}>
                                <h3 className={styles.monthYear}>
                                    {months[currentMonth]}, {currentYear}
                                </h3>
                                <div className={styles.navigationButtons}>
                                    <button onClick={handlePrevMonth} className={styles.navButton}>⬆️</button>
                                    <button onClick={handleNextMonth} className={styles.navButton}>⬇️</button>
                                </div>
                            </div>

                            {/* Weekdays */}
                            <div className={styles.weekdaysGrid}>
                                {weekdays.map(day => (
                                    <div key={day} className={styles.weekdayHeader}>{day}</div>
                                ))}
                            </div>

                            {/* Calendar Days */}
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
                                        }`}
                                    >
                                        {dateObj.day}
                                    </button>
                                ))}
                            </div>

                            {/* Footer Buttons */}
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