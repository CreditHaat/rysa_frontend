'use client';
import Image from 'next/image';
import styles from './ReviewLoan.module.css';
import hdb from '../../../public/Jays/HDB.png';
export default function ReviewLoanPage() {
  const summary = {
    loanAmount: 50000,
    processingFees: 966.42,
    interestRate: 20,
    interestPayable: 6000,
    totalPayable: 56000,
    emi: 6000,
    emiTenure: 36,
    numInstallments: 9,
  };
  const contCharges={
  closureCharge: "3%",
  latePaymentCharge: "4%",
};
// const contCharges={
//   closureCharge: 3%,
//   latePaymentCharge: 4%,
// };
  const gro = {
    name: 'Kiran Deshmukh',
    designation: 'Software engineer',
    mobile: '9999999999',
    address: 'Kharadi pune maharashtra',
    email: 'Kiran@gmail.com',
  };

  const cur = n => `₹ ${n.toLocaleString()}`;

  return (
    <main className={styles.page}>
    {/* <div className={styles.mainCard}></div> */}
      {/*—‑ हेडर ‑—*/}
      {/* <header className={styles.header}>Review Loan Application</header> */}
      <div className={styles.header}>
         <div className={styles.headerLogo}>
                  <Image
                    src={hdb}
                    alt="Hdb tag"
                    style={{alignContent:"center",width:"auto",height:"auto", top:"-4"}}
                  />
                </div>
      </div>
      {/*—‑ कार्ड ‑—*/}
      <section className={styles.card}>
        {/* ========== Amount you get ========== */}
        <h3 className={styles.sectionTitle}>Amount you get</h3>
        <div className={styles.row}>
          <span>Loan Amount</span> <span className={styles.valueAm}>{cur(summary.loanAmount)}</span>
        </div>
        <div className={styles.row}>
          <span>Processing Fees</span>{' '}
          <span className={styles.valueAm}>{cur(summary.processingFees)}</span>
        </div>

        <hr className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.netLabel}>Net disbursed amount</span>{' '}
          <span className={styles.netValue}>
            {cur(summary.loanAmount - summary.processingFees)}
          </span>
        </div>

        {/* ========== Amount you pay ========== */}
        <h3 className={styles.sectionTitle}>Amount you pay</h3>
        <div className={styles.row}>
          <span>Loan Amount</span> <span className={styles.valueAm}>{cur(summary.loanAmount)}</span>
        </div>
        <div className={styles.row}>
          <span>
            Interest payable
            <br />
            (with interest rate {summary.interestRate}%)
          </span>
          <span className={styles.valueAm}>{cur(summary.interestPayable)}</span>
        </div>
        <div className={styles.row}>
          <span>Total amount payable</span>{' '}
          <span className={styles.valueAm}>{cur(summary.totalPayable)}</span>
        </div>
        <div className={styles.row}>
          <span>EMI Amount</span> <span className={styles.valueAm}>{cur(summary.emi)}</span>
        </div>
        <div className={styles.row}>
          <span>EMI Payable</span> <span className={styles.valueAm}>{cur(summary.emi)}</span>
        </div>
        <div className={styles.row}>
          <span>EMI Tenure</span> <span className={styles.valueAm}>{summary.emiTenure}</span>
        </div>
        <div className={styles.row}>
          <span>Number of installment</span>{' '}
          <span className={styles.valueAm}>{summary.numInstallments}</span>
        </div>

        <hr className={styles.divider} />

        {/* ========== Contigent charges ========== */}
        <h3 className={styles.sectionTitle}>Contigent charges</h3>
        <div className={styles.row}>
          <span>For closure charge</span> <span className={styles.valueAm}>{contCharges.closureCharge}</span>
        </div>
        <div className={styles.row}>
          <span>Late payment charge</span> <span className={styles.valueAm}>{contCharges.latePaymentCharge}</span>
        </div>

        <hr className={styles.divider} />

        {/* ========== GRO Details ========== */}
        <h3 className={styles.sectionTitle}>GRO Details</h3>

        <div className={styles.field}>
          <label>Name</label>
          <input
            readOnly
            value={gro.name}
            className={styles.readonlyInput}
          />
        </div>

        <div className={styles.field}>
          <label>Designation</label>
          <input
            readOnly
            value={gro.designation}
            className={styles.readonlyInput}
          />
        </div>

        <div className={styles.field}>
          <label>Mobile No.</label>
          <input
            readOnly
            value={gro.mobile}
            className={styles.readonlyInput}
          />
        </div>

        <div className={styles.field}>
          <label>Postal address</label>
          <input
            readOnly
            value={gro.address}
            className={styles.readonlyInput}
          />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input
            readOnly
            value={gro.email}
            className={styles.readonlyInput}
          />
        </div>
        <div className={styles.btnContainer}>
          <button type="button"
                    className={styles.nextBtn} >
              Next
            </button>
        </div>
      </section>
    </main>
  );
}
