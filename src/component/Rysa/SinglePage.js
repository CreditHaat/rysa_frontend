'use client'
import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { FaMoneyBillWave, FaChartLine, FaHandHoldingUsd } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from './singlePage.module.css';
import logo from "../../../public/logo.png";
import { useRouter } from 'next/navigation';
export default function SinglePage() {
   const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };
  // middlepage
  const [activeCard, setActiveCard] = useState(1);
    const isThrottled = useRef(false);
    const containerRef = useRef(null);
  
    const handleWheel = (e) => {
      if (isThrottled.current) return;
  
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
  
      // Get vertical position of the mouse
      const mouseY = e.clientY;
      const middleStart = rect.top + rect.height * 0.5;
      const middleEnd = rect.top + rect.height * 0.7;
  
      // Only trigger if scrolling in the middle of the card
      if (mouseY < middleStart || mouseY > middleEnd) return;
  
      if (e.deltaY > 0 && activeCard < 4) {
        setActiveCard((prev) => prev + 1);
        isThrottled.current = true;
        setTimeout(() => (isThrottled.current = false), 600);
      } else if (e.deltaY < 0 && activeCard > 1) {
        setActiveCard((prev) => prev - 1);
        isThrottled.current = true;
        setTimeout(() => (isThrottled.current = false), 600);
      }
    };

    // Inside your component
const router = useRouter();

const handleApplyClick = () => {
  router.push('/LoanForm');
};
  
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
  
      container.addEventListener("wheel", handleWheel);
      return () => container.removeEventListener("wheel", handleWheel);
    }, [activeCard]);
  return (
    <>
    <div className={styles.container}>
      {/* Navigation Header */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image
             src={logo}
              alt="Logo"
              width={45}
              height={45}
            //   className="object-contain"
                            />
            </div>
          </div>

             {/* हंबरगर बटन */}
          <div className={styles.navRightHumberger}>
            {/* हंबरगर आयकॉन */}
            {/* <button onClick={toggleMenu} className={styles.hamburgerBtn}>
              &#9776; 
            </button> */}
            <button onClick={toggleMenu} className={styles.hamburgerBtn}>
  {isOpen ? <FaTimes /> : <FaBars />}
</button>
          </div>
          

          {isOpen && ( 
            <div className={styles.humberView}>
              <a href="#" className={styles.navLinkHumberger}>Home</a>
              <a href="#" className={styles.navLinkHumberger}>Loans</a>
              <a href="#" className={styles.navLinkHumberger}>About</a>
            </div>
          )}

          {/* Navigation Links */}
          <div className={styles.navRight}>
          <div className={styles.navLinks}>
            
            <div className={styles.navAncor}><a href="#" className={styles.navLink}>Home</a></div>
            <div className={styles.navAncor}><a href="#" className={styles.navLink}>Loans</a></div>
            <div className={styles.navAncor}><a href="#" className={styles.navLink}>About</a></div>
          </div>
          </div>
          {/* Login Button */}
          <button className={styles.loginBtn}>Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          {/* Left Content */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Smart Credit for Ambitious Indians
            </h1>
            <p className={styles.heroSubtitle}>
              Loans up to ₹10Lacs. Low interest and zero paperwork. 
              Disbursal in 24 hours.
            </p>
            <button className={styles.applyBtn} onClick={handleApplyClick}>
  Apply Now
</button>
          </div>

          {/* Right Image */}
          <div className={styles.heroImageContainer}>
            <Image
              src="/girls2.png"
              alt="Happy woman with hands up"
              width={500}
              height={600}
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section > {/* className={styles.featuresSection}*/}
       <div className={styles.loanFeaturesSection}>
            {/* feature 1st */}
      <div className={styles.featureBox}> 
         {/* empty box */} 
        {/* <div className={styles.emptybox}> */}
          <div className={styles.emptychild1}></div>
         {/* </div>  */}   
      <div className={styles.featureBox1}>
        <FaMoneyBillWave className={styles.icon} />
        <h3>Quick as a Click</h3>
        <p>
          Loan approvals so fast, you'll barely blink -<br />
          money in your account within 24-hours.
        </p>
      </div>
      </div>  
     {/* feature 2nd */}
     <div className={styles.featureBox}>
      {/* empty box */} 
        {/* <div className={styles.emptybox}> */}
          <div className={styles.emptychild2}></div>
         {/* </div>  */} 
      <div className={styles.featureBox2}>
        <FaChartLine className={styles.icon} />
        <h3>Loan that Breathe Easy</h3>
        <p>
          No heavy EMIs, no hidden drama.Just clear terms 
          and repayments that work for you..
        </p>
      </div>
     </div> 
      {/* feature 3rd */}
      <div className={styles.featureBox}>
      {/* empty box */} 
        {/* <div className={styles.emptybox}> */}
          <div className={styles.emptychild3}></div>
         {/* </div>  */} 
      <div className={styles.featureBox3}>
         {/* empty box */} 
        <div className={styles.emptybox}>
          <div className={styles.emptychild1}></div>
         </div> 
        <FaHandHoldingUsd className={styles.icon} />
        <h3>Indian Trusts Us</h3>
        <p>
          From tier-1 cities to towns,<br />
          Rysa supports every borrower.
        </p>
      </div>
      </div>
    </div>
      </section>
    </div>
    {/* middle page */}
    <div className={styles.mainDiv}>
      <div className={styles.stickyContainer} ref={containerRef}>
        {/* First Card */}
        <div className={`${styles.Card} ${activeCard === 1 ? styles.show : ""}`}>
          <div className={styles.firstPart}>
            <div className={styles.circle}></div>
            <div className={styles.textBox}>
              <h2 className={styles.htag}>No Tension Loans</h2>
              <p className={styles.ptag}>
                Rysa works with India’s top lenders — NBFCs and Banks — to remove the stress from your loan.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <Image
                src="/medium-shot-smiley-man-posing.jpg"
                alt="No Tension Loans"
                width={600}
                height={700}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className={`${styles.Card} ${activeCard === 2 ? styles.show : ""}`}>
          <div className={styles.secondPart}>
            <div className={styles.imageContainer}>
              <Image
                src="/woman-teaching-classroom.jpg"
                alt="Low Interest"
                width={900}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
            <div className={styles.textBox}>
              <h3 className={styles.htag}>Low Interest, <br /> Flexible Repayment</h3>
              <p className={styles.ptag}>
                Rates from just 13% pa. Repay in 3–60 months. Simple, fair, and fast.
              </p>
            </div>
            <div className={styles.circleLine}></div>
          </div>
        </div>

        {/* Third Card */}
        <div className={`${styles.Card} ${activeCard === 3 ? styles.show : ""}`}>
          <div className={styles.thirdPart}>
            <div className={styles.circle}></div>
            <div className={styles.textBox}>
              <h3 className={styles.htag}>Your Financial Companion</h3>
              <p className={styles.ptag}>
                Grow your credit profile, get higher limits, and unlock better offers over time.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <Image
                src="/successful-businessman.jpg"
                alt="Easy Use"
                width={900}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Fourth Card */}
        <div className={`${styles.Card} ${activeCard === 4 ? styles.show : ""}`}>
          <div className={styles.fourthPart}>
            <div className={styles.imageContainer}>
              <Image
                src="/happy-businesswoman-talking-phone-writing.jpg"
                alt="Future with LSP"
                width={900}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
            <div className={styles.textBox}>
              <h3 className={styles.htag}>Built for Everyday People.</h3>
              <p className={styles.ptag}>
                You don’t need a perfect score. Rysa helps real people build real credit
              </p>
            </div>
            <div className={styles.circleLine}></div>
          </div>
        </div>
      </div>
    </div>
    {/* footer page*/}
    <main className={styles.footerMain}>
      <div className={styles.footerHeroSection}>
        <h1 className={styles.footerHeroText}>
          Fueling the Dreams
          <br /> of Working India
        </h1>
      </div>
      
      {/* ✅ STATS SECTION with U-SHAPE */}
      <section className={styles.footerStatsSection}>
        <div className={styles.footerStatsText}>
          <h2 className="text-4xl font-bold text-black mt-12">Trusted by Thousands</h2>
          <p className="text-md text-gray-600 mt-5 mb-8">Join the Rysa family today</p>
        </div>

        <div className={styles.footerstatsItems}>
          <div>
            <p className={styles.footerstatsNumber}>50,000+</p>
            <p className={styles.footerstatsLabel}>Happy Customers</p>
          </div>
          <div>
            <p className={styles.footerstatsNumber}>₹100 Cr+</p>
            <p className={styles.footerstatsLabel}>Loans Disbursed</p>
          </div>
          <div>
            <p className={styles.footerstatsNumber}>24 Hours</p>
            <p className={styles.footerstatsLabel}>Quick Approval</p>
          </div>
        </div>
      </section>

      {/* White Box Section */}
      <div className="w-full h-[200px] bg-[#ecf4ff]"></div>
{/* footer part start */}
       <footer className={styles.footer}>
      <div className={styles.footerMainContainer}>
        {/* 🔵 Column 1: Logo + About */}
        <div className={styles.footerlogoAndText}>
          <div className={styles.footerLogo}>
            <Image
              src="/logo.png" 
              alt="Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <p className={styles.footeraboutText}>Rysa is a lending service platform (LSP) that makes borrowing easy, transparent, and  human.  
Backed by trusted NBFCs and banks.</p>
        </div>
        
        {/* 🟣 Column 2: Cities */}
        <div className={styles.footerCityLinks}>
          <p className={styles.footercityText}>Personal Loan in Jaipur</p>
          <p className={styles.footercityText}>Personal Loan in Lucknow</p>
          <p className={styles.footercityText}>Personal Loan in Kanpur</p>
          <p className={styles.footercityText}>Personal Loan in Nagpur</p>
        </div>
        {/* 🟢 Column 3: Loan Types */}
        <div className={styles.footerLoanLinks}>
          <p className={styles.footerloanText}>Instant Cash Loan</p>
          <p className={styles.footerloanText}>Personal Loan</p>
        </div>
       </div>
        {/* 🟡 Column 4: Quick Links */}
        <div className={styles.footerNavLink}>
          <p className={styles.footernavPtag}>Quick Links</p>
          <ul className={styles.footernavUrl}>
            <li className={styles.footernavItem}>About</li>
            <li className={styles.footernavItem}>Careers</li>
            <li className={styles.footernavItem}>SBlog</li>
            <li className={styles.footernavItem}>FAQs</li>
          </ul>
        </div>


      {/* ✅ Social Icons */}
      
        {/* <div className={styles.footersocialIcons}>
      <a href="#" className={styles.iconInstagram}>
        <i className="fab fa-instagram"></i>
      </a>
      <a href="#" className={styles.iconFacebook}>
        <i className="fab fa-facebook"></i>
      </a>
      <a href="#" className={styles.iconLinkedin}>
        <i className="fab fa-linkedin"></i>
      </a>
    </div> */}
    <div className={styles.footersocialIcons}>
          <a href="#" className="hover:text-pink-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-blue-300">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
    </footer>
    </main>
    </>
  );
}
{/* <div className={styles.socialIcons}>
          <a href="#" className="hover:text-pink-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-blue-300">
            <i className="fab fa-linkedin"></i>
          </a>
        </div> */}