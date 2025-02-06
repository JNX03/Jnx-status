import { initializeApp, getApps } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAXOamgVtUaqCxXo4GT2YDmdxvis0fmK40",
  authDomain: "netx-70eb8.firebaseapp.com",
  databaseURL: "https://netx-70eb8-default-rtdb.firebaseio.com",
  projectId: "netx-70eb8",
  storageBucket: "netx-70eb8.firebasestorage.app",
  messagingSenderId: "190475319319",
  appId: "1:190475319319:web:531b674bce592133c3c452",
  measurementId: "G-H63254XVGZ"
}

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getDatabase(app)
export const auth = getAuth(app)

