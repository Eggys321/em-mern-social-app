import { useState,useEffect, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import profileImg from '../assets/profile-img.svg';
import locationImg from '../assets/location.svg';
import realtorImg from '../assets/realtor.svg';
import linkedinImg from '../assets/linkedin.svg';
import twitterImg from '../assets/twitter.svg';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserContext from '../context/UserContext';


function ResponsiveExample() {
  const [show, setShow] = useState(false);
  const {getBioProfile,bioProfile} = useContext(UserContext)
  // const [bioProfile,setBioProfile] = useState([]);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("clientToken");
  const navigate = useNavigate();

  // const getBioProfile = async ()=>{
  //   try {
      
  //     const request = await fetch("http://localhost:5782/api/v1/users",{
  //       headers:{
  //         "Content-type":"application/json",
  //         Authorization:`Bearer ${token}`
  //       }
  //     })
  //     const response = await request.json();
  //     // console.log(response.user);
  //     setBioProfile(response.user)
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  
  useEffect(()=>{
    if(!token){
      toast.error("unauthorized,sign in")
        navigate('/signin');
    }
    getBioProfile()
},[])

  return (
    <>
    <div className="off-div">
    <img src={bioProfile?.profilePhoto} alt='' className='profile-img  logo-img img-fluid off-img d-lg-none '  style={{borderRadius:"5rem", height:"2rem"}} onClick={handleShow}/>
      {/* <img src={bioProfile?.profilePhoto} alt='' className='logo-img img-fluid off-img d-lg-none' onClick={handleShow} /> */}
      </div>
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body  >
        <section className='col-lg-4 d-lg-none profile-section'>
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
                  <a href='http://' target='_blank' rel=''>
                    <img src={linkedinImg} alt='' />
                  </a>{' '}
                  <span>{bioProfile?.linkedIn} </span>
                </div>
              </div>
            </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ResponsiveExample;