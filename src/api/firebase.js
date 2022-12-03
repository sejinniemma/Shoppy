import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDt7pz60_uP9HzhZ6Gre3-9oo1xeWShG3A',
  authDomain: 'shoppy-b869f.firebaseapp.com',
  projectId: 'shoppy-b869f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      return user;
    })
    .catch(console.error);
}

export async function logout() {
  return signOut(auth).then(null);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => callback(user));
}
