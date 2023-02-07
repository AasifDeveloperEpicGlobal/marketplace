import {
  useCallingApi,
  useCustomerQuery,
  useGetMerchantDetails,
  useGetProductBySearch,
  useGetUserBySearch,
  useProductsByCategory,
  usePublicProduct,
  usePublishedProduct,
  useSendEmail,
} from "networkAPI/queries";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/Merchant/subcategory.module.scss";
import styles2 from "styles/Merchant/newproductpage.module.scss";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import delay from "utils/delay";
import React from "react";
import toast from "react-hot-toast";
import { encode, decode } from "base-64";
// import useRouter from "next/router"
interface Props {
  data: any;
  data2: any;
  data3: any;
}

const FilterSearchItem = ({ data, data2, data3 }: Props) => {
  // const router = useRouter()
  const router = useRouter();
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
  const [buyer_Email, setBuyer_Email] = useState<string>("");
  const [buyer_Mob, setBuyer_Mob] = useState<string>("");
  const [buyer_Message, setBuyer_Message] = useState<any>("");
  const [type, setType] = useState<string>("");
  const [currentMerchant, setCurrentMerchant] = useState<string>("");
  const [merchantEmail,setMerchantEmail] = useState<string>("")
  const [currentMerchantData,setCurrentMerchantData] = useState<any>([])
  const [mobileno,setMobileno] = useState<string>("")
  const [vendors_name,setVendor_Name] = useState<string>("");

  const [test1, setTest1] = useState([]);

  // const { data: productData, status: status1 } = useProductsByCategory(data);
  const { data: productData } = useGetProductBySearch(
    router.query?.keyword as string
  );
  const {mutate:callingMutate,isSuccess:isCallSuccess} = useCallingApi()
  // const { data: productData2 } = usePublishedProduct();

  const categoryFilterItem = data2?.filter((item: any) => item?.isChecked);
  

  const { data: test } = useProductsByCategory(
    categoryFilterItem?.map((item: any) => item.category_name)
  );

  const FinalData = categoryFilterItem?.length > 0 ? test?.data : productData;

  const {
    data: buyerQueryData,
    error: err,
    status: status2,
    mutate,
  } = useCustomerQuery();

  const { data: emailData, mutate: mutateEmail } = useSendEmail();
  const { data: MerchantDetails } = useGetMerchantDetails();

  console.log(currentMerchantData,MerchantDetails)

  useEffect(() => {
    const currentMerchantDetails = MerchantDetails?.data?.user?.find(
      (merchant: any) => merchant._id == merchant_Id
    );
    setMerchantEmail(currentMerchantDetails?.email);
    setCurrentMerchantData(currentMerchantDetails)

  }, [MerchantDetails, merchant_Id]);

  const CallToConnect = (item: any) => {
    modelOpener("CONNECT");
    setMerchant_Id(item?.auther_Id);
    setProduct_Id(item?._id);
    setProduct_name(item?.product_name);
    setAgentMobileNo(item?.mobile_no);
  
    setTest1(item);
  };
  
  const ForEnquiry = (item: any) => {
    modelOpener("INQUIRY");
    setMerchant_Id(item?.auther_Id);
    setProduct_Id(item?._id);
    setProduct_name(item?.product_name);
    setVendor_Name(item.vendors_name)
    setMobileno(item.mobile_no)
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
    //   // `http://www.apiconnecto.com/UniProUser/Click-2-Call-API.aspx?UserId=DIGIVOICE&pwd=pwd2020&AgentNum=${Agent_Mob_No}&CustomerNum=${buyer_Mob}&CampId=15823`
    //   `https://callapi.hrmsomra.com/UniProUser/Click-2-Call-API.aspx?UserId=DIGIVOICE&pwd=pwd2020&AgentNum=${agentMobileNo}&CustomerNum=${buyer_Mob}&CampId=15823`
    // );
  };

  // useInterval(() => modelCloser(), 10000);

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
    mutateEmail({
     
      merchantId: merchant_Id,
      merchantEmail: merchantEmail,
      description: buyer_Message,
      email: buyer_Email,
      phoneNumber: buyer_Mob,
    },
    {
      onSuccess:()=>{
        //@ts-ignore
        smsMutate({
          mobileno,
          
          vendors_name,
          type:"leads"
      })
      
      }
    });

    await delay(1000);
  };
  

  useEffect(() => {
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data?.message || err.message);
    }

    if (buyerQueryData) {
      toast.success(emailData?.data?.message)
    
      if(emailData?.data?.success){
        // toast.success(emailData?.data?.message);
        setPopupState("")
      }
    }
  }, [err, buyerQueryData, router, emailData]);
 

  return (
    <div className={styles.box_border}>
      {FinalData?.map((item: any, index: any) => {
        
        return (
          <div className={styles.Section2} key={index}>
            <div className={styles.Section3}>
              {item?.product_image1[0]?.length > 0 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item?.product_image1[0] ? item?.product_image1[0] : "/"}
                  height={396}
                  width={446}
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
            <div className={styles.container_box}>
              <h1
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
              <p>
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
                      <td className={styles.tableFont}>Capacity </td>
                      <td className={styles.tableColor}>: {item?.capacity} </td>
                    </tr>
                  )}

                  {item?.brand > 0 && (
                    <tr>
                      <td className={styles.tableFont}>Brand:</td>
                      <td className={styles.tableColor}>:{item?.brand}</td>
                    </tr>
                  )}
                  {item?.model_no > 0 && (
                    <tr>
                      <td className={styles.tableFont}>Model No:</td>
                      <td className={styles.tableColor}>{item?.model_no}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <p></p>

              <div>
                <span className={styles.botton5}>
                  <div>
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
                                    onChange={(e) =>
                                      setBuyer_Message(e.target.value)
                                    }
                                  />
                                </li>

                                <li className={styles.ModalSection}>
                                  <div>
                                    <input
                                      type="email"
                                      className={styles.Input}
                                      placeholder="Email ID "
                                      onChange={(e) =>
                                        setBuyer_Email(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                  <div>
                                    {" "}
                                    <input
                                      type="tel"
                                      className={styles.Input}
                                      placeholder="Phone number "
                                      onChange={(e) =>
                                        setBuyer_Mob(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </li>
                                <li className={styles.checkboxstyle}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      className={styles.check}
                                    />
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
                                    className="submit_button_box"
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
                                    onChange={(e) =>
                                      setBuyer_Message(e.target.value)
                                    }
                                  />
                                </li>

                                <li className={styles.ModalSection}>
                                  <div>
                                    <input
                                      type="email"
                                      className={styles.Input}
                                      placeholder="Email ID "
                                      onChange={(e) =>
                                        setBuyer_Email(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="tel"
                                      className={styles.Input}
                                      placeholder="Phone number "
                                      onChange={(e) =>
                                        setBuyer_Mob(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </li>
                                <li className={styles.checkboxstyle}></li>

                                <li>
                                  <button
                                    type="submit"
                                    className="submit_button_box"
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
                  </div>

                 
                 
                  <div>
                    <a
                      className={styles.ButtonSection1}
                      // href={`/subcategory?id=${data}#popup2`}
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
          </div>
        );
      })}
    </div>
  );
};
export default FilterSearchItem;
