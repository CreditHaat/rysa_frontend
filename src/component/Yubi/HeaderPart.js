"use client";
import React from "react";
import Image from "next/image";
import hdb from "../../component/Yubi/newplimages/HDB.png";

const HeaderPart = () => {
  return (
    <>
      <div className="headerPart">
        <div className="innerLogoPart">
          <Image
            src={hdb}
            alt="HDB tag"
            className="logoImagePart"
            style={{ marginTop: "-70px", width: "auto", height: "150px" }}
            width={200}
            height={170}
          />
        </div>
      </div>

      <style jsx>{`
        .headerPart {
          margin-top: -4px;
          width: 432px;
          height: 230px;
        }
        @media (max-width: 400px) {
          .headerPart {
            margin-top: -4px;
            width: 421px;
            height: 230px;
          }
        }

        .innerLogoPart {
          // background: linear-gradient(to right, #8ca8e6, #ecdffe, #fee1a2);
          background: linear-gradient(to right, #f3b2f5 50%, #a78afa);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          border-radius: 10px 10px 0px 0px;
        }

        .logoImagePart {
          width: auto;
          height: 150px;
        }
      `}</style>
    </>
  );
};

export default HeaderPart;
