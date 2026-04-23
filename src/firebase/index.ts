'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore as getFirestoreSDK, Firestore } from 'firebase/firestore';
import { getAuth as getAuthSDK, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

/**
 * Initializes Firebase idempotently.
 */
export function initializeFirebase(): {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
} {
  const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const firestore = getFirestoreSDK(firebaseApp);
  const auth = getAuthSDK(firebaseApp);

  return { firebaseApp, firestore, auth };
}

/**
 * Direct access getters for non-hook contexts (e.g., utility files).
 */
export const getFirestoreInstance = () => initializeFirebase().firestore;
export const getAuthInstance = () => initializeFirebase().auth;

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
