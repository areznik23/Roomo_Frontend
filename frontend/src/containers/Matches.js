import React, { useEffect, useState } from 'react'

import '../css/inbox.css'
import { useAuth } from '../context/auth'
import { Tabs, Dropdown, Select, message } from 'antd'
import UsersService from '../services/UsersService';
import Modal from 'antd/lib/modal/Modal';
const {Option} = Select
const { TabPane } = Tabs;
const usersService = new UsersService()
export default function Matches(){
    const {authTokens} = useAuth()
    const [inbox, setInbox] = useState([])
    const [sent, setSent] = useState([])
    const [createMessageModal, setCreateMessageModal] = useState(false)
    const [to, setTo] = useState("")
    const [messageContent, setMessageContent] = useState("")
    const [users, setUsers] = useState([])
    const [curMessage, setCurMessage] = useState(null)
    const [showMessage, setShowMessage] = useState(false)
    const [replyContent, setReplyContent] = useState("")
    useEffect(()=>{
        getInbox();
        getSent();
        getAllUsers()
    },[])
    function createMessage(){
        usersService.createMessage({"content":messageContent,"recipient":to, "sender":authTokens.user.id})
            .then(()=>{
                message.success("Message sent!")
                setCreateMessageModal(false)
                window.location.reload()
            })
    }
    function getInbox(){
        usersService.getInbox()
            .then(result=>{
                setInbox(result.data)
                console.log(result)
            })
    }
    function getAllUsers(){
        usersService.getUsers(authTokens.user)
            .then(result=>{
                console.log(result)
                setUsers(result.data)
            })
            
    }
    function getSent(){
        usersService.getSent()
            .then(result=>{
                setSent(result.data)
            })
    }
    function setCurrentMessage(message)
    {
        setShowMessage(true)
        setCurMessage(message)
    }
    function replyMessage(e){
        if(e.key==='Enter')
        {
            usersService.createReply({"sender":authTokens.user.id,"content":replyContent,"message":curMessage.id})
                .then(()=>{
                    message.success("Replied")
                    window.location.reload()
                })
        }
        /* usersService.createReply({""}) */
    }
    return <div className="mail-box">

        <div className="inbox-head">
            <h3 style={{color:'white'}}>Matches</h3>
            <button style={{background:'purple', padding:'8px', marginLeft:'2%'}} onClick={()=>setCreateMessageModal(true)}><i className="fa fa-plus"></i> New message</button>

            
        </div>
        <Tabs defaultActiveKey="1" className="mx-3">
            <TabPane tab="Inbox" key="1">
                <table className="table table-hover">
                {inbox.map(message=>(
                            <tbody onClick={()=>setCurrentMessage(message)}>

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
                            <tbody onClick={()=>setCurrentMessage(message)}>

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
            <Modal visible={createMessageModal} title="New Message"
            onCancel={()=>setCreateMessageModal(false)} onOk={createMessage}>
                <div style={{display:'flex'}}>
                <h5>To:
                </h5>
                <Select
					showSearch
					style={{ width: 200, marginLeft:5}}
					placeholder="Select a match"
					optionFilterProp="children"
					onChange={e=>setTo(e)}
					filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				>	
					{users.map(user=>(
                        <Option value={user.id}>{user.username}</Option>
                    ))}
				</Select></div>
                <textarea value={messageContent} onChange={e=>setMessageContent(e.target.value)}  rows={3} placeholder="Message content..." className="mt-2 w-100"></textarea>
            </Modal>
            {curMessage&&
            <Modal visible={showMessage} title="Message"
            onCancel={()=>setShowMessage(false)}  onOk={()=>setShowMessage(false)}>
                <strong>From:</strong> {curMessage.sender.username} <strong>To:</strong> {curMessage.recipient.username}
                <p>{curMessage.content}</p>
                <div style={{display:'flex', flexDirection:'column'}}>
                    {curMessage.message_replies.length>0&&
                    <div>
                    <strong>Replies</strong>
                    {curMessage.message_replies.map(reply=>(
                        <div key={reply.id} style={{display:'flex'}}><label>{reply.sender.username}: {reply.content}</label></div>
                    ))}
                    </div>
                        }   

                <strong>Reply:</strong>
                <textarea rows={2} value ={replyContent} onChange={e=>setReplyContent(e.target.value)} onKeyDown={replyMessage}/>
                </div>

            </Modal>}

</div>

}