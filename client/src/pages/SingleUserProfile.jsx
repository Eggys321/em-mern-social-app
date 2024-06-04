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

const SingleUserProfile = () => {
  const [data, setData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useParams();
  console.log(userId);
  const getData = async () => {
    const request = await fetch(
      `https://em-mern-social-app.onrender.com/api/v1/users/userprofile/${userId}`
    );
    const response = await request.json();
    console.log(response);
    setUserPosts(response.posts);
    setData(response.user);
  };
  useEffect(() => {
    getData();
    document.title = "user | profile";
  }, []);
  return (
    <>
      <Navbar />
      <main className="home-wrapper">
        <div className="container">
          <div className="row gap-2 py-3">
            {/* profile col */}
            <section style={{height:"50rem"}} className="col-lg-4 d-none d-lg-block p-2 rounded-2  border profile-section ">
              {/* profile div */}
              <div className="sticky-div-fp ">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={data?.profilePhoto}
                    alt=""
                    className="profile-img w-25 "
                    style={{ borderRadius: "5rem", height: "6rem" }}
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
                    <span> {data?.followers?.length} Follower(s) </span>
                  </div>
                  <div className="d-flex align-items-center mt-2 gap-2">
                    <img src={followingImg} alt="" />{" "}
                    <span>{data?.following?.length} Following</span>
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
                    <a href="http://" target="_blank" rel="">
                      <img src={twitterImg} alt="" />
                    </a>{" "}
                    <span> {data?.x} </span>
                  </div>
                  <div className="d-flex align-items-center mt-2 gap-2">
                    <a href="http://" target="_blank" rel="">
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
            <section className="col-lg">
              {/* <h2>single user</h2> */}

              <div>
                {userPosts.length < 1 && (
                  <p className="fs-5  fw-bold text-center p-5">
                   No Post yet👌
                  </p>
                )}
                {userPosts?.map((person) => {
                  const { _id, name, time, post, profileImg, postImg, follow } =
                    person;
                  // const isLiked = likedPosts[_id] && likedPosts[_id].includes(userId);
                  // const likeCount = likeCounts[_id] || 0;
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
                              width: "4rem",
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
                              src={unLikeImg}
                              alt=""
                              role="button"
                            />
                          </div>
                          {/* <div className="mt-2">{likeCount} like(s)</div>{" "} */}
                          <div
                            // show={modalShow}
                            onClick={() => openCommentModal(_id)}
                          >
                            <img src={commentImg} alt="" role="button" />
                          </div>
                          <p className="mt-2">
                            {" "}
                            {person.commentsCount} comment(s){" "}
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
