import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import Image from "next/image";
import { useAddBlogs } from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/demoblog.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import LeftArrow from "components/svg-icons/leftarrow";
import RightArrow from "components/svg-icons/rightarrow";

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
      <div>
        <div className={styles.mov}>
          <div>
            <h1 className={styles.subcatHeading}>All Merchant</h1>
            <p>Here is merchant data here</p>
          </div>
          <div>
            <button type="button" className={styles.downloadButton}>
              <Link href="/blog"> Download </Link>
            </button>
          </div>
        </div>
        <div className={styles.topTable}>
          <div className={styles.tableBoxx}>
            <div>All Merchant</div>

            <div className={styles.arrowBox}>
              <div>1 - 10 of 640</div>
              <div>
                <RightArrow />
              </div>
              <div>
                <LeftArrow />
              </div>
            </div>
          </div>
          <div className={styles.tableMain}>
            <div>
              <input type="checkbox" id="" name="" value="" />
            </div>
            <div>INV-61684</div>
            <div>John Carter</div>
            <div>Oct 20, 2023</div>
            <div>$11,250</div>
            <div>John Carter</div>
            <div>Paid</div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/edit.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/delete.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
          </div>
          <div className={styles.tableMain3}>
            <div>
              <input type="checkbox" id="" name="" value="" />
            </div>
            <div>INV-61684</div>
            <div>John Carter</div>
            <div>Oct 20, 2023</div>
            <div>$11,250</div>
            <div>John Carter</div>
            <div>Paid</div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/edit.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/delete.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
          </div>
          <div className={styles.tableMain3}>
            <div>
              <input type="checkbox" id="" name="" value="" />
            </div>
            <div>INV-61684</div>
            <div>John Carter</div>
            <div>Oct 20, 2023</div>
            <div>$11,250</div>
            <div>John Carter</div>
            <div>Paid</div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/edit.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/delete.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
          </div>
          <div className={styles.tableMain3}>
            <div>
              <input type="checkbox" id="" name="" value="" />
            </div>
            <div>INV-61684</div>
            <div>John Carter</div>
            <div>Oct 20, 2023</div>
            <div>$11,250</div>
            <div>John Carter</div>
            <div>Paid</div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/edit.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/delete.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
          </div>
          <div className={styles.tableMain3}>
            <div>
              <input type="checkbox" id="" name="" value="" />
            </div>
            <div>INV-61684</div>
            <div>John Carter</div>
            <div>Oct 20, 2023</div>
            <div>$11,250</div>
            <div>John Carter</div>
            <div>Paid</div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/edit.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/delete.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
          </div>
          <div className={styles.tableMain3}>
            <div>
              <input type="checkbox" id="" name="" value="" />
            </div>
            <div>INV-61684</div>
            <div>John Carter</div>
            <div>Oct 20, 2023</div>
            <div>$11,250</div>
            <div>John Carter</div>
            <div>Paid</div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/edit.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/delete.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
          </div>
          <div className={styles.tableMain3}>
            <div>
              <input type="checkbox" id="" name="" value="" />
            </div>
            <div>INV-61684</div>
            <div>John Carter</div>
            <div>Oct 20, 2023</div>
            <div>$11,250</div>
            <div>John Carter</div>
            <div>Paid</div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/edit.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
            <div>
              <Image
                data-lazyloaded="1"
                src="/svg/delete.svg"
                height={24}
                width={24}
                alt="Logo Image"
                className={styles.imageLogo}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.mov}>
          <div>
            <h1 className={styles.subcatHeading}>All Merchant</h1>
            <p>Here is merchant data here</p>
          </div>
          <div>
            <button type="button" className={styles.downloadButton}>
              <Link href="/blog"> Download </Link>
            </button>
          </div>
        </div>
        <div className={styles.topTable}>
          <div className={styles.tableBoxx}>
            <div>All Merchant</div>

            <div className={styles.arrowBox}>
              <div>1 - 10 of 640</div>
              <div>
                <RightArrow />
              </div>
              <div>
                <LeftArrow />
              </div>
            </div>
          </div>
          <div className={styles.tableMain}>
            <div className={styles.boxFlex}>
              <div>
                <h4>Heading3</h4>
              </div>
              <div>Heading</div>
            </div>
            <div className={styles.boxFlex}>
              <h4>Heading3</h4>
              <div>Heading</div>
            </div>
            <div className={styles.boxFlex}>
              <h4>Heading3</h4>
              <div>Heading</div>
            </div>
            <div className={styles.boxFlex}>
              <h4>Heading3</h4>
              <div>Heading</div>
            </div>
            <div className={styles.boxFlex}>
              <h4>Heading3</h4>
              <div>Heading</div>
            </div>
            <div className={styles.boxFlex}>
              <h4>Heading3</h4>
              <div>Heading</div>
            </div>
            <div className={styles.boxFlex}>
              <h4>Heading3</h4>
              <div>Heading</div>
            </div>
            <div className={styles.boxFlex}>
              <h4>Heading3</h4>
              <div>Heading</div>
            </div>
          </div>
        </div>{" "}
      </div>
    </SuperAdminLayout>
  );
};
export default Upload_Blogs;
