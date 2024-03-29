import React from "react";
import styles from "../../styles/svg/svg.module.scss";
interface styleProps {
  listType: string;
}
const BlueListView = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M8 4h13v2H8V4zm-5-.5h3v3H3v-3zm0 7h3v3H3v-3zm0 7h3v3H3v-3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
        fill="rgba(0,176,238,1)"
      />
    </svg>
  );
};

export default BlueListView;
