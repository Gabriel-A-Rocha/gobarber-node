import path from "path";
import crypto from "crypto";
import multer from "multer";

//caminho para a pasta de imagens
const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};
