import homeImg from '../assets/home-img.svg';
import communityImg from '../assets/community-img.svg';
import profileImg from '../assets/profile-img.svg';
const NavSection = () => {
  return (
    <>

    <div className="d-flex justify-content-center mt-5 d-lg-none">
      <section className='d-flex gap-5 px-5 py-2 bg-light justify-content-between w-100 nav-section align-items-center'>
        <div className='d-flex flex-column align-items-center'>
          <img src={homeImg} alt='' />
        </div>
        <div className='d-flex flex-column align-items-center'>
          <img src={communityImg} alt='' />
        </div>
        <div className='d-flex flex-column align-items-center '>
          <img src={profileImg} alt='' />
        </div>
      </section>
      </div>
    </>
  );
};

export default NavSection;
