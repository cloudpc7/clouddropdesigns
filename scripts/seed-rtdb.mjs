#!/usr/bin/env node
/**
 * Seeds Firebase Realtime Database at /content from database/contentData.mjs
 * and src/content/vibenmedLegalContent.js (legal HTML).
 *
 * Usage:
 *   npm run seed:rtdb
 *   npm run seed:rtdb -- --dry-run
 *   npm run seed:rtdb -- --emulator
 *
 * Requires:
 *   - Realtime Database enabled in Firebase Console (clouddropdesigns)
 *   - GOOGLE_APPLICATION_CREDENTIALS or `firebase login` for production seed
 */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import admin from 'firebase-admin';
import { buildContentPayload } from '../database/contentData.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PROJECT_ID = 'clouddropdesigns';
const DATABASE_URL =
  process.env.FIREBASE_DATABASE_URL ??
  'https://clouddropdesigns-default-rtdb.firebaseio.com';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const useCli = args.includes('--cli');
const useEmulator = args.includes('--emulator');

if (useEmulator) {
  process.env.FIREBASE_DATABASE_EMULATOR_HOST =
    process.env.FIREBASE_DATABASE_EMULATOR_HOST ?? '127.0.0.1:9000';
}

const loadVibenmedLegal = async () => {
  const legalUrl = pathToFileURL(
    join(rootDir, 'src/content/vibenmedLegalContent.js'),
  ).href;
  const legalModule = await import(legalUrl);
  return {
    PRIVACY_POLICY_HTML: legalModule.PRIVACY_POLICY_HTML,
    TERMS_OF_SERVICE_HTML: legalModule.TERMS_OF_SERVICE_HTML,
    TERMS_BODY_HTML: legalModule.TERMS_BODY_HTML,
  };
};

const main = async () => {
  const vibenmedLegal = await loadVibenmedLegal();
  const payload = buildContentPayload(vibenmedLegal);

  const seedPath = join(rootDir, 'database/content.seed.json');
  writeFileSync(seedPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${seedPath}`);

  if (dryRun) {
    console.log('Dry run — skipping RTDB upload.');
    console.log(`Sections: ${Object.keys(payload).filter((k) => k !== 'meta').join(', ')}`);
    return;
  }

  const uploadViaCli = async () => {
    const { spawnSync } = await import('node:child_process');
    const result = spawnSync(
      'firebase',
      [
        'database:set',
        '/content',
        seedPath,
        '--project',
        PROJECT_ID,
        '--instance',
        'clouddropdesigns-default-rtdb',
        '--force',
        '--non-interactive',
      ],
      { stdio: 'inherit', shell: process.platform === 'win32' },
    );
    if (result.status !== 0) {
      throw new Error('firebase database:set exited with a non-zero status');
    }
    console.log(`Seeded Realtime Database via Firebase CLI at ${DATABASE_URL}/content`);
    console.log(`Version: ${payload.meta.version} (${payload.meta.updatedAt})`);
  };

  if (useCli) {
    await uploadViaCli();
    return;
  }

  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        projectId: PROJECT_ID,
        databaseURL: DATABASE_URL,
      });
    }

    const ref = admin.database().ref('content');
    await ref.set(payload);

    console.log(`Seeded Realtime Database at ${DATABASE_URL}/content`);
    console.log(`Version: ${payload.meta.version} (${payload.meta.updatedAt})`);
  } catch (error) {
    const credentialError =
      error.code === 'app/invalid-credential' ||
      error.message?.includes('invalid_grant');

    if (!credentialError) {
      throw error;
    }

    console.warn('Admin SDK credentials unavailable — falling back to Firebase CLI.');
    await uploadViaCli();
  }
};

main().catch((error) => {
  console.error('RTDB seed failed:', error.message);
  if (error.code === 'app/invalid-credential') {
    console.error(
      'Tip: run `firebase login` or set GOOGLE_APPLICATION_CREDENTIALS, then retry.',
    );
  }
  if (error.message?.includes('404') || error.message?.includes('not found')) {
    console.error(
      'Tip: enable Realtime Database in Firebase Console for project clouddropdesigns.',
    );
  }
  process.exit(1);
});