import Image, { ImageProps } from "next/image";

const HemisLogo = (props: Omit<ImageProps, "src" | "alt">) => {
  return (
    <Image
      src={"/images/logo.svg"}
      alt="HEMIS Logo"
      width={93}
      height={24}
      {...props}
    />
  );
};

export default HemisLogo;
