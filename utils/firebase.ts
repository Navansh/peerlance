import type { FirebaseApp } from 'firebase/app'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { browserSessionPersistence, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBmnStLk8x6IavyyEz7ERAjozdTu-33xi4',
  authDomain: 'peerlance-71608.firebaseapp.com',
  projectId: 'peerlance-71608',
  storageBucket: 'peerlance-71608.appspot.com',
  messagingSenderId: '487392862378',
  appId: '1:487392862378:web:605d7a06c66a008981f0d3',
}

// eslint-disable-next-line import/no-mutable-exports
let app: FirebaseApp

if (getApps().length)
  app = getApp()

else
  app = initializeApp(firebaseConfig)

const auth = getAuth()

auth.setPersistence(browserSessionPersistence)

export default app
