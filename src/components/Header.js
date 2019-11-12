/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";

const linkStyle = {
  marginRight: 15
};

const Header = ({ userId, signOut }) => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    {userId && (
      <Link href="/internal-page">
        <a style={linkStyle}>Internal Tools</a>
      </Link>
    )}
    {userId && (
      <a href="#" style={linkStyle} onClick={signOut}>
        Log Out
      </a>
    )}
  </div>
);

export default Header;
