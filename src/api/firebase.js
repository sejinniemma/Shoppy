import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';
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
  databaseURL:
    'https://shoppy-b869f-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user && (await adminUser(user));
    return callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins')).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid) ? true : false;
      return { ...user, isAdmin };
    }
  });
}
// 데이터 쓰기
export async function addNewProduct(product, image) {
  const id = uuid();
  // 에러가 났던 이유 스프레드연산자
  console.log({ product });
  // console.log({ ...product, id });
  await set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  });
}
