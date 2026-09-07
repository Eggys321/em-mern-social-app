import { useState } from "react";
import homeImg from "../assets/home-img.svg";
import communityImg from "../assets/community-img.svg";
import NavBag from "../components/NavBag";
import ProfileSection from "../components/ProfileSection";
import UserSearchBox from "../components/UserSearchBox";
import logoImg from "../assets/logo.svg";
import "../styles/Nav.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import { useBioProfile } from "../hooks/useBioProfile";

const Navbar = () => {
  const [bagShow, setBagShow] = useState(false);

  const token = localStorage.getItem("clientToken");
  const { data } = useBioProfile(token);
  const bioProfile = data?.user;

  return (
    <header>
      <main className="d-flex justify-content-between align-items-center container nav-container">
        <section className="d-flex gap-3 align-items-center search-div">
          <div className="logo-div d-none d-lg-block">
            <Link to="/">
              <img src={logoImg} alt="EM home" />
            </Link>
          </div>

          <nav aria-label="Primary" className="d-none d-lg-block" />

          <ProfileSection />

          <UserSearchBox />
        </section>

        <div className="d-none d-md-block">
          <section className="d-flex gap-3 align-items-center position-relative">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link-item d-flex flex-column align-items-center text-decoration-none px-3 py-1 rounded-3${
                  isActive ? " nav-link-item--active" : ""
                }`
              }
            >
              <img src={homeImg} alt="" aria-hidden="true" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                `nav-link-item d-flex flex-column align-items-center text-decoration-none px-3 py-1 rounded-3${
                  isActive ? " nav-link-item--active" : ""
                }`
              }
            >
              <img src={communityImg} alt="" aria-hidden="true" />
              <span>Community</span>
            </NavLink>
            <div className="d-flex flex-column align-items-center">
              <img
                src={bioProfile?.profilePhoto}
                alt={bioProfile?.userName ? `${bioProfile.userName}'s profile photo` : "Your profile photo"}
                className="avatar avatar-sm p-1"
              />
              <span className="d-flex align-items-center gap-1">
                Me
                <button
                  type="button"
                  className="btn-icon d-none d-md-inline-flex"
                  aria-expanded={bagShow}
                  aria-label={bagShow ? "Hide profile menu" : "Show profile menu"}
                  onClick={() => setBagShow((prev) => !prev)}
                >
                  {bagShow ? <GoChevronUp /> : <GoChevronDown />}
                </button>
              </span>
            </div>
            <div className="position-absolute nav-bag bg-light">{bagShow && <NavBag />}</div>
          </section>
        </div>
      </main>
    </header>
  );
};

export default Navbar;
