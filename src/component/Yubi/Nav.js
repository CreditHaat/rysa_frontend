"use client";
import React from 'react';
import Image from "next/image";
import hdb from "../../components/Yubi/newplimages/HDB.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-wrapper">
          <Image
            src={hdb}
            alt="HDB Financial Services"
            className="logo-24"
            width={200}
            height={170}
            priority
          />
        </div>
      </div>
      
      <style jsx>{`
        .navbar {
          background: linear-gradient(to right, #8ca8e6, #ECDDFE, #FEE1A2);
          position: relative;
          overflow: hidden;
          min-height: 170px;
          width: 100%;
        }
        
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
        }
        
        .logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        
        .logo-24 {
          height: 170px;
          width: auto;
          object-fit: contain;
          max-width: 200px;
        }
        
        /* Large Desktop */
        @media (min-width: 1201px) {
          .navbar {
            min-height: 170px;
          }
          .logo-24 {
            height: 170px;
            max-width: 200px;
          }
        }
        
        /* Desktop */
        @media (max-width: 1200px) and (min-width: 1025px) {
          .navbar {
            min-height: 160px;
          }
          .logo-24 {
            height: 55px;
            max-width: 190px;
          }
        }
        
        /* Tablet Styles */
        @media (max-width: 1024px) and (min-width: 769px) {
          .navbar {
            min-height: 140px;
          }
          .navbar-container {
            padding: 0 15px;
          }
          .logo-24 {
            height: 50px;
            max-width: 180px;
          }
        }
        
        /* Mobile Styles */
        @media (max-width: 768px) and (min-width: 481px) {
          .navbar {
            min-height: 170px;
          }
          .navbar-container {
            padding: 0 15px;
          }
          .logo-24 {
            height: 45px;
            max-width: 160px;
          }
        }
        
        /* Small Mobile Styles */
        @media (max-width: 480px) and (min-width: 376px) {
          .navbar {
            min-height: 170px;
          }
          .navbar-container {
            padding: 0 10px;
          }
          .logo-24 {
            height: 40px;
            max-width: 140px;
          }
        }
        
        /* Extra Small Mobile */
        @media (max-width: 375px) and (min-width: 321px) {
          .navbar {
            min-height: 170px;
          }
          .navbar-container {
            padding: 0 10px;
          }
          .logo-24 {
            height: 35px;
            max-width: 120px;
          }
        }
        
        /* Very Small Mobile */
        @media (max-width: 320px) {
          .navbar {
            min-height: 170px;
          }
          .navbar-container {
            padding: 0 8px;
          }
          .logo-24 {
            height: 30px;
            max-width: 100px;
          }
        }
        
        /* Ensure consistent appearance across all devices */
        @media (max-width: 768px) {
          .navbar {
            background: linear-gradient(to right, #8ca8e6, #ECDDFE, #FEE1A2);
          }
          
          .logo-wrapper {
            min-height: 170px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;