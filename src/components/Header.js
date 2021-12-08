import React from 'react'

export default function Header(props) {
    const headerStyle = {
        backgroundColor: 'mediumblue',
        color: '#ffffff',        
    }
    // const date = new Date(Date.now()).toLocaleString();
    return (
        <header style={headerStyle}>
            <h1><span className="userNameSpan">{props.title}'s</span> To Do List</h1>
        </header>
    )
}

Header.defaultProps = {
    title: "Default"
}
