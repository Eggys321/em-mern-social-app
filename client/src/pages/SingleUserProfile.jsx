import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import NavSection from "../components/NavSection";
import unLikeImg from "../assets/like-img.svg";
import likeImg from "../assets/heart-filled.svg";
import shareImg from "../assets/share-img.svg";
import TimeAgo from "../components/TimeAgo";
import { LazyLoadImage } from "react-lazy-load-image-component";
import commentImg from "../assets/comment-image.svg";
import FollowListModal from "../components/FollowListModal";
import SingleProfilePopUp from "../components/SingleProfilePopUp";
import ProfileSidebar from "../components/ProfileSidebar";
import UserSearchBox from "../components/UserSearchBox";
import CommentModal from "../components/ComentModal";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import EmptyState from "../components/EmptyState";
import { SpinnerLoader } from "../utils/Loader";
import { get, post } from "../api/client";

const SingleUserProfile = () => {
  const [data, setData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowF, setModalShowF] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [modalShowComm, setModalShowComm] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const { userId } = useParams();
  const userIdOfViewer = localStorage.getItem("userId");

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await get(`/users/userprofile/${userId}`, { auth: false });
      setUserPosts(response.posts || []);
      setData(response.user);
    } catch (error) {
      console.error("Failed to load profile:", error.message);
      toast.error("Couldn't load this profile.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const handleLike = async (postId) => {
    try {
      const result = await post(`/posts/like-post/${postId}`);
      setUserPosts((prev) =>
        prev.map((p) => {
          if (p._id !== postId) return p;
          const alreadyLiked = p.likes?.includes(userIdOfViewer);
          const likes = alreadyLiked
            ? p.likes.filter((id) => id !== userIdOfViewer)
            : [...(p.likes || []), userIdOfViewer];
          return { ...p, likes };
        })
      );
      toast.success(result.message);
    } catch (error) {
      console.error("Error liking/unliking post:", error.message);
      toast.error("Failed to like/unlike post. Please try again.");
    }
  };

  const handleUnfollow = async (targetUserId) => {
    try {
      const result = await post(`/users/unfollow/${targetUserId}`);
      if (result.success) {
        getData();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to unfollow user:", error.message);
      toast.error(error.message);
    }
  };

  const openCommentModal = (postId) => {
    setCurrentPostId(postId);
    setModalShowComm(true);
  };

  const handleCommentAdded = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Seo
        title={data?.userName || "Profile"}
        description={data?.bio || "View this user's profile on EM."}
        noIndex
      />
      <nav className="d-flex align-items-center container" aria-label="Mobile profile">
        <div className="pt-2 pb-2 d-flex gap-2 align-items-center w-100">
          <button
            type="button"
            className="btn p-0 border-0 bg-transparent d-lg-none flex-shrink-0"
            aria-label="Open profile menu"
            onClick={handleShow}
          >
            <img
              src={data?.profilePhoto}
              alt=""
              aria-hidden="true"
              className="avatar avatar-sm img-fluid"
            />
          </button>
          <UserSearchBox className="d-md-none" />
          <div className="d-none">
            <SingleProfilePopUp show={showOffcanvas} onHide={handleClose} name={data?.userName} />
          </div>
        </div>
      </nav>
      <div className="d-none d-lg-block">
        <Navbar />
      </div>
      <main id="main-content" className="home-wrapper">
        <FollowListModal
          userId={userId}
          show={modalShow}
          onHide={() => setModalShow(false)}
          listKey="followers"
          title="Follower(s)"
          emptyText="No follower(s) yet"
        />
        <FollowListModal
          userId={userId}
          show={modalShowF}
          onHide={() => setModalShowF(false)}
          listKey="following"
          title="Following"
          emptyText="Not following anyone yet"
        />
        <div className="container">
          <div className="row gap-2 py-3">
            <section className="col-md-4 d-none d-md-block p-2 rounded-2 border profile-section">
              <ProfileSidebar
                data={data}
                onShowFollowers={() => setModalShow(true)}
                onShowFollowing={() => setModalShowF(true)}
              />
            </section>
            <section className="col-md">
              <CommentModal
                show={modalShowComm}
                postId={currentPostId}
                onHide={() => setModalShowComm(false)}
                onCommentAdded={handleCommentAdded}
              />

              <div>
                {isLoading && userPosts.length < 1 && (
                  <div className="d-flex justify-content-center py-5" role="status" aria-label="Loading posts">
                    <SpinnerLoader />
                  </div>
                )}
                {!isLoading && userPosts.length < 1 && (
                  <EmptyState icon="📭" title="No posts yet">
                    {data?.userName ? `${data.userName} hasn't posted anything yet.` : "Nothing to show yet."}
                  </EmptyState>
                )}
                {userPosts?.map((person) => {
                  const { _id } = person;
                  const isLiked = Boolean(person.likes?.includes(userIdOfViewer));
                  const likeCount = person.likes?.length || 0;
                  return (
                    <article key={_id} className="p-2 mb-3 rounded-2 scroll-page">
                      <div className="d-flex justify-content-between align-items-center gap-2">
                        <div className="d-flex gap-2 align-items-center" style={{ minWidth: 0 }}>
                          <img
                            src={data?.profilePhoto}
                            alt={`${data?.userName}'s profile photo`}
                            className="avatar avatar-md flex-shrink-0"
                          />
                          <span className="d-flex flex-column justify-content-center" style={{ minWidth: 0 }}>
                            <h5 className="pt-3 mb-0 text-truncate">{data?.userName}</h5>
                            <p className="mb-0">
                              <TimeAgo date={person?.createdAt} />
                            </p>
                          </span>
                        </div>

                        {data?._id !== userIdOfViewer && (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm rounded-pill px-3 flex-shrink-0"
                            onClick={() => handleUnfollow(data._id)}
                          >
                            Following
                          </button>
                        )}
                      </div>

                      <p>{person.text}</p>

                      {person.imagePath && (
                        <LazyLoadImage
                          effect="blur"
                          wrapperClassName="post-image-frame"
                          className="post-image"
                          src={person.imagePath}
                          alt={`Image shared by ${data?.userName}`}
                        />
                      )}

                      <div className="d-flex pt-2 justify-content-between align-items-center">
                        <div className="d-flex gap-2 align-items-center">
                          <button
                            type="button"
                            className="btn-icon"
                            aria-pressed={isLiked}
                            aria-label={isLiked ? "Unlike this post" : "Like this post"}
                            onClick={() => handleLike(_id)}
                          >
                            <img src={isLiked ? likeImg : unLikeImg} alt="" aria-hidden="true" />
                          </button>
                          <span>{likeCount} like(s)</span>
                          <button
                            type="button"
                            className="btn-icon"
                            aria-label="View comments"
                            onClick={() => openCommentModal(_id)}
                          >
                            <img src={commentImg} alt="" aria-hidden="true" />
                          </button>
                          <span>{person.commentsCount} comment(s)</span>
                        </div>

                        <button type="button" className="btn-icon" aria-label="Share this post">
                          <img src={shareImg} alt="" aria-hidden="true" />
                        </button>
                      </div>
                    </article>
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
