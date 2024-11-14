// const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");
// dotenv.config({ path: "../../.env" });


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const imageupload = async (file, usepreset) => {
//   try {
//     console.log("file", file);

//     // Set default value for usepreset to true if not provided
//     usepreset = usepreset === undefined ? true : usepreset;

//     let options = {};
//     if (usepreset) {
//       options = { upload_preset: "chat-app" };
//     } else {
//       options = { resource_type: "auto" };
//     }

//     const result = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(options, (error, result) => {
//           if (error) {
//             console.error(error);
//             reject(error);
//           } else {
//             console.log("result", result);
//             resolve(result);
//           }
//         })
//         .end(file.buffer);
//     });

//     // Extract the secure URL from the Cloudinary response
//     const imageUrl = result.secure_url;
//     console.log("imageUrl", imageUrl);
//     return imageUrl;
//   } catch (error) {
//     console.error(error);
//     return ""; // Return empty string in case of error
//   }
// };

// module.exports = imageupload;


const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageupload = async (file, usepreset = true) => {
  try {
    console.log("file received for upload:", file);

    const options = {
      resource_type: usepreset ? "image" : "auto",
      upload_preset: usepreset ? "chat-app" : undefined,
    };

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("Cloudinary upload result:", result);
            resolve(result);
          }
        })
        .end(file.buffer);
    });

    const imageUrl = result.secure_url;
    console.log("Uploaded image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Upload failed:", error.message || error);
    return ""; // Return an empty string in case of error
  }
};

module.exports = imageupload;
