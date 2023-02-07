import type { NextPage } from "next";

import styles from "../styles/Merchant/timslot.module.scss";
const TimeSlot: NextPage = () => {
  const timedropdown = [
    { value: "9.00AM - 11.00AM", label: "9.00AM - 11.00AM" },
    { value: "11.00AM - 1.00P", label: "11.00AM - 1.00PM" },
    { value: "1.00PM - 3.00PM", label: "1.00PM - 3.00PM" },
    { value: "3.00PM - 5.00PM", label: "3.00PM - 5.00PM" },
    { value: "5.00PM - 7.00PM", label: "5.00PM - 7.00PM" },
  ];
  return (
    <>
      <select className={styles.timeslotdropdown}>
        {timedropdown.map((time: any, index: any) => {
          return (
            <option key={index} value={time.value}>
              {time.label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default TimeSlot;
