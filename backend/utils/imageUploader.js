import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ImageUploader = (pathOfFile, file) => {
  // create a file name in you want save
  let name = Date.now() + `${file.name}`;
  // create path where you want to store it
  let directory = path.join(__dirname, "..") + pathOfFile + name;

  // Place the image on your local server
  let dbdirectory = file.mv(directory, (error) => {
    if (error) {
      return false;
    }
  });

  let storedUrl = pathOfFile + name;
  return storedUrl;
};

export const ImageDeleter = (pathOfFile) => {
  const mainPath = path.join(__dirname, "..") + pathOfFile;
  fs.unlink(mainPath, (err) => {
    if (err) {
      console.log(err);
      return false;
    }
  });
  return true;
};
