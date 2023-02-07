import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import Image from "next/image";
import { useAddBlogs } from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/notification.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import DeleteNotification from "components/svg-icons/deletenotification";
import Spam from "components/svg-icons/spam";
import Archive from "components/svg-icons/archive";

interface Person {
  name: string;
  age: number;
  count: number;
  "gift-wrap": "hello";
}

const Notification: NextPage = () => {
  const formData = {
    name: "Amit",
    age: 25,
    count: 12,
  };
  const router = useRouter();

  // const {
  //   error: err,
  //   user,
  //   isAuthenticated,
  // } = useAppSelector((state) => state.user);

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
      <div className={styles.container_width}>
        <div className={styles.mov}>
          <div>
            <h1 className={styles.subcatHeading}>All Notifications</h1>
            {/* <p>Here is merchant data here</p> */}
          </div>
        </div>
        <div className={styles.topTable}>
          <div className={styles.tableBoxx}>
            <div>
              <h1 className={styles.subcatHeading}>Notifications</h1>
            </div>

            <div className={styles.arrowBox}>
              <div>
                <button type="button" className={styles.allButton}>
                  <Link href="#"> All </Link>
                </button>
              </div>
              <div>
                <button type="button" className={styles.unRead}>
                  <Link href="#">
                    <a>
                      Unread <span className={styles.notification}>3</span>
                    </a>
                  </Link>
                </button>
              </div>

              <div>
                <button type="button" className={styles.unRead}>
                  <Link href="#">
                    <a>
                      Read <span className={styles.notification}>3</span>
                    </a>
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.notificationtab}>
            <div>
              <form action="">
                <input type="checkbox"></input>
              </form>
            </div>
            <div>
              <DeleteNotification />
            </div>
            <div>
              <Spam />
            </div>
            <div>
              <Archive />
            </div>
          </div>
          <div className={styles.daytext}>
            <h4 className={styles.todayBox}>Today</h4>
          </div>
          <div className={styles.tableMain}>
            <div className={styles.flexNotification}>
              <div className={styles.dropdownBox}>
                <div>
                  <form action="">
                    <input type="checkbox"></input>
                  </form>
                </div>
                <div>
                  <Image
                    src="/omratrade/p2.svg"
                    height={40}
                    width={40}
                    alt=" Image"
                  />
                </div>
                <div className={styles.nameContainer}>
                  <div className={styles.notificationName}>
                    Lucky Engineering Works
                  </div>
                  <div className={styles.notificationName1}>
                    John Carter has opened the email you sent , John Carter has
                    opened the email you sent.
                  </div>
                </div>
              </div>
              <div className={styles.dotClass}>
                <div>1h</div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
          <div className={styles.tableMain}>
            <div className={styles.flexNotification}>
              <div className={styles.dropdownBox}>
                <div>
                  <form action="">
                    <input type="checkbox"></input>
                  </form>
                </div>
                <div>
                  <Image
                    src="/omratrade/p2.svg"
                    height={40}
                    width={40}
                    alt=" Image"
                  />
                </div>
                <div className={styles.nameContainer}>
                  <div className={styles.notificationName}>Cody Edwards</div>
                  <div className={styles.notificationName1}>
                    John Carter has opened the email has opened the email you
                    sent.
                  </div>
                </div>
              </div>{" "}
              <div className={styles.dotClass}>
                <div>Oct 22, 2022</div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
          <div className={styles.tableMain}>
            <div className={styles.flexNotification}>
              <div className={styles.dropdownBox}>
                <div>
                  <form action="">
                    <input type="checkbox"></input>
                  </form>
                </div>
                <div>
                  <Image
                    src="/omratrade/p2.svg"
                    height={40}
                    width={40}
                    alt=" Image"
                  />
                </div>
                <div className={styles.nameContainer}>
                  <div className={styles.notificationName}>Cody Edwards</div>
                  <div className={styles.notificationName1}>
                    John Carter has opened the email you sent .
                  </div>
                </div>
              </div>
              <div className={styles.dotClass}>
                <div>Oct 27, 2022</div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
          <div className={styles.tableMain}>
            <div className={styles.flexNotification}>
              <div className={styles.dropdownBox}>
                <div>
                  <form action="">
                    <input type="checkbox"></input>
                  </form>
                </div>
                <div>
                  <Image
                    src="/omratrade/p2.svg"
                    height={40}
                    width={40}
                    alt=" Image"
                  />
                </div>
                <div className={styles.nameContainer}>
                  <div className={styles.notificationName}>Cody Edwards</div>
                  <div className={styles.notificationName1}>
                    John Carter has opened the email you sent .
                  </div>
                </div>
              </div>{" "}
              <div className={styles.dotClass}>
                <div>Oct 28, 2022</div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
export default Notification;
