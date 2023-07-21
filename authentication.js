import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMsMYS3L9AauMya35lm6Gd1BN1yT0GeMI",
  authDomain: "bkb-community.firebaseapp.com",
  projectId: "bkb-community",
  storageBucket: "bkb-community.appspot.com",
  messagingSenderId: "182509973665",
  appId: "1:182509973665:web:36ec575876f916392880e0"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

