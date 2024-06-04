import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { comments } from "../db";
import editProfileImg from "../assets/editprofileimg.png";
// import profileImg from "../assets/profile-pic.svg";
import bioImg from "../assets/bio-img.svg";
import ageImg from "../assets/age-img.svg";
import genderImg from "../assets/gender-img.svg";
import locationImg from "../assets/location-input-img.svg";
import occupationImg from "../assets/occupation-input-img.svg";
import xImg from "../assets/twitter-input-img.svg";
import linkedinImg from "../assets/linkedin-input-img.svg";
import "../styles/EditProfile.css";
import { useNavigate } from "react-router-dom";
import {Loader} from "../utils/Loader";
import toast from "react-hot-toast";
import UserContext from "../context/UserContext";

function EditProfileModal(props) {
  // const [bioProfile, setBioProfile] = useState([]);
  // const [bio, setBio] = useState("");
  // const [age, setAge] = useState("");
  // const [location, setLocation] = useState("");
  // const [gender, setGender] = useState("");
  // const [occupation, setOccupation] = useState("");
  // const [x, setX] = useState("");
  // const [linkedIn, setLinkedIn] = useState("");
  // const [isCLicked,setIsClicked] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [preview, setPreview] = useState(profileImg); 

  const { getBioProfile,
  handleSubmit,
    handleFileChange,
    bioProfile,
    bio,
    setBio,
    setBioProfile,
    age,
    setAge,
    location,
    setLocation,
    gender,
    setGender,
    occupation,
    setOccupation,
    x,
    setX,
    linkedIn,
    setLinkedIn,
    isCLicked,
    preview
  } = useContext(UserContext)



  const token = localStorage.getItem("clientToken");
  const navigate = useNavigate();

  // const getBioProfile = async () => {
  //   try {
  //     const request = await fetch("http://localhost:5782/api/v1/users", {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const response = await request.json();
  //     // console.log(response.user);
  //     setBioProfile(response.user);
  //     setBio(response.user.bio);
  //     setLocation(response.user.location);
  //     setOccupation(response.user.occupation);
  //     setX(response.user.x);
  //     setLinkedIn(response.user.linkedIn);
  //     setAge(response.user.age || "") ;     
  //     setGender(response.user.gender || "");
  //     setPreview(response.user.profilePhoto || profileImg); 
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setPreview(reader.result);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const formData = new FormData();
  //   formData.append("bio", bio);
  //   formData.append("age", age);
  //   formData.append("location", location);
  //   formData.append("gender", gender);
  //   formData.append("occupation", occupation);
  //   formData.append("x", x);
  //   formData.append("linkedIn", linkedIn);
  //   if (selectedFile) {
  //     formData.append("profilePhoto", selectedFile);
  //   }
  //   setIsClicked(true)

  //   try {
  //     const response = await fetch("http://localhost:5782/api/v1/users/update-profile", {
  //       method: "PATCH",
  //       body: formData,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const result = await response.json();
  //     console.log(result);
  //     if(result){
  //       setIsClicked(true)
  //       toast.success(result.message)
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);

  //   }finally{
  //     setIsClicked(false)
  //   }
  // };

  const btnText = isCLicked ? <Loader/> : "Continue";


  useEffect(() => {
    if (!token) {
      toast.error("unauthorized,sign in");
      navigate("/signin");
    }
    // getBioProfile();
  }, []);
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
        <main className=" ">
          <section>
            <div className="wrapper ">
              {/* form */}
              <form
                className="edit-form row  justify-content-between align-items-center w-100 gap-4"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                {/* first section */}
                <section className="col-md-6">
                  <h5 className="mt-3 basic-h5 ms-0">Basic Information</h5>
                  <h5>
                    Hi,{" "}
                    <span className="text-primary">{bioProfile?.userName}</span>
                  </h5>
                  <h3>Complete Your Profile</h3>
                  <img
                    src={preview}
                    alt=""
                    className="edit-profile-img img-fluid rounded-circle mb-2"
                  />
                  <input
                    type="file"
                    name=""
                    className="rounded w-100 select-img bg-white border-primary"
                    onChange={handleFileChange}

                  />
                </section>
                {/* second section */}
                <section className="col-md-5 ">
                  {/* text area */}
                  <div className="position-relative">
                    <textarea
                      name=""
                      className="rounded bio-input utils w-100"
                      placeholder="Bio"
                      cols="30"
                      rows="5"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    <img
                      src={bioImg}
                      className="position-absolute top-0 start-0 ms-1 mt-1"
                      alt=""
                    />
                  </div>

                  {/* age and gender */}
                  <div className=" d-flex utils">
                    <div className="position-relative">
                      <input
                        type="number"
                        className="age-input rounded me-4 "
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                      <img
                        src={ageImg}
                        alt=""
                        className="position-absolute start-0 age-img ms-2"

                      />
                    </div>
                    {/* gender */}
                    <div className="position-relative">
                      <input
                        type="text"
                        className="gender-input rounded"
                        placeholder="Gender"
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <img
                        src={genderImg}
                        alt=""
                        className="position-absolute top-50 start-0 translate-middle ms-3 gender-img "
                      />
                    </div>
                  </div>

                  {/* location */}
                  <div className="position-relative mt-1">
                    <input
                      type="text"
                      className="rounded  utils location-input w-100"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <img
                      src={locationImg}
                      alt=""
                      className="position-absolute  start-0 location-input-img"
                    />
                  </div>

                  {/* occupation */}
                  <div className="position-relative mt-1">
                    <input
                      type="text"
                      className="rounded  utils occupation-input location-input w-100"
                      placeholder="Occupation"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                    <img
                      src={occupationImg}
                      alt=""
                      className="position-absolute ms-1 start-0 location-input-img"
                    />
                  </div>

                  {/* socials */}
                  <h5 className="mt-3 socials-header">Socials</h5>
                  {/*twitter*/}
                  <div className="position-relative mt-1">
                    <input
                      type="text"
                      className="rounded utils twitter-input location-input w-100"
                      placeholder="X App"
                      value={x}
                      onChange={(e) => setX(e.target.value)}
                    />
                    <img
                      src={xImg}
                      alt=""
                      className="position-absolute ms-1 start-0 location-input-img"
                    />
                  </div>

                  {/*linkedin*/}
                  <div className="position-relative mt-1">
                    <input
                      type="text"
                      className="rounded utils twitter-input location-input w-100"
                      placeholder="Linkedin"
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                    />
                    <img
                      src={linkedinImg}
                      alt=""
                      className="position-absolute ms-1 start-0 location-input-img"
                    />
                  </div>

                  {/* submit */}
                  <button className="btn rounded-pill w-100 continue-btn btn-lg text-white utils mt-3 btn-primary">
                    {btnText}
                  </button>
                </section>
              </form>
            </div>
          </section>
        </main>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
