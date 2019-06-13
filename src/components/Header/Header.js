import React from 'react';

function Header() {

    const headerStyle = {
        color: 'whitesmoke',
        backgroundColor: '#303030',
        margin: '0',
        padding: '1rem 80px'
    }

    const headingStyle = {
        margin: 0
    }

    return (
        <header style={headerStyle}>
            <h1 style={headingStyle}>Calc Cast</h1>
        </header>
    )
}

export default Header;