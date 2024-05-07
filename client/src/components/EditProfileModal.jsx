import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { comments } from "../db";
import editProfileImg from '../assets/editprofileimg.png'

function EditProfileModal(props) {
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
        <main className=" row justify-content-between align-items-center">
          {/* first section */}
          <section className="col-md-6">
            <h4>
              Hi, <span className="text-primary">John Doe</span>
            </h4>
            <h2>Complete Your Profile</h2>
            <img src={editProfileImg} alt="" className="img-fluid"/>
            <Form.Group controlId="formFileLg" className="mb-3">
              {/* <Form.Label>Large file input example</Form.Label> */}
              <Form.Control type="file" size="lg" />
            </Form.Group>
          </section>
          {/* second section */}
          <section className="col-md-6">
            <h5>Basic Information</h5>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate magni accusamus incidunt voluptas illum? Amet laborum accusantium dolorum inventore aspernatur ipsam ipsum deleniti exercitationem vero, nam, sed necessitatibus assumenda fuga, maiores vel rem voluptas ab voluptatem repellat similique eius aliquid dicta! Labore totam aliquam aperiam vitae maiores veritatis voluptatum, ex temporibus magnam voluptate eum nostrum eius pariatur! Consequatur officia atque tempora odit dicta et nam quos dolores iure fugiat, adipisci nisi earum deleniti. Minus ad obcaecati inventore magni hic? Vitae dolor modi molestias, deleniti deserunt illum ut aperiam! Blanditiis dicta minima qui magni accusamus accusantium aspernatur quos officiis eveniet laborum!</p>
          </section>
        </main>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
