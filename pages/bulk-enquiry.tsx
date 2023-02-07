import React, { useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import styles from "../styles/Merchant/bulkenquiry.module.scss";
import TopHeader from "./topheader";
import NewFooter from "./newwfooter";
import Image from "next/image";
import {
  useBulkEnquiry,
  useGetCategory,
  useGetCategoryForUploadProduct,
} from "networkAPI/queries";
import { string } from "yup";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

interface Person {
  name: string;
  age: number;
  count: number;
  "gift-wrap": "hello";
}
const BulkEnquiry: NextPage = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [merchant_Id, setMerchant_Id] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [business_name, setBusinessName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("bulk-enquiry");
  const [product_category, setProduct_category] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const { data } = useGetCategory();
  const { data: bulkData, mutate, isError, isSuccess } = useBulkEnquiry();
  const category_data = data?.data;
  const test = category_data;

  //For Email validation starts
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const emailValidation = () => {
    const regEx = /^([a-zA-Z0-9\.-_]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (!regEx.test(email) && email !== "") {
      setMessage("Email is not Valid");
    } else {
      setMessage("");
    }
  };
  const handleOnChange = (e: any) => {
    setEmail(e.target.value);
  };
  //For Email validation ends
  //Mobile validation starts

  const [data1, setData] = useState({
    mobile: "",
  });
  const onChange = (e: any) => {
    const { name, value } = e.target;
    if (
      name === "mobile" &&
      value.length <= 10
      //  && value[0] == 6
    ) {
      setData({ ...data1, [name]: value });
      setMobile(data1?.mobile);
    } else if (name !== "mobile") {
      setData({ ...data1, [name]: value });
    }
  };
  const handleSubmit = () => {
    emailValidation();
    if (product_category) {
      mutate({
        merchant_Id,
        name,
        email,
        mobile: data1?.mobile,
        business_name,
        product_category,
        comment,
        date,
        type,
      });
    } else {
      window.alert("Product Category is Mandatory*");
    }
  };

  React.useEffect(() => {
    //@ts-ignore
    if (isSuccess) {
      //@ts-ignore
      if (bulkData?.success) {
        //@ts-ignore
        toast.success(bulkData?.message);

        router.reload();
      } else {
        //@ts-ignore
        toast.error(bulkData ? bulkData?.message : "");
      }
    }
  });
  //mobile validation ends
  return (
    <div className={styles.container_width}>
      <TopHeader />
      <div className={styles.contactSection}>
        <div className={styles.leftpart}>
          <h1 className={styles.contactBox}>Get the Best Quotes</h1>
          <p>
            Fill out your bulk query request, and our specialists will contact
            you within 30 minutes with the best advice.
          </p>
          <h1 className={styles.contactPara}>Buying for Your Business ?</h1>
          <p>
            Kindy contact us for bulk queries so that we can provide you the
            best advice with the best quality.
          </p>
          <div>
            <Image
              data-lazyloaded="1"
              src="/omratrade/bulk-enquiry.jpeg"
              height={500}
              width={700}
              alt="Bulk Enquiry"
              className={styles.imageLogo}
            />
          </div>
        </div>

        <div className={styles.topTable}>
          <div className={styles.tableBoxx}>
            <h1 className={styles.subcatHeading}>For Bulk Enquiry</h1>
          </div>

          <div className={styles.inputFlex}>
            <div>
              <h3>Your Name</h3>
              <input
                type="text"
                placeholder="Enter Name
                "
                name="name"
                className={styles.inputForm}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.emailbox}>
              <div>
                <h3>Email address</h3>
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  name="email"
                  value={email}
                  className={styles.inputForm}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <span className={styles.emailvalidationmessage}>{message}</span>
            </div>
          </div>
          <div className={styles.inputFlex}>
            <div>
              <h3>Mobile:</h3>
              <input
                type="number"
                placeholder="Mobile"
                name="mobile"
                className={styles.inputForm}
                value={data1.mobile}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div>
              <h3>Business Name</h3>
              <input
                type="text"
                placeholder="Business Name "
                name="search2"
                className={styles.inputForm}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.textareaBox}>
            <h3>Product Category *</h3>
            <select
              className={styles.inputForm1}
              name="category"
              value={product_category}
              onChange={(e) => setProduct_category(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {test?.map((item: any, index: any) => {
                return (
                  <>
                    <option key={index} value={item.category_name}>
                      {item.category_name}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <div>
            <div className={styles.textareaBox}>
              <h3>Leave us a message</h3>
              <textarea
                rows={6}
                cols={45}
                name="comment"
                className={styles.TextareaBox1}
                placeholder="Please type your message here.."
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputFlex3}>
            <button
              type="button"
              className={styles.saveButton}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <NewFooter />
    </div>
  );
};
export default BulkEnquiry;
