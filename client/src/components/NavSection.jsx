import homeImg from '../assets/home-img.svg';
import communityImg from '../assets/community-img.svg';
import { NavLink } from 'react-router-dom';
import ProfileOffCanvas from './ProfilePopUp';

const NavSection = () => {
  const linkClass = ({ isActive }) =>
    `d-flex flex-column align-items-center nav-link-item rounded-3 px-3 py-1${
      isActive ? ' nav-link-item--active' : ''
    }`;

  return (
    <div className="d-flex justify-content-center mt-5 d-md-none">
      <section className="d-flex gap-5 px-5 py-2 bg-light justify-content-between border-3 border-top border-primary w-100 nav-section align-items-center">
        <NavLink to="/" end aria-label="Home" className={linkClass}>
          <img src={homeImg} alt="" aria-hidden="true" />
        </NavLink>
        <NavLink to="/community" aria-label="Community" className={linkClass}>
          <img src={communityImg} alt="" aria-hidden="true" />
        </NavLink>
        <div className="d-flex flex-column align-items-center">
          <ProfileOffCanvas />
        </div>
      </section>
    </div>
  );
};

export default NavSection;
