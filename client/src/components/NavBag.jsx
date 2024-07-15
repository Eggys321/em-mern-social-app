import { useContext, useState } from "react";
import editImg from "../assets/edit-img.svg";
import notImg from "../assets/notification-img.svg";
import logOutImg from "../assets/logout-img.svg";
import { Link, useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import UserContext from "../context/UserContext";
const NavBag = () => {
  const [modalShow, setModalShow] = useState(false);
  const {logOut} = useContext(UserContext)
  

  return (
    <>
      <EditProfileModal show={modalShow} onHide={() => setModalShow(false)} />

      <section className="bg-gradient-secondary rounded-2 border p-2 shadow-lg position-relative z-2 ">
        {/* Edit */}
        <div className="mb-4">
          <div
            className="d-flex gap-2 align-items-center first-div justify-content-start"
            role="button"
          >
            <img src={editImg} alt="" />

            <span
              className=""
              show={modalShow}
              onClick={() => setModalShow(true)}
            >
              Edit Profile
            </span>
          </div>
          <hr />
        </div>

        {/* Notification */}
        <div className="mb-4">
          <div className="d-flex gap-2 align-items-center first-div justify-content-start">
            <Link to="#">
              <img src={notImg} alt="" />
            </Link>
            <span className="">Notifications</span>
          </div>
          <hr />
        </div>

        {/* Logout */}
        <div>
          <div className="d-flex gap-2 align-items-center first-div justify-content-start ">
            <Link to="#">
              <img src={logOutImg} alt="" />
            </Link>
            <span role="button" className="" onClick={logOut}>Log Out</span>
          </div>
          <hr />
        </div>
      </section>
    </>
  );
};

export default NavBag;
