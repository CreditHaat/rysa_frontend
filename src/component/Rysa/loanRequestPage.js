
// loanRequestPage.js
"use client";
import { useState } from "react";
import React from "react";
import styles from "./loanRequestPage.module.css";
import LoanDetailsModal from "./LoanDetailsModal.js";

const loanData = [
  {
    name: "Personal Loan",
    date: "12 Jun 2024",
    amount: 50000,
    status: "Active",
  },
  {
    name: "Business Loan",
    date: "17 Jun 2023",
    amount: 50000,
    status: "Active",
  },
  {
    name: "Education Loan",
    date: "20 Jun 2022",
    amount: 50000,
    status: "Closed",
  },
];

// button code
const LoanRequestPage = () => {
  const [selectedLoan, setSelectedLoan] = useState(null); // ✅ make this active

  return (
    <div className={styles.container}>
      <div className={styles.topSection}></div>
      <div className={styles.header}>
        Open Loan Request (10)
        <span className={styles.dropdown}>▼</span>
      </div>

      <div className={styles.content}>
        {loanData.map((loan, index) => (
          <div className={styles.loanCard} key={index}>
            <div className={styles.cardHeader}>
              <div className={styles.headerItem}>
                <div className={styles.label}>Loan Name</div>
                <div className={styles.value}>{loan.name}</div>
              </div>
              <div className={styles.headerItem}>
                <div className={styles.label}>Date</div>
                <div className={styles.value}>{loan.date}</div>
              </div>
              <div
                className={`${styles.status} ${
                  loan.status === "Active"
                    ? styles.statusActive
                    : styles.statusClosed
                }`}
              >
                {loan.status}
              </div>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.amountSection}>
                <div className={styles.label}>Loan Amount</div>
                <div className={styles.amount}>
                  ₹ {loan.amount.toLocaleString()}
                </div>
              </div>

              {/* ✅ working view button */}
              <button
                className={styles.viewButton}
                onClick={() =>
                  setSelectedLoan({
                    ...loan,
                    interestRate: 8,
                    duration: "10 years",
                    emi: 7000,
                    startDate: "25 JAN 2024",
                    endDate: "25 JAN 2044",
                    totalAmount: 75000,
                    remainingAmount: 54000,
                  })
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ modal shows when loan is selected */}
      {selectedLoan && (
        <LoanDetailsModal
          loan={selectedLoan}
          onClose={() => setSelectedLoan(null)}
        />
      )}
    </div>
  );
};

export default LoanRequestPage;

// jfjfjfkl

//  loanRequestPage.js
// "use client";
// import { useState } from "react";

// import React from "react";
// import styles from "./loanRequestPage.module.css";
// import LoanDetailsModal from "./LoanDetailsModal";

// const loanData = [
//   {
//     name: "Personal Loan",
//     date: "12 Jun 2024",
//     amount: 50000,
//     status: "Active",
//   },
//   {
//     name: "Business Loan",
//     date: "17 Jun 2023",
//     amount: 50000,
//     status: "Active",
//   },
//   {
//     name: "Education Loan",
//     date: "20 Jun 2022",
//     amount: 50000,
//     status: "Closed",
//   },
// ];
// // button code
// const [selectedLoan, setSelectedLoan] = useState(null);

// export default function LoanRequestPage() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.topSection}></div>
//       <div className={styles.header}>
//         Open Loan Request (10)
//         <span className={styles.dropdown}>▼</span>
//       </div>

//       <div className={styles.content}>
//         {loanData.map((loan, index) => (
//           <div className={styles.loanCard} key={index}>
//             <div className={styles.cardHeader}>
//               <div className={styles.headerItem}>
//                 <div className={styles.label}>Loan Name</div>
//                 <div className={styles.value}>{loan.name}</div>
//               </div>
//               <div className={styles.headerItem}>
//                 <div className={styles.label}>Date</div>
//                 <div className={styles.value}>{loan.date}</div>
//               </div>
//               <div className={`${styles.status} ${
//                 loan.status === "Active" 
//                   ? styles.statusActive 
//                   : styles.statusClosed
//               }`}>
//                 {loan.status}
//               </div>
//             </div>

//             <div className={styles.cardBody}>
//               <div className={styles.amountSection}>
//                 <div className={styles.label}>Loan Amount</div>
//                 <div className={styles.amount}>₹ {loan.amount.toLocaleString()}</div>
//               </div>
//               <button className={styles.viewButton}>View Details</button>
//               <button
//   className={styles.viewButton}
//   onClick={() =>
//     setSelectedLoan({
//       ...loan,
//       interestRate: 8,
//       duration: "10 years",
//       emi: 7000,
//       startDate: "25 JAN 2024",
//       endDate: "25 JAN 2044",
//       totalAmount: 75000,
//       remainingAmount: 54000,
//     })
//   }
// >
//   View Details
// </button>
//             </div>
//           </div>
//         ))}
//       </div>
//        {selectedLoan && (
//         <LoanDetailsModal
//           loan={selectedLoan}
//           onClose={() => setSelectedLoan(null)}
//         />
//       )}
//     </div>
//   );
// }
// // jfjfjfkl