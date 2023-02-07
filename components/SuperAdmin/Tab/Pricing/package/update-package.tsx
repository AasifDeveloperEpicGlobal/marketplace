import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import styles from "../../../../../styles/Merchant/priceservice.module.scss";
import Select from "react-select";
import {
  useAddPackage,
  useGetService,
  useUpdatePackage,
} from "networkAPI/queries";
interface activeProps {
  currentId: any;
  setSubTab: any;
}
const UpdatePackages = ({ setSubTab, currentId }: activeProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [benifits, setBenifits] = useState("");
  const [Services, setServices] = useState<any>([]);
  const [validity, setValidity] = useState("");
  const [gst, setGst] = useState("");
  const [Amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const { data, mutate, error, isSuccess } = useUpdatePackage();
  const { data: serviceData, refetch } = useGetService();
  const [selectedFlavors, setSelectedFlavors] = useState([]);
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
      name: name || currentId?.name,
      price: price || currentId?.price,
      benifits: benifits || currentId?.benifits,
      Services: selectedFlavors,
      Amount,
      type: type,
      validity: currentId?.validity,
      gst: "",
      id: currentId?._id as string,
    });
  };

  useEffect(() => {
    if (selectedFlavors.length == 0) {
      setSelectedFlavors(currentId?.Services);
    } else {
      setServices(selectedFlavors);
    }
    const totalPrice = selectedFlavors
      ?.map((item: any) => item.price)
      .reduce((prev: any, curr: any) => parseInt(prev) + parseInt(curr), 0);

    setAmount(totalPrice);

    if (isSuccess) {
      //@ts-ignore
      toast.success(data?.message);
      setSubTab("list");
    }
  }, [
    error,
    data,
    router,
    setSubTab,
    isSuccess,
    selectedFlavors,
    currentId,
    Amount,
  ]);

  const optiondata = serviceData?.data;

  const options = optiondata?.map((item: any, index: any) => {
    return { value: item._id, label: item.name, price: item.price };
  });

  return (
    <>
      <div className={styles.mov}></div>
      <div className={styles.topTable}>
        <div className={styles.tableBoxx}>
          <h1 className={styles.subcatHeading}>Create New Package</h1>
          <h2>{currentId?._id}</h2>
        </div>
        <div className={styles.inputFlex}>
          <div>
            <label>Package Name</label>
            <input
              type="text"
              name="search2"
              defaultValue={currentId?.name}
              className={styles.inputBox1}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="search2"
              className={styles.inputForm}
              defaultValue={currentId?.benifits}
              onChange={(e) => setBenifits(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.inputFlex}>
          <div>
            <Select
              // @ts-ignore
              options={options}
              placeholder="Select services"
              defaultValue={currentId?.Services}
              onChange={handleSelect}
              isSearchable={true}
              isMulti={true}
            />
          </div>
          <div>
            <label>Amount</label>
            <input
              type="text"
              name="search2"
              defaultValue={currentId?.Amount}
              className={` ${styles.inputForm} ${styles.disableinput} `}
              value={Amount}
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
    </>
  );
};
export default UpdatePackages;
