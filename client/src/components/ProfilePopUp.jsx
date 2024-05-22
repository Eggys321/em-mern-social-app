import { useState,useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import profileImg from '../assets/profile-img.svg';
import NavBag from './NavBag';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProfilePopUp({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bioProfile,setBioProfile] = useState([]);

  const token = localStorage.getItem("clientToken");
  const navigate = useNavigate();
  const getBioProfile = async ()=>{
    try {
      
      const request = await fetch("http://localhost:5782/api/v1/users",{
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
    <img src={bioProfile?.profilePhoto} alt='' className='profile-img'  style={{borderRadius:"5rem", height:"3rem",width:"3rem"}} onClick={handleShow}/>
      {/* <img src={profileImg} onClick={handleShow} alt='' /> */}

      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <NavBag/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Example() {
  return (
    <>
      {['bottom'].map((placement, idx) => (
        <ProfilePopUp key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}



export default Example;
