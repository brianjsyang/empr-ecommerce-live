import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyC3AxviidMUHK84HYCx3d7WOoQld7_tr0E',
  authDomain: 'crwn-db-b5eaa.firebaseapp.com',
  projectId: 'crwn-db-b5eaa',
  storageBucket: 'crwn-db-b5eaa.appspot.com',
  messagingSenderId: '132225510324',
  appId: '1:132225510324:web:7895cee4af668420b560e1',
  measurementId: 'G-VBMPYFFVQ7',
};

// take user auth and store to database ... creates user snapshot
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    // use document reference to create new document
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log('Error creating user', err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
  // Create collection using collection key
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  // batch calls
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  // Reduce down to final object ...{ key: object }
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).catch(err => {
    console.log(err.code);
  });

export default firebase;
