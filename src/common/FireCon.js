import * as firebase from 'firebase';
import fire, { collections } from '../fire';

const provider = new firebase.auth.GoogleAuthProvider();

export const FireCon = {
  login() {
    return fire.auth().signInWithRedirect(provider);
  },
  logout() {
    return fire.auth().signOut();
  },
  getCurrentUser() {
    return fire.auth().currentUser;
  },
  isSiginIn() {
    const user = this.getCurrentUser();
    return user && ! user.isAnonymous;
  },
  signInAnonymously() {
    return fire.auth().signInAnonymously();
  },
  addGuestServiceReq(data) {
    return fire
      .firestore()
      .collection(collections.GUEST_SERVICE_REQ)
      .add(data);
  },
  UserInfo() {
    return fire
      .firestore()
      .collection(collections.USERS_INFO)
      .doc(fire.auth().currentUser.uid);
  },
  getCarMake() {
    return fire
      .firestore()
      .collection(collections.CAR_MAKE)
      .get();
  }
};
