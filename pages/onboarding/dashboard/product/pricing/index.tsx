import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import AdminLayout from "../../../../../components/AdminLayout";
import { useAddBlogs, useCategory } from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/Merchant/pricing.module.scss";

import ArrowTick from "components/svg-icons/arrowTick";

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
    <AdminLayout>
      <div className={styles.container_width}>
        <div className={styles.mov}>
          <div>
            <h1 className={styles.subcatHeading}>Pricing</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>{" "}
          </div>
        </div>
        <div className={styles.billSection}>
          <div>Billed Monthly</div>

          <div className="switch">
            <input type="checkbox" checked />
            <span className="slider round"></span>
          </div>

          <div>Billed Annually</div>
        </div>
        <div className={styles.mainFlexBox}>
          <div className={styles.pricingFlex}>
            <div>
              <div className={styles.topTable}>
                <div className={styles.tableBoxx}>
                  <h1 className={styles.subcatHeading}>Free</h1>
                </div>
                <div className={styles.tableMain}>
                  <h1>
                    &#x20b9;0<span className={styles.greyFont}>/year</span>
                  </h1>{" "}
                </div>{" "}
                <div className={styles.tableMain}>
                  <p>
                    Lorem ipsum dolor sit amete consectetur adipiscing elit
                    tempor
                  </p>
                </div>
                <div className={styles.tableMain}>
                  <div className={styles.mainBox}>
                    <h2>Features Included:</h2>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>All analytics features</div>
                    </div>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>Up to 250,000 tracked visits</div>
                    </div>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>Normal support</div>
                    </div>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>Mobile app</div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  <button type="button" className={styles.saveButton}>
                    <Link href="/blog">Select Plan</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.pricingFlex}>
            <div>
              <div className={styles.topTable}>
                <div className={styles.tableBoxx}>
                  <h1 className={styles.subcatHeading}>Professional</h1>
                </div>
                <div className={styles.tableMain}>
                  <h1>
                    &#x20b9;299<span className={styles.greyFont}>/year</span>
                  </h1>{" "}
                </div>{" "}
                <div className={styles.tableMain}>
                  <p>
                    Lorem ipsum dolor sit amete consectetur adipiscing elit
                    tempor
                  </p>
                </div>
                <div className={styles.tableMain}>
                  <div className={styles.mainBox}>
                    <h2>Features Included:</h2>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>All analytics features</div>
                    </div>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>Up to 250,000 tracked visits</div>
                    </div>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>Normal support</div>
                    </div>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>Mobile app</div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  <button type="button" className={styles.saveButton}>
                    <Link href="/blog">Select Plan</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.pricingFlex}>
            <div>
              <div className={styles.topTable}>
                <div className={styles.tableBoxx}>
                  <h1 className={styles.subcatHeading}>Enterprise</h1>
                </div>
                <div className={styles.tableMain}>
                  <h1>
                    &#x20b9;399<span className={styles.greyFont}>/year</span>
                  </h1>{" "}
                </div>{" "}
                <div className={styles.tableMain}>
                  <p>
                    Lorem ipsum dolor sit amete consectetur adipiscing elit
                    tempor
                  </p>
                </div>
                <div className={styles.tableMain}>
                  <div className={styles.mainBox}>
                    <h2>Features Included:</h2>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>All analytics features</div>
                    </div>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>Up to 250,000 tracked visits</div>
                    </div>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>Normal support</div>
                    </div>
                    <div className={styles.featuredBox}>
                      <div>
                        <ArrowTick />
                      </div>
                      <div>Mobile app</div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  <button type="button" className={styles.saveButton}>
                    <Link href="/">Select Plan</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default Pricing;
