import dynamic from 'next/dynamic';
import React from 'react';
import withCookieAuth from '../components/withCookieAuth';

const HomeWithoutSSR = dynamic(import('../components/Home'), {
	ssr: false,
	loading: () => <div>Loading...</div>,
});

const Index = ({ userId }) => {
	const [localUserId, setLocalUserId] = React.useState(userId);

	return (
		<>
			<HomeWithoutSSR userId={localUserId} setUserId={setLocalUserId} />
		</>
	);
};

export default withCookieAuth(Index);
