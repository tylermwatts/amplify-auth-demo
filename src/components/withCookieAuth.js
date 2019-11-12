import { parseCookies } from 'nookies';
import React from 'react';
import awsConfig from '../aws-exports';

const usernameKey = `CognitoIdentityServiceProvider.${awsConfig.aws_user_pools_web_client_id}.LastAuthUser`;

const withCookieAuth = WrappedComponent => {
	const Wrapper = props => <WrappedComponent {...props} />;
	Wrapper.getInitialProps = async ctx => {
		const theCookies = parseCookies(ctx);
		const userId = theCookies[usernameKey];
		const componentProps =
			WrappedComponent.getInitialProps &&
			(await WrappedComponent.getInitialProps(ctx));

		return { ...componentProps, userId };
	};
	return Wrapper;
};

export default withCookieAuth;
