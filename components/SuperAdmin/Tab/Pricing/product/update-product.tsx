import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";

import styles from "../../../../../styles/Merchant/priceservice.module.scss";

import Rupee from "components/svg-icons/rupee";
import {
  useAddService,
  useGetMRPRate,
  useUpdateService,
} from "networkAPI/queries";
import { current } from "@reduxjs/toolkit";

interface serviceProps {
  currentId: any;
  setSubTab: any;
}
const UpdateProduct = ({ currentId, setSubTab }: serviceProps) => {
  const router = useRouter();
  const [previewData, setPreviewData] = useState<any>([]);
  const [mrp_id, setMrpId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [benifits, setBenifits] = useState<string>("");
  const [rate, setRate] = useState<string>(currentId?.rate);
  const [unit, setUnit] = useState<string>(currentId?.unit);
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const { data, isLoading, mutate, error, reset, isSuccess } =
    useUpdateService();
  const { data: pricingData, refetch } = useGetMRPRate();
  const handlePrice = (e: any) => {
    setPrice(e.target.value);
  };
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      //@ts-ignore

      mutate({
        name: name || previewData?.name,
        mrp_id: mrp_id || previewData?._id,
        rate: rate,
        unit: unit,
        quantity: quantity || previewData?.quantity,
        price: price || previewData?.price,
        benifits: benifits || previewData?.benifits,
        type: type,
        id: previewData?._id as string,
      });
    },
    [
      benifits,
      data,
      mrp_id,
      mutate,
      name,
      previewData?._id,
      previewData?.benifits,
      previewData?.name,
      previewData?.price,
      previewData?.quantity,
      price,
      quantity,
      rate,
      type,
      unit,
    ]
  );

  useEffect(() => {
    const getpreviewData = async () => {
      setPreviewData(currentId);
    };
    getpreviewData();

    const mprData = pricingData?.data?.data?.find(
      (item: any) => item._id == mrp_id
    );
    if (!mrp_id) {
      setMrpId(previewData?._id);
    }
    setRate(mprData?.price || previewData?.rate);
    setQuantity(quantity || previewData?.quantity);
    setUnit(mprData?.unit || previewData?.unit);
    const test11 = parseFloat(rate) * parseInt(quantity);
    setPrice(test11.toString());
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (data) {
      //@ts-ignore
      // toast.success(data?.message);
      // router.replace("/admindashboard/blogs");
    }

    // @ts-ignore
    if (data?.success == true) {
      // handleResetForm();
      setSubTab("list");
      // refetch();
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
    previewData,
    mrp_id,
  ]);

  return (
    <div className={styles.addsectionbottom}>
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
                // value={name}
                defaultValue={previewData?.name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className={styles.inputlabel}>Service Name</span>
            </div>

            <div className={styles.inputbox}>
              <input
                type="text"
                className={styles.inputfeild}
                // value={benifits}
                defaultValue={previewData?.benifits}
                onChange={(e) => setBenifits(e.target.value)}
              />
              <span className={styles.inputlabel}>Description</span>
            </div>
          </div>
          <div className={styles.inputFlex}>
            <div className={styles.inputbox}>
              <select
                name="rate"
                //  value={mrp_id}
                defaultValue={currentId?.mrp_id}
                className={styles.inputfeild}
                onChange={(e) => setMrpId(e.target.value)}
              >
                {/* <option value={rate}></option> */}
                {pricingData?.data?.data?.map((item: any) => {
                  return (
                    <option
                      key={item._id}
                      value={item._id}
                      selected={currentId?.mrp_id == item._id ? true : false}
                    >
                      {item.price}
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
                // defaultValue={unit}
                // onChange={(e) => setUnit(e.target.value)}
              />
              <span className={styles.inputlabel}>Unit</span>
            </div>
          </div>{" "}
          <div className={styles.inputFlex}>
            <div className={styles.inputbox}>
              <label htmlFor="Quantity">Quantity</label>
              <input
                type={"text"}
                name="Quantity"
                className={styles.inputBox1}
                // value={quantity}
                defaultValue={previewData?.quantity}
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
                value={price}
                defaultValue={previewData?.price}
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
    </div>
  );
};
export default UpdateProduct;
