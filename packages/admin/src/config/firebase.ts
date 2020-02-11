
import { log } from '../utils/log';

const apiKey = process.env.FIREBASE_API_KEY;
const projectId = process.env.FIREBASE_PROJECT_ID;

export const config = {
  apiKey,
  projectId,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

log('🔔 Firebase Config', config);

export default config;
