"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src?: string;
  fallback?: string;
} & React.ComponentProps<typeof Image>;

export function SafeImage({
  src,
  fallback = "/images/avatar.jpg",
  alt,
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallback)}
      alt={alt}
    />
  );
}
