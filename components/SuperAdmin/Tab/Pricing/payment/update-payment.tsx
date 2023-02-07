import React, { MouseEventHandler, useEffect, useMemo, useState } from "react";

import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";

import {
  useAddSubscription,
  useGetMerchantDetails,
  useGetSubscription,
  useSendSms,
  useSendSmsForPayment,
  useSendSmsSubscibed,
  useUpdatePaymentDetails,
} from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/Merchant/subscription.module.scss";
import axios from "axios";
interface activeProps {
  setSubTab: any;
  currentId: any;
}
const UpdatePayment = ({ setSubTab, currentId }: activeProps) => {
  const router = useRouter();
  const date = new Date();
  const currDate = date.toISOString().slice(0, 10);
  const [image, setImage] = useState<any>();
  const [refID, setRef_ID] = useState<string>("");
  const [warningmessage,setWarningMessage] = useState("")
  const [invoice_Id, setInvoice_Id] = useState<string>("");
  const [payment_mode, setPaymentMode] = useState<string>("");

  const mobileno = currentId?.mobile_no;
  const vendors_name = currentId?.vendors_name;
  const price = currentId?.Amount;
  const plan =currentId?.plan;
  const start_date=currentId?.start_date;
  const end_date = currentId?.end_date;

  const [total, setTotal] = useState<string>("");
  const [test, setTest] = useState<any>([]);
  const [payment_status, setpayment_status] = useState<boolean>(false);
  const { error, isLoading, data, mutate, isSuccess } =
    useUpdatePaymentDetails();
  const { mutate: smsMutate, isSuccess: isSuccess2 } = useSendSmsForPayment();
  const {mutate:SubscribedSmsMutate,isSuccess:isSuccess3} = useSendSmsSubscibed()
  const { data: userData, refetch: userRefetch } = useGetMerchantDetails();
 

  const  handleSendSubscribedSms=()=>{
    SubscribedSmsMutate({
      mobileno,
      vendors_name,
     
      plan,
      start_date,
      end_date,
      type: "subscription",
    });
  
    }
    console.log("hello image",image?.type==="image/jpeg",warningmessage)

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // @ts-ignore
     if(image?.type==="image/jpeg"||image?.type==="image/jpg"||image?.type==="image/png"){

   
    mutate({
      payment_mode,
      payment_status,
      image: image,
      id: currentId?._id,
    });
  }else if(image?.type!="image/jpeg"||image?.type!="image/jpg"||image?.type!="image/png"){
    toast.error("file Type must be in JPG/JPEG/PNG")
  }
    if (payment_status) {
      smsMutate({
        mobileno,
        vendors_name,
        invoice_Id,
        refID,
        price: price,
        type: "payment",
      });

      handleSendSubscribedSms()

      
    }
  };

  useEffect(() => {
    //@ts-ignore
    if(image?.type==="image/jpeg"||image?.type==="image/jpg"||image?.type==="image/png"){

    } else{
      setWarningMessage("file type must be in jpg/jpeg/png")
    }
    if (isSuccess) {
      //@ts-ignore
      toast.success(data?.message);
      setSubTab("list");
    }
  }, [error, data, router, setSubTab, isSuccess,image]);
  return (
    <div className={styles.addsectionbottom}>
      <div className={styles.topTable}>
        <div className={styles.tableBoxx}>
          <h1 className={styles.subcatHeading}>Upload Payment Details</h1>
        </div>{" "}
        <div className={styles.inputFlex}>
          <div>
            <div className={styles.selectplan}>
              <span>Payment Status:</span>
              <div
                onClick={() => {
                  setpayment_status(true);
                }}
              >
                <h3>Done</h3>
                <input
                  type="radio"
                  // value={subsPlan}
                  checked={payment_status}
                />
              </div>
              {/* <div
                onClick={() => {
                  setpayment_status(false);
                }}
              >
                <h3>Not Done</h3>
                <input
                  type="radio"
                  // value={payment_status}
                  checked={!payment_status}
                />
              </div> */}
            </div>
          </div>
          <div>
            <select
              name="payment-mode"
              id=""
              value={payment_mode}
              className={styles.inputForm}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Net Banking">Net Banking</option>
              <option value="Phone Pay">Phone Pay</option>
              <option value="GPay">GPay</option>
              <option value="Paytm">Paytm</option>
              <option value="Card Payment">Card Payment</option>
            </select>
          </div>
          <div className={styles.inputbox}>
            <input
              type="text"
              className={styles.inputfeildCal}
              name="totalAmount"
              value={price}
              // onChange={(e) => setTotal(e.target.value)}
            />
            <span className={styles.inputlabel}>Total Amount</span>
          </div>
          <div className={styles.inputbox}>
            <input
              type="text"
              className={styles.inputfeildCal}
              name="refID"
              value={refID}
              onChange={(e) => setRef_ID(e.target.value)}
            />
            <span className={styles.inputlabel}>Ref_ID</span>
          </div>

          <div className={styles.inputflexupload}>
            <div className={styles.inputbox}>
              <input
                type="file"
                id="image"
                name="image"
                // value={image}
                className={styles.inputfeild}
                onChange={(e: any) => setImage(e.target.files[0])}
                
              />
              <span className={styles.inputlabel}>Upload File</span>
            </div>
          </div>
        </div>
        <div className={styles.inputFlex3}>
          {payment_status ? (
            <button
              type="button"
              className={styles.saveButton}
              onClick={(e) => handleLogin(e)}
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              className={styles.disablesubmitButton}
              onClick={(e) => handleLogin(e)}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default UpdatePayment;
