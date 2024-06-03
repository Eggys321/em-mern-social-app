import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { comments } from "../db";
import toast from "react-hot-toast";
import TimeAgo from "./TimeAgo";

function CommentModal({ postId, show, onHide }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://em-mern-social-app.onrender.com/api/v1/posts/comments/${postId}`
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch comments.");
    }
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("clientToken");

    try {
      const response = await fetch(
        `https://em-mern-social-app.onrender.com/api/v1/posts/comment-post/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: comment }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchComments(); // Fetch the updated comments
        setComment(""); // Clear the comment input
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add comment. Please try again.");
    }
  };

  useEffect(() => {
    if (show) {
      fetchComments();
    }
  }, [show]);

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
            <Button variant="primary" type="submit" className="w-25  rounded-5">
              Post
            </Button>
          </div>
        </Form>
        <section>
          <h5 className="my-4">Previous comments</h5>
          <div className="">
            {comments.map((comment) => {
              const { _id, text, time, user, profileImg,createdAt } = comment;
              return (
                <div key={_id} className="card mt-4 p-2">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <img src={user?.profilePhoto} alt="profile-image"  className="profile-img "
                            style={{
                              borderRadius: "100%",
                              height: "4rem",
                              width: "4rem",
                            }} />
                      <div className="">
                        <h5> {user.userName} </h5>
                        <p>
                          {" "}
                          <TimeAgo date={createdAt} />
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="btn border rounded-4 p-2">
                        {comment.follow}
                      </button>
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
