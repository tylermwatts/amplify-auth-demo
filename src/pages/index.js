import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import UserContext from '../context/UserContext';

const HomeWithoutSSR = dynamic(import('../components/Home'), {
	ssr: false,
	loading: () => <div>Loading...</div>,
});

const Index = props => {
	const { user, setUser } = useContext(UserContext);
	return (
		<>
			<HomeWithoutSSR state={[user, setUser]} />
		</>
	);
};

export default Index;
