import homeImg from '../assets/home-img.svg';
import communityImg from '../assets/community-img.svg';
import profileImg from '../assets/profile-img.svg';
import { Link } from 'react-router-dom';
import ProfileOffCanvas from './ProfilePopUp'
const NavSection = () => {
  return (
    <>

    <div className="d-flex justify-content-center mt-5 d-lg-none  ">
      <section className='d-flex gap-5 px-5 py-2 bg-light justify-content-between  border-3 border-top border-primary w-100 nav-section align-items-center'>
        <div className='d-flex flex-column align-items-center'>
          <Link to='/'>
          
          <img src={homeImg} alt='' />
          </Link>
        </div>
        <div className='d-flex flex-column align-items-center'>
          <Link to='/community'>
          
          <img src={communityImg} alt='' />
          </Link>
        </div>
        <div className='d-flex flex-column align-items-center '>
          {/* <img src={profileImg} alt='' /> */}
          <ProfileOffCanvas/>
        </div>
      </section>
      </div>
    </>
  );
};

export default NavSection;
