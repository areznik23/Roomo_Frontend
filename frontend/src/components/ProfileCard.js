import React, { useState } from 'react'
import '../css/profile.css'
import { Tag, Radio, message, Button } from 'antd';
import UsersService from '../services/UsersService';
import { useAuth } from '../context/auth';
import Search from 'antd/lib/input/Search';
import axios from 'axios';
const usersService = new UsersService()
export default function ProfileCard(props){
    const {authTokens,setAuthTokens} = useAuth()
    const [bio, setBio] = useState(authTokens.user.profile.bio)
    const [loudness, setLoudness] = useState(authTokens.user.profile.loudness)
    const [athleticism, setAthleticism] = useState(authTokens.user.profile.athleticism)
    const [musicality, setMusicality] = useState(authTokens.user.profile.musicality)
    const [gender, setGender] = useState(authTokens.user.profile.gender)
    const [university, setUniversity] = useState(authTokens.user.profile.university)
    const [searchTerm, setSearchTerm] = useState("")
    const [universities, setUniversities] = useState([])
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(authTokens.user.profile.image)
    function updateProfile(){
        if(bio.length==0||loudness.length==0||athleticism.length==0||musicality.length==0||gender.length==0||university.length==0)
        {
            message.error("Please fill out all fields...")
        }
        else{
            let form_data = new FormData();
            form_data.append('bio', bio);
            form_data.append('loudness', loudness);
            form_data.append('athleticism', athleticism);
            form_data.append('musicality', musicality);
            form_data.append('gender', gender);
            form_data.append('university', university);
            if(image!=null)
            {
                form_data.append('image', image, image.name);
            }
            
            usersService.updateProfile(form_data)
                .then(result=>{
                    message.success("Profile updated!")
                    let auth = authTokens
                    auth.user.profile=result.data
                    setAuthTokens(auth)
                    window.location.href="/profile"
                })

            }
        
    }
    function searchUniversities(){
        axios.get('http://universities.hipolabs.com/search?name='+searchTerm.replace(/ /g, '%20'))
            .then(result=>{
                setUniversities(result.data.slice(0,10))
            })
    }
    function handleImageChange(e){
        setImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
    return(

        <div className="card-container">
        <div className="upper-container">
           <div className="image-container">
               {props.edit?
               <div>
               <img src={imagePreview} style={{border:'4px solid white'}}/>
               <label htmlFor="profilePic" className="border border-gray rounded mt-2 cursor-pointer px-2 py-1 bg-white">
                <a className="h-full w-full" >
                    <i className="fa fa-upload pr-2" aria-hidden="true"></i>Upload
                </a>
            </label>
            <input hidden type="file" accept="image/png, image/jpeg" onChange={handleImageChange}
                id="profilePic" /></div>
               :
              <img src={props.user.profile.image} style={{border:'4px solid white'}} />}
           </div>
        </div>
        <div className="lower-container">
           <div>
               
              <h3 className="mb-3" style={{textDecoration:'underline', textDecorationColor:'#ccc'}}>{props.user.username}</h3>
              {props.edit?
              university&&university.length>0?
              <div style={{border:'2px solid #eee', padding:'20px'}}>{university} <a style={{textDecoration:'underline'}} onClick={()=>setUniversity("")}>Change</a></div>
              :
              <div className="mb-2">
              <Search onChange={e=>setSearchTerm(e.target.value)} onSearch={searchUniversities} placeholder="Search universities..." value={searchTerm}></Search>
              {universities.map(item=>(
              <Button className="w-100" onClick={()=>setUniversity(item.name)}>{item.name.substr(0,36)}...</Button>
              ))}</div>:
              <div><span style={{color:'#4a5568', background:'#edf2f7', fontWeight:'600', fontSize: '.875rem', whiteSpace:'nowrap'}} className="inline-block rounded-lg px-3 py-1 mr-2">{props.user.profile.university}</span></div>}

              <div className="m-3">
              {props.edit?<Radio.Group onChange={e=>setGender(e.target.value)} value={gender}>
           <Radio value="Male"><i className="fa fa-male"> </i> Male</Radio>
           <Radio value="Female"><i className="fa fa-female"> </i> Female</Radio>
         </Radio.Group>:<div><i className={"fa fa-" +props.user.profile.gender.toLowerCase()}> </i> {props.user.profile.gender}</div>}
         </div>
              <h4>Bio</h4>
           </div>
           <div>
               {props.edit?<textarea rows={3} style={{width:'100%', border:'2px solid #eee'}} onChange={e=>setBio(e.target.value)} value={bio}/>:
              <p>{props.user.profile.bio}
              </p>}
           </div>
           <div className="mb-2">
               <h4>Self Preferences</h4>
               {props.edit?
               <div>
               <Radio.Group onChange={e=>setLoudness(e.target.value)} value={loudness}>
               <Radio value="Quiet">Quiet</Radio>
               <Radio value="Outgoing">Outgoing</Radio>
             </Radio.Group>
             <Radio.Group onChange={e=>setMusicality(e.target.value)} value={musicality}>
             <Radio value="Musical">Musical</Radio>
             <Radio value="Non-musical">Non-musical</Radio>
           </Radio.Group>
           <Radio.Group onChange={e=>setAthleticism(e.target.value)} value={athleticism}>
           <Radio value="Athletic">Athletic</Radio>
           <Radio value="Nerdy">Nerdy</Radio>
         </Radio.Group></div>:
         <div>
              <Tag color="blue">{props.user.profile.loudness}</Tag><Tag color="blue">{props.user.profile.athleticism}</Tag><Tag color="blue">{props.user.profile.musicality}</Tag></div>}
           </div>
        
           <div>
              {props.edit?<button className="btn" onClick={updateProfile}>Save Profile</button>:props.owned&&<a href="/profile/edit" className="btn">Edit profile</a>}
           </div>
        </div>
     </div>

    );
}