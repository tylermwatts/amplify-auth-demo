/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

const linkStyle = {
	marginRight: 15,
};

const Header = () => (
	<div>
		<Link href='/'>
			<a style={linkStyle}>Home</a>
		</Link>
		<Link href='/internal-page'>
			<a style={linkStyle}>Internal Tools</a>
		</Link>
	</div>
);

export default Header;
