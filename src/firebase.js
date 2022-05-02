// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyARt8BEr8Z2chVOoNwt0c7cRedSO8uftfU',
  authDomain: 'react-http-requests-f261a.firebaseapp.com',
  databaseURL:
    'https://react-http-requests-f261a-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'react-http-requests-f261a',
  storageBucket: 'react-http-requests-f261a.appspot.com',
  messagingSenderId: '108477349288',
  appId: '1:108477349288:web:71db54d8a2ae66b356b19d',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
