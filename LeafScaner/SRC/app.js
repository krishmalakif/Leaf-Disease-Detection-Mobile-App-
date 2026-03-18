import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './Config/db.js';
import env from './Config/env.js';
import router from './Routes/userAuth.js';
import imageRouter from './Routes/imageRoute.js';
import ensureUploadsDirectory from './Libs/checkUploadsDir.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

connectDB();
ensureUploadsDirectory();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: '10mb' }));
app.use('/leafscaner/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.get('/leafscaner/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'node_backend',
    environment: env.nodeEnv,
  });
});

app.use('/leafscaner', router);
app.use('/leafscaner', imageRouter);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = env.isProd && status === 500 ? 'Internal Server Error' : error.message;
  res.status(status).json({ message });
});

app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});
