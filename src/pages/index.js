import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import UserContext from '../context/UserContext';

const AppWithoutSSR = dynamic(import('../components/App'), {
	ssr: false,
	loading: () => <div>Loading...</div>,
});

const Index = props => {
	const { user, setUser } = useContext(UserContext);
	return (
		<>
			<AppWithoutSSR state={[user, setUser]} />
		</>
	);
};

export default Index;
