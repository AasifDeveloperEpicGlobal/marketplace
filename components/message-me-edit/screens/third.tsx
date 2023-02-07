import { useEffect, useLayoutEffect } from "react";

import { AxiosError } from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import {
  useCompanyProfile,
  useGetCompanyProfile,
} from "../../../networkAPI/queries";
import styles from "../../../styles/home/hometrade.module.scss";
import { companyProfileValidationSchema } from "../../../validations/profileValidations";
import { FormProps } from "../types";
import { dehydrate, QueryClient } from "react-query";
import { parseCookies } from "nookies";

function ThirdEditScreen({
  isNext,
  handleState,
  value,
  handleStep,
}: FormProps) {
  const router = useRouter();

  const { error, isLoading, data, mutate, isSuccess } = useCompanyProfile();
  const {
    error: cerror,
    isLoading: isLoadingc,
    data: companydata,
    // isSuccess: companyststus,
    refetch,
  } = useGetCompanyProfile();

  
  // useLayoutEffect(
  //   () => {
  //     if (companyststus) {
  //       if (companydata?.data.user.company_Name) {
  //         router.push(`/onboarding/dashboard/editcompany-details`);
  //       }
  //     }
  //   },
  //   []
  //   //  [router, companydata, companyststus]
  // );

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }
    refetch();

    if (isSuccess) {
      // toast.success("Login Successfull");
      // localStorage.setItem("companyProfile", "true");
      router.push(`/onboarding/dashboard`);
    }
  }, [error, data, router, refetch, isSuccess]);
  return (
    <>
      <Formik
        initialValues={{
          company_Name: companydata?.data?.user?.company_Name,
          description: companydata?.data?.user?.description,
        }}
        enableReinitialize
        onSubmit={(values, { setSubmitting, resetForm }) => {
          mutate({
            company_Name: values.company_Name,
            description: values.description,
          });
        }}
        validationSchema={companyProfileValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isValid,
          dirty,
          /* and other goodies */
        }) => {
          handleState(values);
          isNext(isValid);
         

          return (
            <Form
              onSubmit={handleSubmit}
              style={{ width: "150%", height: "400px" }}
              className="simply-col-12"
            >
              <ul className={styles.requirementstylebox}>
                <li className={styles.requirementstyle}>
                  <div className={styles.inputbox}>
                    {/* <label>Company Name </label> */}
                    <input
                      type="text"
                      name="company_Name"
                      className={styles.TextareaBox}
                      placeholder="Company Name"
                      value={
                        values.company_Name
                        // .replace(/\s{2,}/g, " ")
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="company_Name">
                      {(msg) => <span className="validation-error">{msg}</span>}
                    </ErrorMessage>
                  </div>
                </li>
                <li className={styles.requirementstyle}>
                  <div>
                    {/* <label>Description </label> */}
                    <textarea
                      rows={10}
                      cols={60}
                      name="description"
                      className={styles.TextareaBox1}
                      placeholder="Description"
                      value={
                        values.description
                        // .replace(/\s{2,}/g, " ")
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div>
                      {values.description?.length <= 300 ? (
                        <span>
                          <p className={styles.charactersize}>
                            {" "}
                            {300 - values.description?.length} characters
                            remaining
                          </p>
                        </span>
                      ) : null}
                    </div>

                    <ErrorMessage name="description">
                      {(msg) => <span className="validation-error">{msg}</span>}
                    </ErrorMessage>
                  </div>
                </li>
              </ul>

              <div className={`${styles.modelfooter} simply-row `}>
                <div className="simply-col-6 p-0">
                  <div className={styles.stepper}>
                    <button
                      type="submit"
                      className={`bluebgbtn smbtn ${
                        isValid && dirty ? "smactivebtn" : ""
                      } simply-col-12`}
                      // id="nextBtn"
                      onClick={() => router.push("/onboarding/dashboard")}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className={`bluebgbtn smbtn ${
                        isValid && dirty ? "smactivebtn" : ""
                      } simply-col-12`}
                      id="nextBtn"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default ThirdEditScreen;

export const getServerSideProps = async (context: any) => {
  const access_token = parseCookies({ req: context.req });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "companyprofile",
    async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/companyprofile`,
        {
          headers: {
            //@ts-ignore
            authorization: `bearer ${access_token.access_token}`,
          },
        }
      ).then((response) => response.json())
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
