/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";

const linkStyle = {
  marginRight: 15
};

const Header = ({ isAuthenticated, signOut }) => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    {isAuthenticated && (
      <Link href="/internal-page">
        <a style={linkStyle}>Internal Tools</a>
      </Link>
    )}
    {isAuthenticated && (
      <a href="#" style={linkStyle} onClick={signOut}>
        Log Out
      </a>
    )}
  </div>
);

export default Header;
