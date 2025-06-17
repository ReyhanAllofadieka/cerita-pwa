import { openDB } from 'idb';

const DB_NAME = 'cerita-db';
const STORE_NAME = 'cerita-store';

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
  },
});

export async function saveCeritaOffline(cerita) {
  const db = await dbPromise;
  return db.put(STORE_NAME, cerita);
}

export async function getCeritaOffline() {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
}

export async function deleteCeritaOffline(id) {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
}
