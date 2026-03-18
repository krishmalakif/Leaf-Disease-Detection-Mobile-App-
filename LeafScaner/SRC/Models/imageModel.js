import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Store user ID
  imageUrl: { type: String, required: true },
  processed: { type: Boolean, default: false },
  features: { type: Object, default: {} },
});

export default mongoose.model('Image', imageSchema);
