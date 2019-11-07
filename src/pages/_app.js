import React from 'react';
import App from 'next/app';
import UserContext from '../components/UserContext';

class AmplifyAuthApp extends App {
	state = {
		user: null,
	};
	render() {
		const { Component, pageProps } = this.props;

		return (
			<UserContext.Provider
				value={{
					user: this.state.user,
					setUser: userData => this.setState({ user: userData }),
				}}
			>
				<Component {...pageProps} />
			</UserContext.Provider>
		);
	}
}

export default AmplifyAuthApp;
