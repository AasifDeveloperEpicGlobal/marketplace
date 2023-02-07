import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import { useAddBlogs } from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/addtocart.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

interface Person {
  name: string;
  age: number;
  count: number;
  "gift-wrap": "hello";
}

const Pricing: NextPage = () => {
  const formData = {
    name: "Amit",
    age: 25,
    count: 12,
  };
  const router = useRouter();

  const { user, isAuthenticated } = useAppSelector((state) => state.user);

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

  const [dropdown, setDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLLIElement>(null);
  return (
    <SuperAdminLayout>
      <div className={styles.container_width}>
        <div className={styles.mov}>
          <div>
            <h1 className={styles.subcatHeading}>Pricing</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>{" "}
          </div>
        </div>

        <div className={styles.addBox}>
          <div className={styles.topTable}>
            <h1 className={styles.subcatHeading}>Professional</h1>

            <p>Lorem ipsum dolor sit amet consectetur</p>

            <h1>
              $199<span className={styles.greyFont}>/year</span>
            </h1>
          </div>

          <div className={styles.featuredBox}>
            <div>
              <ul>
                <li onClick={() => setDropdown(!dropdown)}>
                  <button type="button" className={styles.seclectionBillButton}>
                    Select Plan
                  </button>
                  <div
                    style={{
                      opacity: dropdown ? 1 : 0,
                    }}
                    className={styles.dropdown}
                  >
                    <ul className={styles.toprightheader}>
                      <li>Annual Bill</li>

                      <Link href="#">
                        <li>Monthly Bill</li>
                      </Link>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <button type="button" className={styles.saveButton}>
                <Link href="/blog">Select Plan</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={styles.topTable}>
          <h1 className={styles.subcatHeading}>Professional plan</h1>

          <div className={styles.tableMain}>
            <p>
              Feugiat elit imperdiet enim pellentesque nibh bibendum lacinia
              pulvinar justo cursus ultricies adipiscing risus porta scelerisque
              at ipsum.
            </p>
          </div>
          <h1 className={styles.subcatHeading}>What's included in the plan?</h1>

          <div className={styles.tableMain}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis
              arcu enim urna adipiscing praesent velit viverra sit semper lorem
              eu cursus vel hendrerit elementum morbi curabitur etiam nibh justo
              lorem aliquet donec sed sit mi dignissim at ante massa mattis.
            </p>
          </div>
          <h1 className={styles.subcatHeading}>
            Is this the right pricing plan for my company?
          </h1>

          <div className={styles.tableMain}>
            <p>
              Vitae congue eu consequat ac felis placerat vestibulum lectus
              mauris ultrices cursus sit amet dictum sit amet justo donec enim
              diam porttitor lacus luctus accumsan tortor posuere praesent
              tristique magna sit amet purus gravida quis blandit turpis.
            </p>
          </div>

          <div> </div>
        </div> */}
    </SuperAdminLayout>
  );
};
export default Pricing;
