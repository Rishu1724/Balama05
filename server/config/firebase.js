const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let db, auth, storage;

// Use the service account file for Firebase initialization
try {
  const serviceAccount = require('../firebase-service-account.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://balama-55eef.firebaseio.com',
    storageBucket: 'balama-55eef.firebasestorage.app'
  });
  
  db = admin.firestore();
  auth = admin.auth();
  storage = admin.storage();
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.log('Firebase service account not found. Running in mock mode.');
  console.log('To use real Firebase, please configure your service account.');
  
  // Mock implementations for development
  db = {
    collection: () => ({
      add: async (data) => {
        console.log('Mock: Adding document to collection');
        return { id: 'mock-id-' + Date.now() };
      },
      get: async () => ({
        size: 0,
        empty: true,
        forEach: () => {},
        docs: []
      }),
      where: () => ({
        get: async () => ({
          size: 0,
          empty: true,
          forEach: () => {},
          docs: []
        }),
        limit: () => ({
          get: async () => ({
            size: 0,
            empty: true,
            forEach: () => {},
            docs: []
          })
        })
      }),
      doc: () => ({
        get: async () => ({ exists: false }),
        set: async (data) => {
          console.log('Mock: Setting document data');
        },
        update: async (data) => {
          console.log('Mock: Updating document data');
        },
        delete: async () => {
          console.log('Mock: Deleting document');
        }
      })
    })
  };
  
  auth = {
    createUser: async (data) => {
      console.log('Mock: Creating user');
      return { uid: 'mock-uid-' + Date.now() };
    },
    getUserByEmail: async (email) => {
      console.log('Mock: Getting user by email');
      return { uid: 'mock-uid-' + Date.now() };
    },
    createCustomToken: async (uid) => {
      console.log('Mock: Creating custom token');
      return 'mock-token-' + Date.now();
    }
  };
  
  storage = {
    bucket: () => ({
      upload: async (filePath, options) => {
        console.log('Mock: Uploading file to storage');
        return [{}, {}];
      }
    })
  };
}

module.exports = { admin, db, auth, storage };