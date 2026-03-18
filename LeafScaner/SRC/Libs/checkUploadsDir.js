import fs from 'fs'
import path from 'path';

export default function ensureUploadsDirectory(){
    const uploadDir = path.resolve('uploads');
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }
}