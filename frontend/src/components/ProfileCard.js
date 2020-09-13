import React, { useState } from 'react'
import '../css/profile.css'
import { Tag, Radio } from 'antd';

const ProfileCard = ({ edit, user, owned, option, loading }) => {
    const [bio, setBio] = useState("")
    const [personalityPreferences, setPersonalityPreferences] = useState("")

    return(

      <div>{loading ? <div>loading...</div> :  
        <div className="card-container">
        <div className="upper-container">
           <div className="image-container">
              <img src="https://picsum.photos/200" style={{border:'4px solid white'}} />
           </div>
        </div>
        <div className="lower-container">
           <div>
               
              <h3 className="mb-3" style={{textDecoration:'underline', textDecorationColor:'#ccc'}}>{option.username}</h3>
              <h4>Bio</h4>
           </div>
           <div>
               {edit?<textarea rows={3} style={{width:'100%', border:'2px solid #eee'}} onChange={e=>setBio(e.target.value)} value={bio}/>:
              <p>sodales accumsan ligula. Aenean sed diam tristique,
                 fermentum mi nec, ornare arch.
              </p>}
           </div>
           <div className="mb-2">
               <h4>Preferences</h4>
              {edit?
              <div>
              <Radio.Group onChange={e=>setPersonalityPreferences(e.target.value)} value={personalityPreferences}>
              <Radio value="Quiet">Quiet</Radio>
              <Radio value="Outgoing">Outgoing</Radio>
            </Radio.Group>
            <Radio.Group onChange={e=>setPersonalityPreferences(e.target.value)} value={personalityPreferences}>
            <Radio value="Quiet">Quiet</Radio>
            <Radio value="Outgoing">Outgoing</Radio>
          </Radio.Group>
          <Radio.Group onChange={e=>setPersonalityPreferences(e.target.value)} value={personalityPreferences}>
          <Radio value="Quiet">Quiet</Radio>
          <Radio value="Outgoing">Outgoing</Radio>
        </Radio.Group></div>:
        <div><Tag color="cyan">Quiet</Tag><Tag color="cyan">Athletic</Tag><Tag color="cyan">Smart</Tag></div>}
           </div>
           <div className="mb-2">
               <h4>Self Preferences</h4>
               {edit?
               <div>
               <Radio.Group onChange={e=>setPersonalityPreferences(e.target.value)} value={personalityPreferences}>
               <Radio value="Quiet">Quiet</Radio>
               <Radio value="Outgoing">Outgoing</Radio>
             </Radio.Group>
             <Radio.Group onChange={e=>setPersonalityPreferences(e.target.value)} value={personalityPreferences}>
             <Radio value="Quiet">Quiet</Radio>
             <Radio value="Outgoing">Outgoing</Radio>
           </Radio.Group>
           <Radio.Group onChange={e=>setPersonalityPreferences(e.target.value)} value={personalityPreferences}>
           <Radio value="Quiet">Quiet</Radio>
           <Radio value="Outgoing">Outgoing</Radio>
         </Radio.Group></div>:
         <div>
              <Tag color="blue">Quiet</Tag><Tag color="blue">Athletic</Tag><Tag color="blue">Smart</Tag></div>}
           </div>
        
           <div>
              {edit?<button className="btn">Save Profile</button>:owned&&<a href="/profile/edit" className="btn">Edit profile</a>}
           </div>
        </div>
     </div>
     }</div>

    );
}

export default ProfileCard