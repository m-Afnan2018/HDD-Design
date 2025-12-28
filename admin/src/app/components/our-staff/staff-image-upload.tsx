"use client";
import React, { useRef } from "react";
import Image from "next/image";
import upload_default from "@assets/img/icons/upload.png";

interface StaffImageUploadProps {
  isSubmitted: boolean;
  setImage: (imageUrl: string) => void;
}

const StaffImageUpload: React.FC<StaffImageUploadProps> = ({
  isSubmitted,
  setImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // For demo purposes, we'll use a placeholder URL
    // In a real app, you'd upload to Cloudinary or another service
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Staff Image
      </label>
      <div
        onClick={handleClick}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
      >
        <div className="flex flex-col items-center">
          <Image
            src={upload_default}
            alt="Upload"
            width={48}
            height={48}
            className="mb-2 opacity-50"
          />
          <p className="text-sm text-gray-500">
            Click to upload staff image
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PNG, JPG up to 5MB
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default StaffImageUpload;
