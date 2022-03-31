import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDysVYEmQbUnGFhfuAwoHuP3tPJng1R16A",
  authDomain: "itss-storage.firebaseapp.com",
  projectId: "itss-storage",
  storageBucket: "itss-storage.appspot.com",
  messagingSenderId: "249880794296",
  appId: "1:249880794296:web:53ecbc83d9c7ac238a504d"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage