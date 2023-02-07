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
  useGetSubscription,
  usePayLink,
} from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/Merchant/subscription.module.scss";
import { string } from "yup";

interface activeProps {
  setSubTab: any;
}

const Subscription = ({ setSubTab }: activeProps) => {
  const router = useRouter();

  // const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const date = new Date();
  const currDate = date.toISOString().slice(0, 10);
  const [auther_Id, setAuther_Id] = useState<string>("");
  const [mobile_no, setMobile_No] = useState("");
  const [vendors_name, setVendors_name] = useState<string>("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState<string>("");
  const [payment_link, setPayment_link] = useState<string>("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState<any>([]);
  const [plan2, setPlan2] = useState<string>("");
  const [payment_mode, setPaymentMode] = useState<string>("");
  const [start_date, setStartDate] = useState<string>(currDate);
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [end_date, setEndDate] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [benifits, setBenifits] = useState<string>("");
  const [test22, setTest22] = useState<any>([]);
  const [validity, setValidity] = useState<string>("30");
  const [countMonth, setCountMonth] = useState<number>(1);
  const [gst, setGst] = useState<string>("0");
  const [Amount, setAmount] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [payment_status, setpayment_status] = useState<boolean>(false);

  const [checked, setChecked] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);

  const [subsPlan, setSubsPlan] = useState("services");
  const [selectGST, setSelctGST] = useState("no");
  const [selectedGSTValue, setSelectedGSTValue] = useState<string>("18");
  const [gsttype, GstType] = useState("include");
  const { error, data, mutate, isSuccess } = useAddSubscription();
  const { data: QueryData, refetch } = useGetSubscription();
  const {data:payLinkData,mutate:payLinkMutate,isSuccess:isPayLinkCreated} = usePayLink()
  const { data: serviceData } = useGetService();
  const { data: packageData } = useGetPackage();
  const { data: userData } = useGetMerchantDetails();

  const FindUser = userData?.data?.user
    ?.filter((item: any) => item.role == "Admin")
    .map((item: any) => {
      return {
        value: item._id,
        label: item.Merchant_Name,
        mobile_no: item.mobile_no,
        gst: item.GST_No,
        email: item.email,
        address: item.Merchant_Address,
      };
    });
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState<any>({});

  const handleSelect = (selectedItems: any) => {
    let arraiItem: any[] = [];
    selectedItems.map((item: any) => {
      arraiItem.push(item.value);
    });
    setSelectedFlavors(selectedItems);
    //@ts-ignore
  };

  const handleSelect1 = (selectedItems: any) => {
    setSelectedMerchant(selectedItems);
  };

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // @ts-ignore
    if (selectedMerchant?.mobile_no?.length == 10) {
      setPayment_link("https://merchant.cashfree.com/merchant/login");
      mutate({
        auther_Id: selectedMerchant?.value,
        mobile_no: selectedMerchant?.mobile_no as string,
        vendors_name: selectedMerchant?.label as string,
        email: selectedMerchant?.email as string,
        GST_No: selectedMerchant?.gst as string,
        address: selectedMerchant?.address as string,
        name,
        plan,
        plan2,
        payment_mode,
        start_date,
        end_date,
        price: price,
        benifits,
        validity,
        gst: selectedMerchant?.gst as string,
        total: total,
        Amount: total,
        payment_status,
        payment_link,
      },{
        onSuccess:()=>{
          // payLinkMutate({
          //   email: selectedMerchant?.email as string,
          //   mobile_no:selectedMerchant?.mobile_no as string,
          //   name,
          //   link_id: "1",
          //   Amount: total,
          //   purpose: "subscription",
          //   payment_link: ""
          // })
        }
      }
      )
      // payLinkMutate({
      //   email: selectedMerchant?.email as string,
      //   mobile_no:selectedMerchant?.mobile_no as string,
      //   name,
      //   link_id: "",
      //   Amount: total,
      //   purpose: "subscription",
      //   payment_link: ""
      // });
    } else {
      window.confirm("mobileNo must be 10 digit");
    }
  };
  const handleMobile = () => {
    mobile_no.length < 10 ? setMessage1("mobile no must be 10 Digit") : null;
  };

  const options = serviceData?.data?.map((item: any) => {
    return { value: item._id, label: item.name, amount: parseInt(item.price) };
  });
  const options2 = packageData?.data?.data?.map((item: any) => {
    return { value: item._id, label: item.name, amount: 10 };
  });

  useEffect(() => {
    //@ts-ignore
    setPlan(selectedFlavors);

    //@ts-ignore
    if (isSuccess) {
      //@ts-ignore
      toast.success(data?.message);
      refetch()
      setSubTab("list");
      // router.replace("/admindashboard/blogs");
    } else {
      //@ts-ignore
      // toast.error(data?.message);
    }
  }, [error, data, router, setSubTab, selectedFlavors, isSuccess, refetch]);

  const totaladd = selectedFlavors
    .map((item: any) => item.amount)
    .reduce((prev: any, curr: any) => prev + curr, 0);
  const totalPrice1 = totaladd * countMonth;
  const basePrice = totalPrice1.toFixed(2);
  const [message1, setMessage1] = useState<string>("");

  const handleSelectMonth = (
    e: MouseEventHandler<HTMLOptionElement> | undefined,
    data: any
  ) => {
    setCountMonth(data);
  };

  const GSTTyperefs = useMemo(() => {
    if (selectGST === "yes") {
      switch (selectedGSTValue) {
        case "24":
          return (
            <div className={styles.inputbox}>
              <select
                name="gsttype"
                id=""
                value={gsttype}
                className={styles.inputForm}
                onChange={(e) => GstType(e.target.value)}
              >
                <option value="include" selected>
                  Include GST
                </option>
                <option value="exclude">Exclude GST</option>
              </select>
            </div>
          );

          break;

        default:
          return (
            <div>
              <select
                name="gsttype"
                id=""
                value={gsttype}
                className={styles.inputForm}
                onChange={(e) => GstType(e.target.value)}
              >
                {" "}
                <option value="include" selected>
                  Include GST
                </option>
                <option value="exclude">Exclude GST</option>
              </select>
            </div>
          );
          break;
      }
    }
  }, [gsttype, selectGST, selectedGSTValue]);

  const GSTComponent = useMemo(() => {
    switch (selectGST) {
      case "yes":
        return (
          <div>
            <div style={{ display: "flex", gap: "60px" }}>
              <div
                onClick={() => {
                  setSelectedGSTValue("18");
                }}
              >
                <h3>18%</h3>
                <input
                  type="radio"
                  value={selectedGSTValue}
                  checked={selectedGSTValue === "18"}
                />
              </div>

              <div style={{ display: "flex" }}>
                <div
                  onClick={() => {
                    setSelectedGSTValue("24");
                  }}
                >
                  <h3>24%</h3>
                  <input
                    type="radio"
                    value={selectedGSTValue}
                    checked={selectedGSTValue === "24"}
                  />
                </div>
              </div>
            </div>
          </div>
        );

        break;

      default:
        return null;
        break;
    }
  }, [selectGST, selectedGSTValue]);

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
    { value: 30, month: 1, label: "Monthly" },
    { value: 90, month: 3, label: "Quaterly" },
    { value: 180, month: 6, label: "6-Month" },
    { value: 365, month: 12, label: "Anually" },
  ];

  React.useEffect(() => {
    const GrandTotal = totalPrice1 + totalPrice1 * parseInt(gst) * 0.01;
    setTotal(GrandTotal.toString());
    setPrice(totalPrice1.toString());
    setEndDate(finalDate);
    switch (validity) {
      case "90":
        setCountMonth(3);

        break;
      case "180":
        setCountMonth(6);

        break;
      case "365":
        setCountMonth(12);

        break;

      default:
        setCountMonth(1);
        break;
    }
  }, [finalDate, gst, totalPrice1, validity]);

  useEffect(() => {
    const totalgst =
      gsttype == "include"
        ? totalPrice1 - totalPrice1 * (100 / (100 + parseInt(selectedGSTValue)))
        : totalPrice1 * 0.01 * parseInt(selectedGSTValue);
    const withGST = totalPrice1 + parseInt(gst);
    setTotal(withGST.toString());
    if (gsttype == "exclude") {
    }
    if (selectGST == "yes") {
      switch (selectedGSTValue) {
        case "18":
          setGst(totalgst.toFixed(2).toString());

          break;
        case "24":
          setGst(totalgst.toFixed(2).toString());

          break;

        default:
          setGst("0");

          break;
      }
    } else {
      setGst("0");
    }
  }, [gst, gsttype, selectGST, selectedGSTValue, totalPrice1]);
  console.log(selectedMerchant?.gst);

  return (
    <div className={styles.addsectionbottom}>
      <div className={styles.topTable}>
        <div className={styles.tableBoxx}>
          <h1 className={styles.subcatHeading}>Add Plan to User</h1>
        </div>{" "}
        <div className={styles.inputFlex}>
          <div className={styles.inputbox}>
            <Select
              // @ts-ignore
              options={FindUser}
              placeholder="Select Packages"
              value={selectedMerchant}
              onChange={handleSelect1}
              isSearchable={true}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "grey" : "red",
                  width: "270px",
                }),
              }}
            />
            <span className={styles.inputlabel}>Search Users</span>
          </div>{" "}
        </div>
        <div className={styles.inputFlex}>
          <div className={styles.inputbox}>
            <input
              type="text"
              className={styles.inputfeild}
              // value={name}
              //@ts-ignore
              value={selectedMerchant?.label}
              name="service"
              onChange={(e) => setName(e.target.value)}
            />
            <span className={styles.inputlabel}>Merchant Name</span>
          </div>
          <div className={styles.inputbox}>
            <input
              type="number"
              className={styles.inputfeild}
              //@ts-ignore
              value={selectedMerchant?.mobile_no}
              name="mobileno"
              onChange={(e) => setMobile_No(e.target.value)}
            />
            <span className={styles.inputlabel}>Mobile Number</span>
            <span style={{ color: "red" }} onMouseEnter={handleMobile}>
              {message1}
            </span>
          </div>
          <div className={styles.inputbox}>
            <input
              type="text"
              className={styles.inputfeild}
              //@ts-ignore
              value={selectedMerchant?.gst}
              name="gst-number"
              // onChange={(e) => setGst(e.target.value)}
            />
            <span className={styles.inputlabel}>GST No.</span>
            {/* <span style={{ color: "red" }} onMouseEnter={handleMobile}>
              {message1}
            </span> */}
          </div>
          <div className={styles.inputbox}>
            <input
              type="email"
              className={styles.inputfeild}
              //@ts-ignore
              value={selectedMerchant?.email}
              name="email"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={styles.inputlabel}>Email ID</span>
          </div>
          <div className={styles.inputbox}>
            <input
              type="text"
              className={styles.inputfeild}
              name="address"
              //@ts-ignore
              value={selectedMerchant?.address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <span className={styles.inputlabel}>Address</span>
          </div>
          <div>
            <div className={styles.inputbox}>
              <label style={{ backgroundColor: "white" }}>Validity</label>
              <select
                name=""
                id=""
                value={validity}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setValidity(e.target.value)
                }
                className={styles.inputForm}
              >
                {PlanValidity.map((item: any, index: any) => {
                  return (
                    <option
                      value={item.value}
                      key={index}
                      onClick={(e: any) => handleSelectMonth(e, item)}
                    >
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>{" "}
          </div>
          <div>
            <div className={styles.selectplan}>
              <div
                onClick={() => {
                  setSubsPlan("services");
                }}
              >
                <h3>Service</h3>
                <input
                  type="radio"
                  value={subsPlan}
                  checked={subsPlan === "services"}
                />
              </div>

              <div style={{ display: "flex" }}>
                <div
                  onClick={() => {
                    setSubsPlan("packages");
                  }}
                >
                  <h3>Package</h3>
                  <input
                    type="radio"
                    value={subsPlan}
                    checked={subsPlan === "packages"}
                  />
                </div>
              </div>
              <div>{planComponent}</div>
            </div>
          </div>
          <div className={styles.inputbox}>
            <input
              type="date"
              className={styles.inputfeild}
              name="startDate"
              value={start_date}
              min={start_date}
              // {date.getDate()<currDate }
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className={styles.inputlabel}>Starts From</span>
          </div>
          <div className={styles.inputbox}>
            <input
              type="date"
              className={styles.inputfeild}
              name="EndDate"
              value={end_date}
              min={end_date}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <span className={styles.inputlabel}>Expire on</span>
          </div>
          <div>
            <div className={styles.inputbox}>
              <input
                type="text"
                className={` ${styles.inputfeild} ${styles.disableinput} `}
                name="price"
                disabled
                value={totalPrice1}
                onChange={() => setPrice(totalPrice1.toString())}
              />
              <span className={styles.inputlabel}>Price</span>
            </div>

            <div></div>
          </div>
          <div className={styles.inputflexupload}>
            {/* <div>
            {" "}
            <h3>Upload File </h3>
            <input type="file" id="myfile" name="myfile" />
          </div> */}
          </div>
          <div className={styles.inputflexupload}>
            <div className={styles.selectplan}>
              <div style={{ display: "flex", gap: "60px" }}>
                <div
                  onClick={() => {
                    setSelctGST("no");
                  }}
                >
                  <h3>No GST</h3>
                  <input
                    type="radio"
                    value={selectGST}
                    checked={selectGST === "no"}
                  />
                </div>

                <div style={{ display: "flex" }}>
                  <div
                    onClick={() => {
                      setSelctGST("yes");
                    }}
                  >
                    <h3>GST</h3>
                    <input
                      type="radio"
                      value={selectGST}
                      checked={selectGST === "yes"}
                    />
                  </div>
                </div>
              </div>
              <div>{GSTComponent}</div>
            </div>

            <div> {GSTTyperefs}</div>

            {gsttype == "exclude" ? (
              <div style={{ display: "flex", gap: "20px" }}>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    className={styles.inputfeildCal}
                    name="totalAmount"
                    value={basePrice}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                  <span className={styles.inputlabel}>Base price</span>
                </div>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    className={styles.inputfeildCal}
                    name="gst"
                    value={gst}
                    // onChange={(e) => setTotal(e.target.value)}
                  />
                  <span className={styles.inputlabel}>GST</span>
                </div>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    className={styles.inputfeildCal}
                    name="totalAmount"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                  <span className={styles.inputlabel}>Total Amount</span>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "20px" }}>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    className={` ${styles.inputfeildCal} ${styles.disableinput} `}
                    name="Base-price"
                    disabled
                    value={(totalPrice1 - parseFloat(gst)).toFixed(2)}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                  <span className={styles.inputlabel}>Base price</span>
                </div>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    className={styles.inputfeildCal}
                    name="GST"
                    value={gst}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                  <span className={styles.inputlabel}>GST</span>
                </div>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    className={styles.inputfeildCal}
                    name="totalAmount"
                    value={totalPrice1}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                  <span className={styles.inputlabel}>Total Amount</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.inputFlex3}>
          <button
            type="button"
            className={styles.saveButton}
            onClick={(e) => handleLogin(e)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Subscription;
