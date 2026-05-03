// Configuración de Firebase para AutoElite - Versión Compat para AA4
const firebaseConfig = {
  apiKey: "AIzaSyDx2B_A82yqD5Se4MAw-8Lucm4RAgj86BY",
  authDomain: "autoelite-grupo5.firebaseapp.com",
  projectId: "autoelite-grupo5",
  storageBucket: "autoelite-grupo5.firebasestorage.app",
  messagingSenderId: "21475395432",
  appId: "1:21475395432:web:7e00d3f3b651c15b3e78dd"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();