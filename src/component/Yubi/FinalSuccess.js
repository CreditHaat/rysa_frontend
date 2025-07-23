"use client";
import React from "react";
import "./FinalSuccess.css";
import Successimage from "./newplimages/FinalSuccess.png";
import Image from "next/image";
import styles from "./NewPlFirstPage.module.css";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const FinalSuccess = () => {
  const handleNext = () => {
    console.log("Next button clicked");
  };

  return (
    <>
      <div className={`${roboto.className} fpage-container`}>
        <div
          className="newfirstcard-container-fs"
          style={{ boxSizing: "content-box" }}
        >
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <h1
                className="fixed-header1"
                style={{ fontSize: "35px", marginTop: "40%" }}
              >
                Success
              </h1>
              <p>
                Great news! Your agreement has been successfully signed and
                processed. Thank you for your trust in our services.
              </p>
            </div>

            <div>
              <Image
                src={Successimage}
                alt="success img"
                className="img2"
                height={300}
                width={300}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FinalSuccess;
