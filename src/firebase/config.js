import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCnhr4wKtwaN6g1zOz4AvlZgDJEEMcXLfc",
    authDomain: "chat-app-d034a.firebaseapp.com",
    projectId: "chat-app-d034a",
    storageBucket: "chat-app-d034a.appspot.com",
    messagingSenderId: "816351473680",
    appId: "1:816351473680:web:48f8e23c3fe08563291a95",
    measurementId: "G-T289FPE8WQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { db, auth };
