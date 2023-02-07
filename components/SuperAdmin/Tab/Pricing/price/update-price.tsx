import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import styles from "../../../../../styles/Merchant/priceservice.module.scss";
import Rupee from "components/svg-icons/rupee";
import { useUpdateAddMRPRate } from "networkAPI/queries";
interface serviceProps {
  currentId: any;
  setSubTab: any;
}

const UpdatePrice = ({ currentId, setSubTab }: serviceProps) => {
  const router = useRouter();

  const [price, setPrice] = useState<string>("");
  const [unit1, setUnit1] = useState<string>("");
  const [unit, setUnit] = useState<string>("");

  const { data, isLoading, mutate, error } = useUpdateAddMRPRate();

  useEffect(() => {
    const perUnit = `rs/${unit1}`;
    setUnit(perUnit);
  }, [unit1]);

  console.log(currentId)
 

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      mutate({
        price: price,
        unit: unit,
        id: currentId?._id as string,

        type: "",
      });
    },
    [currentId, mutate, price, unit]
  );

  
  useEffect(() => {
    // if (error instanceof AxiosError) {
    //   toast.error(error?.response?.data?.message || error.message);
    // }

    
    // @ts-ignore
    if (data?.success == true) {
      // @ts-ignore
      toast.success(data?.message);
      // handleResetForm();
      setSubTab("list");
      // reset()
    } else {
      //@ts-ignore
    //   toast.error(data?.message);
      // router.replace("/admindashboard/blogs");
    }
  }, [error, data, router, setSubTab]);

  return (
    <div className={styles.addsectionbottom}>
      <div className={styles.topTable}>
        <div className={styles.tableBoxx}>
          <h1 className={styles.subcatHeading}>Update</h1>
          {/* <h2>{currentId?._id}</h2> */}
        </div>
        <form action="">
          <div className={styles.inputFlex}>
            <div className={styles.inputbox}>
              <input
                type="number"
                className={styles.inputfeild}
                // value={price}
                defaultValue={currentId?.price}
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
                defaultValue={currentId?.unit}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePrice;
