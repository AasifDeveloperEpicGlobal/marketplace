import {
  useCallingApi,
  useCustomerQuery,
  useGetMerchantDetails,
  useProductsByCategory,
  usePublicProduct,
  usePublishedProduct,
  useSendEmail,
} from "networkAPI/queries";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/Merchant/gridsubcategory.module.scss";
import styles2 from "styles/Merchant/subcategory.module.scss";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import React from "react";
import toast from "react-hot-toast";
import delay from "utils/delay";
import { encode, decode } from "base-64";

interface Props {
  data: any;
  data2: any;
  data3: any;
}

const GridSubcategory = ({ data, data2, data3 }: Props) => {
  const [popupState, setPopupState] = useState("");

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

  const [merchant_Id, setMerchant_Id] = useState<string>("");
  const [product_Id, setProduct_Id] = useState<string>("");
  const [product_name, setProduct_name] = useState<string>("");
  const [agentMobileNo, setAgentMobileNo] = useState<string>("");
  const [currentMerchant, setCurrentMerchant] = useState<string>("");
  const [buyer_Email, setBuyer_Email] = useState<string>("");
  const [buyer_Mob, setBuyer_Mob] = useState<string>("");
  const [buyer_Message, setBuyer_Message] = useState<any>("");
  const [mobileno, setMobileno] = useState<string>("");
  const [vendors_name, setVendor_Name] = useState<string>("");
  const [type, setType] = useState<string>("");
  const { data: productData, status: status1 } = useProductsByCategory(data);
  const { data: productData2 } = usePublishedProduct();
  const {mutate:callingMutate,isSuccess:isCallSuccess} = useCallingApi()
  const categoryFilterItem = data2?.filter((item: any) => item?.isChecked);

  const { data: filterProduct } = useProductsByCategory(
    categoryFilterItem?.map((item: any) => item.category_name)
  );
  const FinalData =
    categoryFilterItem?.length > 0 ? filterProduct : productData;

  const router = useRouter();

  const {
    data: buyerQueryData,
    error: err,
    status: status2,
    mutate,
  } = useCustomerQuery();
  const { data: MerchantDetails } = useGetMerchantDetails();
  const { data: emailData, mutate: mutateEmail } = useSendEmail();

  useEffect(() => {
    const currentMerchantDetails = MerchantDetails?.data?.user?.filter(
      (merchant: any) => merchant._id == merchant_Id
    );
    setCurrentMerchant(currentMerchantDetails?.email);
  }, []);

  const CallToConnect = (item: any) => {
    modelOpener("CONNECT");
    setMerchant_Id(item?.auther_Id);
    setProduct_Id(item?._id);
    setProduct_name(item?.product_name);
    setAgentMobileNo(item?.mobile_no);
  };

  const ForEnquiry = (item: any) => {
    modelOpener("INQUIRY");
    setMerchant_Id(item?.auther_Id);
    setProduct_Id(item?._id);
    setProduct_name(item?.product_name);
    setVendor_Name(item.vendors_name);
    setMobileno(item.mobile_no);
  };

  const formRef = React.useRef<HTMLFormElement>(null);
  const emailType = "Email Query";
  const callType = "Calling Query";

  const handleBuyerQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      merchant_Id: merchant_Id,
      product_Id: product_Id,
      product_name: product_name,
      buyer_Message,
      buyer_Email,
      buyer_Mob,
      type: callType,
    });

    modelOpener("CALLING");
    formRef.current?.reset();
    callingMutate({
      Agent_Mob_No:agentMobileNo,
      buyer_Mob:buyer_Mob

    })

    // await axios.get(
    //   `https://callapi.hrmsomra.com/UniProUser/Click-2-Call-API.aspx?UserId=DIGIVOICE&pwd=pwd2020&AgentNum=${agentMobileNo}&CustomerNum=${buyer_Mob}&CampId=15823`
    // );
  };

  const handleEmailQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      merchant_Id: merchant_Id,
      product_Id: product_Id,
      product_name: product_name,
      buyer_Message,
      buyer_Email,
      buyer_Mob,
      type: emailType,
    });
    mutateEmail(
      {
        merchant_Id: merchant_Id,
        merchantEmail: currentMerchant,
        buyer_Message,
        buyer_Email,
        buyer_Mob,
      },
      {
        onSuccess: () => {
          //@ts-ignore
          smsMutate({
            mobileno,

            vendors_name,
            type: "leads",
          });
        },
      }
    );

    await delay(1000);
  };

  useEffect(() => {
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data?.message || err.message);
    }

    if (buyerQueryData) {
      toast.success("Your Query has been successfully submitted");
    }
  }, [err, buyerQueryData, router]);

  //Mobile validation starts

  const [datamobile, setDatamobile] = useState({
    mobile: "",
    mobile1: "",
    mobile2: "",
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "mobile" && value.length <= 10) {
      setDatamobile({ ...datamobile, [name]: value });
      setBuyer_Mob(datamobile?.mobile);
    } else if (name !== "mobile") {
      setDatamobile({ ...datamobile, [name]: value });
      setBuyer_Mob(datamobile?.mobile);
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

  //mobile validation ends
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
  return (
    <div className={styles.box_bordergrid}>
      {FinalData?.data
        ?.filter(
          (item: any) =>
            categoryFilterItem?.filter(
              (item2: any) => item2?.category_name == item?.category
            ) || item?.category == data
        )
        .map((item: any, index: any) => {
          return (
            <div className={styles.SectionGrid} key={index}>
              <div className={styles.Section3}>
                {item?.product_image1[0]?.length > 0 && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={
                      item?.product_image1[0] ? item?.product_image1[0] : "/"
                    }
                    height={400}
                    width={450}
                    alt="productr image"
                    className={styles.productimagesrc1}
                    onClick={() =>
                      router.push(
                        `/product?id=${item._id}&category=${encodeURI(
                          item.category
                        )}&merchant=${item.auther_Id}`
                      )
                    }
                  />
                )}
              </div>
              <div
                className={styles.container_boxgrid}
                onClick={() =>
                  router.push(
                    `/product?id=${item._id}&category=${encode(
                      item.category
                    )}&merchant=${item.auther_Id}`
                  )
                }
              >
                <h1
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                  className={styles.company_heading_color}
                  onClick={() =>
                    router.push(
                      `/product?id=${item._id}&category=${encodeURI(
                        item.category
                      )}&merchant=${item.auther_Id}`
                    )
                  }
                >
                  {item.product_name}
                </h1>
                <h3 className={styles.company_heading_color}>
                  {item.SubTypeOf_bussiness}
                </h3>

                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.product_description}{" "}
                  <span className={styles.seeBox1}>
                    <Link href="#">See more..</Link>
                  </span>
                </p>

                <p className={styles.getPrice}>Get Latest Price</p>

                <table>
                  <tbody>
                    <tr>
                      <td className={styles.tableFont}>Quantity</td>
                      <td className={styles.tableColor}>: 50 Piece </td>
                    </tr>
                    {item?.capacity > 0 && (
                      <tr>
                        <td>Capacity </td>
                        <td>: {item?.capacity} </td>
                      </tr>
                    )}

                    {item?.brand > 0 && (
                      <tr>
                        <td>Brand:</td>
                        <td>:{item?.brand}</td>
                      </tr>
                    )}
                    {item?.model_no > 0 && (
                      <tr>
                        <td>Model No:</td>
                        <td>{item?.model_no}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <p></p>
              </div>

              <div>
                <span className={styles.botton5}>
                  <div>
                    {popupState === "INQUIRY" ? (
                      <div className={styles2.overlay}>
                        <div className={styles2.popup}>
                          <a className={styles2.close} onClick={modelCloser}>
                            &times;
                          </a>
                          <div className={styles2.content1}>
                            <p className={styles2.Font}>
                              Tell us about your requirement
                            </p>

                            <form
                              className={styles2.FormWidth}
                              ref={formRef}
                              onSubmit={handleEmailQuery}
                            >
                              <ul>
                                <li>
                                  <textarea
                                    className={styles2.TextareaSection}
                                    rows={3}
                                    cols={70}
                                    placeholder="Please include product name, order quantity, usage, special requests if any in your inquiry."
                                    onChange={(e) =>
                                      setBuyer_Message(e.target.value)
                                    }
                                  />
                                </li>
                                <li className={styles2.ModalSection}>
                                  <div>
                                    <input
                                      type="email"
                                      className={styles2.Input}
                                      placeholder="Email ID "
                                      // onChange={(e) =>
                                      //   setBuyer_Email(e.target.value)
                                      // }

                                      value={buyer_Email}
                                      onChange={handleOnChange}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="number"
                                      className={styles2.Input}
                                      placeholder="Phone number "
                                      onChange={(e: any) => onChange1(e)}
                                      value={datamobile.mobile}
                                      name="mobile"
                                      required
                                    />
                                  </div>
                                </li>
                                <div className={styles.emailmessage}>
                                  {message}
                                </div>
                                <li className={styles2.checkboxstyle}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      className={styles2.check}
                                    />
                                  </div>

                                  <div>
                                    <span className={styles2.SpanClass}>
                                      I agree to{" "}
                                      <a>
                                        <span
                                          className={styles2.TermsColor}
                                        ></span>
                                        terms and conditions
                                      </a>
                                    </span>
                                  </div>
                                </li>
                                <li>
                                  <button
                                    type="submit"
                                    className="submit_button_box"
                                  >
                                    <Link href={""}>SEND INQUIRY</Link>
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
                      <div className={styles2.overlay}>
                        <div className={styles2.popup2}>
                          <a className={styles2.close} onClick={modelCloser}>
                            &times;
                          </a>
                          <div className={styles2.content1}>
                            <p className={styles2.Font}> I want to buy </p>

                            <form
                              className={styles2.FormWidth}
                              ref={formRef}
                              onSubmit={handleBuyerQuery}
                            >
                              <ul>
                                <li>
                                  <textarea
                                    className={styles2.TextareaSection}
                                    rows={3}
                                    cols={70}
                                    placeholder="Please include product name, order quantity, usage, special requests if any in your inquiry."
                                    onChange={(e) =>
                                      setBuyer_Message(e.target.value)
                                    }
                                  />
                                </li>

                                <li className={styles2.ModalSection}>
                                  <div>
                                    <input
                                      type="email"
                                      className={styles2.Input}
                                      placeholder="Email ID "
                                      // onChange={(e) =>
                                      //   setBuyer_Email(e.target.value)
                                      // }

                                      value={buyer_Email}
                                      onChange={handleOnChange}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="number"
                                      className={styles2.Input}
                                      placeholder="Phone number "
                                      onChange={(e: any) => onChange1(e)}
                                      value={datamobile.mobile1}
                                      name="mobile1"
                                      required
                                    />
                                  </div>
                                </li>
                                <div className={styles.emailmessage}>
                                  {message}
                                </div>
                                <li className={styles2.checkboxstyle}></li>

                                <li>
                                  <button
                                    type="submit"
                                    className="submit_button_box"
                                  >
                                    <Link href={""} className="">
                                      CALL NOW
                                    </Link>
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
                      <div className={styles2.overlay}>
                        <div className={styles2.popup2}>
                          <a className={styles2.close} onClick={modelCloser}>
                            &times;
                          </a>
                          <div className={styles2.callingTab}>
                            <div className={styles2.blink_me2}>
                              <Image
                                src={"/callinglogo/callinglogo.jpg"}
                                height={100}
                                width={100}
                                priority={true}
                                alt="india"
                                className={styles2.image2}
                              />
                            </div>
                            <h1 className={styles2.blink_me}>calling ...</h1>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <a
                      className={styles.ButtonSection1}
                      onClick={() => CallToConnect(item)}
                      // href="tel:9015756558"
                    >
                      Call to Connect
                    </a>
                  </div>
                  <div>
                    <a
                      className={styles.ButtonSection2}
                      onClick={() => ForEnquiry(item)}
                    >
                      For Enquiry
                    </a>
                  </div>
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default GridSubcategory;
