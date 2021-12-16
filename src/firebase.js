import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const app = firebase.initializeApp({
    // FIREBASE CREDENTIALS
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

