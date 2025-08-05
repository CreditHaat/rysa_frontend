"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import useWebSocketONDC from "../../Rysa/ONDC/Websocket/useWebSocketONDC";
import { useContext } from 'react';
import UIDContext from "../context/UIDContext";
import clock from "./images/clock.png";
import Image from "next/image";
// import "./ondclist.css";
import { onSearchForm } from "./formSubmitApis/FormSubmitApi";
import OnSearchContext from "./context/OnSearchContext";
import useWebSocketONDCSelect from "./Websocket/useWebSocketONDCSelect";
import SelectedLenderContext from "./context/SelectedLenderContext";
import { useRouter } from 'next/navigation';
// import LoadingPage from "./LoadingPage";
import LendersLoader from "./LoadingPages/LendersLoader";
import styles from "./styleondclist.module.css";
// import { Roboto } from 'next/font/google';
// import "../NewBlFirstPage.module.css";
import "./NewBlFirstPage.module.css"
import per from '../../../../public/Group_10.png'
import { Roboto } from 'next/font/google';
import { useSearchParams } from 'next/navigation';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const Ondclist = () => {

    const searchParams = useSearchParams();
    const mno = searchParams.get("mobilenumber");
    // const [mno1, setMno1] = useState(mno);
    const [mobileNumber, setMobileNumber] = useState(mno);//we will be changing this afterwards

    useEffect(() => {
        console.log("The mobile number before if is : ", mobileNumber);
        if (mobileNumber === null) {
            return;
        }
        console.log("mno is : ", mobileNumber);
    }, [mobileNumber])

    const slides = [
        { title: 'Simple Loans,Big<br> Smiles!', subtitle: 'Get money when you need it,<br>stress‑free.', img: '/s12.png' },
        { title: 'Festive Loan,<br> Bonanza!', subtitle: 'Exclusive benefits for limited period.', img: '/s171.png' },
        { title: 'Easy Loans, Happy<br> Moments!', subtitle: 'Quick money,zero worries.', img: '/s11.png' },
    ];

    const [currentSlide, setSlide] = useState(0);
    const [currentStep, setStep] = useState(1);

    useEffect(() => {
        const id = setInterval(() => setSlide(i => (i + 1) % slides.length), 3500);
        return () => clearInterval(id);
    }, []);

    // const [mobileNumber, setMobileNumber] = useState("8329223729");//we will be changing this afterwards

    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const { uid, setUId, isWebsocketConnectionEstablished, setIsWebsocketConnectionEstablished } = useContext(UIDContext);
    const { formSubmissionData, setFormSubmissionData, payloadForSelect, setPayloadForSelect } = useContext(OnSearchContext);
    const { SelectedLenderData, setSelectedLenderData } = useContext(SelectedLenderContext);

    const [lenders, setLenders] = useState([]);
    // Track if search has been called to prevent multiple calls
    const [hasSearched, setHasSearched] = useState(false);
    const searchTimeoutRef = useRef(null);
    const lendersRef = useRef([]);
    const [receivedCallbacks, setReceivedCallbacks] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const searchCalledRef = useRef(false); // <-- Add this line
    const [gotAllCallbacks, setGotAllCallbacks] = useState(false);
    // const submissionIdOfForm = useRef([]);
    const [confirmLenders, setConfirmLenders] = useState([]);
    const [onSelectResponses, setOnSelectResponses] = useState([]);
    var onSelectResponsesTemp;


    useEffect(() => {
        console.log("confirm lenders updated and they are :: ", confirmLenders);
    }, [confirmLenders])

    // Update ref whenever lenders state changes
    useEffect(() => {
        lendersRef.current = lenders;
    }, [lenders]);

    useEffect(() => {
        const handleLenders = async () => {
            if (gotAllCallbacks && lenders) {
                // alert("We got all the callbacks");

                for (const lender of lenders) {
                    if (!lender.error && (lender.context?.version === "2.0.1" || lender.context?.version === "2.0.0")) {
                        const transactionId = lender.context.transaction_id;
                        const bppId = lender.context.bpp_id;
                        const bppUri = lender.context.bpp_uri;
                        const providerId = lender.message.catalog.providers?.[0]?.id;
                        const itemId = lender.message.catalog.providers?.[0]?.items?.[0]?.id;
                        const formId = lender.message.catalog.providers?.[0]?.items?.[0]?.xinput?.form?.id;
                        const submissionId = null;
                        const status = "SUCCESS";

                        //creating a version variable to check and manage form according to version i.e. 2.0.0 or 2.0.1
                        const version = lender.context?.version;

                        const response = await onSearchForm(
                            lender.message.catalog.providers?.[0]?.items?.[0]?.xinput?.form?.url.replace("/get/", "/post/"),
                            setFormSubmissionData,
                            formSubmissionData,
                            setPayloadForSelect,
                            {
                                transactionId,
                                bppId,
                                bppUri,
                                providerId,
                                itemId,
                                formId,
                                submissionId,
                                status,
                            },
                            version


                        );
                        console.log("The response we are getting from the select2api is :: ", response);
                        // if (response?.status === 200 && response.data.gateway_response.message.ack === "ACK") {
                        //   console.log("Still correct transactionId:", transactionId);
                        //   setConfirmLenders(prev => [...prev, lender]);
                        // }
                        if (response !== undefined && response !== null && response.status === 200) {
                            if (response.data.gateway_response.message.ack.status === "ACK") {
                                console.log("Still correct transactionId:", transactionId);
                                setConfirmLenders(prev => [...prev, lender]);
                                //here we store the lenders whose ack will be ACK into a confirmLendesr ref variable and then we will display that variable to the user screen then when user will click on any of the lender then we will show him a loan amount adjustment screen annd when he will adjust and submit loan amount then we'll be taking that particular lenders form from the response and hit that loan adjustment amount to select loan amount form
                                // showConfirmLenders(true);
                            }
                        } else {
                            //logic loading ...

                        }
                    }
                }
            }
        };

        handleLenders();
    }, [gotAllCallbacks]);



    // Improved WebSocket message handler
    const handleWebSocketMessage = useCallback((data) => {
        console.log('Received from WebSocket:', data);

        try {
            const parsedData = JSON.parse(data.content);
            // onSearchForm("https://pramaan.ondc.org/beta/staging/mock/seller/form/post/7f960a02-9856-43c6-a59b-99f55f627815");
            // if(!parsedData.error){
            //     console.log("Before calling the onSearch api");
            //     onSearchForm(parsedData.message.catalog.providers[0].items[0].xinput.form.url);
            // }else{console.log("We got error in our parsedData");}
            // Use functional update to ensure we have the latest state
            setLenders((prevLenders) => {
                const newLenders = [parsedData, ...prevLenders];
                console.log(`Total lenders after callback: ${newLenders.length}`);
                return newLenders;
            });

            // Update callback counter
            setReceivedCallbacks(prev => prev + 1);

        } catch (error) {
            console.error("Error parsing content:", error);
            // You might want to still add invalid data for debugging
            setLenders((prevLenders) => [{
                error: "Invalid JSON",
                rawData: data.content,
                timestamp: new Date().toISOString()
            }, ...prevLenders]);
        }
    }, []);

    // useEffect(()=>{
    //     console.log("In useEffect of onsearchform");
    //     onSearchForm("https://pramaan.ondc.org/beta/staging/mock/seller/form/post/7f960a02-9856-43c6-a59b-99f55f627815");
    //     console.log("After useEffect of onsearchform");
    // },[])

    // Use the WebSocket hook with the improved handler
    useWebSocketONDC(handleWebSocketMessage);

    // Fixed getContent function
    const getContent = useCallback(() => {
        const bankNames = lenders.map(item => {
            try {
                // Fixed: should be JSON.parse, not json.parse
                // Also, the item might already be parsed
                if (typeof item === 'string') {
                    return JSON.parse(item);
                }
                return item;
            } catch (error) {
                console.error("Error parsing content:", error);
                return "Invalid JSON";
            }
        });
        return bankNames;
    }, [lenders]);

    // Improved search function with better error handling
    const search = useCallback(async () => {
        // Prevent multiple calls using ref
        if (searchCalledRef.current || isSearching) {
            console.log("Search already called or in progress, skipping...");
            return;
        }

        if (uid === null || uid === undefined) {
            console.log("UID is not available, skipping search");
            return;
        }

        searchCalledRef.current = true; // Mark as called
        setIsSearching(true);
        setHasSearched(true);
        setReceivedCallbacks(0); // Reset callback counter

        try {
            console.log("Starting search with UID:", uid);

            //here uid refers to the transactionId of the api

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}search`,
                {
                    transactionId: uid,
                    mobileNumber: mobileNumber,
                    stage: 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json' // ✅ Proper header
                    }
                }
            );


            console.log("Search response:", response);

            if (response.status === 200) {
                console.log("Search API call successful");

                if (response.data.gateway_response?.message?.ack?.status === "ACK") {
                    console.log("Search acknowledged, waiting for callbacks...");

                    //here we will set the formSubmissionData which we git from restSearch api
                    // setFormSubmissionData({
                    //     firstName: "Tejas",
                    //     lastName: "Deshmukh",
                    //     dob: "1995-07-01", // format: yyyy-mm-dd
                    //     gender: "male", // must match option value
                    //     pan: "ABCDE1234F",
                    //     contactNumber: "8010489800",
                    //     email: "deshmukht100@gmail.com",
                    //     officialemail: "deshmukht@company.com",
                    //     employmentType: "salaried",
                    //     endUse: "consumerDurablePurchase",
                    //     income: "100000",
                    //     companyName: "Credithaat",
                    //     udyamNumber: "UDYAM-ABC123",
                    //     addressL1: "123 Main Street",
                    //     addressL2: "Floor 2, Apt 5B",
                    //     city: "Pune",
                    //     state: "Maharashtra",
                    //     pincode: "411001",
                    //     aa_id: "8010489800@finvu",
                    //     bureauConsent: "on"
                    // })

                    // Set data dynamically from response
                    const formData = response.data.ONDCFormData;

                    console.log("The formData is : ", formData);

                    // alert("tejas");

                    if (formData) {
                        setFormSubmissionData(formData);
                    } else {
                        console.warn("No form data returned from backend.");
                    }

                    // setPayloadForSelect(prev=>({
                    //     ...prev,
                    //     transactionId: response.data.transaction_id,
                    // }))

                    // setPayloadForSelect(response.data)

                    // Set a timeout to check if we received all callbacks
                    if (searchTimeoutRef.current) {
                        clearTimeout(searchTimeoutRef.current);
                    }

                    searchTimeoutRef.current = setTimeout(() => {
                        console.log(`Search completed. Received ${receivedCallbacks} callbacks`);
                        setIsSearching(false);
                        setGotAllCallbacks(true);
                    }, 10000); // Wait 10 seconds for all callbacks

                } else {
                    console.log("Search not acknowledged:", response.data);
                    setIsSearching(false);
                }
            }
        } catch (error) {
            console.error("Search API error:", error);
            setIsSearching(false);
        }
    }, [uid]); // Only depend on uid

    // Effect to handle WebSocket connection and search - ONLY ONCE
    useEffect(() => {
        if (isWebsocketConnectionEstablished && !hasSearched && !searchCalledRef.current) {
            console.log("WebSocket connection established, starting search...");

            // Add a small delay to ensure WebSocket is fully ready
            setTimeout(() => {
                search();
            }, 1000);
        }
    }, [isWebsocketConnectionEstablished, hasSearched]); // Only depend on connection and hasSearched

    // Effect to monitor lenders updates
    useEffect(() => {
        if (lenders.length > 0) {
            console.log(`Total lenders received: ${lenders.length}`, lenders);
        }
    }, [lenders]);

    // Effect to monitor callback count
    useEffect(() => {
        console.log(`Callbacks received: ${receivedCallbacks}`);
    }, [receivedCallbacks]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    // Manual search trigger for debugging
    const manualSearch = () => {
        console.log("Manual search triggered - resetting search state");
        searchCalledRef.current = false; // Reset the ref
        setHasSearched(false); // Reset the state
        setIsSearching(false);
        search();
    };

    const handleGetLoanClick = (lender) => {
        //here we will set all the data of the particular lender into one object which we will be using for our whole journey
        console.log("get loan button clicked and onSelectResponses are : ", onSelectResponses);
        console.log("get loan button clicked and the lender is : ", lender);
        for (const onSelectResponse of onSelectResponses) {


            console.log("Entered for loop and onSelectResponse is : ", onSelectResponse);
            // 
            try {

                console.log("The lender.context.bpp_id : ", lender.context.bpp_id, " and onSelectResponse : ", onSelectResponse.context.bpp_id);


                if (lender.context.bpp_id=== "pramaan.ondc.org/beta/preprod/mock/seller") { //for lenders with aa
                    if (lender.context.bpp_id === onSelectResponse.context.bpp_id) {
                        if (onSelectResponse.message?.order?.items?.[0]?.xinput?.form_response?.status === "PENDING") {
                            console.log("tejas inside if");
                            // exit;
                        } else if (onSelectResponse.message?.order?.items[0]?.xinput?.form?.url) {
                            console.log("Inside the else if");
                            setSelectedLenderData(onSelectResponse);
                            // ✅ Navigate to the next page
                            router.push("/ondc/loanapproval");
                            // console.log("after router.push");
                        }
                    } else {
                        console.log("lender is : ", lender);
                        console.log("on select response is : ", onSelectResponse);
                    }
                } else {//for lenders without aa
                    if (lender.context.bpp_id === onSelectResponse.context.bpp_id) {
                        if (onSelectResponse.message?.order?.items[0]?.xinput?.form?.url) {
                            console.log("Inside the else if");
                            setSelectedLenderData(onSelectResponse);
                            // ✅ Navigate to the next page
                            router.push("/ondc/loanapproval");
                            // console.log("after router.push");
                        } else {
                            console.log("url not present in the form : ", onSelectResponse);
                        }
                    } else {
                        console.log("lender is : ", lender);
                        console.log("on select response is : ", onSelectResponse);
                    }
                }

            } catch (error) {
                console.log("error : ", error);
            }

        }

    }

    // Improved WebSocket message handler
    const handleWebSocketMessageForSelect = useCallback((data) => {
        console.log('Received from WebSocket:', data);

        try {
            const parsedData = JSON.parse(data.content);
            console.log("The callback that we got from the on_select is :: ", parsedData);

            // const secondOn_select=((prev)=>[...prev, parsedData]);
            setOnSelectResponses((prev) => [...prev, parsedData]);

            // setLenders((prevLenders) => {
            //     const newLenders = [parsedData, ...prevLenders];
            //     console.log(`Total lenders after callback: ${newLenders.length}`);
            //     return newLenders;
            // });

            // Update callback counter
            // setReceivedCallbacks(prev => prev + 1);

        } catch (error) {
            console.error("Error parsing on_select content:", error);
            // You might want to still add invalid data for debugging
            // setLenders((prevLenders) => [{
            //     error: "Invalid JSON",
            //     rawData: data.content,
            //     timestamp: new Date().toISOString()
            // }, ...prevLenders]);
        }
    }, []);

    useWebSocketONDCSelect(handleWebSocketMessageForSelect);

    useEffect(() => {
        if (onSelectResponses.length > 0) {
            console.log("The on select responses are : ", onSelectResponses);
            setLoading(false);
        }
    }, [onSelectResponses])

    useEffect(() => {
        // if (Object.keys(SelectedLenderData).length !== 0) {
        console.log("The selectedLenderData is : ", SelectedLenderData);
        //   }

    }, [SelectedLenderData])

    return (
        <>

            {!loading ? (<>

                <div className={styles.numberStart}>
                    <div className={styles.numberOneDiv}> {/*header*/}
                        <header className={styles.hero1}>
                            {/* <button className={styles.backBtn1} onClick={() => history.back()}>&lt; Back</button> */}
                            <div className={styles.heroText1}>
                                <h1 className={styles.title1} dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }} />
                                <p className={styles.subtitle1} dangerouslySetInnerHTML={{ __html: slides[currentSlide].subtitle }} />
                            </div>
                            <div className={styles.progressBar1}>
                                {slides.map((_, i) => (
                                    <span key={i} className={i === currentSlide ? styles.dotActive1 : styles.dot1} onClick={() => setSlide(i)} />
                                ))}
                            </div>
                            <div className={styles.imgWrap1}>
                                <Image src={slides[currentSlide].img} alt="Hero visual" fill priority style={{ objectFit: 'cover' }} />
                            </div>
                        </header>
                    </div>{/*header end*/}
                    <div className={styles.numberTwoDiv}>
                        <div className={`${roboto.className} ${styles.listpageContainer}`}>
                            {/* <div> */}
                            {/* <div>
                                    <p>WebSocket Connected: {isWebsocketConnectionEstablished ? 'Yes' : 'No'}</p>
                                    <p>Searching: {isSearching ? 'Yes' : 'No'}</p>
                                    <p>Has Searched: {hasSearched ? 'Yes' : 'No'}</p>
                                    <p>Callbacks Received: {receivedCallbacks}</p>
                                    <p>Total Lenders: {lenders.length}</p>
                                    <button onClick={manualSearch} disabled={isSearching}>
                                        {isSearching ? 'Searching...' : 'Manual Search'}
                                    </button>
                                </div> */}

                            {/* Display lenders data */}
                            {confirmLenders.length > 0 ? (
                                <>
                                    <div className={styles.allnewcardContainer}>

                                        {confirmLenders.map((lender, index) => (
                                            <div className={styles.newcardContainer} key={index}>

                                                {
                                                    !lender.error ? (<>
                                                        <div className="newcard-container">

                                                            {/* {!lender.error?(<> */}

                                                            <div className={styles.cardLogo}>
                                                                {/* <Image
                                                    src={lender?.message?.catalog?.providers?.[0]?.descriptor?.images?.[0]?.url || clock}
                                                    // src={clock}
                                                    alt="Logo"
                                                    width={100}
                                                    height={40}
                                                    className="logo-image"
                                                    style={{ width: "auto" }}
                                                    /> */}
                                                                <img
                                                                    src={lender?.message?.catalog?.providers?.[0]?.descriptor?.images?.[0]?.url}
                                                                    //   alt="Lender Logo"
                                                                    alt={lender.message.catalog.descriptor.name || "Lender Logo"}
                                                                    width={100}
                                                                    height={40}
                                                                    //   onError={(e) => { e.currentTarget.src = clock }}
                                                                    style={{ objectFit: "contain" }}
                                                                />
                                                                {" "}
                                                                {/* Display image here */}
                                                            </div>
                                                            {/* <div className="subcardheader">
                                                    <p className="card-subtitle">{lender.product}</p>
                                                    </div> */}
                                                            <div className={styles.cardBody}>
                                                                <h1 className={styles.amount}>INR {lender?.message?.catalog?.providers?.[0]?.items?.[0]?.tags?.[0]?.list?.[5]?.value || "N/A"}
                                                                </h1>
                                                                <p className={styles.maxAmount}>Max. Amount</p>
                                                            </div>
                                                            <div className={styles.cardInfo}>
                                                                <div className={styles.infoItem}>
                                                                    {/* <span role="img" aria-label="clock">⏱</span>{lender.description} */}
                                                                    <span role="img" aria-label="clock">
                                                                        <Image src={clock} width={15} height={15} alt="clock" />
                                                                    </span>
                                                                    {/* {lender.description} */<p>lender.description</p>}

                                                                </div>
                                                                <div className={styles.infoItem}>
                                                                    {/* <span role="img" aria-label="interest">💰</span>{lender.interest} */}
                                                                    {/* <span role="img" aria-label="interest"></span> */}
                                                                    <span role="img" aria-label="percentage">
                                                                        <Image src={per} alt='percentage image' width={15} height={15} />
                                                                    </span>
                                                                    {/* {lender.interest} */ <p>Interest 10%</p>}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {/* {console.log(
                                                        "In NewBLListPage lender cpi is :: ",
                                                        lender.cpi
                                                    )} */}
                                                                {/* {lender.cpi === 1 ? (
                                                        <>
                                                            <button
                                                                className="card-button"
                                                                onClick={() =>
                                                                    redirectLinkMethod(
                                                                        lender.product,
                                                                        lender.applicationlink,
                                                                        lender.product_id
                                                                    )
                                                                }
                                                            >
                                                                Get Loan
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            className="card-button"
                                                            onClick={(e) => getLoanBackendMethod(e, lender.product)}
                                                        >
                                                            Get Loan non CPI
                                                        </button>
                                                    )} */<button
                                                                        className={styles.cardButton}
                                                                        onClick={() => handleGetLoanClick(lender)}
                                                                    // onClick={() =>
                                                                    //     // redirectLinkMethod(
                                                                    //     //     lender.product,
                                                                    //     //     lender.applicationlink,
                                                                    //     //     lender.product_id
                                                                    //     // )
                                                                    // }
                                                                    >
                                                                        Get Loan
                                                                    </button>}
                                                            </div>
                                                            {/* </>):null} */}
                                                        </div>
                                                    </>) : null}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                // <div>Finding the lenders suitable for you...</div>
                                <div></div>
                            )}
                            {/* </div> */}
                        </div>
                    </div>{/*secondend*/}
                </div>{/*numberStart div*/}

            </>) :
                (<><LendersLoader /></>)}


        </>
    );
};

export default Ondclist;
