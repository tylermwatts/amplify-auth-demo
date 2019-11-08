import React from 'react';
import App from 'next/app';
import UserContext from '../context/UserContext';
import Amplify, { Auth, Hub } from 'aws-amplify';
import config from '../aws-exports';

Amplify.configure(config);

class AmplifyAuthApp extends App {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};

		this.signIn = this.signIn.bind(this);
		this.signOut = this.signOut.bind(this);
		this.checkUser = this.checkUser.bind(this);
	}

	componentDidMount() {
		const getCurrentAuthUser = async () => {
			try {
				const authUser = await Auth.currentAuthenticatedUser();
				this.setState({ user: authUser });
				localStorage.setItem('cognitoUser', JSON.stringify(authUser));
			} catch (err) {
				console.log(err);
				if (err === 'not authenticated') {
					localStorage.setItem('cognitoUser', null);
				}
			}
		};
		getCurrentAuthUser();
		Hub.listen('auth', ({ payload: { event, data } }) => {
			switch (event) {
				case 'signIn':
					localStorage.setItem('cognitoUser', JSON.stringify(data));
					this.setState({ user: data });
					break;
				case 'signOut':
					localStorage.setItem('cognitoUser', null);
					this.setState({ user: null });
					break;
				default:
					return;
			}
		});
	}

	componentWillUnmount() {
		Hub.remove('auth');
		localStorage.setItem('cognitoUser', null);
	}

	async signIn() {
		try {
			await Auth.federatedSignIn({ provider: 'Google' });
		} catch (err) {
			console.log(err);
		}
	}

	checkUser() {
		console.log(this.state.user);
	}

	signOut() {
		Auth.signOut();
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<UserContext.Provider
				value={{
					user: this.state.user,
					signIn: this.signIn,
					signOut: this.signOut,
					checkUser: this.checkUser,
				}}
			>
				<Component {...pageProps} />
			</UserContext.Provider>
		);
	}
}

export default AmplifyAuthApp;
