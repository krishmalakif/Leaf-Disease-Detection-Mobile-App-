import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

let jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  if (isProd) {
    throw new Error('JWT_SECRET is required when NODE_ENV=production.');
  }

  jwtSecret = crypto.randomBytes(32).toString('hex');
  console.warn('JWT_SECRET is not set. Generated a temporary secret for this session.');
}

const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv,
  isProd,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/leafscaner',
  jwtSecret,
  flaskUrl: process.env.FLASK_URL || 'http://127.0.0.1:5001',
  flaskTimeoutMs: Number(process.env.FLASK_TIMEOUT_MS || 15000),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  publicBaseUrl: process.env.PUBLIC_BASE_URL || '',
  emailUser: process.env.EMAIL_USER || '',
  emailPass: process.env.EMAIL_PASS || '',
};

export const isEmailConfigured = Boolean(env.emailUser && env.emailPass);
export default env;
