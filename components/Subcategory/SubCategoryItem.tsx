import {
  useCallingApi,
  useCustomerQuery,
  useGetMerchantDetails,
  useGetProductBySearch,
  useGetUserBySearch,
  useMerchantByID,
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
import { dehydrate, QueryClient } from "react-query";
// import useRouter from "next/router"
interface Props {
  data: any;
  data2: any;
  data3: any;
}

const SubCategoryItem = ({ data, data2, data3 }: Props) => {
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
    setBuyer_Email("");
    setBuyer_Mob("");
    setBuyer_Message("");
    setPopupState("");
  };

  const [merchant_Id, setMerchant_Id] = useState<string>("");
  const [product_Id, setProduct_Id] = useState<string>("");
  const [product_name, setProduct_name] = useState<string>("");
  const [agentMobileNo, setAgentMobileNo] = useState<string>("");
  const [buyer_Email, setBuyer_Email] = useState<string>("");
  const [buyer_Mob, setBuyer_Mob] = useState<string>("");
  const [buyer_Message, setBuyer_Message] = useState<any>("");
  const [mobileno, setMobileno] = useState<string>("");
  const [vendors_name, setVendor_Name] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [currentMerchant, setCurrentMerchant] = useState<string>("");
  const [currentMerchantData ,setCurrentMerchantData]= useState<any>([])
  const [test1, setTest1] = useState([]);

  const { data: productData, status: status1 } = useProductsByCategory(data);

  const { data: MerchantData, refetch } = useMerchantByID(merchant_Id);
  console.log("hello",MerchantData)

  console.log("enquiry", buyer_Message);
  const categoryFilterItem = data2?.filter((item: any) => item?.isChecked);
  const { data: test } = useProductsByCategory(
    categoryFilterItem?.map((item: any) => item.category_name)
  );
  const FinalData = categoryFilterItem?.length > 0 ? test : productData;

  const {
    data: buyerQueryData,
    error: err,
    status: status2,
    mutate,
  } = useCustomerQuery();

  const { data: emailData, mutate: mutateEmail } = useSendEmail();
  const { data: MerchantDetails } = useGetMerchantDetails();
  const {mutate:callingMutate,isSuccess:isCallSuccess} = useCallingApi()

  useEffect(() => {
    const currentMerchantDetails = MerchantDetails?.data?.user?.find(
      (merchant: any) => merchant._id == merchant_Id
    );
    setCurrentMerchant(currentMerchantDetails?.email);
    setCurrentMerchantData(MerchantData?.data)
  }, [MerchantDetails, merchant_Id]);

  console.log(currentMerchant,currentMerchantData)

  const CallToConnect = (item: any) => {
 
      modelOpener("CONNECT");

  
   
    setMerchant_Id(item?.auther_Id);
    setProduct_Id(item?._id);
    setProduct_name(item?.product_name);
    setAgentMobileNo(item?.mobile_no);

    setTest1(item);
  };

 const gggg= FinalData?.data?.map((main:any)=>main)
 console.log(gggg)

  const ForEnquiry = (item: any) => {
  const enqProduct=  FinalData?.data?.filter((main:any)=>main._id==item._id)
    console.log(enqProduct)
  
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
    //   // `http://www.apiconnecto.com/UniProUser/Click-2-Call-API.aspx?UserId=DIGIVOICE&pwd=pwd2020&AgentNum=${Agent_Mob_No}&CustomerNum=${buyer_Mob}&CampId=15823`
    //   `https://callapi.hrmsomra.com/UniProUser/Click-2-Call-API.aspx?UserId=DIGIVOICE&pwd=pwd2020&AgentNum=${agentMobileNo}&CustomerNum=${buyer_Mob}&CampId=15823`
    // );
  };

  // useInterval(() => modelCloser(), 10000);

  const handleEmailQuery = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      emailValidation();
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
          merchantId: merchant_Id,
          merchantEmail: currentMerchant,
          description: buyer_Message,
          email: buyer_Email,
          phoneNumber: buyer_Mob,
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
    },
    [buyer_Email, buyer_Message, buyer_Mob, currentMerchant, merchant_Id, mobileno, mutate, mutateEmail, product_Id, product_name, vendors_name]
  );

  useEffect(() => {
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data?.message || err.message);
    }

    if (buyerQueryData) {
      toast.success(emailData?.data?.message);
      if (emailData?.data?.success) {
        // formRef1.current?.reset()
        setPopupState("");
      }
    }
  }, [err, buyerQueryData, router, emailData]);

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
  console.log(product_Id)

  return (
    <div className={styles.box_border}>
      {FinalData?.data
        ?.filter(
          (item: any) =>
            categoryFilterItem?.filter(
              (item2: any) => item2?.category_name == item?.category
            ) || item?.category == data
        )
        .map((item: any, index: any) => {
          return (
            <div className={styles.Section2} key={index}>
              <div className={styles.Section3}>
                {item?.product_image1[0]?.length > 0 && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={
                      item?.product_image1[0] ? item?.product_image1[0] : "/"
                    }
                    height={396}
                    width={446}
                    alt="productr image"
                    className={styles.productimagesrc1}
                    onClick={() =>
                      router.push(
                        `/product?id=${item._id}&category=${encodeURIComponent(
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
                      `/product?id=${item._id}&category=${encodeURIComponent(
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
                        <td className={styles.tableColor}>
                          : {item?.capacity}{" "}
                        </td>
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

                <div>
                  <span className={styles.botton5}>
                    <div>
                      {popupState === "INQUIRY" && product_Id==item._id ? (
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
                                      name="buyer_Message"
                                      id="buyer_Messagem"
                                      className={styles.TextareaSection}
                                      rows={3}
                                      cols={70}
                                      value={buyer_Message}
                                      placeholder="Please include product name, order quantity, usage, special requests if any in your inquiry."
                                      onChange={(e) =>
                                        setBuyer_Message(e.target.value)
                                      }
                                    />
                                  </li>

                                  <li className={styles.ModalSection}>
                                    <div
                                      className={styles.emailmessagevalidate}
                                    >
                                      <div>
                                        <input
                                          type="email"
                                          name="email"
                                          id="email"
                                          className={styles.Input}
                                          placeholder="Email ID "
                                          // onChange={(e) =>
                                          //   setBuyer_Email(e.target.value)
                                          // }

                                          value={buyer_Email}
                                          onChange={handleOnChange}
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <input
                                        type="number"
                                        name="mobile"
                                        id="mobile"
                                        className={styles.Input}
                                        placeholder="Phone number "
                                        onChange={(e: any) => onChange(e)}
                                        value={datamobile?.mobile}
                                        required
                                      />
                                    </div>
                                  </li>
                                  <div className={styles.emailmessage}>
                                    {message}
                                  </div>
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
                                        <Link href={""}>
                                          <span className={styles.TermsColor}>
                                            terms and conditions
                                          </span>
                                        </Link>
                                      </span>
                                    </div>
                                  </li>

                                  <li>
                                    <button
                                      type="submit"
                                      className="submit_button_box"
                                      // onClick={}
                                    >
                                      SEND INQUIRY
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
                      {popupState === "CONNECT" && product_Id==item._id ? (
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
                                      name="buyer_Message"
                                      value={buyer_Message}
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
                                        name="email"
                                        className={styles.Input}
                                        placeholder="Email ID "
                                        value={buyer_Email}
                                        onChange={handleOnChange}
                                        required
                                      />
                                    </div>{" "}
                                    <div>
                                      <input
                                        type="number"
                                        name="mobile"
                                        className={styles.Input}
                                        placeholder="Phone number "
                                        value={datamobile?.mobile}
                                        required
                                        onChange={(e: any) => onChange(e)}
                                      />
                                    </div>
                                  </li>
                                  <div className={styles.emailmessage}>
                                    {message}
                                  </div>
                                  <li className={styles.checkboxstyle}></li>

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
                      {popupState === "CALLING" && product_Id==item._id ? (
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

export default SubCategoryItem;

export const getServerSideProps = async (context: any) => {
  const req = context.req;
  // const access_token = parseCookies({ req: context.req });

  const category = req.query.category;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "waitingsProducts",
    async () =>
      await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/api/getByCategory?category=  ${encodeURIComponent(category)}`,
        {
          // headers: {
          //   //@ts-ignore
          //   authorization: `bearer ${access_token.access_token}`,
          // },
        }
      ).then((response) => response.json())
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
