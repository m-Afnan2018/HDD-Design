"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import upload_default from "@assets/img/icons/upload.png";
import useUploadImage from "@/hooks/useUploadImg";
import Loading from "./loading";

interface GenericImageUploadProps {
  isSubmitted?: boolean;
  setImage: (imageUrl: string) => void;
  image?: string;
  setIsSubmitted?: (submitted: boolean) => void;
  default_img?: string;
  label?: string;
}

const GenericImageUpload: React.FC<GenericImageUploadProps> = ({
  isSubmitted,
  setImage,
  image,
  setIsSubmitted,
  default_img,
  label = "Image Upload",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleImageUpload, uploadData, isLoading } = useUploadImage();

  // Update image state when upload completes
  useEffect(() => {
    if (uploadData?.data?.url) {
      setImage(uploadData.data.url);
      if (setIsSubmitted) {
        setIsSubmitted(false);
      }
    }
  }, [uploadData, setImage, setIsSubmitted]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const displayImage = image || default_img;

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div
        onClick={handleClick}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loading loading={isLoading} spinner="bar" />
            <p className="text-sm text-gray-500 mt-2">
              Uploading...
            </p>
          </div>
        ) : displayImage ? (
          <div className="flex flex-col items-center">
            <Image
              src={displayImage}
              alt="Uploaded"
              width={80}
              height={80}
              className="rounded-md mb-2 object-cover"
            />
            <p className="text-sm text-gray-500">
              Click to change image
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Image
              src={upload_default}
              alt="Upload"
              width={48}
              height={48}
              className="mb-2 opacity-50"
            />
            <p className="text-sm text-gray-500">
              Click to upload image
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG up to 5MB
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default GenericImageUpload;
