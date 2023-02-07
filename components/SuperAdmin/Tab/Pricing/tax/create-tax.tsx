import React, {
  MouseEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";

import styles from "../../../../../styles/Merchant/priceservice.module.scss";

import Rupee from "components/svg-icons/rupee";
import { useAddService, useGetMRPRate } from "networkAPI/queries";
import { ref } from "yup";

interface activeProps {
  setSubTab: any;
}
const CreateTax = ({ setSubTab }: activeProps) => {
  const router = useRouter();

  // const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  // const [price, setPrice] = useState<string>("");
  const [benifits, setBenifits] = useState<string>("");
  const [rate, setRate] = useState<string>("0");

  const [unit, setUnit] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("0");

  const { data, isLoading, mutate, error, reset, isSuccess } = useAddService();
  const { data: pricingData, refetch } = useGetMRPRate();
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      mutate({
        name: name,
        rate: rate,
        unit: unit,
        quantity: quantity,
        price: price,
        benifits: benifits,
        type: type,
        mrp_id: "",
      });
    },
    [benifits, data, mutate, name, price, quantity, rate, type, unit]
  );
  useEffect(() => {
    const unitData = pricingData?.data?.data?.find(
      (item: any) => item.price == rate
    );
    setUnit(unitData?.unit);

    const test11 = parseFloat(rate) * parseInt(quantity);
    setPrice(test11.toString());

    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (data) {
      //@ts-ignore
      toast.success(data?.message);
      // router.replace("/admindashboard/blogs");
    }

    // @ts-ignore
    if (data?.success == true) {
      // handleResetForm();
      setSubTab("list");
      refetch();
      // reset()
    }
  }, [
    error,
    data,
    router,
    reset,
    setSubTab,
    refetch,
    pricingData,
    rate,
    quantity,
  ]);

  return (
    <div className={styles.addsectionbottom}>
      <div className={styles.topTable}>
        <div className={styles.tableBoxx}>
          <h1 className={styles.subcatHeading}>Create New Tax</h1>
        </div>
        <form action="">
          <div className={styles.inputFlex}>
            <div className={styles.inputbox}>
              <input
                type="text"
                className={styles.inputfeild}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className={styles.inputlabel}>Tax Name</span>
            </div>

            <div className={styles.inputbox}>
              <input
                type="text"
                className={styles.inputfeild}
                value={benifits}
                onChange={(e) => setBenifits(e.target.value)}
              />
              <span className={styles.inputlabel}>Description</span>
            </div>
          </div>
          <div className={styles.inputFlex}>
            <div className={styles.inputbox}>
              <select
                name="rate"
                id=""
                value={rate}
                className={styles.inputfeild}
                onChange={(e: any) => setRate(e.target.value)}
              >
                {pricingData?.data?.data?.map((item: any) => {
                  return (
                    <option key={item._id} value={item.price}>
                      {item.price} {item.unit}
                    </option>
                  );
                })}
              </select>
              <span className={styles.inputlabel}>Rate</span>
              <span className={styles.rupeeinputbox}>
                {" "}
                <Rupee />
              </span>
            </div>

            <div className={styles.inputbox}>
              <input
                type="text"
                className={styles.inputfeild}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
              <span className={styles.inputlabel}>Unit</span>
            </div>
          </div>{" "}
          <div className={styles.inputFlex}>
            <div className={styles.inputbox}>
              <label htmlFor="Quantity">Quantity</label>
              <input
                type={"number"}
                name="Quantity"
                id=""
                className={styles.inputBox1}
                value={quantity}
                onChange={(e: any) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="prices">Total Price</label>
              <input
                type="text"
                name="prices"
                disabled
                className={` ${styles.inputBox1} ${styles.disableinput} `}
                value={price}
                // onChange={handlePrice }
              />
            </div>
          </div>
          <div className={styles.inputFlex3}>
            <button
              type="button"
              className={styles.saveButton}
              onClick={(e) => handleSubmit(e)}
            >
              Create New
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateTax;
