// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
	uploadBytesResumable,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDVCC5AoSYNL23dt0mYmk7JUR1PMLRlIew",
	authDomain: "yapey-6433c.firebaseapp.com",
	projectId: "yapey-6433c",
	storageBucket: "yapey-6433c.appspot.com",
	messagingSenderId: "388073494630",
	appId: "1:388073494630:web:04a5129218e39b7fbef5a7",
	measurementId: "G-MBGM43PHGC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fStorage = getStorage();

export { fStorage, uploadBytes, ref, getDownloadURL, uploadBytesResumable };
