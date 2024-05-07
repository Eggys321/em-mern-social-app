import homeImg from '../assets/home-img.svg';
import communityImg from '../assets/community-img.svg';
import profileImg from '../assets/profile-img.svg';
import searchImg from '../assets/search-img.svg';
import NavBag from '../components/NavBag';
import logoImg from '../assets/logo.svg';
import '../styles/Nav.css';
import { GoChevronDown } from 'react-icons/go';
import { GoChevronUp } from 'react-icons/go';
import ProfileSection from '../components/ProfileSection';
import { useState } from 'react';
import EditProfileModal from '../components/EditProfileModal';
const Navbar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [bagShow, SetBagShow] = useState(false);
  function handleDrop() {
    !bagShow ? SetBagShow(true) : SetBagShow(false);
  }
  return (
    <>
      <main className='d-flex justify-content-between align-items-center container nav-container'>
        {/* search section */}
        <section className='d-flex gap-3 align-items-center search-div'>
          <div className='logo-div d-none d-lg-block'>
            <img src={logoImg} alt='' />
          </div>
          <ProfileSection />

          <div className='position-relative'>
            <input
              type='text'
              className='rounded-pill ps-5 search-box '
              placeholder='search'
            />
            <img
              src={searchImg}
              alt=''
              className='position-absolute img-fluid search-img'
            />
          </div>
        
        </section>

        {/* profile section */}

        <div className='d-none d-lg-block'>
          <section className='d-flex gap-3 align-items-center position-relative'>
            <div className='d-flex flex-column align-items-center'>
              <img src={homeImg} alt='' />
              <span>Home</span>
            </div>
            <div className='d-flex flex-column align-items-center'>
              <img src={communityImg} alt='' />
              <span>Community</span>
            </div>
            <div className='d-flex flex-column align-items-center '>
              <img src={profileImg} alt='' />
              <span className='d-flex'>
                Me
                <span
                  className='d-none   d-lg-block'
                  role='button'
                  onClick={handleDrop}
                >
                  {' '}
                  {bagShow ? <GoChevronUp /> : <GoChevronDown />}
                </span>
              </span>
            </div>
            <div className='position-absolute nav-bag bg-light'>
              {bagShow && <NavBag />}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Navbar;
