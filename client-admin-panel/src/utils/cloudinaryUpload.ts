import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function uploadImageToCloudinary(file: File, folder: string = "shofy-uploads"): Promise<string> {
  try {
    // Validate file
    if (!file || !file.size) {
      throw new Error("Invalid file provided");
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`);
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error(`File size too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Max allowed: 5MB`);
    }

    const bytes = await file.arrayBuffer(); // Convert File to ArrayBuffer
    const buffer = Buffer.from(bytes); // Convert ArrayBuffer to Buffer

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image'
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else if (result && result.secure_url) {
            resolve(result.secure_url);
          } else {
            reject(new Error('Cloudinary upload failed: No result URL'));
          }
        }
      );

      uploadStream.end(buffer); // Upload the buffer
    });
  } catch (error) {
    console.error('Error in uploadImageToCloudinary:', error);
    throw error;
  }
}


export async function deleteImageFromCloudinary(imageUrl: string) {
  // Extract the public ID
  const regex = /\/upload\/(?:v\d+\/)?([^/.]+(?:\/[^/.]+)*)/;
  const matches = imageUrl.match(regex);

  if (matches && matches[1]) {
    const publicId = matches[1];
    return cloudinary.uploader.destroy(publicId);
  } else {
    throw new Error("Invalid Cloudinary URL");
  }
}



