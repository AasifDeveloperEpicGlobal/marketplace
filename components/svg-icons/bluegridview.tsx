import React from "react";
import styles from "../../styles/svg/svg.module.scss";
const BlueGridView = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M22 12.999V20a1 1 0 0 1-1 1h-8v-8.001h9zm-11 0V21H3a1 1 0 0 1-1-1v-7.001h9zM11 3v7.999H2V4a1 1 0 0 1 1-1h8zm10 0a1 1 0 0 1 1 1v6.999h-9V3h8z"
        fill="rgba(0,176,238,1)"
      />
    </svg>
  );
};

export default BlueGridView;
