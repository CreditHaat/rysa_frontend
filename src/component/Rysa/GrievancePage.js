// pages/grievance.js or components/GrievancePage.js
import styles from './GrievancePage.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function GrievancePage() {
  return (
    <div className={styles.container}>
      {/* Header */}

      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <Image
              src="/Aryse_Fin.png"
              alt="AryseFin Logo"
              width={50}      // You can adjust width
              height={50}      // You can adjust height
            />
          </div>
          {/* <nav className={styles.navigation}>
            <a href="#" className={styles.navLink}>HOME</a>
            <a href="#" className={styles.navLink}>PRODUCT</a>
            <a href="#" className={styles.navLink}><span className={styles.navSpan}>CONTACT US</span></a>
          </nav> */}
        </div>
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
              <p>Office No. 6 no 12, 7th Floor, Tower B,</p>
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
                  <p>Office No. 6 no 12, 7th Floor, Tower B,</p>
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
        <div className={styles.containerFooter}>
          <p className={styles.description}>
            Starting with credit, AryseFin is on a mission to bring relevant .
          </p>

          <div className={styles.quickLinks}>
            <h3 className={styles.quickLinksTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              <li><a href="#" className={styles.link}>About</a></li>
              <li><a href="#" className={styles.link}>Careers</a></li>
              <li><a href="#" className={styles.link}>SBlog</a></li>
              <li><a href="#" className={styles.link}>FAQs</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}