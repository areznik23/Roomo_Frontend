
import React from 'react'
import ProfileCard from './ProfileCard'
import { Button } from 'antd'
import { useAuth } from '../context/auth'

const Deck = ({ onRightClick, onLeftClick, option, loading, empty, match }) => {
    const {authTokens} = useAuth()
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div className = "mb-5">{authTokens.user.profile.university}</div>
            {empty ?
                <div>No more options</div>
                :
                <React.Fragment>
                <Button className="m-2" onClick = {onLeftClick}>Dismiss</Button>
                    <ProfileCard  user = {option} loading = {loading}/>
                <Button className="m-2" onClick = {onRightClick}>Like</Button>
                </React.Fragment>
            }
        </div>
    )
}
export default Deck