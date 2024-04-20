export const ValidateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(String(email).toLowerCase());
};

export const ValidateMobile = (mobile) => {
  let re = /^\d{10,13}$/;
  return re.test(mobile);
};

// const path = require("path");
// const fs = require("fs");

// // Function to upload an image
// const ImageUploader = (pathOfFile, file) => {
//   // Generate a unique filename
//   let name = `${Date.now()} + ${file.name}`;
//   // Create the full path where you want to store the image
//   let directory = path.join(__dirname, "..", pathOfFile, name);

//   // Move the image to the specified directory
//   file.mv(directory, (error) => {
//     if (error) {
//       console.error("Error uploading image:", error);
//       return null; // Return null to indicate failure
//     }
//   });

//   let storedUrl = pathOfFile + name;
//   return storedUrl;
// };

// // Function to delete an image
// const ImageDeleter = (pathOfFile) => {
//   const mainPath = path.join(__dirname, "..", pathOfFile);
//   fs.unlink(mainPath, (err) => {
//     if (err) {
//       console.error("Error deleting image:", err);
//       return false; // Return false to indicate failure
//     }
//   });
//   return true; // Return true to indicate success
// };

// // Example usage:
// const uploadedImageUrl = ImageUploader("/uploads/", req.files.image);
// if (uploadedImageUrl) {
//   console.log("Image uploaded successfully:", uploadedImageUrl);
// } else {
//   console.log("Failed to upload image.");
// }

// // Example deletion:
// const imagePathToDelete = "/uploads/image123.jpg";
// const deletionResult = ImageDeleter(imagePathToDelete);
// if (deletionResult) {
//   console.log("Image deleted successfully.");
// } else {
//   console.log("Failed to delete image.");
// }
