'use client';
// pages/support.js or components/SupportPage.js
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/arysefin-dark logo.png';
import styles from './SupportPage.module.css';
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Outfit } from "next/font/google";
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import ondclogo from '../../../public/ondcW_logo.png';
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SupportPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    query: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      console.log('Form submitted:', formData);

      // Simulate API call - replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Reset form after successful submission
      setFormData({
        name: '',
        mobile: '',
        email: '',
        query: '',
        message: ''
      });

      // alert('Form submitted successfully!'); 

    } catch (error) {
      console.error('Error submitting form:', error);
      // alert('Error submitting form. Please try again.'); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={outfit.className}>
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
          </div>
        </nav>
      </header>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* left section */}
          <div className={styles.leftSection}>
            <Image
              src="/support_woman2.png"
              alt="Support representative"
              className={styles.supportImage}
              height={700}
              width={700}
              objectFit='cover'
              
            /> 

          </div>
          {/* Right section */}
          <div className={styles.rightSection}>
            <div className={styles.formContainer}>
              <h2 className={styles.title}>Can we help you?</h2>
              <p className={styles.subtitle}>
                Have any queries? We&apos;d love to hear from you
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile No."
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={styles.input}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email id"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <select
                    name="query"
                    placeholder="Select Queries"
                    value={formData.query}
                    onChange={handleInputChange}
                    className={styles.select}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="">Select Queries</option>
                    <option value="general">General feedback</option>
                    <option value="technical">Partnership</option>
                    <option value="billing">Market queries</option>
                    <option value="feedback">DND</option>
                    <option value="feedback">Data delation Request</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    rows="4"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.6 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                </button>
              </form>
            </div>
          </div>
          {/* right section end */}
        </div>

        <div
          onClick={() =>
            window.location.href =
            'mailto:support@arysefin.com?subject=Support%20Request&body=Hello,%20I%20need%20help%20with...'
          }
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        >
          You can also write query support on AryseFin
        </div>

      </div>
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
                AryseFin is a lending service platform (LSP) that makes borrowing
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
             <p>Powered by</p>
            <Image
              src={ondclogo}
              alt="Logo"
              width={80}
              height={65}
            />
           
          </div>
          <div className={styles.lastMD}>
            <div className={styles.iconAndCopyRight}>
              <div>©2025 Vibhuprada Services Private Limited.</div>
              <div className={styles.middleText}> <p>All rights reserved</p></div>

              <div className={styles.iconF}>
                {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a> */}
                <a href="https://www.facebook.com/profile.php?id=61580792857656" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://www.linkedin.com/company/arysefin/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default SupportPage;
{/* <footer className={styles.footer}>
        <div className={styles.firstfd}>
          // new t
          <div className={styles.flogo}>
            <Image
              src="/AryseFin_logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="object-contain"
            />
            <p className={styles.footeraboutText}>
              Aryse Fin is a lending service platform (LSP) that makes borrowing
              easy, transparent, and human.
            </p>
          </div>
          //new
          <div className={styles.combine}>
            <div className={styles.fresourceMain}>
              <div className={styles.fresource}>
                <h3>Resources</h3>
                <h4><Link href="/lenderpage">Lending Partners</Link></h4>
                <h4><Link href="/">Acquisition Partners</Link></h4>
                <h4><Link href="/Grievce">Grievance Redressal Process</Link></h4>
                <h4>
                  <a href="https://sachet.rbi.org.in/" rel="noopener noreferrer">
                    RBI Sachet Portal
                  </a>
                </h4>
              </div>
            </div>
            
            <div className={styles.fcityMain}>
              <div className={styles.fcity}>
                <h3>Quick Links</h3>
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
                  <Link href="/PrivacyAndPolicy">
                    Contact us
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.frights}>
          <div className={styles.fcopyR}>
            <div>©2025 Vibhuprada Services Private Limited.</div>
            <div className={styles.middleText}> <p>All rights reserved</p></div>
          </div>
          
          <div className={styles.ficon}>
            <div className={styles.fsocialIcon} style={{ display: 'flex' }}>
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
      </footer> */}