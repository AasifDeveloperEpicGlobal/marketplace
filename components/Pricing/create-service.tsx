import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import {
  useAddBlogs,
  useAddService,
  useCategory,
} from "../../networkAPI/queries";
import styles from "../../styles/Merchant/priceservice.module.scss";
import Rupee from "components/svg-icons/rupee";
const CreateService: NextPage = () => {
  const router = useRouter();

  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<string>("");
  const [benifits, setBenifits] = useState<string>("");
  const [rate, setRate] = useState<number>(0);
  const [unit1, setUnit1] = useState<string>("");
  const [unit2, setUnit2] = useState<string>("");

  const [unit, setUnit] = useState<any>([]);
  const [type, setType] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { data, isLoading, mutate, error, reset, isSuccess } = useAddService();

  const handleAdd = (e: any) => {
    e.preventDefault();
  };
  const handleResetForm = () => {
    setName("");
    setPrice("");
    setBenifits("");
    setType("");
  };

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
    },
    [benifits, data, mutate, name, price, type]
  );
  const handlePrice = () => {};

  useEffect(() => {
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
      handleResetForm();
      // reset()
    }
  }, [error, data, router, reset]);

  useEffect(() => {
    const total = (rate * quantity) / 100;

    setTotalPrice(total);
    setUnit(`${unit1}/${unit2}`);
  }, [quantity, rate, unit1, unit2]);

  return (
    <div className={styles.topTable}>
      <div className={styles.tableBoxx}>
        <h1 className={styles.subcatHeading}>Create New Service</h1>
      </div>
      <form action="">
        <div className={styles.inputFlex}>
          <div className={styles.inputbox}>
            <input
              type="text"
              className={styles.inputfeild}
              value={name}
              name="service"
              onChange={(e) => setName(e.target.value)}
            />
            <span className={styles.inputlabel}>Service Name</span>
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
            <input
              type="text"
              className={styles.inputfeild}
              value={name}
              name="service"
              onChange={(e) => setName(e.target.value)}
            />
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
              value={benifits}
              onChange={(e) => setBenifits(e.target.value)}
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
            {" "}
            <label htmlFor="prices">Total Price</label>
            <input
              type="text"
              name="prices"
              disabled
              className={styles.inputBox1}
              value={totalPrice}
              // onChange={handlePrice }
            />{" "}
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
  );
};
export default CreateService;
