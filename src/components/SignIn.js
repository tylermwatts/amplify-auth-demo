import React from "react";

const SignIn = ({ Auth }) => {
  const googleSignIn = async () => {
    try {
      await Auth.federatedSignIn({ provider: "Google" });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Hold up, partner. You're not signed in!</h2>
      <div>
        <button onClick={googleSignIn}>Sign In With Google</button>
      </div>
    </div>
  );
};

export default SignIn;
