import React, { useEffect, useState } from 'react'

import '../css/inbox.css'
import { useAuth } from '../context/auth'
import { Tabs } from 'antd'
import UsersService from '../services/UsersService';

const { TabPane } = Tabs;
const usersService = new UsersService()
export default function Matches(){
    const {authTokens} = useAuth()
    const [inbox, setInbox] = useState([])
    const [sent, setSent] = useState([])
    const [createMessageModal, setCreateMessageModal] = useState(false)
    useEffect(()=>{
        getInbox();
        getSent()
    },[])
    function createMessage(){

    }
    function getInbox(){
        usersService.getInbox()
            .then(result=>{
                console.log(result.data)
                setInbox(result.data)
            })
    }
    function getSent(){
        usersService.getSent()
            .then(result=>{
                setSent(result.data)
            })
    }
    return <div className="mail-box">

        <div className="inbox-head">
            <h3 style={{color:'white'}}>Matches</h3>
            <button style={{background:'purple', padding:'8px', marginLeft:'2%'}}><i className="fa fa-plus"></i> New message</button>

            
        </div>
        <Tabs defaultActiveKey="1" className="mx-3">
            <TabPane tab="Inbox" key="1">
                <table className="table table-hover">
                {inbox.map(message=>(
                            <tbody>

                            <tr>
                                <td>{message.sender.username} </td>
                                <td>{message.content.substr(0,50)}...</td>
        
                                <td>{message.time_posted}</td>
                            </tr>
                            
                        </tbody>
                    ))}
                </table>
            </TabPane>
            <TabPane tab="Sent" key="2">
                <table className="table table-hover">
                    {sent.map(message=>(
                            <tbody>

                            <tr>
                                <td>{message.recipient.username} </td>
                                <td>{message.content.substr(0,50)}...</td>
        
                                <td>{message.time_posted}</td>
                            </tr>
                            
                        </tbody>
                    ))}
                
                
                </table>

            </TabPane>
        </Tabs>
            

</div>

}