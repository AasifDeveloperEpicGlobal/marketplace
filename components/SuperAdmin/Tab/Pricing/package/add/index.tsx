import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
// import Multiselect from "multiselect-react-dropdown";
import {
  useAddPackage,
  useGetMerchantDetails,
  useGetPackage,
  useGetService,
} from "../../../../../../networkAPI/queries";
import styles from "../../../../../../styles/Merchant/priceservice.module.scss";
import Select from "react-select";
interface activeProps {
  setSubTab: any;
}
const AddPackages = ({ setSubTab }: activeProps) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [benifits, setBenifits] = useState("");
  const [Services, setServices] = useState<any>({});
  const [validity, setValidity] = useState("");
  const [gst, setGst] = useState("");
  const [Amount, setAmount] = useState("");
  const [type, setType] = useState("");
  // const { error, isLoading, data, mutate } = useAddTeaserBanner();
  const { data, mutate, error } = useAddPackage();
  const { data: serviceData, refetch } = useGetService();
  const { data: QueryData, refetch: packadata } = useGetPackage();
  const { data: productData } = useGetMerchantDetails();
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const multiselectRef = React.createRef();
  const handleSelect = (selectedItems: any) => {
    let arraiItem: any[] = [];
    selectedItems.map((item: any) => {
      arraiItem.push(item.value);
    });
    setSelectedFlavors(selectedItems);
  };
  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({
      name: name,
      price: price,
      benifits: benifits,
      Services,

      Amount: Amount,
      type: type,
    });
  };
  const totaladd = selectedFlavors
    .map((item: any) => parseInt(item.amount))
    .reduce((prev: any, curr: any) => prev + curr, 0);
  useEffect(() => {
    setServices(selectedFlavors);
    setAmount(totaladd);
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }
    //@ts-ignore
    if (data?.success == true) {
      //@ts-ignore
      toast.success(data?.message);
      packadata();
      setSubTab("list");
    }
  }, [error, data, router, setSubTab, packadata, totaladd]);

  const optiondata = serviceData?.data;
  const options = optiondata?.map((item: any, index: any) => {
    return { value: item._id, label: item.name, amount: item.price };
  });

  return (
    <>
      <div className={styles.addsectionbottom}>
        <div className={styles.topTable}>
          <div className={styles.tableBoxx}>
            <h1 className={styles.subcatHeading}>Create New Package</h1>
          </div>
          <div className={styles.inputFlex}>
            <div>
              <label>Package Name</label>
              <input
                type="text"
                name="search2"
                className={styles.inputBox1}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                name="benifits"
                className={styles.inputForm}
                onChange={(e) => setBenifits(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputFlex}>
            <div>
              {/* <label>Select Services</label> */}
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
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                type="text"
                // placeholder="Enter Amount /Month"
                name="amount"
                disabled
                value={totaladd}
                className={`  ${styles.disableinput} ${styles.inputForm}`}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputFlex3}>
            <button
              type="button"
              className={styles.saveButton}
              onClick={(e) => handleLogin(e)}
            >
              Create New
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddPackages;
