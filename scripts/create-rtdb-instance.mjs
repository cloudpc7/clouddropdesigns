#!/usr/bin/env node
/**
 * Creates the default Realtime Database instance via Firebase Management API.
 * Run once per project before deploy/seed.
 */

import { GoogleAuth } from 'google-auth-library';

const PROJECT_ID = 'clouddropdesigns';
const LOCATION = 'us-central1';
const DATABASE_ID = `${PROJECT_ID}-default-rtdb`;

const auth = new GoogleAuth({
  scopes: [
    'https://www.googleapis.com/auth/firebase',
    'https://www.googleapis.com/auth/cloud-platform',
  ],
});

const main = async () => {
  const client = await auth.getClient();
  const url = `https://firebasedatabase.googleapis.com/v1beta/projects/${PROJECT_ID}/locations/${LOCATION}/instances?databaseId=${DATABASE_ID}`;

  try {
    const response = await client.request({
      url,
      method: 'POST',
      data: {},
    });
    console.log('Created Realtime Database instance:', response.data?.name ?? DATABASE_ID);
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.error?.message ?? error.message;

    if (status === 409 || message?.includes('already exists')) {
      console.log(`Realtime Database instance already exists: ${DATABASE_ID}`);
      return;
    }

    throw error;
  }
};

main().catch((error) => {
  console.error('Failed to create RTDB instance:', error.message);
  process.exit(1);
});