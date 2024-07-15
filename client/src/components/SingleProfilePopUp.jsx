import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import NavSection from "../components/NavSection";
import profileImg from "../assets/yuji-img.svg";
import locationImg from "../assets/location.svg";
import realtorImg from "../assets/realtor.svg";
import linkedinImg from "../assets/linkedin.svg";
import twitterImg from "../assets/twitter.svg";
import unLikeImg from "../assets/like-img.svg";
import shareImg from "../assets/share-img.svg";
import followersImg from "../assets/followers.svg";
import likesImg from "../assets/likes.svg";
import followingImg from "../assets/following.svg";
import TimeAgo from "../components/TimeAgo";
import { LazyLoadImage } from "react-lazy-load-image-component";
import commentImg from "../assets/comment-image.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UsernameModal from "../utils/UsernameModal";
import UsernameModalF from "../utils/UsernameModalF";
import Offcanvas from 'react-bootstrap/Offcanvas';

function SinglProfilePopUp({ name, ...props }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [followersUN, setFollowersUN] = useState([]);
  const [followingUN, setFollowingUN] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowF, setModalShowF] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);


  const { userId } = useParams();
  const getData = async () => {
    try {
      const request = await fetch(
        `https://em-mern-social-app.onrender.com/api/v1/users/userprofile/${userId}`
      );
      const response = await request.json();
      console.log(response.user.followers);
      console.log(response.user.following);
      setFollowersUN(response?.user?.followers);
      setFollowingUN(response?.user?.following);
      setUserPosts(response.posts);
      setData(response.user);
    } catch (error) {
    } finally {
    }
  };
  // Function to ensure the URL is properly formed
  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
     <UsernameModal
          user={userId}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <UsernameModalF
          user={userId}
          show={modalShowF}
          onHide={() => setModalShowF(false)}
        />
      <Button variant="primary" onClick={handleShow} className="me-2 w-100">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <section
              style={{ height: "50rem" }}
              className=" p-2 rounded-2  border profile-section "
            >
              {/* profile div */}
              <div className="sticky-div-fp ">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={data?.profilePhoto}
                    alt=""
                    className="profile-img w-25 "
                    style={{ borderRadius: "100%", height: "6rem" }}
                  />
                  <div className="d-flex flex-column ">
                    <span className=""> {data?.userName} </span>
                    {/* <span className=''>0 friends</span> */}
                  </div>
                </div>
                <hr />

                {/* bio div */}
                <div>
                  <h4>Bio</h4>
                  <p>{data?.bio}</p>
                </div>
                <hr />

                {/* activities */}
                <div>
                  <h4>Activities</h4>
                  <div className="d-flex align-items-center gap-2">
                    <img src={followersImg} alt="" />{" "}
                    <div className="d-flex justify-content-between w-100">
                      <div>
                        <span>Follower(s) </span>
                      </div>
                      <div
                        className="text-decoration-underline text-secondary"
                        role="button"
                      >
                        <span
                          className=""
                          show={modalShow}
                          onClick={() => setModalShow(true)}
                        >
                          {data?.followers?.length}
                          {/* Edit Profile */}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-2 gap-2">
                    <img src={followingImg} alt="" />{" "}
                    <div className="d-flex justify-content-between w-100">
                      <div>
                        <span>Following </span>
                      </div>
                      <div
                        className="text-decoration-underline text-secondary"
                        role="button"
                      >
                        <span
                          className=""
                          show={modalShowF}
                          onClick={() => setModalShowF(true)}
                        >
                          {data?.following?.length}
                          {/* Edit Profile */}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-2 gap-2">
                    <img src={likesImg} alt="" /> <span>Likes</span>
                  </div>
                </div>
                <hr />

                {/* information */}
                <div>
                  <h4>Info</h4>
                  <div className="d-flex align-items-center gap-2">
                    <img src={locationImg} alt="" />{" "}
                    <span> {data?.location} </span>
                  </div>
                  <div className="d-flex align-items-center mt-2 gap-2">
                    <img src={realtorImg} alt="" />{" "}
                    <span> {data?.occupation} </span>
                  </div>
                </div>
                <hr />
                {/* socials */}
                <div>
                  <h4>Socials</h4>
                  <div className="d-flex align-items-center gap-2">
                    <a href={formatUrl(data?.x)} target="_blank" rel="">
                      <img src={twitterImg} alt="" />
                    </a>{" "}
                    <span> {data?.x} </span>
                  </div>
                  <div className="d-flex align-items-center mt-2 gap-2">
                    <a href={formatUrl(data?.linkedIn)} target="_blank" rel="">
                      <img src={linkedinImg} alt="" />
                    </a>{" "}
                    <span> {data?.linkedIn} </span>
                  </div>
                </div>
              </div>
            </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SinglProfilePopUp;