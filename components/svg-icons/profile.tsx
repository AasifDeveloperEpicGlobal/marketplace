import React from "react";
import styles from "../../styles/svg/svg.module.scss";
const Profile = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    //   width="18"
    //   height="18"
    // >
    //   <path fill="none" d="M0 0h24v24H0z" />
    //   <path
    //     d="M4 22a8 8 0 1 1 16 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"
    //     fill="rgba(0,43,107,1)"
    //   />
    // </svg>

    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    //   width="18"
    //   height="18"
    // >
    //   <path fill="none" d="M0 0h24v24H0z" />
    //   <path
    //     d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
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
        d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
        fill="rgba(5,139,128,1)"
      />
    </svg>
  );
};

export default Profile;
