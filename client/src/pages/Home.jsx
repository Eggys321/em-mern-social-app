import { useState, useContext, useEffect } from "react";
import NavSection from "../components/NavSection";
import Navbar from "../layouts/Navbar";
import "../styles/Home.css";
import Post from "../components/Post";
import commentImg from "../assets/comment-image.svg";
import unLikeImg from "../assets/like-img.svg";
import likeImg from "../assets/heart-filled.svg";
import shareImg from "../assets/share-img.svg";
import CommentModal from "../components/ComentModal";
import toast from "react-hot-toast";
import Bio from "../components/Bio";
import { postText } from "../utils/ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import UserContext from "../context/UserContext";
import TimeAgo from "../components/TimeAgo";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EditPostForm from "../components/EditPostForm";
import Seo from "../components/Seo";
import EmptyState from "../components/EmptyState";
import { SpinnerLoader } from "../utils/Loader";
import { post as apiPost, patch, del } from "../api/client";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [showOptionsPostId, setShowOptionsPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const userId = localStorage.getItem("userId");

  const { bioProfile, timeLine, getTimeLine, setTimeLine, isLoading } = useContext(UserContext);

  const handleLike = async (postId) => {
    try {
      const data = await apiPost(`/posts/like-post/${postId}`);
      setTimeLine((prev) =>
        prev.map((p) => {
          if (p._id !== postId) return p;
          const alreadyLiked = p.likes?.includes(userId);
          const likes = alreadyLiked
            ? p.likes.filter((id) => id !== userId)
            : [...(p.likes || []), userId];
          return { ...p, likes };
        })
      );
      toast.success(data.message);
    } catch (error) {
      console.error("Error liking/unliking post:", error.message);
      toast.error("Failed to like/unlike post. Please try again.");
    }
  };

  function toggleShow(postId) {
    setShowOptionsPostId((prevPostId) => (prevPostId === postId ? null : postId));
  }

  useEffect(() => {
    if (!showOptionsPostId) return undefined;
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-post-options]")) {
        setShowOptionsPostId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptionsPostId]);

  async function handleDeletePost(postIdx) {
    try {
      const res = await del(`/posts/delete-post/${postIdx}`);
      if (res) toast.success(res.message);
      setTimeLine(timeLine.filter((existingDatum) => existingDatum._id !== postIdx));
    } catch (error) {
      console.error("Error deleting post:", error.message);
      toast.error(error.message);
    } finally {
      setShowOptionsPostId(null);
    }
  }

  async function handleSaveEdit(postId, { text }) {
    setIsSavingEdit(true);
    try {
      const res = await patch(`/posts/edit-post/${postId}`, { text });
      toast.success(res.message);
      setTimeLine((prev) => prev.map((p) => (p._id === postId ? { ...p, text } : p)));
      setEditingPostId(null);
    } catch (error) {
      console.error("Error editing post:", error.message);
      toast.error(error.message);
    } finally {
      setIsSavingEdit(false);
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(postText),
    defaultValues: { text: "" },
  });

  const handleUnfollow = async (userIdToUnfollow) => {
    try {
      const result = await apiPost(`/users/unfollow/${userIdToUnfollow}`);
      if (result.success) {
        getTimeLine();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to unfollow user:", error.message);
      toast.error(error.message);
    }
  };

  const handlePost = async (data) => {
    try {
      const response = await apiPost("/posts/create-post", data);
      if (response.success) {
        reset();
        toast.success(response.message);
        getTimeLine();
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
      toast.error(error.message);
    }
  };

  const openCommentModal = (postId) => {
    setCurrentPostId(postId);
    setModalShow(true);
  };

  const handleCommentAdded = () => {
    getTimeLine();
  };

  return (
    <>
      <Seo title="Home" description="Your timeline — posts from you and the people you follow." noIndex />
      <Navbar />

      <div className="home-wrapper">
        <div className="container">
          <main id="main-content" className="row home-main gap-2 pt-3">
            <section className="col-md-4 d-none d-md-block p-2 rounded-2 border profile-section">
              <Bio />
            </section>

            <section className="col-md">
              <div className="p-2 top-news-field rounded-2 mb-2 border position-relative z-2">
                <form onSubmit={handleSubmit(handlePost)} className="w-100">
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src={bioProfile?.profilePhoto}
                      alt={bioProfile?.userName ? `${bioProfile.userName}'s profile photo` : "Your profile photo"}
                      className="avatar avatar-md"
                    />
                    <label htmlFor="post-text" className="sr-only">
                      What do you want to share?
                    </label>
                    <input
                      id="post-text"
                      type="text"
                      className="rounded-pill ps-2 post-input w-100"
                      placeholder="What do you want to share?"
                      {...register("text", { required: true })}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <div className="d-flex justify-content-between home-post-error-state align-items-center">
                      <div className="w-100 text-end m-auto">
                        <span className="text-danger fs-6 fw-bold">{errors.text?.message}</span>
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
                <div className="position-absolute top-50 mt-3">
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
                {isLoading && timeLine.length < 1 && (
                  <div className="d-flex justify-content-center py-5" role="status" aria-label="Loading your timeline">
                    <SpinnerLoader />
                  </div>
                )}
                {!isLoading && timeLine.length < 1 && (
                  <EmptyState icon="📭" title="No posts yet">
                    Create a post or follow others to see posts on your timeline.
                  </EmptyState>
                )}
                {timeLine?.map((person) => {
                  const { _id } = person;
                  const isLiked = Boolean(person.likes?.includes(userId));
                  const likeCount = person.likes?.length || 0;
                  const isOwnPost = person.user._id === userId;
                  const isEditing = editingPostId === _id;

                  return (
                    <article key={_id} className="p-2 mb-3 rounded-2 scroll-page position-relative">
                      <div className="d-flex justify-content-between align-items-center gap-2">
                        <div className="d-flex gap-2 align-items-center" style={{ minWidth: 0 }}>
                          <img
                            src={person?.user?.profilePhoto}
                            alt={`${person.user.userName}'s profile photo`}
                            className="avatar avatar-md flex-shrink-0"
                          />
                          <span className="d-flex flex-column justify-content-center" style={{ minWidth: 0 }}>
                            <h5 className="pt-3 mb-0 text-truncate">{person.user.userName}</h5>
                            <p className="mb-0">
                              <TimeAgo date={person?.createdAt} />
                            </p>
                          </span>
                        </div>

                        <div className="flex-shrink-0">
                          {!isOwnPost && (
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm rounded-pill px-3"
                              onClick={() => handleUnfollow(person.user._id)}
                            >
                              Following
                            </button>
                          )}
                        </div>
                      </div>

                      {isOwnPost && (
                        <div data-post-options className="position-absolute top-0 end-0 mt-2 me-2 z-3">
                          <div className="position-relative">
                            <button
                              type="button"
                              className="btn-icon fs-4"
                              aria-haspopup="menu"
                              aria-expanded={showOptionsPostId === _id}
                              aria-label="Post options"
                              onClick={() => toggleShow(_id)}
                            >
                              ⋯
                            </button>
                            {showOptionsPostId === _id && (
                              <div
                                role="menu"
                                className="shadow rounded-3 text-start position-absolute end-0 border bg-light overflow-hidden"
                                style={{ top: "100%", minWidth: "9rem" }}
                              >
                                <button
                                  type="button"
                                  role="menuitem"
                                  className="btn btn-link text-success d-block w-100 text-start px-3 py-2 rounded-0"
                                  onClick={() => {
                                    setEditingPostId(_id);
                                    setShowOptionsPostId(null);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  role="menuitem"
                                  className="btn btn-link text-danger d-block w-100 text-start px-3 py-2 rounded-0"
                                  onClick={() => handleDeletePost(_id)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {isEditing ? (
                        <EditPostForm
                          initialText={person.text}
                          isSaving={isSavingEdit}
                          onCancel={() => setEditingPostId(null)}
                          onSave={(data) => handleSaveEdit(_id, data)}
                        />
                      ) : (
                        <p>{person.text}</p>
                      )}

                      {person.imagePath && (
                        <LazyLoadImage
                          effect="blur"
                          wrapperClassName="post-image-frame"
                          className="post-image"
                          src={person.imagePath}
                          alt={`Image shared by ${person.user.userName}`}
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
          </main>
        </div>
      </div>
      <NavSection />
    </>
  );
};

export default Home;
