import React, { useState } from 'react'
import '../css/auth.css'
import UsersService from '../services/UsersService'
import { useAuth } from "../context/auth";
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
const  usersService  =  new  UsersService();
export default function Register(){
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")

	const [loading, setLoading] = useState(false)
	const { authTokens, setAuthTokens } = useAuth();
	function registerUser(){
		setLoading(true)
		usersService.registerUser({"username":username,"email":email,"password":password})
		.then(result => {
				setAuthTokens(result.data);
		}).catch(e=>{
			var objectKeys = Object.keys(e.response.data)
                console.log(objectKeys)
                for(var i = 0;i<objectKeys.length;i++)
                {
                    message.error(objectKeys[i] + " : " + e.response.data[objectKeys[i]][0])
				}
				setLoading(false)
		})
	
	
	
}
	if(authTokens){
		return <Redirect to="/"/>
	}
     return (
    <div className="limiter">
		<div className="container-login100">
		{loading?<div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div className="lds-dual-ring"></div></div>:
			<div className="wrap-login100 pt-5 login100-form validate-form">
					<span className="login100-form-title  mb-4">
						Welcome
					</span>
					<span className="login100-form-avatar mb-4">
						<img src="https://picsum.photos/200" alt="AVATAR"/>
					</span>

					<div className="wrap-input100 validate-input mb-4">
						<input className="input100" type="username" name="username" value={username} onChange={e=>setUsername(e.target.value)}/>
						{username.length==0&&<span className="focus-input100" data-placeholder="Username"></span>}
					</div>

					<div className="wrap-input100 validate-input mb-4">
						<input className="input100" type="email" name="email" value={email} onChange={e=>setEmail(e.target.value)}/>
						{email.length==0&&<span className="focus-input100" data-placeholder="Email"></span>}
					</div>

					<div className="wrap-input100 validate-input mb-2">
						<input className="input100" type="password" name="pass" onChange={e=>setPassword(e.target.value)} value={password}/>
						{password.length==0&&<span className="focus-input100" data-placeholder="Password"></span>}
					</div>

					<div className="container-login100-form-btn  pb-2 pt-4">
						<button className="login100-form-btn" onClick={registerUser}>
							Register
						</button>
					</div>


							<span className="txt1">
								Already have an account?
							</span>

							<a href="/login" className="txt2"> Sign in
							</a>
						
					
			</div>}
		</div>
	</div>
	
    );
}