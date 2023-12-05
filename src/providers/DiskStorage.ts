import fs from "fs";
import path from "path";
import { uploadConfig }  from "../configs/upload";

class DiskStorage{
    async saveFile(file: any){
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER)
        );

        return file;
    }

    async deleteFile(file: any){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

        try {
            await fs.promises.stat(filePath)
        } catch (error) {
            return
        }

        await fs.promises.unlink(filePath)
    }
};

export default DiskStorage;