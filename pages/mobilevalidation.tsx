import React, { useState } from "react";
import type { NextPage } from "next";
const MobileValidation: NextPage = () => {
  const [data, setData] = useState({
    mobile: "",
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;
  
    if (
      name === "mobile" &&
      value.length <= 10
      //  && value[0] == 6
    ) {
      setData({ ...data, [name]: value });
    } else if (name !== "mobile") {
      setData({ ...data, [name]: value });
    }
  };

  return (
    <React.Fragment>
      <form>
        <label>Mobile</label>
        <input
          type="text"
          name={"mobile"}
          value={data.mobile}
          // pattern={[6-9]-[0-9]{9}}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </form>
    </React.Fragment>
  );
};
export default MobileValidation;
