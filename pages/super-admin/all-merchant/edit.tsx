import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import Image from "next/image";
import {
  useAddBlogs,
  useGetBussinessDetails,
  useGetMerchantDetails,
  useUpdateUserDetails,
  useUserDetails,
} from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/editmerchant.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

interface Person {
  name: string;
  age: number;
  count: number;
  "gift-wrap": "hello";
}

const Notification: NextPage = () => {
  const formData = {
    name: "Amit",
    age: 25,
    count: 12,
  };
  const router = useRouter();

  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const userId = router.query?.id;
  const [blog_heading, setBlog_heading] = useState<string>("");
  const [blog_paragraph, setBlog_paragraph] = useState("");
  const [SubTypeOf_bussiness, setSubTypeOf_bussiness] = useState<string>("");
  const [Merchant_Name, setMerchantName] = useState<string>("");
  const [Merchant_ServiceArea_Pincodes, setMerchant_ServiceArea_Pincodes] =
    useState<string>("");
  const [Merchant_Designation, setMerchant_Designation] = useState<string>("");
  const [Merchant_Address, setMerchant_Address] = useState<string>("");
  const [Merchant_City, setMerchant_City] = useState<string>("");
  const [TypesOf_Bussiness, setTypesOf_Bussiness] = useState<string>("");
  const [Year_of_establishment, setYear_of_establishment] =
    useState<string>("");
  const [PAN_No, setPAN_No] = useState<string>("");
  const [GST_No, setGST_No] = useState<string>("");
  const [blog_image, setBlog_image] = useState<any>();

  // const [product_name,setProduct_name] =useState<string>("")

  const { error, isLoading, data, mutate } = useAddBlogs();
  const { error: err2, data: bussinesName } = useGetBussinessDetails();
  const {
    error: error1,
    isLoading: isLoading1,
    data: editData,
    mutate: mutateUser,
  } = useUpdateUserDetails();

  const { data: merchantdata, isSuccess } = useGetMerchantDetails();
  const userData = merchantdata?.data?.user?.find(
    (item: any) => item._id === userId
  );
  console.log("hellobaba", userData?.mobile_no);
  const handleLogin = () => {
    // e.preventDefault();
    emailValidation();
    console.log("hello jjjjj" ,editData);

    mutateUser({
      Merchant_Name: Merchant_Name || userData?.Merchant_Name,
      SubTypeOf_bussiness: SubTypeOf_bussiness || userData?.SubTypeOf_bussiness,
      TypesOf_Bussiness: TypesOf_Bussiness || userData?.TypesOf_Bussiness,
      Merchant_ServiceArea_Pincodes:
        Merchant_ServiceArea_Pincodes ||
        userData?.Merchant_ServiceArea_Pincodes,
      Merchant_Designation:Merchant_Designation ||
        userData?.Merchant_Designation,
      Merchant_City: Merchant_City || userData?.Merchant_City,
      Merchant_Address: Merchant_Address || userData?.Merchant_Address,
      Year_of_establishment:
        Year_of_establishment || userData?.Year_of_establishment,
      GST_No: GST_No || userData?.GST_No,
      PAN_No: PAN_No || userData?.PAN_No,
      _id: userId as string,
    },{
      onSuccess:(data:any)=>{
        console.log(data)
        if(data?.success){
          toast.success(data?.message)
        }
      }
    });
  };

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (isSuccess) {
      // toast.success("upload Successfull");
      // router.replace("/admindashboard/blogs");
    }
  }, [error, data, router]);

  //For Email validation starts

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailValidation = () => {
    const regEx = /^([a-zA-Z0-9\.-_]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (regEx.test(email)) {
      // setMessage("Email is Valid");
    } else if (!regEx.test(email) && email !== "") {
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

  const [datamobile, setDatamobile] = useState({
    mobile: "",
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;

    if (
      name === "mobile" &&
      value.length <= 10
      //  && value[0] == 6
    ) {
      setDatamobile({ ...datamobile, [name]: value });
    } else if (name !== "mobile") {
      setDatamobile({ ...datamobile, [name]: value });
    }
  };

  //mobile validation ends

  return (
    <SuperAdminLayout>
      <div className={styles.container_width}>
        <div className={styles.mov}>
          <div>
            <h1 className={styles.subcatHeading}>Basic information</h1>
            {/* <p>Here is merchant data here</p> */}
          </div>
        </div>
        <div className={styles.topTable}>
          <div className={styles.tableBoxx}>
            <h1 className={styles.subcatHeading}>Account</h1>
          </div>

          <div className={styles.tableMain}>
            <div className={styles.flexNotification}>
              <div className={styles.dropdownBox}>
                <div>
                  <Image
                    src="/omratrade/p2.svg"
                    height={80}
                    width={80}
                    alt=" Image"
                  />
                </div>

                <div className={styles.notificationName}>
                  {userData?.Merchant_Name} 
                </div>
              </div>
              <div className={styles.dotClass}>
                <button type="button" className={styles.unRead}>
                  <Link href="#">Upload new</Link>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.inputFlex}>
            <div>
              <h3>Merchant Name:</h3>
              <input
                type="text"
                defaultValue={userData?.Merchant_Name}
                placeholder="Merchant Name"
                name="merchant-name"
                className={styles.inputForm}
                onChange={(e) => setMerchantName(e.target.value)}
              />
            </div>

            <div className={styles.emailvalidationmessage}>
              <div>
                <h3>Email address</h3>
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  defaultValue={userData?.email}
                  className={styles.inputForm}
                  onChange={(e) => setEmail(e.target.value)}
                  // value={email}
                />
              </div>
              <span className="emailvalidationmessage">{message}</span>
            </div>
          </div>

          <div className={styles.inputFlex}>
            <div>
              <h3>Mobile:</h3>
              <input
                type="number"
                placeholder="Mobile:"
                defaultValue={userData?.mobile_no}
                name="mobile"
                className={styles.inputForm}
                // value={datamobile.mobile}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div>
              <h3>Business Name</h3>
              <input
                type="text"
                defaultValue={userData?.company_Name}
                name="business-name"
                placeholder="Enter Business Name "
                className={styles.inputForm}
              />
            </div>
          </div>
          <div className={styles.inputFlex}>
            <div>
              <h3>Business Type</h3>
              <input
                type="text"
                placeholder="Enter Business Type"
                defaultValue={userData?.TypesOf_Bussiness}
                name="business_type"
                className={styles.inputForm}
                onClick={(e:any)=>setTypesOf_Bussiness(e.target.value)}
              />
            </div>
            <div>
              <h3>Designation </h3>
              <input
                type="text"
                defaultValue={userData?.Merchant_Designation}
                placeholder="Enter Designation"
                name="Degignation"
                className={styles.inputForm}
                onClick={(e:any)=>setMerchant_Designation(e.target.value)}

              />
            </div>
          </div>

          <div className={styles.inputFlex}>
            <div>
              <h3>Address</h3>
              <input
                type="text"
                placeholder="Address"
                defaultValue={userData?.Merchant_Address}
                name="Merchant_Address"
                className={styles.inputForm}
                onChange={(e:any)=>setMerchant_Address(e.target.value)}
              />
            </div>
            <div>
              <h3>Year Of Establishment</h3>
              <input
                type="text"
                placeholder="Year Of Establishment "
                defaultValue={userData?.Year_of_establishment}
                name="year-of-establishment"
                className={styles.inputForm}
                onChange={(e:any)=>setYear_of_establishment(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputFlex3}>
            <button
              type="button"
              className={styles.saveButton}
              onClick={handleLogin}
              // onClick={()=>handleUpdate}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
export default Notification;
