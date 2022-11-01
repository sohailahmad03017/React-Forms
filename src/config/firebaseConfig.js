// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_eEj6SyvDAiQSjRFq_LuY8jodaSgWgII",
  authDomain: "react-forms-a960c.firebaseapp.com",
  projectId: "react-forms-a960c",
  storageBucket: "react-forms-a960c.appspot.com",
  messagingSenderId: "912954317041",
  appId: "1:912954317041:web:b8116f50fe9afd17d8f150",
  measurementId: "G-B4TBH04BF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;