# Leaf Disease Detection System (Mobile App)

Portable full-stack plant disease detection app with:
- React Native mobile app
- Node/Express API
- Flask/TensorFlow prediction service
- MongoDB
- Dockerized backend stack with health checks

## Quick Start

### Backend in Docker
1. Copy the optional env file if you want to set secrets or email credentials:
```bash
cp .env.example .env
```
2. Start the backend stack:
```bash
npm run backend:up
```
3. Confirm health:
```bash
docker compose ps
```

This starts:
- MongoDB on `27017`
- Node backend on `5000`
- Flask API on `5001`

### Mobile App
1. Install mobile dependencies:
```bash
cd GracePlant
npm install
```
2. Start Metro:
```bash
cd ..
npm run mobile:start
```
3. In another terminal, connect a device or start an emulator, then run:
```bash
npm run mobile:android
```

## Mobile Networking

The app no longer depends on a hardcoded machine IP by default.

Runtime resolution order:
1. `GracePlant/.env` `API_URL` if explicitly set
2. Metro host machine detected from the dev bundle URL
3. Platform fallback (`10.0.2.2` on Android emulator, `localhost` on iOS)

For a physical Android device over USB, `adb reverse tcp:5000 tcp:5000` and `adb reverse tcp:8081 tcp:8081` are supported.

## Environment Files

### Root `.env`
Optional for Docker/runtime overrides:
```env
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
NODE_ENV=development
FLASK_TIMEOUT_MS=15000
CORS_ORIGIN=*
PUBLIC_BASE_URL=
```

Notes:
- `JWT_SECRET` is required for production.
- In development, the backend generates a temporary JWT secret if one is not provided.
- Email credentials are optional. Register/login/upload work without them.

### Mobile `GracePlant/.env`
Optional override only:
```env
API_URL=
API_TIMEOUT_MS=20000
```
Leave `API_URL` empty to use automatic backend discovery during development.

## Health Endpoints
- Node: `GET /leafscaner/health`
- Flask: `GET /health`

## Verified Core Flow
The following flow has been verified against the Dockerized backend:
- register
- login
- upload image
- prediction response from Flask through Node



