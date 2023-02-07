import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { messageMe1Validations } from "../../../validations/profileValidations";
// import styles from "../message.module.scss";
import styles from "../message.module.scss";
import { FormProps } from "../types";

function FirstScreen({ isNext, handleState, value, handleStep }: FormProps) {
  return (
    <>
      <Formik
        initialValues={{
          pain_point: "",
          tried_so_far: "",
          desired_outcome: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {}}
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
                <label>What is your pain sspoint? </label>
                <input
                  type="text"
                  name="pain_point"
                  className={styles.inputform}
                  placeholder="example text"
                  value={values.pain_point.replace(/\s{2,}/g, " ")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="pain_point">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>
              

              <div className={styles.inputbox}>
                <label>What have you tried so far? </label>
                <input
                  type="text"
                  name="tried_so_far"
                  className={styles.inputform}
                  placeholder="example text"
                  value={values.tried_so_far.replace(/\s{2,}/g, " ")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="tried_so_far">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>

              <div className={styles.inputbox}>
                <label>What is the desired outcome of an engagement? </label>
                <input
                  type="text"
                  name="desired_outcome"
                  className={styles.inputform}
                  placeholder="example text"
                  value={values.desired_outcome.replace(/\s{2,}/g, " ")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="desired_outcome">
                  {(msg) => <span className="validation-error">{msg}</span>}
                </ErrorMessage>
              </div>

              <div className={`${styles.modelfooter} simply-row `}>
                <div className="simply-col-12 p-0">
                  <button
                    type="submit"
                    className={`bluebgbtn smbtn ${
                      isValid && dirty ? "smactivebtn" : ""
                    } simply-col-12`}
                    id="nextBtn"
                    disabled={!isValid || !dirty}
                    onClick={() => {
                      handleStep(1);
                    }}
                  >
                    Send to Davis
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

export default FirstScreen;
