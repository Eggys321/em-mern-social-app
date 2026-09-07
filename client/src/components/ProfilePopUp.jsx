import { useState, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavBag from './NavBag';
import UserContext from '../context/UserContext';

function ProfilePopUp() {
  const [show, setShow] = useState(false);
  const { bioProfile } = useContext(UserContext);

  return (
    <>
      <button
        type="button"
        className="btn-icon border-0 bg-transparent p-0"
        aria-label="Open profile menu"
        onClick={() => setShow(true)}
      >
        <img
          src={bioProfile?.profilePhoto}
          alt={bioProfile?.userName ? `${bioProfile.userName}'s profile photo` : "Profile photo"}
          className="avatar avatar-sm"
        />
      </button>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavBag />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ProfilePopUp;
