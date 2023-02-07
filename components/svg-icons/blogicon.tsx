import React from "react";
import Image from "next/image";

const Banner = (props: React.SVGProps<SVGSVGElement>) => {
  return <Image src="/svg/blogicon.svg" height={24} width={24} alt=" Image" />;
};

export default Banner;
