import React from 'react';
import Link from 'next/link';

const linkStyle = {
	marginRight: 15,
};

const Header = () => (
	<div>
		<Link href='/'>
			<a style={linkStyle}>Main</a>
		</Link>
		<Link href='/internal-page'>
			<a style={linkStyle}>Internal Tools</a>
		</Link>
	</div>
);

export default Header;
