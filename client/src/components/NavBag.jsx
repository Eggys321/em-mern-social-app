import { useContext, useState } from "react";
import editImg from "../assets/edit-img.svg";
import notImg from "../assets/notification-img.svg";
import logOutImg from "../assets/logout-img.svg";
import { Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import UserContext from "../context/UserContext";
import "../styles/NavBag.css";

const NavBag = () => {
  const [modalShow, setModalShow] = useState(false);
  const { logOut } = useContext(UserContext);

  return (
    <>
      <EditProfileModal show={modalShow} onHide={() => setModalShow(false)} />

      <section className="navbag-container rounded-2 border p-2 shadow-lg position-relative z-3">
        <div className="mb-4">
          <button
            type="button"
            className="d-flex gap-2 align-items-center first-div justify-content-start btn p-0 border-0 bg-transparent w-100 text-start"
            onClick={() => setModalShow(true)}
          >
            <img src={editImg} alt="" aria-hidden="true" />
            <span>Edit Profile</span>
          </button>
          <hr />
        </div>

        <div className="mb-4">
          <Link
            to="/notifications"
            className="d-flex gap-2 align-items-center first-div justify-content-start text-decoration-none text-dark"
          >
            <img src={notImg} alt="" aria-hidden="true" />
            <span>Notifications</span>
          </Link>
          <hr />
        </div>

        <div>
          <button
            type="button"
            className="d-flex gap-2 align-items-center first-div justify-content-start btn p-0 border-0 bg-transparent w-100 text-start"
            onClick={logOut}
          >
            <img src={logOutImg} alt="" aria-hidden="true" />
            <span>Log Out</span>
          </button>
          <hr />
        </div>
      </section>
    </>
  );
};

export default NavBag;
