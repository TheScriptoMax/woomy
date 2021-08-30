import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const app = firebase.initializeApp({
    apiKey: "AIzaSyDWSx1k8S5ZK4jdsxXaddWXh-zSHhs-w1s",
    authDomain: "test-rules-woomy.firebaseapp.com",  
    projectId: "test-rules-woomy",  
    storageBucket: "test-rules-woomy.appspot.com",  
    messagingSenderId: "976311694336",  
    appId: "1:976311694336:web:e16a8ec4bcc2eab446d4e5",  
    measurementId: "G-69DRBYJJ8B" 
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
