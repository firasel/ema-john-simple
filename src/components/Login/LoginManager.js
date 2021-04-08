import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework=()=>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app();
      }
}

const setUserToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    sessionStorage.setItem('token',idToken)
  }).catch(function(error) {
    console.log('Error',error)
  });
}

export const handleGoogleSignIn= ()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(result=>{
      const {displayName,photoURL,email}=result.user
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true
      }
      setUserToken();
      return signedInUser;
    })
    .catch(err=>{
        const user={
            isSignedIn:false,
            name:'',
            email:'',
            photo:'',
            success:false
        }
        console.log(err);
        return user;
    })
  }

export const handleFbSignIn=()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      const {displayName,photoURL,email}=result.user
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true
      }
      var accessToken = credential.accessToken;
      return signedInUser;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      const user={
        isSignedIn:false,
        name:'',
        email:'',
        photo:'',
        success:false
      }
      console.log(errorCode,errorMessage);
      return user;
    });
  }

export const handleSignOut=()=>{
    return firebase.auth().signOut()
    .then(res=>{
      const user = {
        isSignedIn: false,
        name: '',
        photo: '',
        email:'',
        success:false
      }
      return user;
    })
    .catch(err => console.log(err))
  }

export const createUserWithEmailAndPassword = (name,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( res => {
        const newUserInfo=res.user;
        newUserInfo.error=''
        newUserInfo.success=true
        updateUserName(name);
        console.log('successfully sign up');
        return newUserInfo
      })
      .catch(error => {
        const newUserInfo={}
        newUserInfo.error=error.message
        newUserInfo.success=false
        console.log('Error is > ',error.message);
        return newUserInfo;
      });
}

export const signInWithEmailAndPassword=(email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then( res => {
        const newUserInfo= res.user;
        newUserInfo.error=''
        newUserInfo.success=true
        console.log('successfully sign In');
        return newUserInfo;
      })
      .catch(error => {
        const newUserInfo={}
        newUserInfo.error=error.message
        newUserInfo.success=false
        console.log('Error is > ',error.message)
        return newUserInfo;
      })
}

const updateUserName= name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    })
    .then(()=>console.log('user name updated successfully'))
    .catch((error)=>console.log(error));
  }