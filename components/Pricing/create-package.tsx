import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import { useAddBlogs } from "../../networkAPI/queries";
import styles from "../../styles/Merchant/priceservice.module.scss";

interface Person {
  name: string;
  age: number;
  count: number;
  "gift-wrap": "hello";
}

const CreatePackage: NextPage = () => {
  const formData = {
    name: "Amit",
    age: 25,
    count: 12,
  };
  const router = useRouter();

  const {
  
    user,
    isAuthenticated,
  } = useAppSelector((state) => state.user);

  const [blog_heading, setBlog_heading] = useState<string>("");
  const [blog_paragraph, setBlog_paragraph] = useState("");

  const [blog_image, setBlog_image] = useState<any>();

  // const [product_name,setProduct_name] =useState<string>("")

  const { error, isLoading, data, mutate } = useAddBlogs();
 

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      blog_heading,
      blog_paragraph,
      blog_image,
    });
  };

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (data) {
      toast.success("upload Successfull");
      router.replace("/admindashboard/blogs");
    }
  }, [error, data, router]);


  return (
    <div className={styles.container_width}>
      <div className={styles.mov}>
        <div>
          <h1 className={styles.subcatHeading}>Services/Packages</h1>
          <p>Create new Services/Packages here</p>
        </div>
      </div>
      <div>
        <div className={styles.topTable}>
          <div className={styles.tableBoxx}>
            <h1 className={styles.subcatHeading}>Create New Package</h1>
          </div>

          <div className={styles.serviceBox}>
            <div>
              <input type="radio" id="html" name="fav_language" value="HTML" />{" "}
              Service
            </div>
            <div>
              <input type="radio" id="html" name="fav_language" value="HTML" />
              Package
            </div>
            <div>
              <p> Enter Package Name & Amount to create new Package here </p>
            </div>
          </div>

          <div className={styles.inputFlex}>
            <div>
              {" "}
              <h3>Package Name</h3>
              <input
                type="text"
                placeholder="Enter Service Name"
                name="search2"
                className={styles.inputForm}
              />
            </div>
            <div>
              {" "}
              <h3>Amount</h3>
              <input
                type="text"
                placeholder="Enter Amount /Month"
                name="search2"
                className={styles.inputForm}
              />
            </div>
          </div>

          <div className={styles.inputFlex3}>
            <button type="button" className={styles.saveButton}>
              <Link href="#">Create New</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePackage;
