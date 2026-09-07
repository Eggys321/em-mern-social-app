import { useState, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import locationImg from '../assets/location.svg';
import realtorImg from '../assets/realtor.svg';
import linkedinImg from '../assets/linkedin.svg';
import twitterImg from '../assets/twitter.svg';
import UserContext from '../context/UserContext';
import { formatSocialUrl } from '../utils/formatUrl';

function ProfileSection() {
  const [show, setShow] = useState(false);
  const { bioProfile } = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="off-div">
        <button
          type="button"
          className="btn-icon border-0 bg-transparent p-0 d-lg-none"
          aria-label="Open profile menu"
          onClick={handleShow}
        >
          <img
            src={bioProfile?.profilePhoto}
            alt={bioProfile?.userName ? `${bioProfile.userName}'s profile photo` : "Profile photo"}
            className="avatar avatar-sm logo-img img-fluid off-img"
          />
        </button>
      </div>
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <section className='col-lg-4 d-lg-none profile-section'>
            <div className='d-flex align-items-center gap-2'>
              <img
                src={bioProfile?.profilePhoto}
                alt={bioProfile?.userName ? `${bioProfile.userName}'s profile photo` : "Profile photo"}
                className="avatar avatar-lg"
              />
              <div className='d-flex flex-column '>
                <span className=''> {bioProfile?.userName} </span>
                <span className=''>{bioProfile?.followers?.length} followers</span>
              </div>
            </div>
            <hr />

            <div>
              <h4>Bio</h4>
              <p>
                {bioProfile?.bio}
              </p>
            </div>
            <hr />

            <div>
              <h4>Info</h4>
              <div className='d-flex align-items-center gap-2'>
                <img src={locationImg} alt="" aria-hidden="true" /> <span> {bioProfile?.location} </span>
              </div>
              <div className='d-flex align-items-center mt-2 gap-2'>
                <img src={realtorImg} alt="" aria-hidden="true" /> <span>{bioProfile?.occupation} </span>
              </div>
            </div>
            <hr />
            <div>
              <h4>Socials</h4>
              <div className='d-flex align-items-center gap-2'>
                <a href={formatSocialUrl(bioProfile?.x)} target='_blank' rel="noopener noreferrer">
                  <img src={twitterImg} alt="" aria-hidden="true" />
                </a>{' '}
                <span>{bioProfile?.x} </span>
              </div>
              <div className='d-flex align-items-center mt-2 gap-2'>
                <a href={formatSocialUrl(bioProfile?.linkedIn)} target='_blank' rel="noopener noreferrer">
                  <img src={linkedinImg} alt="" aria-hidden="true" />
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

export default ProfileSection;
