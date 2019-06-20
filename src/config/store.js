import firebase from 'firebase'

import {apiKey,authDomain,databaseURL,projectId,storageBucket,messagingSenderId,appId} from '../secret/index'

const config={
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
}

firebase.initializeApp(config) 

export const db = firebase.database()
export const firebaseAuth = firebase.auth()