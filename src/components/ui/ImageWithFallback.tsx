"use client";

import { useState } from "react";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
