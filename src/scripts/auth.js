// src/scripts/auth.js
export function signInAdmin() {
  firebase.auth()
    .signInWithEmailAndPassword("canvateem@gmail.com", "Jite@123")
    .catch(err => console.error("Auto-login failed:", err));
}

export function onAuthStateChanged(callback) {
  firebase.auth().onAuthStateChanged(callback);
}