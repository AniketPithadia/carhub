import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8hQjmz-1Nkt9959JhU8XJj2sum2eTy1s",
  authDomain: "nextjscarapplication-416320.firebaseapp.com",
  projectId: "nextjscarapplication-416320",
  storageBucket: "nextjscarapplication-416320.appspot.com",
  messagingSenderId: "29642791219",
  appId: "1:29642791219:web:287fd7f58540754fcd4646",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
