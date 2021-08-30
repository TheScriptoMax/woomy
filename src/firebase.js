import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';



const app = firebase.initializeApp({
    apiKey: "AIzaSyDqXSbXW5dTrpubT1gyI3AJ9opFcmisksw",
    authDomain: "woomy-app.firebaseapp.com",
    projectId: "woomy-app",
    storageBucket: "woomy-app.appspot.com",
    messagingSenderId: "796599799860",
    appId: "1:796599799860:web:a74f9a63a9322d86f1ba61"
});

export const auth = app.auth();

const firestore = app.firestore();

export const database = {
    users: firestore.collection('users'),
    cowalks: firestore.collection('cowalks'),
    locations: firestore.collection('locations'),
    districts: firestore.collection('districts'),
    towns: firestore.collection('towns'),
    idCardFiles: firestore.collection('idCardFiles'),
    idPictureFiles: firestore.collection('idPictureFiles'),

    membersPending: cowalkId => {
        return firestore.collection('cowalks').doc(cowalkId).collection('membersPending');
    },


    notifications: userId => {
        return firestore.collection('users').doc(userId).collection('notifications');
    },
   

    membersApproved: cowalkId => {
        return firestore.collection('cowalks').doc(cowalkId).collection('membersApproved');
    },

    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    formatDoc: doc => {
        return {
            id:doc.id,
            ...doc.data()
        }
    },
}


export const storage = app.storage();

export default app;

