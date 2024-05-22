import { useState,useEffect } from 'react';
import NavSection from '../components/NavSection';
import Navbar from '../layouts/Navbar';
import profileImg from '../assets/profile-img.svg';
import '../styles/Home.css';
import Post from '../components/Post';
import { people } from '../db';
import commentImg from '../assets/comment-image.svg';
import likeImg from '../assets/like-img.svg';
import shareImg from '../assets/share-img.svg';
import CommentModal from '../components/ComentModal';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Bio from '../components/Bio';
const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [bioProfile,setBioProfile] = useState([])
  // console.log(people);
  const navigate = useNavigate()
  const token = localStorage.getItem("clientToken");

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
      document.title = "Home | page";

  },[])

  return (
    <>
      {/* nav */}
      <Navbar />
      

      {/* main content */}
      <div className='home-wrapper'>
        <div className='container'>
          <main className=' row home-main gap-2 pt-3'>
          <section className='vh-100 col-lg-4 d-none d-lg-block p-2 rounded-2 border profile-section '>

            <Bio/>
            </section>

            {/* news-field col */}

            <section className='col-lg'>
              {/* top div */}
              <div className='p-2 top-news-field rounded-2 mb-2 border'>
                {/*  */}
                <div className='d-flex gap-2 align-items-center'>
                <img src={bioProfile?.profilePhoto} alt='' className='profile-img '  style={{borderRadius:"5rem", height:"4rem",width:"4rem"}}/>
                  <input
                    type='text'
                    className='rounded-pill ps-2 post-input w-100'
                    placeholder='What do you want to ask or share?'
                  />
                </div>

                {/*  */}
                <div className=' d-flex align-items-center justify-content-between mt-2'>
                  <Post />
                  <button className='btn btn-sm btn-primary text-light px-4 rounded-pill'>
                    {' '}
                    post
                  </button>
                </div>
              </div>

              <div>
              <CommentModal show={modalShow} onHide={() => setModalShow(false)} />
                {people.map((person) => {
                  const { id, name, time, post, profileImg, postImg, follow } =
                    person;
                  return (
                    <div
                      key={id}
                      className='p-2 mb-3 rounded-2 scroll-page'
                    >
                      {/* top div */}
                      <div className='d-flex justify-content-between align-items-center '>
                        {/* img and time */}
                        <div className='d-flex gap-2 align-items-center'>
                          <img src={profileImg} alt='' className='' />
                          <span className='d-flex flex-column justify-content-center '>
                            <h5 className='pt-3'>{name}</h5>
                            <p>{time}</p>
                          </span>
                        </div>

                        {/* btn-div */}
                        <div>
                          <button className='btn btn-white btn-sm rounded-pill border px-2'>
                            {follow}
                          </button>
                        </div>
                      </div>

                      {/* post */}
                      <p>{post}</p>

                      {/* post-img */}
                      <img src={postImg} className='w-100' alt='' />

                      {/* reactions */}
                      <main className='d-flex pt-2 justify-content-between align-items-center'>
                        {/* like and comment */}

                        <div className='d-flex gap-2'>
                          <img src={likeImg} alt='' role='button' />
                          <div show={modalShow} onClick={() => setModalShow(true)}>

                          <img src={commentImg} alt=''  role='button'/>
                          </div>
                          </div>
      
                          {/* share */}
                          <div>
                            <img src={shareImg} alt=''  role='button' />
                          </div>
                      </main>
                    </div>
                  );
                })}
              </div>

              {/* data base components */}
              {/* <div className=' rounded-2 '>
                
                {people.map((person) => {
                  const { id, name, time, post, profileImg, postImg } = person;
                  <div key={id} >
                    <img src={profileImg} alt='' />
                    <span className='fw-bold'>{name}</span>
                    <span className='fs-5'>{time}</span>
                    <p>{post}</p>
                    <img src={postImg} alt='' />
                  </div>;
                })}
              </div> */}
            </section>
          </main>
        </div>
      </div>
      {/* fixed section */}
      <NavSection />
    </>
  );
};

export default Home;
