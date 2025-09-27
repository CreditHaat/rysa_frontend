"use client";
import React from 'react';
import styles from './landerpage.module.css';
import Image from 'next/image';
import logo from '../../../public/arysefin-dark logo.png'
import Link from 'next/link';
import Pahal from '../../../public/pahal_logo.png';
import Kissht from '../../../public/kissht_logo.png';
import BFL from '../../../public/bfl_logo.png';
import ABCL from '../../../public/abcl-logo.gif';
import ondclogo from '../../../public/ondcW_logo.png';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
function Landerpage() {
    return (
        <div className={styles.container}>
            {/* nav bar */}
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <div className={styles.navContainer}>
                        {/* Logo */}
                        <div className={styles.logoNav}>
                            <Link href='/'><Image
                                src={logo}
                                alt="Logo"
                                width={80}
                                height={65}
                            /></Link>
                        </div>

                        {/* हंबरगर बटन */}
                        {/* <div className={styles.navRightHumberger}>
                <button onClick={toggleMenu} className={styles.hamburgerBtn}>
                  {isOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>

              {isOpen && (
                <div className={styles.humberView}>
                  <a href="#" className={styles.navLinkHumberger}>
                    Home
                  </a>
                  <a href="#" className={styles.navLinkHumberger}>
                    Loans
                  </a>
                  <a href="#" className={styles.navLinkHumberger}>
                    About
                  </a>
                </div>
              )} */}

                        {/* Navigation Links */}
                        {/* <div className={styles.navRight}>
                <div className={styles.navLinks}>
                  <div className={styles.navAncor}>
                    <a href="#" className={styles.navLink}>
                      Home
                    </a>
                  </div>
                  <div className={styles.navAncor}>
                    <a href="#" className={styles.navLink}>
                      Loans
                    </a>
                  </div>
                  <div className={styles.navAncor}>
                    <a href="#" className={styles.navLink}>
                      About
                    </a>
                  </div>
                </div>
                <button className={styles.loginBtn}>Login</button>
              </div> */}
                        {/* Login Button */}
                    </div>
                </nav>
            </header>
            {/* main section */}
            <div className={styles.section}>
                <div className={styles.lederDiv}>
                    <h3>Lending Partner Of <span>AryseFin</span></h3>
                    {/* first */}
                    <div className={styles.imageTextButton}>
                        <div>
                            <Image
                                src={Pahal}
                                width={80}
                                height={50}
                                alt='logo'
                            />
                            <h3>Pahal</h3>
                        </div>
                        <div className={styles.tANDb}>
                            <div className={styles.textContainer}>
                                <p>Amount range:₹20,000-₹5,00,000<br />
                                    Features:Personal Loans for<br /> Salaried Individuals
                                </p>
                            </div>
                            <div className={styles.onlybtn}>
                                <div className={styles.btnContiner}><button className={styles.btn}><span>Apply Now </span></button></div>
                                <div className={styles.btnContainer}><button className={styles.btn}><span>Know More </span></button></div>
                            </div>
                        </div>
                    </div>
                    {/* seconde box */}
                    <div className={styles.imageTextButton}>
                        <div>
                            <Image
                                src={Kissht}
                                width={80}
                                height={50}
                                alt='logo'
                            />
                            <h3>Kissht</h3>
                        </div>
                        <div className={styles.tANDb}>
                            <div className={styles.textContainer}>
                                <p>Amount range:₹20,000-₹5,00,000<br />
                                    Features:Personal Loans for<br /> Salaried Individuals
                                </p>
                            </div>
                            <div className={styles.onlybtn}>
                                <div className={styles.btnContiner}><button className={styles.btn}><span>Apply Now </span></button></div>
                                <div className={styles.btnContainer}><button className={styles.btn}><span>Know More </span></button></div>
                            </div>
                        </div>
                    </div>
                    {/* 3 box */}
                    <div className={styles.imageTextButton}>
                        <div>
                            <Image
                                src={BFL}
                                width={80}
                                height={50}
                                alt='logo'
                            />
                            <h3>Bajaj Finserv Limited</h3>
                        </div>
                        <div className={styles.tANDb}>
                            <div className={styles.textContainer}>
                                <p>Amount range:₹20,000-₹5,00,000<br />
                                    Features:Personal Loans for<br /> Salaried Individuals
                                </p>
                            </div>
                            <div className={styles.onlybtn}>
                                <div className={styles.btnContiner}><button className={styles.btn}><span>Apply Now </span></button></div>
                                <div className={styles.btnContainer}><button className={styles.btn}><span>Know More </span></button></div>
                            </div>
                        </div>
                    </div>
                    {/* 4 box */}
                    <div className={styles.imageTextButton}>
                        <div>
                            <Image
                                src={ABCL}
                                width={80}
                                height={50}
                                alt='logo'
                            />
                            <h3>Aditya Birla Capital Limited</h3>
                        </div>
                        <div className={styles.tANDb}>
                            <div className={styles.textContainer}>
                                <p>Amount range:₹20,000-₹5,00,000<br />
                                    Features:Personal Loans for<br /> Salaried Individuals
                                </p>
                            </div>
                            <div className={styles.onlybtn}>
                                <div className={styles.btnContiner}><button className={styles.btn}><span>Apply Now </span></button></div>
                                <div className={styles.btnContainer}><button className={styles.btn}><span>Know More </span></button></div>
                            </div>
                        </div>
                    </div>
                    {/* 5 box */}
                    {/* <div className={styles.imageTextButton}>
                        <div>
                            <Image
                                src={logo}
                                width={80}
                                height={50}
                                alt='logo'
                            />
                            <h3>Aryse_Fin</h3>
                        </div>
                        <div className={styles.tANDb}>
                            <div className={styles.textContainer}>
                                <p>Amount range:₹20,000-₹5,00,000<br />
                                    Features:Personal Loans for<br /> Salaried Individuals
                                </p>
                            </div>
                            <div className={styles.onlybtn}>
                                <div className={styles.btnContiner}><button className={styles.btn}><span>Apply Now </span></button></div>
                                <div className={styles.btnContainer}><button className={styles.btn}><span>Know More </span></button></div>
                            </div>
                        </div>
                    </div> */}
                    {/* 6 box */}
                    {/* <div className={styles.imageTextButton}>
                        <div>
                            <Image
                                src={logo}
                                width={80}
                                height={50}
                                alt='logo'
                            />
                            <h3>Aryse_Fin</h3>
                        </div>
                        <div className={styles.tANDb}>
                            <div className={styles.textContainer}>
                                <p>Amount range:₹20,000-₹5,00,000<br />
                                    Features:Personal Loans for<br /> Salaried Individuals
                                </p>
                            </div>
                            <div className={styles.onlybtn}>
                                <div className={styles.btnContiner}><button className={styles.btn}><span>Apply Now </span></button></div>
                                <div className={styles.btnContainer}><button className={styles.btn}><span>Know More </span></button></div>
                            </div>
                        </div>
                    </div> */}
                    {/* 7 box */}
                    {/* <div className={styles.imageTextButton}>
                        <div>
                            <Image
                                src={logo}
                                width={80}
                                height={50}
                                alt='logo'
                            />
                            <h3>Aryse_Fin</h3>
                        </div>
                        <div className={styles.tANDb}>
                            <div className={styles.textContainer}>
                                <p>Amount range:₹20,000-₹5,00,000<br />
                                    Features:Personal Loans for<br /> Salaried Individuals
                                </p>
                            </div>
                            <div className={styles.onlybtn}>
                                <div className={styles.btnContiner}><button className={styles.btn}><span>Apply Now </span></button></div>
                                <div className={styles.btnContainer}><button className={styles.btn}><span>Know More </span></button></div>
                            </div>
                        </div>
                    </div> */}
                    {/* 8 */}

                </div>

            </div>

            {/* footer section */}
            <footer className={styles.footer}>
                <div className={styles.mainFD}>
                    <div className={styles.combineThree}>
                        <div className={styles.flogo}>
                            <Link href='/'><Image
                                src="/AryseFin_logo.png"
                                alt="Logo"
                                width={80}
                                height={80}
                                className="object-contain"
                            /></Link>
                            <p className={styles.logoText}>
                                Aryse Fin is a lending service platform (LSP) that makes borrowing
                                easy, transparent, and human.
                            </p>
                        </div>
                        <div className={styles.fresource}>
                            <div className={styles.textDecore}>
                                <h3 className={styles.heading}>Resources</h3>
                                <h4><Link href="/lenderpage">Lending Partners</Link></h4>
                                <h4><Link href="/acquisition_partners">Acquisition Partners</Link></h4>
                                <h4><Link href="/Grievance">Grievance Redressal Process</Link></h4>
                                <h4>
                                    <a href="https://sachet.rbi.org.in/" rel="noopener noreferrer">
                                        RBI Sachet Portal
                                    </a>
                                </h4>
                            </div>
                        </div>
                        {/*  */}
                        <div className={styles.fcity}>
                            <div className={styles.textDecore}>
                                <h3 className={styles.heading}>Quick Links</h3>
                                <h4>
                                    <Link href="/TermAndCondition">
                                        Terms of service
                                    </Link>
                                </h4>
                                <h4>
                                    <Link href="/PrivacyAndPolicy">
                                        Privacy Policy
                                    </Link>
                                </h4>
                                <h4>
                                    <Link href="/support">
                                        Contact us
                                    </Link>
                                </h4>
                            </div>
                        </div>
                        {/* combine 2 end */}
                    </div>
                    <div className={styles.ondcLogoDiv}>
                        <Image
                            src={ondclogo}
                            alt="Logo"
                            width={80}
                            height={65}
                        />
                        <p>Powered by</p>
                    </div>
                    <div className={styles.lastMD}>
                        <div className={styles.iconAndCopyRight}>
                            <div>©2025 Vibhuprada Services Private Limited.</div>
                            <div className={styles.middleText}> <p>All rights reserved</p></div>

                            <div className={styles.iconF}>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landerpage;