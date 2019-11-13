import React from "react";
import Header from "../components/Header";
import withAuthSync from "../components/withCookieAuth";

const InternalPage = ({ isAuthenticated }) => (
  <>
    <Header isAuthenticated={isAuthenticated} />
    {isAuthenticated ? <div>Success!</div> : <div>Not authorized.</div>}
  </>
);

export default withAuthSync(InternalPage);
