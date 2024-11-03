import { initializeApp } from 'firebase/app'
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyD0OFEsFdTjjmwzYIS3GKEMozI4_T0EY_k',
	authDomain: 'atlan-app.firebaseapp.com',
	projectId: 'atlan-app',
	storageBucket: 'atlan-app.firebasestorage.app',
	messagingSenderId: '877773616509',
	appId: '1:877773616509:web:2c0290f499a4a6f2964814',
	measurementId: 'G-0X3ZZMMD5N',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider, signInWithPopup, signOut }
