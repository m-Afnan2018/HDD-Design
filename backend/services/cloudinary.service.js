const { secret } = require("../config/secret");
const cloudinary = require("../utils/cloudinary");
const { Readable } = require('stream');


const cloudinaryImageUpload = (imageBuffer) => {
  // Check if Cloudinary is configured
  if (!secret.cloudinary_name || !secret.cloudinary_api_key || !secret.cloudinary_api_secret) {
    console.log('Cloudinary not configured, skipping upload');
    return Promise.reject(new Error('Cloudinary not configured'));
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { upload_preset: secret.cloudinary_upload_preset },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const bufferStream = new Readable();
    bufferStream.push(imageBuffer);
    bufferStream.push(null);

    bufferStream.pipe(uploadStream);
  });
};


// cloudinaryImageDelete
// const cloudinaryImageDelete = async (public_id) => {
//   const deletionResult = await cloudinary.uploader.destroy(public_id);
//   return deletionResult;
// };
const cloudinaryImageDelete = async (public_id) => {
  // Check if Cloudinary is configured
  if (!secret.cloudinary_name || !secret.cloudinary_api_key || !secret.cloudinary_api_secret) {
    console.log('Cloudinary not configured, skipping delete');
    return { result: 'skipped', message: 'Cloudinary not configured' };
  }

  try {
    console.log(`Attempting to delete image from Cloudinary: ${public_id}`);
    const deletionResult = await cloudinary.uploader.destroy(public_id);

    if (deletionResult.result === 'ok') {
      console.log(`Successfully deleted image: ${public_id}`);
    } else if (deletionResult.result === 'not found') {
      console.warn(`Image not found in Cloudinary: ${public_id}`);
    } else {
      console.warn(`Unexpected deletion result for ${public_id}:`, deletionResult);
    }

    return deletionResult;
  } catch (error) {
    console.error(`Error deleting image from Cloudinary (${public_id}):`, error);
    throw error;
  }
};

exports.cloudinaryServices = {
  cloudinaryImageDelete,
  cloudinaryImageUpload,
};
