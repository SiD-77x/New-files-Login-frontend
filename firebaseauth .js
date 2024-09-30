
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js"
  import{getFirestore , setDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCXrlcUv7DgVuTzxhGC64BNiEYS5u2uVX0",
    authDomain: "login-form-8de2c.firebaseapp.com",
    projectId: "login-form-8de2c",
    storageBucket: "login-form-8de2c.appspot.com",
    messagingSenderId: "203936392599",
    appId: "1:203936392599:web:a1b22bf733290a20b190d2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML =message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
      messageDiv.style.opacity=0;

    },5000);
  }

  const signUp=document.getElementById('submitLoginUp');
  signUp.addEventListener('click' , (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    
    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      const user=userCredential.user;
      const userData={
        email: email,

      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef=doc(db,"users", user.uid);
      setDoc(docRef,userData)
      .then(()=>{
         window.location.href='index.html';
      })
      .catch((error)=>{
        console.error("error writing document", error);

      })
    })
    .catch((error)=>{
      const errorCode=error.code;
      if(errorCode=='auth/email-already-in-use'){
        showMessage('Email Already Exists !!!', 'signUpMessage');
      }
      else{
        showMessage('Unable to create User', 'signUpMessage');
      }
    })

  });
