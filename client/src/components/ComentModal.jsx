import { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";
import TimeAgo from "./TimeAgo";
import { Loader } from "../utils/Loader";
import { SpinnerLoader } from "../utils/Loader";
import { get, post } from "../api/client";

function CommentModal({ postId, show, onHide, onCommentAdded }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await get(`/posts/comments/${postId}`, { auth: false });
      setComments(data.comments);
    } catch (error) {
      toast.error(error.message || "Failed to fetch comments.");
    } finally {
      setIsLoading(false);
    }
  }, [postId]);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    try {
      const data = await post(`/posts/comment-post/${postId}`, { text: comment });
      toast.success(data.message);
      fetchComments();
      setComment("");
      onCommentAdded(postId);
    } catch (error) {
      toast.error(error.message || "Failed to add comment. Please try again.");
    } finally {
      setIsClicked(false);
    }
  };

  const btnTxt = isClicked ? <Loader /> : "Post";

  useEffect(() => {
    if (show) {
      fetchComments();
    }
  }, [show, fetchComments]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton></Modal.Header>
      <div className="container my-4">
        <Form className="w-100 " onSubmit={handleCommentSubmit}>
          <Form.Group
            className="mb-3 "
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Add a comment</Form.Label>
            <Form.Control
              className="bg-gradient-secondary"
              as="textarea"
              rows={6}
              placeholder="Type here..."
              value={comment}
              onChange={handleCommentChange}
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary" type="submit" className="px-4 rounded-5" disabled={isClicked}>
              {btnTxt}
            </Button>
          </div>
        </Form>

        <section>
          {isLoading && <SpinnerLoader />}
          <h5 className="my-4">{comments && comments.length >= 1 ? "Comment(s)" : "No comment(s) yet"}</h5>
          <div className="">
            {comments.map((comment) => {
              const { _id, text, user, createdAt } = comment;
              return (
                <div key={_id} className="card mt-4 p-2">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <img
                        src={user?.profilePhoto}
                        alt={user?.userName ? `${user.userName}'s profile photo` : "Profile photo"}
                        className="avatar avatar-md"
                      />
                      <div className="">
                        <h5> {user.userName} </h5>
                        <p>
                          {" "}
                          <TimeAgo date={createdAt} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p> {text} </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Modal>
  );
}

export default CommentModal;
