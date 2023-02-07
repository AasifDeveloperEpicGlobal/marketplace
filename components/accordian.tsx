import React, { useState } from "react";

const Accordian = () => {
  const [title, setTitle] = useState();
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

export default Accordian;
