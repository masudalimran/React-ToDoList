import React from 'react'

export default function Footer({length}) {
    // const today = new Date()
    return (
        <footer>
            <p>{length} List {length <2 ? "item" : "items"}</p>
            {/* <p>Copyright &copy; {today.getFullYear()}</p> */}
        </footer>
    )
}
