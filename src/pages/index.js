import dynamic from "next/dynamic";
import React from "react";
import withCookieAuth from "../components/withCookieAuth";

const HomeWithoutSSR = dynamic(import("../components/Home"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Index = ({ isAuthenticated }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = React.useState(
    isAuthenticated
  );
  return (
    <>
      <HomeWithoutSSR
        isAuthenticated={isUserAuthenticated}
        setIsAuthenticated={setIsUserAuthenticated}
      />
      {isUserAuthenticated && <div>YOU ARE AUTHENTICATED BRO</div>}
    </>
  );
};

export default withCookieAuth(Index);
