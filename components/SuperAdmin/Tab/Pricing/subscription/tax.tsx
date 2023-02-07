import React, { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import Select from "react-select";
import {
  useAddSubscription,
  useGetMerchantDetails,
  useGetPackage,
  useGetProductWithPaginate,
  useGetService,
} from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/Merchant/subscription.module.scss";
import { string } from "yup";

interface Person {
  name: string;
  age: number;
  count: number;
  "gift-wrap": "hello";
}
interface activeProps {
  setSubTab: any;
}

const Tax = ({ setSubTab }: activeProps) => {
  const router = useRouter();

  // const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const date = new Date();
  const currDate = date.toISOString().slice(0, 10);
const [auther_Id, setAuther_Id] = useState<string>("");
  const [mobile_no, setMobile_No] = useState("");
const [vendors_name, setVendors_name] = useState<string>("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [plan2, setPlan2] = useState<string>("");
  const [payment_mode, setPaymentMode] = useState<string>("");
  const [start_date, setStartDate] = useState<string>(currDate);
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [end_date, setEndDate] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [benifits, setBenifits] = useState<string>("");
  const [test22, setTest22] = useState<any>([]);
  const [validity, setValidity] = useState<string>("28");
  const [countMonth, setCountMonth] = useState<number>(1);
  const [gst, setGst] = useState<string>("18");
  const [Amount, setAmount] = useState<string>("");
  const [total, setTotal] = useState<string>("");

  const [checked, setChecked] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);

  const [subsPlan, setSubsPlan] = useState("services");
  

  // const [product_name,setProduct_name] =useState<string>("")

  const { error, isLoading, data, mutate } = useAddSubscription();
  const { data: serviceData, refetch } = useGetService();
  const { data: packageData } = useGetPackage();
  const { data: userData, refetch: userRefetch } = useGetMerchantDetails();
  const FindUser = userData?.data?.user
    ?.filter((item: any) => item.role == "Admin")
    .map((item: any, index: any) => {
      return {
        value: item._id,
        label: item.Merchant_Name,
        mobile_no: item.mobile_no,
        gst: item.GST_No,
        email: item.email,
        address: item.Merchant_Address,
      };
    });
 

  const [selectedFlavors, setSelectedFlavors] = useState([{ amount: 0 }]);
  const [selectedMerchant, setSelectedMerchant] = useState<any>({});
const handleSelect = (selectedItems: any) => {
    let arraiItem: any[] = [];
    selectedItems.map((item: any) => {
      arraiItem.push(item.value);
    });
    setSelectedFlavors(selectedItems);
  };
  const handleSelect1 = (selectedItems: any) => {

    setSelectedMerchant(selectedItems);
  };

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // @ts-ignore
    if (selectedMerchant?.mobile_no?.length == 10) {
      // mutate({
      //   auther_Id: selectedMerchant?.value,
      //   mobile_no: selectedMerchant?.mobile_no as string,
      //   vendors_name: selectedMerchant?.label as string,
      //   email: selectedMerchant?.email as string,
      //   address: selectedMerchant?.address as string,
      //   name,
      //   plan,
      //   plan2,
      //   payment_mode,
      //   start_date,
      //   end_date,
      //   price: price,
      //   benifits,
      //   validity,
      //   gst: selectedMerchant?.gst as string,
      //   total: total,
      //   Amount: total,
      //   payment_status,
      // });
    } else {
      window.confirm("mobileNo must be 10 digit");
    }
  };
  const handleMobile = () => {
    mobile_no.length < 10 ? setMessage1("mobile no must be 10 Digit") : null;
  };

  const options = serviceData?.data?.map((item: any, index: any) => {
    return { value: item._id, label: item.name, amount: parseInt(item.price) };
  });
  const options2 = packageData?.data?.data?.map((item: any, index: any) => {
    return { value: item._id, label: item.name, amount: 10 };
  });

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }
    //@ts-ignore
    if (data?.success) {
      //@ts-ignore
      toast.success(data?.message);
      setSubTab("list");
      // router.replace("/admindashboard/blogs");
    } else {
      //@ts-ignore
      toast.error(data?.message);
    }
  }, [error, data, router, setSubTab]);

  

  const TotalSum = (total: number, num: any) => {
    return total + Math.round(num);
  };
  

  const totaladd = selectedFlavors
    .map((item: any) => item.amount)
    .reduce((prev: any, curr: any) => prev + curr, 0);
  const totalPrice1 = totaladd * countMonth;

  const [message1, setMessage1] = useState<string>("");

  const handleSelectMonth = (
    e: MouseEventHandler<HTMLOptionElement> | undefined,
    data: any
  ) => {
    
    setCountMonth(data);
  };


  const planComponent = useMemo(() => {
    switch (subsPlan) {
      case "services":
        return (
          <div>
            <h3>Select Services</h3>
            <Select
              // @ts-ignore
              options={options}
              placeholder="Select Services"
              value={selectedFlavors}
              onChange={handleSelect}
              isSearchable={true}
              isMulti={true}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "grey" : "red",
                  width: "270px",
                }),
              }}
              // className={styles.inputForm}
            />
          </div>
        );

        break;

      default:
        return (
          <div>
            <h3>Select Packages</h3>
            <Select
              // @ts-ignore
              options={options2}
              placeholder="Select Packages"
              value={selectedFlavors}
              onChange={handleSelect}
              isSearchable={true}
              isMulti={true}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "grey" : "red",
                  width: "270px",
                }),
              }}
              // className={styles.inputForm}
            />
          </div>
        );
        break;
    }
  }, [options, options2, selectedFlavors, subsPlan]);

  
  const endData = new Date(
    new Date().getTime() + parseInt(validity) * 24 * 60 * 60 * 1000
  );
  const finalDate = endData?.toISOString().slice(0, 10);
  const PlanValidity = [
    { value: 28, month: 1, label: "Monthly" },
    { value: 84, month: 3, label: "Quaterly" },
    { value: 170, month: 6, label: "6-Month" },
    { value: 360, month: 12, label: "Anually" },
  ];

  React.useEffect(() => {
    const GrandTotal = totalPrice1 + totalPrice1 * parseInt(gst) * 0.01;
    setTotal(GrandTotal.toString());
    setPrice(totalPrice1.toString());
    setEndDate(finalDate);
    switch (validity) {
      case "84":
        setCountMonth(3);

        break;
      case "170":
        setCountMonth(6);

        break;
      case "360":
        setCountMonth(12);

        break;

      default:
        setCountMonth(1);
        break;
    }
  }, [finalDate, gst, totalPrice1, validity]);

  return (

      <div className={styles.topTable}>
       <div className={styles.inputflexupload}>
            <div>
              <select
                name="gst"
                id=""
                value={gst}
                className={styles.inputForm}
                onChange={(e) => setGst(e.target.value)}
              >
                {" "}
                <option value="18" selected>
                  {" "}
                  GST (18%)
                </option>
                <option value="0">No GST </option>
                <option value="0">Include GST</option>
                <option value="0">Exclude GST</option>
              </select>
              {/* <span className={styles.inputlabel}>GST Mode</span> */}
            </div>

            <div className={styles.inputbox}>
              <input
                type="text"
                className={styles.inputfeild}
                name="totalAmount"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
              <span className={styles.inputlabel}>Total Amount</span>
            </div>
          </div>{" "}
        </div>
       
     
   
  );
};
export default Tax;
