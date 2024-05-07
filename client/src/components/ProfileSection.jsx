import { useState } from 'react';
// import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import profileImg from '../assets/profile-img.svg';
import locationImg from '../assets/location.svg';
import realtorImg from '../assets/realtor.svg';
import linkedinImg from '../assets/linkedin.svg';
import twitterImg from '../assets/twitter.svg';

function ResponsiveExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div className="off-div">
      <img src={profileImg} alt='' className='logo-img img-fluid off-img d-lg-none' onClick={handleShow} />
      </div>
      {/* <Alert variant="info" className="d-none d-lg-block">
        Resize your browser to show the responsive offcanvas toggle.
      </Alert> */}

      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body  >
        <section className='col-lg-4 d-lg-none profile-section'>
              {/* profile div */}
              <div className='d-flex align-items-center gap-2'>
                <img src={profileImg} alt='' className='profile-img' />
                <div className='d-flex flex-column '>
                  <span className=''>John Doe</span>
                  <span className=''>0 friends</span>
                </div>
              </div>
              <hr />

              {/* bio div */}
              <div>
                <h4>Bio</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Mi nec turpis
                  vulputate sed. Tellus quisque pharetra facilisi nisl nisi
                  consectetur. Sed in nisi convallis vitae tortor rhoncus.
                </p>
              </div>
              <hr />

              {/* information */}
              <div>
                <h4>Info</h4>
                <div className='d-flex align-items-center gap-2'>
                  <img src={locationImg} alt='' /> <span>Location</span>
                </div>
                <div className='d-flex align-items-center mt-2 gap-2'>
                  <img src={realtorImg} alt='' /> <span>Realtor</span>
                </div>
              </div>
              <hr />
              {/* socials */}
              <div>
                <h4>Socials</h4>
                <div className='d-flex align-items-center gap-2'>
                  <a href='http://' target='_blank' rel=''>
                    <img src={twitterImg} alt='' />
                  </a>{' '}
                  <span>Twitter</span>
                </div>
                <div className='d-flex align-items-center mt-2 gap-2'>
                  <a href='http://' target='_blank' rel=''>
                    <img src={linkedinImg} alt='' />
                  </a>{' '}
                  <span>Linkedin</span>
                </div>
              </div>
            </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ResponsiveExample;