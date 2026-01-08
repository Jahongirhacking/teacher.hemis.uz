import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image src={"/images/logo.svg"} alt="HEMIS Logo" width={93} height={24} />
  );
};

export default Logo;
