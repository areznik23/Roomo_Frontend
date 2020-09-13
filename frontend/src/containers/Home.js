import React from 'react'

const Home = () => {
    const user = JSON.parse(localStorage.getItem("tokens"))

    return (
        <div className = "ml-5">
            <div><b>{user.user.username}</b>, welcome to Roomo!</div>
            <div>Roomo is the best way to find roomates at your university.</div>
        </div>
    )
}

export default Home