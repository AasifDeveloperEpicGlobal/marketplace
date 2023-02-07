import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Toaster } from "react-hot-toast";
import router, { useRouter } from "next/router";
import styles from "./message.module.scss";
import FirstScreen from "./screens/first";
import FourthScreen from "./screens/fourth";

import SecondScreen from "./screens/second";
import ThirdScreen from "./screens/third";

import Cancel from "components/svg-icons/cancel";

interface Props {
  title: string;
  showModelValue: boolean;
  handleState: (value: boolean) => void;
  step: number;
}

function Message({ showModelValue, handleState, step, title }: Props) {
  const [showModal, setShowModal] = useState<boolean>(showModelValue);



  useEffect(() => {
    handleState(showModal);
  }, [showModal]);

  useEffect(() => {
    setShowModal(showModelValue);
  }, [showModelValue]);

  const [currentStep, setCurrentStep] = useState<number>(step);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [firstScreenValues, setFirstScreenValues] = useState<any>({});
  const [secondScreenValues, setSecondScreenValues] = useState<any>({});
  const [secondEditScreenValues, setSecondEditScreenValues] = useState<any>({});
  const [thirdScreenValues, setThirdScreenValues] = useState<any>({});
  const [fourthScreenValues, setFourthScreenValues] = useState<any>({});

  const StepperFormComponent = React.useCallback(() => {
    switch (currentStep) {
      case 0:
        return (
          <FirstScreen
            handleState={(value) => setFirstScreenValues(value)}
            isNext={(value) => setIsNext(value)}
            value={firstScreenValues}
            handleStep={(value) => setCurrentStep(value)}
          />
        );
      case 1:
        return (
          <SecondScreen
            handleState={(value) => setSecondScreenValues(value)}
            isNext={(value) => setIsNext(value)}
            value={secondScreenValues}
            handleStep={(value) => setCurrentStep(value)}
          />
        );
      case 2:
        return (
          <ThirdScreen
            handleState={(value) => setThirdScreenValues(value)}
            isNext={(value) => setIsNext(value)}
            value={thirdScreenValues}
            handleStep={(value) => setCurrentStep(value)}
          />
        );
      case 3:
        return (
          <FourthScreen
            handleState={(value) => setFourthScreenValues(value)}
            isNext={(value) => setIsNext(value)}
            value={fourthScreenValues}
          />
        );

      default:
        null;
    }
  }, [currentStep, firstScreenValues, secondScreenValues, thirdScreenValues]);

  return (
    <div
      className={styles.popupContainer}
      style={{ display: showModal ? "flex" : "none" }}
    >
      <div className={styles.modelboxpopup}>
        <div
          className={styles.cancelicon}
          onClick={() => router.push("/onboarding/dashboard")}
        >
          <Cancel />
        </div>
        <div className={styles.modelform}>
          <div className={styles.formsignup}>
            <div className="simply-col-12">
              <div
                className={styles.modelheader}
                style={{ display: currentStep === 3 ? "none" : "block" }}
              >
                <h4>Merchant Onboarding</h4>
                <div className={styles.linestrip}></div>

                <ul className={styles.modelpoptabstyle}>
                  <li className={currentStep === 2 ? styles.active : ""}>
                    <Link href="#">{title}</Link>
                  </li>
                </ul>
              </div>
              <div
                className="d-flex justify-content-end "
                style={{ display: currentStep === 3 ? "block" : "none" }}
              >
                <span
                  className={` ${styles.skip} ${styles.iconadd}`}
                  onClick={() => setShowModal(!showModal)}
                ></span>
              </div>
            </div>

            {StepperFormComponent()}
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Message;
