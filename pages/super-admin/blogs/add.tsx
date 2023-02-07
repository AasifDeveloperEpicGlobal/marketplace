import React, { useEffect, useState } from "react";

import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";

import { useAddBlogs } from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/addcategory.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

interface Person {
  name: string;
  age: number;
  count: number;
  "gift-wrap": "hello";
}

const Upload_Blogs: NextPage = () => {
  const formData = {
    name: "Amit",
    age: 25,
    count: 12,
  };
  const router = useRouter();



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
    <SuperAdminLayout>
      <div className={styles.mov}>
        <h1 className={styles.subcatHeading}>Add Blogs </h1>

        <div className="box3">
          <form action="" onSubmit={handleLogin}>
            <ul className="box345">
              <li>
                <label htmlFor="category_image" className="omra-lael">
                  Blog image
                </label>
                <input
                  type="file"
                  name="category_image"
                  id="category_image"
                  onChange={(e: any) => setBlog_image(e.target.files[0])}
                />
              </li>
              <li>
                <label htmlFor="category_name" className="omra-lael">
                  Blog Heading
                </label>
                <input
                  type="text"
                  name="category_name"
                  id="category_name"
                  onChange={(e) => setBlog_heading(e.target.value)}
                />
              </li>

              <li>
                <label htmlFor="category_name" className="omra-lael">
                  Blog Paragraph
                </label>
                <textarea
                  //   type="text"
                  rows={800}
                  cols={1000}
                  name="category_name"
                  id="category_name"
                  onChange={(e) => setBlog_paragraph(e.target.value)}
                />
              </li>

              <li style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                {/* <input type="submit" className='Upload-Button' /> */}

                <button className={styles.Add_Button}>Add Blogs</button>
                {/* <button className="Upload-Button">Submit</button> */}
              </li>
            </ul>
          </form>
          {/* <ul className="formstyle"></ul> */}
        </div>
      </div>
    </SuperAdminLayout>
  );
};
export default Upload_Blogs;
