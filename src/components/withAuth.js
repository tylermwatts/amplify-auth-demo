import React from 'react';
import UserContext from './UserContext';

const withAuth = Component => {
	return props => {
		return (
			<UserContext.Consumer>
				{context => <Component {...props} context={context} />}
			</UserContext.Consumer>
		);
	};
};

export default withAuth;
