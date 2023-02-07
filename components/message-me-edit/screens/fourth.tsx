import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import Image from "next/image";
import styles from "../message.module.scss";

interface Props {
  isNext: (value: boolean) => void;
  handleState: (value: any) => void;
  value: any;
}

function FourthScreen({ isNext, handleState, value }: Props) {
  return (
    <>
      <Formik
        initialValues={{
          title: "",
          companyName: "",
          startDate: "",
          endDate: "",
          description: "",
          id: 0,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // handlePushValues(values);
        }}
      // validationSchema={addExperienceValidation}

      // isInitialValid={Object.keys(value).length === 0 ? false : true}
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

              <div className={styles.fourthbox}>
                <div className={styles.sendimage}>
                  <Image
                    src="/svg/sendmassages.svg"
                    width={267}
                    height={133}
                    alt="check"
                  />
                </div>


                <div className={styles.middlesection}>
                  <div className={styles.style55}>
                  <div className={styles.imagewithtext}>
                    <Image
                      src="/svg/World-Sector.svg"
                      width={20}
                      height={20}
                      alt="check"
                    />

                    <div className={styles.getmore}>Get more responses</div>
                  </div>
                  <div className={styles.togglebtn}>
                   <Image
                      src="/svg/toggle.svg"
                      width={46}
                      height={27}
                      alt="check"
                    />
                  </div>
                  </div>
                  <div className={styles.content}>
                  <p>By making this request public, the wider community of experts will see it and can choose to send proposals to you in return.</p>
                </div>
                </div>

                

              </div>

              <div className={`${styles.modelfooter} simply-row `}>
                <div className="simply-col-12 p-0">
                  <button
                    type="submit"
                    className={`bluebgbtn smbtn ${isValid && dirty ? "smactivebtn" : ""
                      } simply-col-12`}
                    id="nextBtn"
                    disabled={!isValid || !dirty}
                  >
                    Finish
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

export default FourthScreen;
