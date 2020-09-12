import React from 'react'
import '../css/profile.css'
import ProfileCard from '../components/ProfileCard'
import { useAuth } from '../context/auth';


export default function Profile(props){

    const {authTokens} = useAuth()
    return(

        <div style={{display:'flex', justifyContent:'center'}}><ProfileCard edit={props.edit} user = {authTokens.user} owned={true}/></div>

    );
}