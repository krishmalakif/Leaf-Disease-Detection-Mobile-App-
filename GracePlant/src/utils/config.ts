import { NativeModules, Platform } from 'react-native';
import { API_URL as ENV_API_URL, API_TIMEOUT_MS as ENV_API_TIMEOUT_MS } from '@env';

const DEFAULT_API_PORT = '5000';
const DEFAULT_API_PATH = '/leafscaner';

const extractHostFromScriptUrl = () => {
  const scriptURL = NativeModules?.SourceCode?.scriptURL;
  if (!scriptURL) {
    return null;
  }

  const match = scriptURL.match(/^https?:\/\/([^/:]+)(?::\d+)?/i);
  return match?.[1] || null;
};

const getFallbackHost = () => {
  if (Platform.OS === 'android') {
    return '10.0.2.2';
  }

  return 'localhost';
};

const buildApiUrl = (host) => `http://${host}:${DEFAULT_API_PORT}${DEFAULT_API_PATH}`;

const resolveApiUrl = () => {
  const trimmedEnvUrl = ENV_API_URL?.trim();
  if (trimmedEnvUrl) {
    return trimmedEnvUrl;
  }

  const metroHost = extractHostFromScriptUrl();
  if (metroHost) {
    return buildApiUrl(metroHost);
  }

  return buildApiUrl(getFallbackHost());
};

export const API_URL = resolveApiUrl();
export const API_TIMEOUT_MS = Number(ENV_API_TIMEOUT_MS || 20000);
