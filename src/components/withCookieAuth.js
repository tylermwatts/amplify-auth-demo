import { parseCookies } from "nookies";
import React from "react";

const withCookieAuth = WrappedComponent => {
  const Wrapper = props => <WrappedComponent {...props} />;
  Wrapper.getInitialProps = async ctx => {
    const allCookies = parseCookies(ctx);
    const isAuthenticated =
      allCookies.isAuthenticated === "true" ? true : false;
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, isAuthenticated };
  };
  return Wrapper;
};

export default withCookieAuth;
