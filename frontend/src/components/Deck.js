
import React from 'react'
import ProfileCard from './ProfileCard'
import { Button } from 'antd'
import { useAuth } from '../context/auth'

function Deck(){
    const {authTokens} = useAuth()
    return <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Button className="m-2">Swipe Left</Button><ProfileCard user={authTokens.user}/><Button className="m-2">Swipe Right</Button></div>
}
export default Deck