import React from 'react';
import { useState,useEffect } from 'react';
import locationImg from '../assets/location.svg';
import realtorImg from '../assets/realtor.svg';
import linkedinImg from '../assets/linkedin.svg';
import twitterImg from '../assets/twitter.svg';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Bio = () => {
    const [bioProfile,setBioProfile] = useState([]);

    const token = localStorage.getItem("clientToken");
    const navigate = useNavigate()
    
  const getBioProfile = async ()=>{
    try {
      
      const request = await fetch("https://em-mern-social-app.onrender.com/api/v1/users",{
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${token}`
        }
      })
      const response = await request.json();
      // console.log(response.user);
      setBioProfile(response.user)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
      if(!token){
        toast.error("unauthorized,sign in")
          navigate('/signin');
      }
      getBioProfile()
  },[])

  return (
    <>
    <main>
         {/* profile col */}
            
         
              {/* profile div */}
              <div className='d-flex align-items-center gap-2'>
                <img src={bioProfile?.profilePhoto} alt='' className='profile-img w-25 '  style={{borderRadius:"5rem", height:"6rem"}}/>
                <div className='d-flex flex-column '>
                  <span className=''> {bioProfile?.userName} </span>
                  <span className=''>{bioProfile?.followers?.length} followers</span>
                </div>
              </div>
              

              <hr />

              {/* bio div */}
              <div>
                <h4>Bio</h4>
                <p>
                  {bioProfile?.bio}
                </p>
              </div>
              <hr />

              {/* information */}
              <div>
                <h4>Info</h4>
                <div className='d-flex align-items-center gap-2'>
                  <img src={locationImg} alt='' /> <span> {bioProfile?.location} </span>
                </div>
                <div className='d-flex align-items-center mt-2 gap-2'>
                  <img src={realtorImg} alt='' /> <span>{bioProfile?.occupation} </span>
                </div>
              </div>
              <hr />
              {/* socials */}
              <div>
                <h4>Socials</h4>
                <div className='d-flex align-items-center gap-2'>
                  <a href='http://' target='_blank' rel=''>
                    <img src={twitterImg} alt='' />
                  </a>{' '}
                  <span>{bioProfile?.x} </span>
                </div>
                <div className='d-flex align-items-center mt-2 gap-2'>
                  <a href="" target='_blank' rel=''>
                    <img src={linkedinImg} alt='' />
                  </a>{' '}
                  <a href={bioProfile?.linkedIn} target='_blank' rel=''>
                  {/* <span className='' role='button'> </span> */}
                  {bioProfile?.linkedIn}
                    {/* <img src={linkedinImg} alt='' /> */}
                  </a>{' '}
                </div>
              </div>
              <div>
                <hr />
                <h3>Sponsored Ads</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, explicabo.</p>
              </div>
    </main>
    </>
  )
}

export default Bio