import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')
export const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads')

export const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const fileHash =  crypto.randomBytes(10).toString('hex')
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}
