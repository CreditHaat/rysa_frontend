'use client'
import React from 'react'
import { Roboto } from 'next/font/google';
import PrivacyAndPolicy from '../../component/Rysa/PrivacyAndPolicyPage';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});
function page() { 
  return (
    <div className={roboto.className}>
      <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
  
      <PrivacyAndPolicy />
      
    </div>
  )
}
export default page
