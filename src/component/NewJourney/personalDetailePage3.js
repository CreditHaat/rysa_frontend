import React from 'react'
import styles from "./personalDetailePage3.module.css";
import { useState } from 'react';
import Image from 'next/image';
import { style } from '@mui/system';

function personalDetailePage3() {
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
                        <span className={styles.fieldName}>Company Name</span>
                        <input
                            type='text'
                            name='companyName'
                            className={styles.inputfield} />
                    </div>
                    {/* second field */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>Work Email</span>
                        <input
                            type='text'
                            name='workEmail'
                            className={styles.inputfield} />
                    </div>
                    {/* thired field */}
                    <div className={styles.fields}>
                        <span className={styles.fieldName}>Work PIN Code</span>
                        <input
                            type='text'
                            name='workPINCode'
                            className={styles.inputfield} />
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
            </div>
        </div>
    )
}

export default personalDetailePage3