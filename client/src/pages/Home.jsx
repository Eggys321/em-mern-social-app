import { useState, useEffect, useContext } from "react";
import NavSection from "../components/NavSection";
import Navbar from "../layouts/Navbar";
import profileImg from "../assets/profile-img.svg";
import "../styles/Home.css";
import Post from "../components/Post";
import { people } from "../db";
import commentImg from "../assets/comment-image.svg";
import unLikeImg from "../assets/like-img.svg";
import likeImg from "../assets/heart.jpg";
import shareImg from "../assets/share-img.svg";
import CommentModal from "../components/ComentModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Bio from "../components/Bio";
import { postText } from "../utils/ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import UserContext from "../context/UserContext";
import TimeAgo from "../components/TimeAgo";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SpinnerLoader } from "../utils/Loader";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [currentPostId, setCurrentPostId] = useState(null);
  const [isTrue, setIsTrue] = useState(!false);
  const [showOptionsPostId, setShowOptionsPostId] = useState(null);

  // const [currentUser, setCurrentUser] = useState(null);

  const userId = localStorage.getItem("userId");

  // const [bioProfile, setBioProfile] = useState([]);
  // console.log(people);
  const { getBioProfile, bioProfile, timeLine, getTimeLine, setTimeLine } =
    useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("clientToken");
  // console.log(timeLine);

  // const handleLike = async (postId) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5782/api/v1/posts/like-post/${postId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     if (response.ok) {
  //       const updatedLikedPosts = { ...likedPosts };
  //       if (updatedLikedPosts[postId] === userId) {
  //         delete updatedLikedPosts[postId];
  //       } else {
  //         updatedLikedPosts[postId] = userId;
  //       }
  //       setLikedPosts(updatedLikedPosts);
  //       localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
  //       getTimeLine();
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error liking/unliking post:", error);
  //     toast.error("Failed to like/unlike post. Please try again.");
  //   }
  // };

  // second
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

  function toggleShow(postId) {
    setShowOptionsPostId((prevPostId) =>
      prevPostId === postId ? null : postId
    );
    // isTrue ?  setIsTrue(false) : setIsTrue(true)
  }

  async function handleDeletePost(postIdx) {
    try {
      const req = await fetch(
        `https://em-mern-social-app.onrender.com/api/v1/posts/delete-post/${postIdx}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await req.json();
      if(res){
        toast.success(res.message)
      }
      console.log(res);
      setTimeLine(timeLine.filter((existingDatum) => existingDatum._id !== postIdx));

    } catch (error) {
      console.log(error);
    }
  }
  // timeline

  // const getBioProfile = async () => {
  //   try {
  //     const request = await fetch(
  //       "http://localhost:5782/api/v1/users",
  //       {
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const response = await request.json();
  //     // console.log(response.user);
  //     setBioProfile(response.user);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // for the post
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
  // console.log("errors", errors);
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
        getTimeLine();

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
    setModalShow(true);
  };

  const handleCommentAdded = () => {
    getTimeLine();
  };
  useEffect(() => {
    if (!token) {
      toast.error("unauthorized,sign in");
      navigate("/signin");
    }
    const storedLikedPosts = JSON.parse(localStorage.getItem("likedPosts"));
    if (storedLikedPosts) {
      setLikedPosts(storedLikedPosts);
    }

    const counts = {};
    timeLine.forEach((post) => {
      counts[post._id] = post.likes.length;
    });
    setLikeCounts(counts);
    getTimeLine();
    // getBioProfile();
    document.title = "Home | page";
  }, []);

  return (
    <>
      {/* nav */}
      <Navbar />

      {/* main content */}
      <div className="home-wrapper">
        <div className="container">
          <main className=" row home-main gap-2 pt-3">
            <section
              style={{ height: "45rem" }}
              className=" col-md-4 d-none d-md-block p-2 rounded-2 border profile-section "
            >
              <Bio />
            </section>

            {/* news-field col */}

            <section className="col-md">
              {/* top div */}
              <div className="p-2 top-news-field rounded-2 mb-2 border position-relative z-2">
                {/*  */}
                <form onSubmit={handleSubmit(handlePost)} className="w-100 ">
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src={bioProfile?.profilePhoto}
                      alt=""
                      className="profile-img "
                      style={{
                        borderRadius: "100%",
                        height: "4rem",
                        width: "6rem",
                      }}
                    />

                    <input
                      type="text"
                      className="rounded-pill ps-2 post-input w-100"
                      placeholder="What do you want to share?"
                      {...register("text", { required: true })}
                    />
                  </div>
                  {/*  */}
                  <div className=" d-flex align-items-center justify-content-between mt-1">
                    <div className="d-flex justify-content-between home-post-error-state align-items-center">
                      <div className="w-100 text-end m-auto">
                        <span className="text-danger   fs-6  fw-bold">
                          {errors.text?.message}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-primary text-light px-4 rounded-pill"
                      disabled={isSubmitting}
                    >
                      post
                    </button>
                  </div>
                </form>
                <div className="position-absolute top-50  mt-3">
                  <Post />
                </div>
              </div>

              <div>
                <CommentModal
                  show={modalShow}
                  postId={currentPostId}
                  onHide={() => setModalShow(false)}
                  onCommentAdded={handleCommentAdded}
                />
                {timeLine.length < 1 && (
                  <p className="fs-5  fw-bold">
                    No posts yet,create a post or follow others to see posts on
                    your timeline👌
                  </p>
                )}
                {timeLine?.map((person) => {
                  const { _id, name, time, post, profileImg, postImg, follow } =
                    person;
                  const isLiked =
                    likedPosts[_id] && likedPosts[_id].includes(userId);
                  const likeCount = likeCounts[_id] || 0;
                  const isOwnPost = person.user._id === userId; // Check if the post belongs to the current user

                  return (
                    <div
                      key={_id}
                      className="p-2 mb-3 rounded-2 scroll-page position-relative"
                    >
                      {/* top div */}
                      <div className="d-flex justify-content-between align-items-center  ">
                        {/* img and time */}
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={person?.user?.profilePhoto}
                            alt=""
                            className="profile-img "
                            style={{
                              borderRadius: "100%",
                              height: "4rem",
                              width: "4rem",
                            }}
                          />
                          <span className="d-flex flex-column justify-content-center ">
                            <h5 className="pt-3">{person.user.userName}</h5>
                            <p>
                              <TimeAgo date={person?.createdAt} />
                            </p>
                          </span>
                        </div>

                        {/* btn-div */}
                        <div>
                          {!isOwnPost && (
                            <div>
                              <button
                                className="btn rounded-5 border"
                                onClick={() => handleUnfollow(person.user._id)}
                              >
                                Following
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-content-end  position-absolute top-0 end-0 position-relative  pe-4 pt-3">
                        {isOwnPost && (
                          <div onClick={() => toggleShow(_id)}>
                            <p role="button" className="fs-2">
                              ...
                            </p>
                          </div>
                        )}
                      </div>
                      {showOptionsPostId === _id && (
                        <div className="shadow rounded w-25 text-center position-absolute top-50 end-0 translate-middle-y me-5 border z-2 bg-light">
                          <p
                            className="text-danger"
                            role="button"
                            onClick={() => handleDeletePost(_id)}
                          >
                            Delete
                          </p>
                          <p className="text-success">Edit</p>
                        </div>
                      )}

                      {/* post */}
                      <p>{person.text}</p>

                      {/* post-img */}
                      <LazyLoadImage
                        height={"100%"}
                        width={"100%"}
                        effect="blur"
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
                            />
                          </div>
                          <div className="mt-2">{likeCount} like(s)</div>{" "}
                          <div
                            show={modalShow}
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
          </main>
        </div>
      </div>
      {/* fixed section */}
      <NavSection />
    </>
  );
};

export default Home;
