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
import { useAppSelector } from "redux/hooks";

function ThirdScreen({ isNext, handleState, value, handleStep }: FormProps) {
  const router = useRouter();
  const { isAuthenticated, token } = useAppSelector((state) => state.user);
 

  const { error, isLoading, data, mutate, isSuccess } = useCompanyProfile();
  const {
    error: cerror,
    isLoading: isLoadingc,
    data: companydata,
    isSuccess: companyststus,
    refetch,
  } = useGetCompanyProfile();

  
  useLayoutEffect(() => {
    // refetch()
    if (isSuccess) {
      if (companydata?.data.user.company_Name) {
        router.push(`/onboarding/dashboard`);
      }
    }
  }, [router, companydata, companyststus, isAuthenticated, refetch, isSuccess]);

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (isSuccess) {
      toast.success("Login Successfull");
      localStorage.setItem("companyProfile", "true");
      router.push(`/onboarding/dashboard`);
    }
  }, [error, data, router, isSuccess]);
  return (
    <>
      <Formik
        initialValues={{
          company_Name: "",
          description: "",
        }}
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
                      value={values.company_Name.replace(/\s{2,}/g, " ")}
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
                      value={values.description.replace(/\s{2,}/g, " ")}
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
                <div className="simply-col-12 p-0">
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
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default ThirdScreen;
