import multer from 'multer';

const storage = multer.memoryStorage();
export const cloudUpload = multer({ storage: storage });