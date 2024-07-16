import React, { useEffect, useState } from "react";
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
import Offcanvas from "react-bootstrap/Offcanvas";
import SinglProfilePopUp from "../components/SingleProfilePopUp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { postText } from "../utils/ValidationSchema";
import CommentModal from "../components/ComentModal";
import toast from "react-hot-toast";
// import unLikeImg from "../assets/like-img.svg";
import likeImg from "../assets/heart.jpg";



const SingleUserProfile = () => {
  const [data, setData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [followersUN, setFollowersUN] = useState([]);
  const [followingUN, setFollowingUN] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowF, setModalShowF] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [modalShowComm, setModalShowComm] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);
  const [currentPostId, setCurrentPostId] = useState(null);

  

  const { userId } = useParams();
  const token = localStorage.getItem("clientToken");
  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `https://em-mern-social-app.onrender.com/api/v1/posts/like-post/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const updatedLikedPosts = { ...likedPosts };
        // Initialize an empty array for the post if it doesn't exist in likedPosts
        updatedLikedPosts[postId] = updatedLikedPosts[postId] || [];
        // Add or remove the user's ID from the likedPosts array for the post
        if (updatedLikedPosts[postId].includes(userId)) {
          updatedLikedPosts[postId] = updatedLikedPosts[postId].filter(
            (id) => id !== userId
          );
        } else {
          updatedLikedPosts[postId].push(userId);
        }
        setLikedPosts(updatedLikedPosts);
        localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      toast.error("Failed to like/unlike post. Please try again.");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(postText),
    defaultValues: {
      text: "",
    },
  });

  const handleUnfollow = async (userId) => {
    // if (!currentUser) return;

    try {
      const response = await fetch(
        `https://em-mern-social-app.onrender.com/api/v1/users/unfollow/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify({ userId: currentUser._id }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.success) {
        getTimeLine()
       
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  const handlePost = async (data) => {
    try {
      const request = await fetch(
        "https://em-mern-social-app.onrender.com/api/v1/posts/create-post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      // getTimeLine()
      const response = await request.json();
      console.log(response);
      if (response.success) {
        reset();
        toast.success(response.message);
        getTimeLine();

        // setTimeLine(prevTimeLine => [response.post, ...prevTimeLine]);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const openCommentModal = (postId) => {
    setCurrentPostId(postId);
    setModalShowComm(true);
  };
  const handleCommentAdded = () => {
    getTimeLine();
  };
  // console.log(userId);
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
    if (!token) {
      toast.error("unauthorized,sign in");
      navigate("/signin");
    }
    const storedLikedPosts = JSON.parse(localStorage.getItem("likedPosts"));
    if (storedLikedPosts) {
      setLikedPosts(storedLikedPosts);
    }

    const counts = {};
    // timeLine.forEach((post) => {
    //   counts[post._id] = post.likes.length;
    // });
    setLikeCounts(counts);
    // getTimeLine();
    document.title = "user | profile";
  }, []);
  return (
    <>
      <nav className="d-flex align-items-center container">
        <div className="pt-2 pb-2 d-flex gap-2 align-items-center">
          <img
            src={data?.profilePhoto}
            alt=""
            className="profile-img logo-img img-fluid off-img d-lg-none"
            style={{ borderRadius: "100%", height: "3rem", minWidth: "4.5rem" }}
            onClick={handleShow}
          />
         <div className="d-md-none">
         <input
            type="text"
            className="rounded-pill ps-5 search-box"
            placeholder="search a user"
            style={{ width: "100%" }}
          />{" "}
         </div>
          <div className="d-none">
            <SinglProfilePopUp
              show={showOffcanvas}
              onHide={handleClose}
              name={data?.userName}
            />
          </div>
        </div>
      </nav>
      <div className="d-none d-lg-block">
        <Navbar />
      </div>
      <main className="home-wrapper">
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
        <div className="container">
          <div className="row gap-2 py-3">
            {/* profile col */}
            <section
              style={{ height: "50rem" }}
              className="col-md-4 d-none d-md-block p-2 rounded-2  border profile-section "
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
            {/* <section className='vh-100 col-lg-4 d-none d-lg-block p-2 rounded-2 border profile-section '>
                <img src={data?.profilePhoto} alt="" className='w-25' />
                <p> {data?.location} </p>
                <h3> {data?.following?.length} following</h3>
                <h3> {data?.followers?.length} followers</h3>
            </section> */}
            {/* 00000 */}
            <section className="col-md">
              {/* <h2>single user</h2> */}
              <CommentModal
                  show={modalShowComm}
                  postId={currentPostId}
                  onHide={() => setModalShowComm(false)}
                  onCommentAdded={handleCommentAdded}
                />

              <div>
                {userPosts.length < 1 && (
                  <p className="fs-5  fw-bold text-center p-5">No Post yet👌</p>
                )}
                {userPosts?.map((person) => {
                  const { _id, name, time, post, profileImg, postImg, follow } =
                    person;
                    const isLiked =
                    likedPosts[_id] && likedPosts[_id].includes(userId);
                  const likeCount = likeCounts[_id] || 0;
                  return (
                    <div key={_id} className="p-2 mb-3 rounded-2 scroll-page">
                      {/* top div */}
                      <div className="d-flex justify-content-between align-items-center ">
                        {/* img and time */}
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={data?.profilePhoto}
                            alt=""
                            className="profile-img "
                            style={{
                              borderRadius: "100%",
                              height: "4rem",
                              width: "5rem",
                            }}
                          />
                          <span className="d-flex flex-column justify-content-center ">
                            <h5 className="pt-3">
                              {" "}
                              <span className=""> {data?.userName} </span>
                            </h5>
                            <p>
                              <TimeAgo date={person?.createdAt} />
                            </p>
                          </span>
                        </div>

                        {/* btn-div */}
                        <div>
                          <button className="btn btn-white btn-sm rounded-pill border px-2">
                            {/* {person?.user?.following} */}
                            {/* {!person.user.following ? "follow": "following"} */}
                            follow
                          </button>
                        </div>
                      </div>

                      {/* post */}
                      <p>{person.text}</p>

                      {/* post-img */}
                      {/* <img src={person.imagePath} className="w-100" alt="" /> */}
                      <LazyLoadImage
                        // alt={image.alt}
                        height={"100%"}
                        width={"100%"}
                        effect="blur"
                        // className="w-100"
                        src={person.imagePath}
                      />

                      {/* reactions */}
                      <main className="d-flex pt-2 justify-content-between align-items-center">
                        {/* like and comment */}

                        <div className="d-flex gap-2 ">
                          <div onClick={() => handleLike(_id)}>
                          <img
                              src={isLiked ? likeImg : unLikeImg}
                              alt=""
                              role="button"
                            />                          </div>
                          <div className="mt-2">{likeCount} like(s)</div>{" "}
                          <div
                            // show={modalShow}
                            onClick={() => openCommentModal(_id)}
                          >
                            <img src={commentImg} alt="" role="button" />
                          </div>
                          <p className="mt-2">
                            {person.commentsCount} comment(s)
                          </p>
                        </div>

                        {/* share */}
                        <div>
                          <img src={shareImg} alt="" role="button" />
                        </div>
                      </main>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
      <NavSection />
    </>
  );
};

export default SingleUserProfile;
