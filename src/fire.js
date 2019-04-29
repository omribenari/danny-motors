import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyA-X-b63BpoZ9I1amEQxkJFzHwry3x76cI",
  authDomain: "garage-manager-d7d68.firebaseapp.com",
  databaseURL: "https://garage-manager-d7d68.firebaseio.com",
  projectId: "garage-manager-d7d68",
  storageBucket: "garage-manager-d7d68.appspot.com",
  messagingSenderId: "441236782711"
};

export const collections = {
  CAR_MAKE: 'CarsMake',
  USERS_INFO: 'UsersInfo',
  GUEST_SERVICE_REQ: 'guestServiceReq',
};

const fire = firebase.initializeApp(config);
export default fire;