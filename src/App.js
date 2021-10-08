import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();
function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const auth = getAuth();

  // google authentication handler
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedIn = {
          userName: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedIn);
      })
      .then((error) => console.log(error));
  };

  // github sing in
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
      const { displayName, photoURL } = result.user;
      const loggedIn = {
        userName: displayName,
        photo: photoURL,
      };
      setUser(loggedIn);
    });
  };

  // facebook sing in
  const handleFacebookSingIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const { displayName, photoURL } = result.user;
        console.log(result.user);
        const loggedIn = {
          userName: displayName,
          photo: photoURL,
        };
        setUser(loggedIn);
      });

  }

  // logout handler
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='App' style={{ marginTop: '20px' }}>
      {!user.userName ? (
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
          <button onClick={handleFacebookSingIn}>Facebook Sign In</button>
        </div>
      ) : (
        <button onClick={logoutHandler}>Sign Out</button>
      )}

      <br />

      {/* show google account data */}
      {user.userName && (
        <div>
          <h1>Welcome {user.userName}</h1>
          <p>email {user.email}</p>
          <img src={user.photo} alt='' />
        </div>
      )}
    </div>
  );
}

export default App;
