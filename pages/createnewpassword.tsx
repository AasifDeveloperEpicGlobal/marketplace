import { useCallback, useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { useGetCompanyProfile, useLogin } from "../networkAPI/queries";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "../styles/Merchant/forgotpassword.module.scss";
import { setUser } from "redux/slices/userSlice";
import Cancel from "components/svg-icons/cancel";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: login } = useLogin();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { data: data, error: err } = useGetCompanyProfile();
  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login(
        {
          email,
          password,
        },
        {
          onSuccess: (data: any) => {
            dispatch(
              setUser({
                user: data.user,
                token: data.token,
                isAuthenticated: true,
              })
            );

            toast.success(data?.message);
            if (data.user.role === "Admin") {
              Router.push(`/onboarding/dashboard`);
            } else if (data.user.role === "SuperAdmin") {
              Router.push(`/super-admin`);
            } else {
              Router.push(`/`);
            }
          },
        }
      );
      // await axiosInstance.post("/api/logout")
    },
    [email, password, login, dispatch]
  );

  const [showPassword, setshowPassword] = useState(false);

  const showPasswordHandler = useCallback(() => {
    setshowPassword(!showPassword);
  }, [showPassword]);

  //For Email validation starts

  // const [email1, setEmail1] = useState("");
  const [message, setMessage] = useState("");

  const emailValidation = () => {
    const regEx = /^([a-zA-Z0-9\.-_]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (!regEx.test(email) && email !== "") {
      setMessage("Enter valid Email Id");
    } else {
      setMessage("");
    }
  };
  const handleOnChange = (e: any) => {
    setEmail(e.target.value);
  };

  //For Email validation ends

  return (
    <div className="">
      {/* <Toaster position="bottom-center" /> */}

      <Head>
        <title>Merchant OnBoarding</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {/* <div className={styles.container_width}> */}
      <section className={styles.SectionBox}>
        <div className={styles.imgBx}>
          {/* <img
            src="/omratrade/leftsignin.png"
            width={800}
            height={800}
            // priority={true}
            alt="girl"
            onClick={() => router.push(`/`)}
          /> */}
        </div>
        <div className={styles.loginbottom}>
          <div className={styles.contentBx}>
            <div className={styles.formBx}>
              <h2 className={styles.midHeading}>Create Password</h2>
              <p className={styles.forgottext}>
                Your new password must be diffrent from previous used passwords.
              </p>
              <form onSubmit={handleLogin}>
                {/* password section  starts*/}
                <div>
                  <span>New Password</span>
                  <div className={styles.passwordbox}>
                    <input
                      className={styles.InputBox}
                      type={showPassword ? "text" : "password"}
                      name=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className={` ${styles.passwordshowicon} ${styles.passwordshow} `}
                    ></div>
                    <div
                      onClick={showPasswordHandler}
                      className={` ${styles.passwordhideicon} ${styles.passwordshow} `}
                    >
                      {showPassword ? (
                        <Image
                          src="/svg/eye-slash-solid.svg"
                          width={20}
                          height={20}
                          className={styles.passwordhideiconn}
                        ></Image>
                      ) : (
                        <Image
                          src="/svg/eye-solid.svg"
                          width={20}
                          height={20}
                          className={styles.passwordshowiconn}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
                {/* password section  ends*/}
                {/* password section  starts*/}
                <div>
                  <span>Confirm Password</span>
                  <div className={styles.passwordbox}>
                    <input
                      className={styles.InputBox}
                      type={showPassword ? "text" : "password"}
                      name=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className={` ${styles.passwordshowicon} ${styles.passwordshow} `}
                    ></div>
                    <div
                      onClick={showPasswordHandler}
                      className={` ${styles.passwordhideicon} ${styles.passwordshow} `}
                    >
                      {showPassword ? (
                        <Image
                          src="/svg/eye-slash-solid.svg"
                          width={20}
                          height={20}
                          className={styles.passwordhideiconn}
                        ></Image>
                      ) : (
                        <Image
                          src="/svg/eye-solid.svg"
                          width={20}
                          height={20}
                          className={styles.passwordshowiconn}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
                {/* password section  ends*/}
                <div onClick={() => router.push(`/recovered-password`)}>
                  <input
                    type="submit"
                    value="Reset Password"
                    name=""
                    className={styles.buttonsection}
                  />
                </div>
              </form>
            </div>
          </div>
          <div onClick={() => router.push(`/`)} className={styles.backtohome}>
            <Cancel />
          </div>
        </div>
      </section>
      {/* </div> */}
    </div>
  );
};

export default Home;
