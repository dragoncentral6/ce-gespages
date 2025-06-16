// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import { getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


/*
const firebaseConfig = {
    apiKey: "AIzaSyAO0AMQhLZBez3wn5KiumIuw44JbROMzoo",
    authDomain: "ceges-cf8ad.firebaseapp.com",
    projectId: "ceges-cf8ad",
    storageBucket: "ceges-cf8ad.appspot.com",
    messagingSenderId: "673242495179",
    appId: "1:673242495179:web:177eae4112c792ade4c34e"
  };
  */

// conexion pruebas
const firebaseConfig = {
  apiKey: "AIzaSyA9iDdqFnLFACBg3zH_BTy1ocIEahibVjs",
  authDomain: "ejemplo-crud-8c78a.firebaseapp.com",
  projectId: "ejemplo-crud-8c78a",
  storageBucket: "ejemplo-crud-8c78a.firebasestorage.app",
  messagingSenderId: "809437790985",
  appId: "1:809437790985:web:5670aa02d4fc7ed02809d8"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const nameTablebd = "PruebasDragones";


//guardar datos
export const crear = (Alias, Placas, Estado, Posicion, Descripcion) => { 
    addDoc(collection(db, nameTablebd),{Alias, Placa, Estado, Posicion, Descripcion});
}  

export const cambios = (callback) => onSnapshot(collection(db, nameTablebd), callback);

export const actualizar = (id, datosNuevos) => updateDoc(doc(db, nameTablebd, id), datosNuevos)
