const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const catchAsync = require('../utils/catchAsync');

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyBEsCXArrbkQAo0RJrhAh8oRRR9ijkhkaA',
  authDomain: 'temurasa-206af.firebaseapp.com',
  projectId: 'temurasa-206af',
  storageBucket: 'temurasa-206af.appspot.com',
  messagingSenderId: '565249215363',
  appId: '1:565249215363:web:6580f4db3cb963d7a684b6',
  measurementId: 'G-2B8KJN4FJM',
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const uploadImage = catchAsync(async (req, res) => {
  const { fieldname, originalname, encoding, mimetype, buffer } = req.files[0];

  const imageRef = ref(storage, `images/${+Date.now()}-${originalname}`);

  let url;
  await uploadBytes(imageRef, buffer).then(async (snapshot) => {
    await getDownloadURL(snapshot.ref).then((downloadURL) => {
      url = downloadURL;
    });
  });

  return res.status(200).send({ url });
});

module.exports = {
  uploadImage,
};
