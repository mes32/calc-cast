import React from 'react';

const serverClockStyle = {
    color: 'gray',
    marginLeft: '80px'
};

function ServerClock(props) {
    return (
        <div style={serverClockStyle}>
            <p>Server Time: {props.timeString}</p>
        </div>
    );
}

export default ServerClock;