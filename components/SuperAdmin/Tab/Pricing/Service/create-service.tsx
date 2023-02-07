import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";

import styles from "../../../../../styles/Merchant/priceservice.module.scss";
import Rupee from "components/svg-icons/rupee";
import { useAddMRPRate, useAddService } from "networkAPI/queries";
import Activebuttons from "../buttons";
interface activeProps {
  setSubTab: any;
}
const CreateService = ({ setSubTab }: activeProps) => {
  const router = useRouter();

  // const { user, isAuthenticated } = useAppSelector((state) => state.user);

  const [price, setPrice] = useState<string>("");
  const [unit1, setUnit1] = useState<string>("");
  const [unit, setUnit] = useState<string>("");

  const { data, isLoading, mutate, error } = useAddMRPRate();

  useEffect(() => {
    const perUnit = `Rs/${unit1}`;
    setUnit(perUnit);
  }, [unit1]);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      mutate({
        price,
        unit,
      });
    },
    [mutate, price, unit]
  );
  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }
    // @ts-ignore
    if (data?.success == true) {
      // @ts-ignore
      toast.success(data?.message);
      // handleResetForm();
      setSubTab("list");
      // reset()
    } else {
      //@ts-ignore
      toast.error(data?.message);
      // router.replace("/admindashboard/blogs");
    }
  }, [error, data, router, setSubTab]);

  return (
    <div className={styles.addsectionbottom}>
      <div className={styles.topTable}>
        <div className={styles.tableBoxx}>
          <h1 className={styles.subcatHeading}>Create New Price</h1>
        </div>
        <form action="">
          <div className={styles.inputFlex}>
            <div className={styles.inputbox}>
              <input
                type="number"
                className={styles.inputfeild}
                value={price}
                name="service"
                onChange={(e: any) => setPrice(e.target.value)}
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
                value={unit1}
                onChange={(e) => setUnit1(e.target.value)}
              />
              <span className={styles.inputlabel}>Unit</span>
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
export default CreateService;
