import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { comments } from "../db";

function CommentModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton></Modal.Header>
      <div className="container my-4">
        <Form className="w-100 ">
          <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
            <Form.Label>Add a comment</Form.Label>
            <Form.Control className="bg-gradient-secondary" as="textarea" rows={6} placeholder="Type here..." />
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
                const {id,name,time,post,profileImg} = comment
              return (
                <div key={id} className="card mt-4 p-2">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                    <img src={profileImg} alt="profile-image" />
                    <div className="">
                      <h5> {name} </h5>
                      <p> {time} </p>
                    </div>
                    </div>
                    <div>
                        <button className="btn border rounded-4 p-2">
                            {comment.follow}
                        </button>
                    </div>
                  </div>
                  <div>
                    <p> {post} </p>
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
