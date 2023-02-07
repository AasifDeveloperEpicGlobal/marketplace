import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import TopHeader from "pages/topheader";
import toast from "react-hot-toast";
import Slider from "react-slick";
import delay from "utils/delay";
import dummy from "utils/dummy";
import styles from "styles/Merchant/newproductpage.module.scss";
import {
  useCallingApi,
  useCustomerQuery,
  useGetCategory,
  useGetMerchantDetails,
  useGetProductBy_id,
  useGetProductsByCategory,
  useGetSubCategory,
  useMerchantByID,
  useProductsByCategory,
  usePublishedProduct,
  useSendEmail,
  useSendSms,
} from "networkAPI/queries";
import ArrowLocation from "components/svg-icons/location";
import Crown from "components/svg-icons/crown";
import NewFooter from "pages/newwfooter";
import Time from "components/svg-icons/time";
import Shield from "components/svg-icons/shield";
import Manufacture from "components/svg-icons/manufacture";
import Profile from "components/svg-icons/profile";
import SubCategoryCard from "components/Cards/subcategoryCard";
import TestCardItem from "components/Cards/TestCardItem";
import { dehydrate, QueryClient } from "react-query";
import { decode } from "punycode";

const NewProductPage: NextPage = (props) => {
  const [popupState, setPopupState] = useState("");
  // CONNECT
  // ENQUIRY
  // INQUIRY

  const modelOpener = (modelName: "CONNECT" | "CALLING" | "INQUIRY" | "") => {
    if (modelName === "CALLING") {
      delay(500).then(() => setPopupState("CALLING"));

      setTimeout(() => setPopupState(""), 20 * 1000);
    } else {
      setPopupState(modelName);
    }
  };

  const modelCloser = () => {
    setPopupState("");
  };
  const router = useRouter();
  const [companyAge, setCompanyAge] = useState<any>();
  const [merchant_Id, setMerchant_Id] = useState<string>("");
  const [product_Id, setProduct_Id] = useState<string>("");
  const [merchant, setMerChant] = useState<any>([]);

  const [buyer_Email, setBuyer_Email] = useState<string>("");
  const [buyer_Mob, setBuyer_Mob] = useState<string>("");
  const [buyer_Message, setBuyer_Message] = useState<any>("");
  const [datamobile, setDatamobile] = useState({
    mobile: "",
    mobile1: "",
    mobile2: "",
  });

  const [type, setType] = useState<string>("");

  const queryData = router.query.id as string;
  const { data } = useGetProductBy_id(queryData);

  // const form = useRef<HTMLFormElement>(null)
  const [categoryQuery, setCategoryQuery] = useState<string>("");
  const query = router.query.category as string;

  const [isActiveTab, setIsActiveTab] = useState(false);
  const { data: recommendCategory } = useGetCategory();
  const { data: sub_categoryData } = useGetSubCategory();
  const { data: MerchantDetails } = useGetMerchantDetails();
  const { data: emailData, mutate: mutateEmail } = useSendEmail();
  const { data: MerchanttData, refetch } = useMerchantByID(merchant_Id);
  const { data: relatedData, refetch: refetchRelated } =
    useGetProductsByCategory(categoryQuery);
  const currentMerchant = MerchanttData?.data?.find((item: any) => item);
  const { mutate: smsMutate, isSuccess: isSuccess2 } = useSendSms();
  const { mutate: callingMutate, isSuccess: isCallSuccess } = useCallingApi();

  console.log(currentMerchant);
  console.log(merchant);
  console.log(currentMerchant?.isEmail);

  //@ts-ignore
  const currentProduct = data;

  const Agent_Mob_No = currentProduct?.mobile_no as string;

  const [defaultImage, setDefaultImage] = useState<any>("");

  const [ProductImage, setProductImage] = useState("");

  const onImageSelect = (source: string | undefined) => {
    setProductImage(source || defaultImage);
  };

  const {
    data: buyerQueryData,
    error: err,
    status: status2,
    mutate,
  } = useCustomerQuery();

  const merchant_query = currentProduct?.auther_Id as string;
  const product_query = currentProduct?._id as string;
  const currentCategory = currentProduct?.category as string;
  const product_name_query = currentProduct?.product_name as string;

  const currentMerchantDetails = MerchantDetails?.data?.user?.find(
    (merchant: any) => merchant._id == currentProduct?.auther_Id
  );
  const merchant_Email = currentMerchantDetails?.email;
  const merchnat_Mobile = currentMerchantDetails?.mobile_no;
  const merchant_Name = currentMerchantDetails?.company_Name;
  const formRef = React.useRef<HTMLFormElement>(null);
  const formRef1 = React.useRef<HTMLFormElement>(null);
  const emailType = "Email Query";
  const callType = "Calling Query";

  const handleBuyerQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("hggdgdgd", Agent_Mob_No, buyer_Mob, datamobile?.mobile);
    e.preventDefault();
    emailValidation();

    mutate({
      merchant_Id: merchant_query,
      product_Id: product_query,
      product_name: product_name_query,
      buyer_Message,
      buyer_Email,
      buyer_Mob,
      type: callType,
    });

    modelOpener("CALLING");
    formRef.current?.reset();

    const number2 = 7017342584;
    const number3 = 8210374580;
    callingMutate({
      Agent_Mob_No,
      buyer_Mob,
    });
  };

  // useInterval(() => modelCloser(), 10000);
  const handleEmailQuery = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      emailValidation();
      mutate({
        merchant_Id: merchant_query,
        product_Id: product_query,
        product_name: product_name_query,
        buyer_Message,
        buyer_Email,
        buyer_Mob,

        type: emailType,
      });
      mutateEmail(
        {
          merchantId: merchant_query,
          merchantEmail: merchant_Email,
          description: buyer_Message,
          email: buyer_Email,
          phoneNumber: buyer_Mob,
        },
        {
          onSuccess: () => {
            //@ts-ignore
            smsMutate({
              mobileno: merchnat_Mobile,

              vendors_name: merchant_Name,
              type: "leads",
            });
          },
        }
      );

      await delay(1000);
    },
    [
      buyer_Email,
      buyer_Message,
      buyer_Mob,
      merchant_Email,
      merchant_Name,
      merchant_query,
      merchnat_Mobile,
      mutate,
      mutateEmail,
      product_name_query,
      product_query,
      smsMutate,
    ]
  );
  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 500,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [userMobileNumber, setuserMobileNumber] = useState();

  const onChangeNumber = (e: any) => {
    setuserMobileNumber(e.target.value);
  };
  useEffect(() => {
    // productRefetch()
    setMerChant(MerchanttData);
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data?.message || err.message);
    }

    if (buyerQueryData) {
      toast.success("Your Query has been successfully submitted");

      if (emailData?.data?.success) {
        // formRef1.current?.reset()
        setPopupState("");
      }
    }
  }, [err, buyerQueryData, router, emailData, data]);

  useEffect(() => {
    setDefaultImage(currentProduct?.product_image1[0]);
    setMerchant_Id(currentProduct?.auther_Id);
    setBuyer_Mob(datamobile?.mobile);
  }, [currentProduct, datamobile]);

  const random = (800 + Math.random() * (900 - 800)) as number;
  const randomNumber = Math.floor(random);

  const cureentYear = new Date().getFullYear();
  useEffect(() => {
    refetch();
    setCategoryQuery(currentProduct?.category);
    setCompanyAge(cureentYear - currentMerchantDetails?.Year_of_establishment);
  }, [cureentYear, currentMerchantDetails, currentProduct, query, refetch]);

  //Email validation starts
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailValidation = () => {
    const regEx = /^([a-zA-Z0-9\.-_]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (!regEx.test(buyer_Email) && buyer_Email !== "") {
      setMessage("Email is not Valid");
    } else {
      setMessage("");
    }
  };
  const handleOnChange = (e: any) => {
    setBuyer_Email(e.target.value);
  };
  //Email validation ends

  //Mobile validation starts

  console.log(datamobile?.mobile);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "mobile" && value.length <= 10) {
      setDatamobile({ ...datamobile, [name]: value });
    } else if (name !== "mobile") {
      // setDatamobile({ ...datamobile, [name]: value });
      // setBuyer_Mob(datamobile?.mobile);
    }
  };

  const onChange1 = (e: any) => {
    const { name, value } = e.target;

    if (name === "mobile1" && value.length <= 10) {
      setDatamobile({ ...datamobile, [name]: value });
      setBuyer_Mob(datamobile?.mobile1);
    } else if (name !== "mobile1") {
      setDatamobile({ ...datamobile, [name]: value });
      setBuyer_Mob(datamobile?.mobile1);
    }
  };
  const onChange2 = (e: any) => {
    const { name, value } = e.target;

    if (name === "mobile2" && value.length <= 10) {
      setDatamobile({ ...datamobile, [name]: value });
      setBuyer_Mob(datamobile?.mobile2);
    } else if (name !== "mobile2") {
      setDatamobile({ ...datamobile, [name]: value });
      setBuyer_Mob(datamobile?.mobile2);
    }
  };

  //mobile validation ends

  return (
    <div className={styles.container_width}>
      <div>
        <TopHeader />
        <div className={styles.container_width}>
          <div>
            <p className={styles.paraBox3}>
              <span onClick={() => router.push(`/`)}>Home</span> {`>`}{" "}
              {currentProduct?.category}
            </p>
          </div>

          <div className={styles.productFlex}>
            <div className={styles.flex_box}>
              <div className={styles.flex_box1}>
                <div className={styles.flex_box3}>
                  <Image
                    src={
                      ProductImage || currentProduct?.product_image1[0] || "/"
                    }
                    height={400}
                    width={480}
                    alt="productr image"
                    className={styles.imageResize}
                    lazy-loading={"1"}
                    priority={true}
                  />
                </div>
                <div className={styles.smallimage}>
                  {currentProduct?.product_image1[0]?.length > 0 && (
                    <Image
                      src={currentProduct?.product_image1[0] || "/"}
                      height={60}
                      width={80}
                      alt="productr image"
                      priority={true}
                      className={styles.productimagesrc1}
                      onClick={() =>
                        onImageSelect(currentProduct?.product_image1[0])
                      }
                    />
                  )}
                  {currentProduct?.product_image2[0]?.length > 0 && (
                    <Image
                      src={currentProduct?.product_image2[0] || "/"}
                      height={60}
                      width={80}
                      priority={true}
                      alt="productr image"
                      className={styles.productimagesrc1}
                      onClick={() =>
                        onImageSelect(currentProduct?.product_image2[0])
                      }
                    />
                  )}
                  {currentProduct?.product_image3[0]?.length > 0 && (
                    <Image
                      src={currentProduct?.product_image3[0] || "/"}
                      height={60}
                      width={80}
                      alt="productr image"
                      className={styles.productimagesrc1}
                      onClick={() =>
                        onImageSelect(currentProduct?.product_image3[0])
                      }
                    />
                  )}
                  {currentProduct?.product_image4[0]?.length > 0 && (
                    <Image
                      src={currentProduct?.product_image4[0] || "/"}
                      height={60}
                      width={80}
                      priority={true}
                      alt="productr image"
                      className={styles.productimagesrc1}
                      onClick={() =>
                        onImageSelect(currentProduct?.product_image4[0])
                      }
                    />
                  )}
                  {currentProduct?.product_image5[0]?.length > 0 && (
                    <Image
                      src={currentProduct?.product_image5[0] || "/"}
                      height={60}
                      width={80}
                      priority={true}
                      alt="productr image"
                      className={styles.productimagesrc1}
                      onClick={() =>
                        onImageSelect(currentProduct?.product_image5[0])
                      }
                    />
                  )}
                </div>
              </div>

              {/* POPUP 1 */}
              {popupState === "INQUIRY" ? (
                <div className={styles.overlay}>
                  <div className={styles.popup}>
                    <a className={styles.close} onClick={modelCloser}>
                      &times;
                    </a>
                    <div className={styles.content1}>
                      <p className={styles.Font}>
                        Tell us about your requirement
                      </p>

                      <form
                        className={styles.FormWidth}
                        ref={formRef1}
                        onSubmit={handleEmailQuery}
                      >
                        <ul>
                          <li>
                            <textarea
                              className={styles.TextareaSection}
                              rows={3}
                              cols={80}
                              placeholder="Please include product name, order quantity, usage, special requests if any in your inquiry."
                              onChange={(e) => setBuyer_Message(e.target.value)}
                            />
                          </li>

                          <li className={styles.ModalSection}>
                            <div>
                              <input
                                type="email"
                                className={styles.Input}
                                placeholder="Email ID "
                                value={buyer_Email}
                                onChange={handleOnChange}
                                required
                              />
                            </div>

                            <div>
                              <input
                                type="number"
                                className={styles.Input}
                                name="mobile"
                                placeholder="Phone number "
                                value={datamobile.mobile}
                                // onChange={(e) => setBuyer_Mob(e.target.value)}
                                onChange={(e: any) => onChange(e)}
                                required
                              />
                            </div>
                          </li>

                          <div className={styles.emailmessage}>{message}</div>

                          <li className={styles.checkboxstyle}>
                            <div>
                              <input type="checkbox" className={styles.check} />
                            </div>

                            <div>
                              <span className={styles.SpanClass}>
                                I agree to{" "}
                                <a className={styles.TermsColor}>
                                  terms and conditions
                                </a>
                              </span>
                            </div>
                          </li>

                          <li>
                            <button type="submit" className="submit_button_box">
                              <a>SEND INQUIRY</a>
                            </button>
                          </li>
                        </ul>

                        <div className="buttonmodel"></div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* POPUP 2 */}
              {popupState === "CONNECT" ? (
                <div className={styles.overlay}>
                  <div className={styles.popup2}>
                    <a className={styles.close} onClick={modelCloser}>
                      &times;
                    </a>
                    <div className={styles.content1}>
                      <p className={styles.Font}> I want to buy </p>

                      <form
                        className={styles.FormWidth}
                        ref={formRef}
                        onSubmit={handleBuyerQuery}
                      >
                        <ul>
                          <li>
                            <textarea
                              className={styles.TextareaSection}
                              rows={3}
                              cols={80}
                              placeholder="Please include product name, order quantity, usage, special requests if any in your inquiry."
                              onChange={(e) => setBuyer_Message(e.target.value)}
                            />
                          </li>

                          <li className={styles.ModalSection}>
                            <div>
                              <input
                                type="email"
                                className={styles.Input}
                                placeholder="Email ID "
                                value={buyer_Email}
                                onChange={handleOnChange}
                                required
                              />
                            </div>
                            <div>
                              <input
                                type="number"
                                className={styles.Input}
                                placeholder="Phone number "
                                // onChange={(e) => setBuyer_Mob(e.target.value)}
                                required
                                name="mobile"
                                onChange={(e: any) => onChange(e)}
                                value={datamobile.mobile}
                              />
                            </div>
                          </li>
                          <div className={styles.emailmessage}>{message}</div>
                          {/* <li className={styles.checkboxstyle}></li> */}

                          <li>
                            <button
                              type="submit"
                              className="submit_button_box"
                              // onClick={}
                            >
                              <a className="">CALL NOW</a>
                            </button>
                          </li>
                        </ul>

                        <div className="buttonmodel"></div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}

              {/** Calling Tab */}
              {popupState === "CALLING" ? (
                <div className={styles.overlay}>
                  <div className={styles.popup2}>
                    <a className={styles.close} onClick={modelCloser}>
                      &times;
                    </a>
                    <div className={styles.callingTab}>
                      <div className={styles.blink_me2}>
                        <Image
                          src={"/callinglogo/callinglogo.jpg"}
                          height={100}
                          width={100}
                          priority={true}
                          alt="india"
                          className={styles.image2}
                        />
                      </div>
                      <h1 className={styles.blink_me}>calling ...</h1>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Right section starts */}
              <div className={styles.flex_box2}>
                <h1>{currentProduct?.product_name}</h1>
                {currentProduct?.brand && (
                  <h3>
                    Brand:
                    <span style={{ color: "red" }}>
                      {currentProduct?.brand}
                    </span>{" "}
                  </h3>
                )}
                <div>
                  <p className={styles.instockBox}>In Stock</p>
                </div>
                <div className={styles.table_box}>
                  <hr />
                  <h2 className={styles.spanbox4}>Product Specifications</h2>

                  <table className={styles.Table_Width1}>
                    <tbody>
                      {currentProduct?.additionalSpecification.map(
                        (item: any, index: any) => {
                          return (
                            <tr key={index}>
                              <td>{item.atribute} </td>
                              <td>{item.Values}</td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
                <div className={styles.seemorestyles}>
                  <a href="#C1">View more</a>
                </div>
                <div className={styles.upDiv13}>
                  <div>
                    <p>Category: {currentProduct?.category}</p>
                  </div>
                </div>
                <span className={styles.botton5}>
                  {currentMerchant?.isCall ? (
                    <div>
                      <input type="reset" style={{ display: "none" }} />
                      <a
                        className={styles.ButtonSection1}
                        onClick={() => modelOpener("CONNECT")}
                      >
                        Call to Connect
                      </a>
                    </div>
                  ) : null}

                  {currentMerchant?.isEmail ? (
                    <div>
                      <a
                        className={styles.ButtonSection2}
                        onClick={() => modelOpener("INQUIRY")}
                      >
                        For Enquiry
                      </a>
                    </div>
                  ) : null}
                </span>
              </div>

              {/* Right section ends */}
            </div>
            <div className={styles.flex_box33}>
              <div className={styles.upDiv}>
                {currentMerchant?.isCall ? (
                  <div className={styles.upDiv1}>
                    <div>
                      <p>
                        For product pricing, customization, or other inquiries:
                      </p>
                    </div>
                    <div>
                      <input type="reset" style={{ display: "none" }} />
                      <a
                        className={styles.getQuote}
                        onClick={() => modelOpener("CONNECT")}
                      >
                        Contact Supplier
                      </a>
                    </div>
                  </div>
                ) : null}

                <div className={styles.upDiv11}>
                  <div className={styles.proDiv1}>
                    <div>
                      <h2> {currentProduct?.SubTypeOf_bussiness}</h2>
                    </div>
                    <div>
                      <h5 style={{ fontSize: "12px" }}>{companyAge} years</h5>
                    </div>
                    <div>
                      <div className={styles.rightPart}>
                        <div>
                          <ArrowLocation />
                        </div>
                        <div>
                          <p>
                            <span className={styles.gstButton}> Address:</span>{" "}
                            {currentProduct?.Merchant_Address}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.rightPart}>
                      <div>
                        <Time />
                      </div>
                      <div>
                        <h5 className={styles.responseDiv}>
                          <span className={styles.gstButton}>
                            Response Time:
                          </span>
                          Within 24h
                        </h5>
                      </div>
                    </div>
                    <div>
                      <div className={styles.rightPart}>
                        <div>
                          <Crown />
                        </div>
                        <div>
                          <h6>
                            <span className={styles.gstButton}>GST:</span>
                            {currentProduct?.Vendor_Id}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.upDiv2}>
                  <div className={styles.rightsection33}>
                    <div className={styles.arrowlocation}>
                      <div>
                        <Manufacture />
                      </div>
                      <div>
                        <p>Leading Supplier</p>
                      </div>
                    </div>
                    <div className={styles.arrowlocation}>
                      <div>
                        <Shield />
                      </div>
                      <div>
                        <p>Trusted Verified</p>
                      </div>
                    </div>
                    <div className={styles.arrowlocation}>
                      <div>
                        <Profile />
                      </div>
                      <div>
                        <p>Manufacturer</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <Image
                        data-lazyloaded="1"
                        src="/omratrade/el.png"
                        priority={true}
                        height={60}
                        width={90}
                        alt="Logo Image"
                        className={styles.imageLogo}
                        onClick={() => router.push(`/`)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.company_info}>
            <div className={styles.companyFlexBox}>
              <div>
                <h1 className={styles.span_box3}>Company Information:</h1>
                <p>{currentMerchant?.description}</p>
                <div className={styles.newicongrid}>
                  <div className={styles.newIcon}>
                    <div>
                      <Image
                        src={"/omratrade/gst33.png"}
                        height={40}
                        width={40}
                        alt="india"
                        priority={true}
                      />
                    </div>{" "}
                    <div className={styles.smallFlex}>
                      <div>
                        {" "}
                        <h5>GST NO. </h5>{" "}
                      </div>
                      <div>
                        {" "}
                        <p>{currentMerchant?.GST_No} </p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className={styles.newIcon}>
                    <div>
                      <Image
                        src={"/omratrade/establisment.png"}
                        height={40}
                        width={40}
                        alt="india"
                      />
                    </div>
                    <div className={styles.smallFlex}>
                      <div>
                        <h5>ESTABLISHMENT </h5>{" "}
                      </div>
                      <div>
                        <p>{currentMerchant?.Year_of_establishment}</p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className={styles.newIcon}>
                    <div>
                      <Image
                        src={"/omratrade/emp.png"}
                        height={40}
                        width={40}
                        priority={true}
                        alt="india"
                      />
                    </div>
                    <div className={styles.smallFlex}>
                      <div>
                        <h5>EMPLOYEE COUNT</h5>
                      </div>
                      <div>
                        <p>30</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.newIcon}>
                    <div>
                      <Image
                        src={"/omratrade/WORKINGDAYS.png"}
                        height={40}
                        width={40}
                        alt="india"
                      />
                    </div>
                    <div className={styles.smallFlex}>
                      <div>
                        <h5>WORKING DAYS</h5>
                      </div>
                      <div>
                        <p>Monday To Sunday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
              <div className={styles.formBox3}>
              <div className={styles.leadForm}>
                  <h1 className={styles.span_box3}>Send Enquiry to Supplier</h1>

                  <form
                    className={styles.FormWidth1}
                    ref={formRef}
                    onSubmit={handleEmailQuery}
                  >
                    <ul>
                      <li>
                        <p>Describe in few words *</p>
                        <textarea
                          className={styles.TextareaSection}
                          rows={3}
                          cols={80}
                          placeholder="Please include product name, order quantity, usage, special requests if any in your inquiry."
                          onChange={(e) => setBuyer_Message(e.target.value)}
                        />
                      </li>

                      <li>
                        <div>
                          <p>Email ID *</p>
                          <input
                            type="email"
                            className={styles.Input}
                            value={buyer_Email}
                            placeholder="Email ID "
                            onChange={handleOnChange}
                            required
                          />
                        </div>
                      </li>
                      <div className={styles.emailmessage}>{message}</div>
                      <li>
                        <div>
                          <p>Phone number *</p>
                          <input
                            type="number"
                            name="mobile"
                            className={styles.Input}
                            placeholder="Phone number "
                            // value={buyer_Mob}
                            // onChange={(e) => setBuyer_Mob(e.target.value)}
                            required
                            onChange={(e: any) => onChange(e)}
                            value={datamobile.mobile}
                          />
                        </div>
                      </li>

                      <li className={styles.checkboxstyle1}>
                        <div>
                          <input type="checkbox" className={styles.check} />
                        </div>

                        <div>
                          <span className={styles.SpanClass}>
                            I agree to{" "}
                            <a className={styles.TermsColor}>
                              terms and conditions
                            </a>
                          </span>
                        </div>
                      </li>

                      <li>
                        <button
                          type="submit"
                          className={styles.sendButton}
                          onClick={emailValidation}
                        >
                          <a>SEND INQUIRY</a>
                        </button>
                      </li>
                    </ul>

                    <div className="buttonmodel"></div>
                  </form>
                </div> 
               
              </div>
             
            </div>
          </div>
          <div className={styles.company_table}>
            <div className={styles.tableflex_box}>
              <div className={styles.displaytable1}>
                <h1 id="C1">
                  <span className={styles.span_box1}>
                    <h1>Product Specifications</h1>
                  </span>
                </h1>
                <table className={styles.Table_Width}>
                  <tbody>
                    {currentProduct?.additionalSpecification.map(
                      (item: any, index: any) => {
                        return (
                          <tr key={index}>
                            <td>{item.atribute} </td>
                            <td>{item.Values}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
              <div className={styles.displaytable2}>
                <h1 className={styles.span_box2}>Product Description</h1>

                <p>{currentProduct?.product_description}</p>
              </div>
            </div>
          </div>
        </div>

        {/*** Recommended Product */}
        <div className={` ${styles.background_section} buttondesign`}>
          <h1 className={styles.similarBox}> Related Products</h1>

          <div className={styles.flex_container}>
            <Slider {...settings}>
              {
                //@ts-ignore
                relatedData?.data?.map((item: any, index: any) => {
                  return (
                    <div
                      className={styles.cardproduct}
                      key={index}
                      onClick={() =>
                        router.push(
                          `/product?id=${item._id}&category=${encodeURI(
                            item.category
                          )}&merchant=${item.auther_Id}`
                        )
                      }
                    >
                      <div className={styles.productimg}>
                        <Image
                          src={item.product_image1[0] || dummy}
                          height={250}
                          width={300}
                          priority={true}
                          alt="productr image"
                          className={styles.productimagesrc}
                        />
                      </div>

                      <div className={styles.productcontent}>
                        <h4>Product Name:</h4>
                        <p>{item.product_name}</p>
                      </div>

                      <div className={styles.productcartbtn}>
                        <button type="submit">View More</button>
                      </div>
                    </div>
                  );
                })
              }
            </Slider>
          </div>
        </div>

        <div className={` ${styles.background_section} buttondesign`}>
          <h1 className={styles.similarBox}>Recommended Category</h1>
          <TestCardItem
            title=""
            data={sub_categoryData}
            count={sub_categoryData?.data?.length}
          />

          <div className={`${styles.flex_container} slider_container`}>
            {recommendCategory?.data?.map((item: any) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <SubCategoryCard
                  title={item.sub_category_name}
                  data={item}
                  count={0}
                />
              );
            })}
          </div>
        </div>

        {/* Similar Product Slider Ends  */}
      </div>

      <NewFooter />
    </div>
  );
};

export default NewProductPage;

// export const getStaticProps: GetStaticProps = async (context) => {
//   const id = context.params?.id as string;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["getsingleSroduct", id],
//     () => useGetProductBy_id(id)
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     }
//   };
// };

export const getServerSideProps = async (context: any) => {
  // const access_token = parseCookies({ req: context.req });

  const id = context.query.id as string;

  const queryClient = new QueryClient();
  //   await queryClient.prefetchQuery(["getsingleproduct", id],
  //   () =>  useGetProductBy_id(id)
  // );

  await queryClient.prefetchQuery(
    ["getsingleproduct", id],
    async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/get_product/${id}`,
        {
          // headers: {
          //   //@ts-ignore
          //   authorization: `bearer ${access_token.access_token}`,
          // },
        }
      ).then((response) => response.json())
  );
  //JSON.parse(JSON.stringify(dehydrate(queryClient)))

  // Pass data to the page via props
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
