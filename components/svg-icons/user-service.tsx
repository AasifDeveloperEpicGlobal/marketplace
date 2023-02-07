import React from "react";
import Image from "next/image";

const UserService = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <Image src="/svg/user-service.svg" height={24} width={24} alt=" Image" />
  );
};

export default UserService;
