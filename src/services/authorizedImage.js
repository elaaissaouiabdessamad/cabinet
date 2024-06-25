// src/services/AuthorizedImage.js
import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

const AuthorizedImage = ({ src, alt, className, onClick }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axiosInstance.get(src, { responseType: "blob" });
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchImage();
  }, [src]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading image: {error}</p>;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} cursor-pointer`}
      onClick={() => onClick(imageSrc)}
    />
  );
};

export default AuthorizedImage;
