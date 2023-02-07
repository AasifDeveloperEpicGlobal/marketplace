import { useEffect, useLayoutEffect } from "react";

import { AxiosError } from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import YearContainer from "components/message-me/years";

import {
  useGetBussinessDetails,
  useUserDetails,
} from "../../../networkAPI/queries";
//import styles from "../message.module.scss";
import styles from "../message.module.scss";
import { FormProps } from "../types";
import { messageMe1Validations } from "validations/profileValidations";
import { cityArray } from "cities";
import { dehydrate, QueryClient } from "react-query";
import { parseCookies } from "nookies";

function SecondScreen({ isNext, handleState, value, handleStep }: FormProps) {
  const router = useRouter();
  const { error, isLoading, data, mutate } = useUserDetails();
  const years = YearContainer;
 

  const {
    error: err,
    isLoading: loading,
    data: bussinessData,
    isSuccess: bussinessStatus,
    refetch,
  } = useGetBussinessDetails();


  useLayoutEffect(() => {
    
    if (bussinessStatus) {
      if (
        bussinessData?.data?.user?.TypesOf_Bussiness ||
        bussinessData?.data?.user?.GST_No ||
        bussinessData?.data?.user?.Merchant_Name
      ) {
        handleStep(1);
      }
      //  else {
      //   handleStep(1);
      // }
    }
  }, [bussinessData, bussinessStatus, handleStep]);
  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }
    refetch();

    if (data) {
      toast.success("Login Successfull");
      router.push(`/onboarding/dashboard`);
    }
  }, [error, data]);

  const options1 = [
    { value: "Wholesaler", label: "Wholesaler" },

    { value: "Manufacturer", label: "Manufacturer" },

    { value: "Retailer", label: "Retailer" },
    { value: "Trader", label: "Trader" },
  ];

  return (
    <>
      <Formik
        initialValues={{
          Merchant_Name: bussinessData?.data?.user?.Merchant_Name,
          SubTypeOf_bussiness: bussinessData?.data?.user?.SubTypeOf_bussiness,
          TypesOf_Bussiness: bussinessData?.data?.user?.TypesOf_Bussiness,

          Merchant_ServiceArea_Pincodes:
            bussinessData?.data?.user?.Merchant_ServiceArea_Pincodes,
          Merchant_Designation: bussinessData?.data?.user?.Merchant_Designation,
          Merchant_City: bussinessData?.data?.user?.Merchant_City,
          Merchant_Address: bussinessData?.data?.user?.Merchant_Address,

          Year_of_establishment:
            bussinessData?.data?.user?.Year_of_establishment,

          GST_No: bussinessData?.data?.user?.GST_No,
          PAN_No: bussinessData?.data?.user?.PAN_No,
        }}
        enableReinitialize
        onSubmit={(values, { setSubmitting, resetForm }) => {
          mutate({
            Merchant_Name: values.Merchant_Name,
            SubTypeOf_bussiness: values.SubTypeOf_bussiness,
            TypesOf_Bussiness: values.TypesOf_Bussiness,
            Merchant_ServiceArea_Pincodes: values.Merchant_ServiceArea_Pincodes,
            Merchant_Designation: values.Merchant_Designation,
            Merchant_City: values.Merchant_City,

            Merchant_Address: values.Merchant_Address,

            Year_of_establishment: values.Year_of_establishment,
            GST_No: values.GST_No,
            PAN_No: values.PAN_No,
          });

          // localStorage.setItem("businessDetails", "true");

          // handleStep(2);
        }}
        validationSchema={messageMe1Validations}
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
              style={{ width: "100%" }}
              className="simply-col-12"
            >
              <div className={styles.inputbox}>
                <label>Contact Person </label>
                <input
                  type="text"
                  name="Merchant_Name"
                  className={styles.inputform}
                  placeholder="Enter Name"
                  value={
                    values.Merchant_Name
                    //   replace(
                    //   /\s{2,}/g,
                    //   " "
                    // )
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="Merchant_Name">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>

              <div className={styles.inputbox}>
                <label>Company/Business/Shop Name </label>
                <input
                  type="text"
                  name="SubTypeOf_bussiness"
                  className={styles.inputform}
                  placeholder="Enter Business Name"
                  value={values.SubTypeOf_bussiness}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="SubTypeOf_bussiness">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>
              <div className={styles.inputbox}>
                <label> Business Type </label>
                {/* <input
                  type="text"
                  name="SubTypeOf_Bussiness"
                  className={styles.inputform}
                  placeholder="Business Name"
                  value={values.SubTypeOf_Bussiness.replace(/\s{2,}/g, " ")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                /> */}

                <select
                  className={styles.inputform}
                  name="TypesOf_Bussiness"
                  value={
                    values.TypesOf_Bussiness
                    // .replace(/\s{2,}/g, " ")
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>Select</option>
                  {options1.map((option: any, index: any) => {
                    return (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
                <ErrorMessage name="TypesOf_Bussiness">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>

              <div className={styles.inputbox}>
                <label>Service Area Pincode </label>
                <input
                  type="text"
                  name="Merchant_ServiceArea_Pincodes"
                  className={styles.inputform}
                  placeholder="Enter Pincode "
                  value={
                    values.Merchant_ServiceArea_Pincodes
                    //   .replace(
                    //   /\s{2,}/g,
                    //   " "
                    // )
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="Merchant_ServiceArea_Pincodes">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>

              <div className={styles.inputbox}>
                <label>Contact Designation </label>
                <input
                  type="text"
                  name="Merchant_Designation"
                  className={styles.inputform}
                  placeholder="Enter Designation"
                  value={
                    values.Merchant_Designation
                    // .replace(/\s{2,}/g, " ")
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="Merchant_Designation">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>

              <div className={styles.inputbox}>
                <label> City: </label>

                <select
                  className={styles.inputform}
                  name="Merchant_City"
                  value={values.Merchant_City?.replace(/\s{2,}/g, " ")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>Select</option>
                  {cityArray.map((option: any, index: any) => {
                    return (
                      <option key={index} value={option.name}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
                <ErrorMessage name="Merchant_City">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>

              <div className={styles.inputbox}>
                <label>Business Address </label>
                <input
                  type="text"
                  name="Merchant_Address"
                  className={styles.inputform}
                  placeholder="Enter Address"
                  value={
                    values.Merchant_Address
                    // .replace(/\s{2,}/g, " ")
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="desired_outcome">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>

              <div className={styles.inputbox}>
                <label> Year of Establishment </label>

                <select
                  className={styles.inputform}
                  name="Year_of_establishment"
                  value={values.Year_of_establishment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>Select</option>
                  {YearContainer.map((option: any, index: any) => {
                    return (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
                <ErrorMessage name="TypesOf_Bussiness">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>
              {/* <div className={styles.inputbox}>
                <label>Year of Establishment </label>
                <input
                  type="number"
                  min={0}
                  name="Year_of_establishment"
                  className={styles.inputform}
                  placeholder="Year of Establishment"
                  value={values.Year_of_establishment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="Year_of_establishment">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div> */}
              <div className={styles.inputbox}>
                <label>GST No. </label>
                <input
                  type="text"
                  name="GST_No"
                  className={styles.inputform}
                  placeholder="Enter GST No."
                  value={values.GST_No}
                  maxLength={15}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="GST_No">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>
              <div className={styles.inputbox}>
                <label>PAN No. </label>
                <input
                  type="text"
                  name="PAN_No"
                  className={styles.inputform}
                  placeholder="Enter Pan No."
                  value={values.PAN_No}
                  maxLength={10}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="pan">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>

              <div className={`${styles.modelfooter} simply-row `}>
                <div className={`${styles.stepper}simply-col-12 p-0`}>
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
                    // className={`bluebgbtn smbtn ${
                    //   isValid && dirty ? "smactivebtn" : ""
                    // }bluebgbtn simply-col-12`}
                    className={styles.continuebutton}
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

export default SecondScreen;

export const getServerSideProps = async (context: any) => {
  const access_token = parseCookies({ req: context.req });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "getBussinessDetails",
    async () =>
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/details`, {
        headers: {
          //@ts-ignore
          authorization: `bearer ${access_token.access_token}`,
        },
      }).then((response) => response.json())
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
