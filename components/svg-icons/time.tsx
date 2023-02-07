import React from "react";
import styles from "../../styles/svg/svg.module.scss";
const Time = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    //   width="18"
    //   height="18"
    // >
    //   <path fill="none" d="M0 0h24v24H0z" />
    //   <path
    //     d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1-10V7h-2v7h6v-2h-4z"
    //     fill="rgba(0,176,238,1)"
    //   />
    // </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1-10V7h-2v7h6v-2h-4z"
        fill="rgba(0,43,107,1)"
      />
    </svg>

    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    //   width="18"
    //   height="18"
    // >
    //   <path fill="none" d="M0 0h24v24H0z" />
    //   <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z" />
    // </svg>
  );
};

export default Time;
