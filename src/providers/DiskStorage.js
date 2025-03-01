import fs from 'fs';
import path from 'path';
import * as uploadConfig from '../configs/upload.js';

export class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )
        return file
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        try {
            await fs.promises.stat(filePath);
        } catch (error) {
            return
        }

        await fs.promises.unlink(filePath);
    }
}