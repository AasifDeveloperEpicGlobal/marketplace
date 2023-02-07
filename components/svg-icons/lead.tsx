import React from "react";
import Image from "next/image";

const LeadIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return <Image src="/svg/lead.svg" height={24} width={24} alt=" Image" />;
};

export default LeadIcon;
