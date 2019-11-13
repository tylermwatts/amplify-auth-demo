import Amplify, { Auth, Hub } from "aws-amplify";
import { parseCookies, setCookie } from "nookies";
import React from "react";
import config from "../aws-exports";
import Header from "./Header";
import SignIn from "./SignIn";

Amplify.configure(config);

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  const getCreds = async () => {
    try {
      const creds = await Auth.currentCredentials();
      if (creds.statusCode && creds.statusCode === 400) {
        console.log("Error while fetching credentials: ", creds.message);
      } else if (!isAuthenticated) {
        setCookie({}, "isAuthenticated", true);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Error while fetching credentials: ", error);
    }
  };
  React.useEffect(() => {
    getCreds();
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          getCreds();
          break;
        case "signOut":
          setIsAuthenticated(false);
          setCookie({}, "isAuthenticated", false);
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

  const checkAuthInState = () => {
    console.log(isAuthenticated);
  };

  const logCookie = () => {
    const myCookies = parseCookies();
    console.log(myCookies);
  };

  const userSignOut = () => {
    Auth.signOut();
  };

  const checkSession = async () => {
    try {
      const sesh = await Auth.currentCredentials();
      console.log(sesh);
    } catch (err) {
      console.log("Session retrieval error: ", err);
    }
  };

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} signOut={userSignOut} />
      {isAuthenticated ? (
        <div>
          <p>This is the home page</p>
          <button onClick={checkUser}>Check User</button>
          <button onClick={logCookie}>Log Cookie</button>
        </div>
      ) : (
        <SignIn Auth={Auth} />
      )}
      <button onClick={checkSession}>Check Session</button>
      <button onClick={checkAuthInState}>
        Check state of "isAuthenticated"
      </button>
    </div>
  );
};

export default Home;
