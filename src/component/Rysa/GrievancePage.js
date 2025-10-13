// pages/grievance.js or components/GrievancePage.js
import styles from './GrievancePage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/arysefin-dark logo.png';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import ondclogo from '../../../public/ondcW_logo.png';
export default function GrievancePage() {
  return (
    <div className={styles.container}>
      {/* Header */}

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

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          {/* Title */}
          <h1 className={styles.title}>
            GRIEVANCE REDRESSAL PROCESS OF <br />
            <span className={styles.companyNameheading}>ARYSEFIN</span>

          </h1>

          {/* Introduction */}
          <p className={styles.intro}>
            We aim to delight our customers and work hard to make sure that
            we help our customers avail the best credit solutions from our
            vast network of lending partners. However we understand that
            even with our best efforts we may get it wrong some times. If you
            have a complaint or would like us to address any concerns please
            reach out to us at <a href="mailto:support@arysefin.com" className={styles.atag}>support@arysefin.com</a>  or send a letter to -
          </p>

          {/* Company Info */}
          <div className={styles.companyInfo}>
            <h2 className={styles.companyName}>
              VIBHUPRADA SERVICES PRIVATE LIMITED
            </h2>

            <div className={styles.address}>
              <p>Office No. 7 to 12, 7th Floor, Tower B,</p>
              <p>Downtown City Vista, Survey Number 58&#47;2,</p>
              <p>Fountain Road,</p>
              <p>Kharadi Pune MH 411014 IN.</p>
            </div>
          </div>

          {/* Escalation Process */}
          <div className={styles.escalation}>
            <h3 className={styles.escalationTitle}>Escalation process:</h3>
            <p className={styles.escalationText}>
              If your query&#47;complaint has not been addressed
              within 7 working days; please reach out to our Grievance Redressal
              Officer as provided below -
            </p>
          </div>

          {/* Grievance Officer Details */}
          <div className={styles.grievanceOfficer}>
            <h3 className={styles.officerTitle}>
              Grievance Redressal Officer: <span className={styles.officerName}>Monika Kaushik</span>
            </h3>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <span className={styles.label}>Tel:</span>
                <span className={styles.value}>020-4730-4552</span>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.label}>Email id:</span>
                <span className={styles.value}><a href="mailto:support@arysefin.com" className={styles.atag}>support@arysefin.com</a> </span>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.label}>Designation:</span>
                <span className={styles.value}>GRO</span>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.label}>Office address:</span>
                {/* <span className={styles.value}>HO</span> */}
                <div className={styles.address}>
                  <p>Office No. 7 to 12, 7th Floor, Tower B,</p>
                  <p>Downtown City Vista, Survey Number 58&#47;2,</p>
                  <p>Fountain Road,</p>
                  <p>Kharadi Pune MH 411014 IN.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
                    <h4><Link href="/lenderpage">Lending partners</Link></h4>
                    <h4><Link href="/acquisition_partners">Acquisition partners</Link></h4>
                    <h4><Link href="/Grievance">Grievance Redressal process</Link></h4>
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
                    <h3 className={styles.heading}>Quick links</h3>
                    <h4>
                      <Link href="/TermAndCondition">
                        Terms of service
                      </Link>
                    </h4>
                    <h4>
                      <Link href="/PrivacyAndPolicy">
                        Privacy policy
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
}