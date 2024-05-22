import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import NavSection from '../components/NavSection';
import profileImg from '../assets/yuji-img.svg';
import locationImg from '../assets/location.svg';
import realtorImg from '../assets/realtor.svg';
import linkedinImg from '../assets/linkedin.svg';
import twitterImg from '../assets/twitter.svg';
import likeImg from '../assets/like-img.svg';
import shareImg from '../assets/share-img.svg';
import followersImg from '../assets/followers.svg';
import likesImg from '../assets/likes.svg';
import followingImg from '../assets/following.svg';

const SingleUserProfile = () => {
    const [data,setData] = useState([])
    const {userId} = useParams();
    console.log(userId);
    const getData = async()=>{
        const request = await fetch(`http://localhost:5782/api/v1/users/userprofile/${userId}`);
        const response = await request.json();
        console.log(response.user);
        setData(response.user)
    };
    useEffect(()=>{
        getData()
        document.title = "Signup | page";

    },[])
  return (
    <>
    <Navbar/>
    <main className='container'>
        <div className='row gap-2 pt-3'>
             {/* profile col */}
             <section className='col-lg-4 d-none d-lg-block p-2 rounded-2  border profile-section '>
              {/* profile div */}
              <div className='sticky-div-fp '>
                <div className='d-flex align-items-center gap-2'>
                <img src={data?.profilePhoto} alt="" className='profile-img w-25 '  style={{borderRadius:"5rem", height:"6rem"}} />
                  <div className='d-flex flex-column '>
                    <span className=''> {data?.userName} </span>
                    {/* <span className=''>0 friends</span> */}
                  </div>
                </div>
                <hr />

                {/* bio div */}
                <div>
                  <h4>Bio</h4>
                  <p>
                  {data?.bio}
                  </p>
                </div>
                <hr />

                {/* activities */}
                <div>
                  <h4>Activities</h4>
                  <div className='d-flex align-items-center gap-2'>
                    <img src={followersImg} alt='' /> <span> {data?.followers?.length} Followers </span>
                  </div>
                  <div className='d-flex align-items-center mt-2 gap-2'>
                    <img src={followingImg} alt='' /> <span>{data?.following?.length} Following</span>
                  </div>
                  <div className='d-flex align-items-center mt-2 gap-2'>
                    <img src={likesImg} alt='' /> <span>Likes</span>
                  </div>
                </div>
                <hr />

                {/* information */}
                <div>
                  <h4>Info</h4>
                  <div className='d-flex align-items-center gap-2'>
                    <img src={locationImg} alt='' /> <span> {data?.location} </span>
                  </div>
                  <div className='d-flex align-items-center mt-2 gap-2'>
                    <img src={realtorImg} alt='' /> <span> {data?.occupation} </span>
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
                    <span> {data?.x} </span>
                  </div>
                  <div className='d-flex align-items-center mt-2 gap-2'>
                    <a href='http://' target='_blank' rel=''>
                      <img src={linkedinImg} alt='' />
                    </a>{' '}
                    <span> {data?.linkedIn} </span>
                  </div>
                </div>
              </div>
            </section>
            {/* <section className='vh-100 col-lg-4 d-none d-lg-block p-2 rounded-2 border profile-section '>
                <img src={data?.profilePhoto} alt="" className='w-25' />
                <p> {data?.location} </p>
                <h3> {data?.following?.length} following</h3>
                <h3> {data?.followers?.length} followers</h3>
            </section> */}
            {/* 00000 */}
            <section className="col-lg">
                <h2>single user</h2>
            </section>
        </div>
    </main>
    <NavSection/>
    </>
  )
}

export default SingleUserProfile