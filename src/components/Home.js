import Amplify, { Auth, Hub } from "aws-amplify";
import { parseCookies } from "nookies";
import React from "react";
import config from "../aws-exports";
import Header from "./Header";
import SignIn from "./SignIn";

Amplify.configure(config);

const Home = ({ userId, setUserId }) => {
  React.useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          if (userId === undefined) {
            setUserId(data.username);
          }
          break;
        default:
          return;
      }
    });
    return () => Hub.remove("auth");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUser = async () => {
    console.log(await Auth.currentAuthenticatedUser());
  };

  const logCookie = () => {
    const myCookies = parseCookies();
    console.log(myCookies);
  };

  const userSignOut = () => {
    Auth.signOut();
  };

  return (
    <div>
      <Header userId={userId} signOut={userSignOut} />
      {userId ? (
        <div>
          <p>This is the home page</p>
          <button onClick={checkUser}>Check User</button>
          <button onClick={logCookie}>Log Cookie</button>
        </div>
      ) : (
        <SignIn Auth={Auth} />
      )}
    </div>
  );
};

export default Home;
