import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
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

// 어드민 정보 읽어오기
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
  // console.log({ product }); 오브젝트안에 또 오브젝트가 있음.
  // console.log({ ...product, id });
  return await set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price), // 덮혀씌워지것
    image, // 새로추가할것
    options: product.options.split(','),
  });
}

// 제품정보 읽어오기
export async function getProducts() {
  return get(ref(database, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(userId) {
  return await get(ref(database, `cart/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addAndUpdateCart(userId, product) {
  return await set(ref(database, `cart/${userId}/${product.id}`, product));
}

export async function deleteCart(userId, productId) {
  return await remove(ref(database, `cart/${userId}/${productId}`));
}
