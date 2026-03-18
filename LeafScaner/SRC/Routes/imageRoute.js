import express from 'express'
import { uploadImage, captureImage, getImageHistory } from '../Controllers/imageController.js';
import upload from '../Libs/multerMiddleware.js';
import { authenticateToken } from '../Libs/authToken.js';

const imageRouter = express.Router();

imageRouter.post('/upload', authenticateToken, upload.single('leafImage'), uploadImage);
imageRouter.post('/capture', authenticateToken, captureImage);
imageRouter.get('/history', authenticateToken, getImageHistory);
imageRouter.post('/history', authenticateToken, getImageHistory);

export default imageRouter;
