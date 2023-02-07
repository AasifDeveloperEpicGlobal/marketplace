import React from "react";
import Image from "next/image";

const Subcategory = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <Image src="/svg/subcategory.svg" height={24} width={24} alt=" Image" />
  );
};

export default Subcategory;
