import Image from '../Models/imageModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { predictImage } from '../Services/modelPrediction.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDirectory = path.resolve(__dirname, '../../uploads');

const getPublicBaseUrl = (req) => process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;

const toPublicImageUrl = (req, imagePathOrName) => {
  const normalized = String(imagePathOrName).replace(/\\/g, '/');
  const filename = path.basename(normalized);
  return `${getPublicBaseUrl(req)}/leafscaner/uploads/${encodeURIComponent(filename)}`;
};

const uploadImage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: 'User not authenticated' });
    }
    if (!req.file?.filename) {
      return res.status(400).json({ message: 'Image file is missing' });
    }

    const newImage = new Image({
      userId: req.user.id,
      imageUrl: req.file.filename,
      processed: true,
      features: {},
    });
    await newImage.save();

    const prediction = await predictImage(req.file.path);

    res.status(200).json({
      message: 'Image uploaded successfully',
      image: { ...newImage.toObject(), imageUrl: toPublicImageUrl(req, newImage.imageUrl) },
      prediction,
    });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        message: 'Error communicating with Flask API',
        error: error.response.data,
      });
    }
    res.status(500).json({ message: 'Error uploading image', error: error?.message });
  }
};

const captureImage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: 'User not authenticated' });
    }

    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: 'Image not provided' });
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const fileName = `captured-${Date.now()}.jpg`;
    const imagePath = path.join(uploadsDirectory, fileName);

    fs.writeFileSync(imagePath, base64Data, 'base64');

    const newImage = new Image({
      userId: req.user.id,
      imageUrl: fileName,
      processed: true,
      features: {},
    });
    await newImage.save();

    const prediction = await predictImage(imagePath);
    res.status(200).json({
      message: 'Image captured successfully',
      image: { ...newImage.toObject(), imageUrl: toPublicImageUrl(req, newImage.imageUrl) },
      prediction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error capturing image', error: error.message });
  }
};

const getImageHistory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: 'User not authenticated' });
    }

    const userImages = await Image.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
    if (!userImages.length) {
      return res.status(404).json({ message: 'No images found for this user' });
    }

    const images = userImages.map((img) => ({
      ...img,
      imageUrl: toPublicImageUrl(req, img.imageUrl),
    }));

    res.status(200).json({ message: 'Image history fetched successfully', images });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image history', error: error.message });
  }
};

export { uploadImage, captureImage, getImageHistory };
