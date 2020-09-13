
import React from 'react'
import ProfileCard from './ProfileCard'
import { Button } from 'antd'
import { useAuth } from '../context/auth'

const Deck = ({ onRightClick, onLeftClick, option, loading, empty }) => {
    const {authTokens} = useAuth()
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            {empty ?
                <div>No more options</div>
                :
                <React.Fragment>
                <Button className="m-2" onClick = {onLeftClick}>Swipe Left</Button>
                    <ProfileCard user={authTokens.user} option = {option} loading = {loading}/>
                <Button className="m-2" onClick = {onRightClick}>Swipe Right</Button>
                </React.Fragment>
            }
        </div>
    )
}
export default Deck