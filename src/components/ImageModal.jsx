import React from "react";

const ImageModal = ({ imageSrc, alt, onClose }) => {
  if (!imageSrc) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      onClick={onClose}
    >
      <div className="relative max-w-full max-h-full">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center z-10"
        >
          X
        </button>
        <div className="overflow-auto p-4">
          <img src={imageSrc} alt={alt} className="block max-h-[45rem]" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
