import FireBase from 'firebase/app';
import 'firebase/database'; // If using Firebase database

var firebaseConfig = {
     apiKey: "AIzaSyAWunrscZqJeuNmzExLAIIzRra-OeyVMkg",
     authDomain: "to-do-app-6ec13.firebaseapp.com",
     databaseURL: "https://to-do-app-6ec13.firebaseio.com",
     projectId: "to-do-app-6ec13",
     storageBucket: "to-do-app-6ec13.appspot.com",
     messagingSenderId: "253612027006",
     appId: "1:253612027006:web:bda54d22dd269c5af8fc2f"
};

const app = FireBase.initializeApp(firebaseConfig);
const db = app.database();

export default db;