import React from 'react';
import Header from '../components/Header';
import withAuthSync from '../components/withCookieAuth';

const InternalPage = ({ userId }) => (
	<>
		<Header userId={userId} />
		{userId ? <div>Success!</div> : <div>Not authorized.</div>}
	</>
);

export default withAuthSync(InternalPage);
