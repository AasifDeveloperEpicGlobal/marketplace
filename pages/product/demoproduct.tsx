import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Footer from "components/Footer/footer";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import TopHeader from "pages/topheader";
import toast from "react-hot-toast";
import Slider from "react-slick";
import delay from "utils/delay";
import dummy from "utils/dummy";
import styles from "styles/Merchant/newproductpage.module.scss";
import {
  useCustomerQuery,
  useGetMerchantDetails,
  usePublicProduct,
  usePublishedProduct,
  useSendEmail,
} from "networkAPI/queries";
import { useInterval } from "usehooks-ts";

const NewProductPage: NextPage = () => {
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

  const [merchant_Id, setMerchant_Id] = useState<string>("");
  const [product_Id, setProduct_Id] = useState<string>("");
  const [buyer_Email, setBuyer_Email] = useState<string>("");
  const [buyer_Mob, setBuyer_Mob] = useState<string>("");
  const [buyer_Message, setBuyer_Message] = useState<any>("");
  const [type, setType] = useState<string>("");
  const { data, status } = usePublishedProduct();
  // const form = useRef<HTMLFormElement>(null)
  const [isActiveTab, setIsActiveTab] = useState(false);
  const { data: MerchantDetails } = useGetMerchantDetails();
  const { data: emailData, mutate: mutateEmail } = useSendEmail();

  const currentProduct = data?.data.find(
    (d: any) => d?._id === router?.query?.id
  );

  const Agent_Mob_No = currentProduct?.mobile_no as string;

  const [ProductImage, setProductImage] = useState(
    currentProduct?.product_image1[0]
  );

  const onImageSelect = (source: string | undefined) => {
    setProductImage(source);
  };

  const {
    data: buyerQueryData,
    error: err,
    status: status2,
    mutate,
  } = useCustomerQuery();

  const merchant_query = currentProduct?.auther_Id as string;
  const product_query = currentProduct?._id as string;
  const product_name_query = currentProduct?.product_name as string;

  const currentMerchantDetails = MerchantDetails?.data?.user?.find(
    (merchant: any) => merchant._id == currentProduct?.auther_Id
  );
  const merchant_Email = currentMerchantDetails?.email;

  // useEffect(() => {
  //   const currentMerchantDetails = MerchantDetails?.data?.user?.filter(
  //     (merchant: any) => merchant._id == currentProduct?.auther_Id
  //   );
  // }, []);t

  const formRef = React.useRef<HTMLFormElement>(null);
  const emailType = "Email Query";
  const callType = "Calling Query";

  const handleBuyerQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    await axios.get(
      // `http://www.apiconnecto.com/UniProUser/Click-2-Call-API.aspx?UserId=DIGIVOICE&pwd=pwd2020&AgentNum=${Agent_Mob_No}&CustomerNum=${buyer_Mob}&CampId=15823`
      `https://callapi.hrmsomra.com/UniProUser/Click-2-Call-API.aspx?UserId=DIGIVOICE&pwd=pwd2020&AgentNum=${Agent_Mob_No}&CustomerNum=${buyer_Mob}&CampId=15823`
    );
  };

  // useInterval(() => modelCloser(), 10000);

  const handleEmailQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      merchant_Id: merchant_query,
      product_Id: product_query,
      product_name: product_name_query,
      buyer_Message,
      buyer_Email,
      buyer_Mob,
      type: emailType,
    });
    mutateEmail({
      merchant_Id: merchant_query,
      merchantEmail: merchant_Email,
      buyer_Message,
      buyer_Email,
      buyer_Mob,
    });

    await delay(1000);
  };

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
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data?.message || err.message);
    }

    if (buyerQueryData) {
      toast.success("Your Query has been successfully submitted");
    }
  }, [err, buyerQueryData, router]);

  const random = (800 + Math.random() * (900 - 800)) as number;
  const randomNumber = Math.floor(random);

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
          <div>
            <div className={styles.flex_box}>
              <div className={styles.flex_box1}>
                <div className={styles.flex_box3}>
                  <Image
                    src={
                      ProductImage || currentProduct?.product_image1[0] || "/"
                    }
                    height={400}
                    width={600}
                    alt="productr image"
                    className={styles.imageResize}
                  />
                </div>
                <div className={styles.smallimage}>
                  {currentProduct?.product_image1[0]?.length > 0 && (
                    <Image
                      src={currentProduct?.product_image1[0] || "/"}
                      height={80}
                      width={100}
                      alt="productr image"
                      className={styles.productimagesrc1}
                      onClick={() =>
                        onImageSelect(currentProduct?.product_image1[0])
                      }
                    />
                  )}
                  {currentProduct?.product_image2[0]?.length > 0 && (
                    <Image
                      src={currentProduct?.product_image2[0] || "/"}
                      height={100}
                      width={100}
                      alt="productr image"
                      className={styles.productimagesrc1}
                      onClick={() =>
                        onImageSelect(currentProduct?.product_image1[0])
                      }
                    />
                  )}
                  {currentProduct?.product_image3[0]?.length > 0 && (
                    <Image
                      src={currentProduct?.product_image3[0] || "/"}
                      height={100}
                      width={100}
                      alt="productr image"
                      className={styles.productimagesrc1}
                      onClick={() =>
                        onImageSelect(currentProduct?.product_image2[0])
                      }
                    />
                  )}
                  {currentProduct?.product_image4[0]?.length > 0 && (
                    <Image
                      src={currentProduct?.product_image3[0] || "/"}
                      height={100}
                      width={100}
                      alt="productr image"
                      className={styles.productimagesrc1}
                      onClick={() =>
                        onImageSelect(currentProduct?.product_image3[0])
                      }
                    />
                  )}
                  {currentProduct?.product_image5[0]?.length > 0 && (
                    <Image
                      src={currentProduct?.product_image4[0] || "/"}
                      height={100}
                      width={100}
                      alt="productr image"
                      className={styles.productimagesrc1}
                      onClick={() =>
                        onImageSelect(currentProduct?.product_image4[0])
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
                        ref={formRef}
                        onSubmit={handleEmailQuery}
                      >
                        <ul>
                          <li>
                            <textarea
                              className={styles.TextareaSection}
                              rows={3}
                              cols={70}
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
                                onChange={(e) => setBuyer_Email(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              {" "}
                              <input
                                type="tel"
                                className={styles.Input}
                                placeholder="Phone number "
                                onChange={(e) => setBuyer_Mob(e.target.value)}
                                required
                              />
                            </div>
                          </li>
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
                              cols={70}
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
                                onChange={(e) => setBuyer_Email(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <input
                                type="tel"
                                className={styles.Input}
                                placeholder="Phone number "
                                onChange={(e) => setBuyer_Mob(e.target.value)}
                                required
                              />
                            </div>
                          </li>
                          <li className={styles.checkboxstyle}></li>

                          <li>
                            <button type="submit" className="submit_button_box">
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
                <h1>
                  Business Name:{" "}
                  <span className={styles.span_box}>
                    {currentProduct?.SubTypeOf_bussiness}
                  </span>{" "}
                </h1>
                <h3>{currentProduct?.Merchant_Address}</h3>
                <h1>{currentProduct?.product_name}</h1>

                {currentProduct?.brand && (
                  <h3>Brand:{currentProduct?.brand} </h3>
                )}

                {/* <div className={styles.grey_box}>
                  <div className={styles.lionFlex}>
                    <div>
                      <Image
                        src={"/omratrade/star.svg"}
                        height={20}
                        width={20}
                        alt="india"
                      />{" "}
                    </div>{" "}
                    <div className={styles.iconText}>Genuine Products</div>{" "}
                  </div>
                  <div className={styles.lionFlex}>
                    <div>
                      {" "}
                      <Image
                        src={"/omratrade/lion.png"}
                        height={20}
                        width={20}
                        alt=" india"
                      />
                    </div>{" "}
                    <div className={styles.iconText}>
                      {`Made In ${
                        currentProduct?.made_in
                          ? currentProduct?.made_in
                          : "India"
                      }`}
                    </div>
                  </div>
                  <div className={styles.lionFlex}>
                    <div>
                      <Image
                        src={"/omratrade/trust.png"}
                        height={20}
                        width={20}
                        alt="india"
                      />{" "}
                    </div>{" "}
                    <div className={styles.iconText}>Trusted Verified</div>{" "}
                  </div>
                </div> */}
                {/* <div className={styles.grey_box}>
                  <div className={styles.lionFlex}>
                    <div>
                      <Image
                        src={"/omratrade/arroww.png"}
                        height={20}
                        width={35}
                        alt="india"
                      />{" "}
                    </div>{" "}
                    <div className={styles.iconText}>
                      {randomNumber}+ people enquired this recently
                    </div>{" "}
                  </div>
                </div> */}
                <div className={styles.table_box}>
                  <hr />
                  <h2 className={styles.spanbox4}>Product Specifications</h2>
                  {/* 
                  {currentProduct?.category && (
                    <div className={styles.div_box}>
                      <div>Category</div>
                      <div>{currentProduct?.category}</div>
                    </div>
                  )}

                  {currentProduct?.brand && (
                    <div className={styles.div_box}>
                      <div>Brand</div>
                      <div>{currentProduct?.brand}</div>
                    </div>
                  )}
                  {currentProduct?.capacity && (
                    <div className={styles.div_box}>
                      <div>Capacity</div>
                      <div>{currentProduct?.capacity}</div>
                    </div>
                  )}
                  {currentProduct?.model_no && (
                    <div className={styles.div_box}>
                      <div>Model No:</div>
                      <div>{currentProduct?.model_no}</div>
                    </div>
                  )}
                  {currentProduct?.product_Specification && (
                    <div className={styles.div_box}>
                      <div>Specification</div>
                      <div>{currentProduct?.product_Specification}</div>
                    </div>
                  )}

                  {currentProduct?.additionalSpecification[1] && (
                    <div className={styles.div_box}>
                      <div>
                        {currentProduct?.additionalSpecification[1].atribute}
                      </div>
                      <div>
                        {currentProduct?.additionalSpecification[1].Values}
                      </div>
                    </div>
                  )}
                  {currentProduct?.additionalSpecification[0] && (
                    <div className={styles.div_box}>
                      <div>
                        {currentProduct?.additionalSpecification[0].atribute}
                      </div>
                      <div>
                        {currentProduct?.additionalSpecification[0].Values}
                      </div>
                    </div>
                  )} */}

                  {/* <table className={styles.newtable}>
                    <tbody>
                      <tr>
                        <td>
                          <div>Brand</div>
                          <div>Elaundry</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Model</div>
                          <div>Elaundry</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Capacity</div>
                          <div>0.8 tons</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Model</div>
                          <div>WA7958HJDCFDCFD</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Dimensions</div>
                          <div>56.8x67x77 cm</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Wash Capacity </div>
                          <div>7kg</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Brand</div>
                          <div>Elaundry</div>
                        </td>
                      </tr>
                    </tbody>
                  </table> */}
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
                <span className={styles.botton5}>
                  <div>
                    <input type="reset" style={{ display: "none" }} />
                    <a
                      className={styles.ButtonSection1}
                      onClick={() => modelOpener("CONNECT")}
                    >
                      Call to Connect
                    </a>
                  </div>
                  <div>
                    <a
                      className={styles.ButtonSection2}
                      onClick={() => modelOpener("INQUIRY")}
                    >
                      For Enquiry
                    </a>
                  </div>
                </span>
              </div>

              {/* Right section ends */}
            </div>
          </div>
          <div className={styles.company_info}>
            <div className={styles.companyFlexBox}>
              <div>
                <h1 className={styles.span_box3}>Company Information:</h1>
                <p>
                  {currentMerchantDetails?.description}
                  {/* <h3>{currentProduct?.SubTypeOf_bussiness}</h3>
              <h3>{currentProduct?.TypesOf_Bussiness}</h3>
              <h3>{currentProduct?.Merchant_Designation}</h3>
              <h3>{currentProduct?.Merchant_Address}</h3>
              <h3>{currentProduct?.Year_of_establishment}</h3>
              <a href="#"> See More Sellers</a> */}
                  {/* Tinopal powder is a non-toxic, non-hazardous powder made from
                  tin and borax. It is an excellent powder for use in schools,
                  nurseries, and day care centers. Tinopal powder is odorless,
                  tasteless, and nontoxic. Tinopal powder is a detergent
                  whitener, not a bluing agent, that is used in making paper
                  bright. It is a fine white powder with a low molecular weight.
                  The powder is typically made of aluminum, calcium, and
                  titanium. Tinopal powder is typically used in water or alcohol
                  solutions and has a shelf life of 2-3 years.Tinopal powder is
                  a non-toxic, non-hazardous powder made from tin and borax. It
                  is an excellent powder for use in schools, nurseries, and day
                  care centers. */}
                </p>
                <div className={styles.newicongrid}>
                  <div className={styles.newIcon}>
                    <div>
                      <Image
                        src={"/omratrade/gst33.png"}
                        height={40}
                        width={40}
                        alt="india"
                      />
                    </div>{" "}
                    <div className={styles.smallFlex}>
                      <div>
                        {" "}
                        <h5>GST NO. </h5>{" "}
                      </div>
                      <div>
                        {" "}
                        <p>{currentMerchantDetails?.GST_No} </p>{" "}
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
                        {" "}
                        <p>
                          {currentMerchantDetails?.Year_of_establishment}
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                  {/* <div className={styles.newIcon}>
                    <div>
                      <Image
                        src={"/omratrade/emp.png"}
                        height={40}
                        width={40}
                        alt="india"
                      />
                    </div>{" "}
                    <div className={styles.smallFlex}>
                      <div>
                        {" "}
                        <h5>COUNTRY NAME</h5>
                      </div>{" "}
                      <div>
                        {" "}
                        <p>India</p>
                      </div>
                    </div>
                  </div>{" "} */}
                  {/* <div className={styles.newIcon}>
                    <div>
                      <Image
                        src={"/omratrade/emp.png"}
                        height={40}
                        width={40}
                        alt="india"
                      />
                    </div>{" "}
                    <div className={styles.smallFlex}>
                      <div>
                        {" "}
                        <h5>EMPLOYEE COUNT</h5>
                      </div>{" "}
                      <div>
                        {" "}
                        <p>30</p>
                      </div>
                    </div>
                  </div>{" "} */}
                  <div className={styles.newIcon}>
                    <div>
                      <Image
                        src={"/omratrade/emp.png"}
                        height={40}
                        width={40}
                        alt="india"
                      />
                    </div>{" "}
                    <div className={styles.smallFlex}>
                      <div>
                        {" "}
                        <h5>EMPLOYEE COUNT</h5>
                      </div>{" "}
                      <div>
                        {" "}
                        <p>30</p>
                      </div>
                    </div>
                  </div>{" "}
                  <div className={styles.newIcon}>
                    <div>
                      <Image
                        src={"/omratrade/WORKINGDAYS.png"}
                        height={40}
                        width={40}
                        alt="india"
                      />
                    </div>{" "}
                    <div className={styles.smallFlex}>
                      <div>
                        <h5>WORKING DAYS</h5>{" "}
                      </div>{" "}
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
                          cols={70}
                          placeholder="Please include product name, order quantity, usage, special requests if any in your inquiry."
                          onChange={(e) => setBuyer_Message(e.target.value)}
                        />
                      </li>

                      <li>
                        <div>
                          {" "}
                          <p>Email ID *</p>
                          <input
                            type="email"
                            className={styles.Input}
                            placeholder="Email ID "
                            onChange={(e) => setBuyer_Email(e.target.value)}
                            required
                          />
                        </div>
                      </li>
                      <li>
                        {" "}
                        <div>
                          <p>Phone number *</p>
                          <input
                            type="tel"
                            className={styles.Input}
                            placeholder="Phone number "
                            onChange={(e) => setBuyer_Mob(e.target.value)}
                            required
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
                        <button type="submit" className={styles.sendButton}>
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
                  {" "}
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
        {/* Similar Product Slider Starts  */}
        <div className={` ${styles.background_section} buttondesign`}>
          <h1 className={styles.similarBox}>
            {" "}
            OTHER PRODUCT WITH SIMILAR MERCHANTS
          </h1>

          <div className={styles.flex_container}>
            <Slider {...settings}>
              {data?.data?.map((item: any, index: any) => {
                if (item.auther_Id === router.query.merchant) {
                  return (
                    <div
                      className={styles.cardproduct}
                      key={index}
                      onClick={() =>
                        router.push(
                          `/product?id=${item._id}&category=${item.category}&merchant=${item.auther_Id}`
                        )
                      }
                    >
                      <div className={styles.productimg}>
                        <Image
                          src={item.product_image1[0] || dummy}
                          height={250}
                          width={300}
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
                }
              })}
            </Slider>
          </div>
        </div>

        {/* Similar Product Slider Starts  */}

        <div className={` ${styles.background_section} buttondesign`}>
          <h1 className={styles.similarBox}>
            SIMILAR PRODUCT WITH OTHER MERCHANTS
          </h1>
          <div className={styles.flex_container}>
            <Slider {...settings}>
              {data?.data.map((item: any, index: any) => {
                if (item.category === router.query.category) {
                  return (
                    <div
                      className={styles.cardproduct}
                      key={index}
                      onClick={() =>
                        router.push(
                          `/product?id=${item._id}&category=${item.category}&merchant=${item.auther_Id}`
                        )
                      }
                    >
                      <div className={styles.productimg}>
                        <Image
                          src={
                            item.product_image1[0]
                              ? item.product_image1[0]
                              : "/"
                          }
                          height={250}
                          width={300}
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
                }
              })}
            </Slider>
          </div>
        </div>

        <div className={` ${styles.background_section} buttondesign`}>
          <h1 className={styles.similarBox}>
            SIMILAR PRODUCT WITH OTHER MERCHANTS
          </h1>

          <div className={`${styles.flex_container} slider_container`}>
            <Slider {...settings}>
              {data?.data
                ?.filter(
                  (relatedP: any) =>
                    relatedP.sub_category == currentProduct?.sub_category &&
                    relatedP.auther_Id != currentProduct?.auther_Id
                )
                .map((item: any, index: any) => {
                  return (
                    <div className={styles.cardproduct} key={index}>
                      <div className={styles.productimg}>
                        <Image
                          src={
                            item.product_image1[0]
                              ? item.product_image1[0]
                              : "/"
                          }
                          height={250}
                          width={300}
                          alt="productr image"
                          className={styles.productimagesrc}
                          onClick={() =>
                            router.push(
                              `/product?id=${item._id}&category=${item.category}&merchant=${item.auther_Id}`
                            )
                          }
                        />
                      </div>

                      <div className={styles.productcontent}>
                        <h4>Product Name:</h4>
                        <p>{item.product_name}</p>
                      </div>

                      <div className={styles.productcartbtn}>
                        <button
                          type="submit"
                          onClick={() =>
                            router.push(
                              `/product?id=${item._id}&category=${item.category}&merchant=${item.auther_Id}`
                            )
                          }
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>

        {/* Similar Product Slider Ends  */}
      </div>

      <Footer />
    </div>
  );
};

export default NewProductPage;
