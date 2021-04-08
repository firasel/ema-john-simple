import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from "./LoginManager";



function Login() {

  const [loggedInUser,setLoggedInUser]= useContext(UserContext);
  const history=useHistory();
  const location=useLocation();
  let { from } = location.state || {from: {pathname:"/"}}

  initializeLoginFramework();


  const [user,setUser]=useState({isSignedIn:false,name:'',email:'',photo:'',password:'',error:'',success:false})
  const [newUser,setNewUser]=useState(false);

  const handleBlur = (e)=>{
    let isFieldValid = true
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber=/\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const googleSignIn=()=>{
      handleGoogleSignIn()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
      })
  }

  const signOut=()=>{
      handleSignOut()
      .then(res=>{
          setUser(res);
          setLoggedInUser(res);
      })
  }
  
  const fbSignIn=()=>{
    handleFbSignIn()
    .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
    })
  }

  const handleSubmit=(e)=>{
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res=>{
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res=>{
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    e.preventDefault()
  }

  return (
    <div style={{textAlign:'center'}}>
      <h1>Our Authentication</h1>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <p> welcome, {user.name}</p>
      }
      
      <br />
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser"/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/> }
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} id="" placeholder="Your Password" required />
        <br />
        <input type="submit" value={newUser? 'Sign Up':'Sign In'} />
      </form>
      <br/>
      <button onClick={fbSignIn}>Sign in with FaceBook</button>
      <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green'}}>user {newUser ? 'created': 'logged in'} successfully</p>
      }

    </div>
  );
}

export default Login;
