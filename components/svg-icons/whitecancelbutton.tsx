import { SVGICONSPROPS } from "typings/icons";

const WhiteCancelButton = (props: SVGICONSPROPS) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
        fill="rgba(255,255,255,1)"
      />
    </svg>
  );
};

export default WhiteCancelButton;
