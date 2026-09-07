import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import bioImg from "../assets/bio-img.svg";
import ageImg from "../assets/age-img.svg";
import genderImg from "../assets/gender-img.svg";
import locationImg from "../assets/location-input-img.svg";
import occupationImg from "../assets/occupation-input-img.svg";
import xImg from "../assets/twitter-input-img.svg";
import linkedinImg from "../assets/linkedin-input-img.svg";
import "../styles/EditProfile.css";
import { Loader } from "../utils/Loader";
import UserContext from "../context/UserContext";
import { useQueryClient } from "@tanstack/react-query";

function EditProfileModal(props) {
  const {
    handleSubmit,
    handleFileChange,
    bioProfile,
    bio,
    setBio,
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
    preview,
  } = useContext(UserContext);

  const token = localStorage.getItem("clientToken");
  const queryClient = useQueryClient();

  const btnText = isCLicked ? <Loader /> : "Continue";

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    queryClient.invalidateQueries(["bioProfile", token]);
  };

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
              <form
                className="edit-form row  justify-content-between align-items-center w-100 gap-4"
                encType="multipart/form-data"
                onSubmit={handleProfileUpdate}
              >
                <section className="col-md-6">
                  <h5 className="mt-3 basic-h5 ms-0">Basic Information</h5>
                  <h5>
                    Hi,{" "}
                    <span className="text-primary">{bioProfile?.userName}</span>
                  </h5>
                  <h3>Complete Your Profile</h3>
                  <img
                    src={preview}
                    alt="Profile photo preview"
                    className="edit-profile-img img-fluid rounded-circle mb-2"
                  />
                  <label htmlFor="profilePhotoInput" className="sr-only">
                    Profile photo
                  </label>
                  <input
                    id="profilePhotoInput"
                    type="file"
                    className="rounded w-100 select-img bg-white border-primary"
                    onChange={handleFileChange}
                  />
                </section>
                <section className="col-md-5 ">
                  <div className="field-icon utils">
                    <label htmlFor="editProfileBio" className="sr-only">
                      Bio
                    </label>
                    <textarea
                      id="editProfileBio"
                      className="rounded field-icon__input w-100"
                      placeholder="Bio"
                      cols="30"
                      rows="5"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    <img src={bioImg} className="field-icon__img field-icon__img--top" alt="" aria-hidden="true" />
                  </div>

                  <div className="d-flex utils gap-3">
                    <div className="field-icon age-input">
                      <label htmlFor="editProfileAge" className="sr-only">
                        Age
                      </label>
                      <input
                        id="editProfileAge"
                        type="number"
                        className="rounded field-icon__input w-100"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                      <img src={ageImg} alt="" aria-hidden="true" className="field-icon__img" />
                    </div>
                    <div className="field-icon gender-input">
                      <label htmlFor="editProfileGender" className="sr-only">
                        Gender
                      </label>
                      <input
                        id="editProfileGender"
                        type="text"
                        className="rounded field-icon__input w-100"
                        placeholder="Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <img src={genderImg} alt="" aria-hidden="true" className="field-icon__img" />
                    </div>
                  </div>

                  <div className="field-icon utils mt-1">
                    <label htmlFor="editProfileLocation" className="sr-only">
                      Location
                    </label>
                    <input
                      id="editProfileLocation"
                      type="text"
                      className="rounded field-icon__input w-100"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <img src={locationImg} alt="" aria-hidden="true" className="field-icon__img" />
                  </div>

                  <div className="field-icon utils mt-1">
                    <label htmlFor="editProfileOccupation" className="sr-only">
                      Occupation
                    </label>
                    <input
                      id="editProfileOccupation"
                      type="text"
                      className="rounded field-icon__input w-100"
                      placeholder="Occupation"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                    <img src={occupationImg} alt="" aria-hidden="true" className="field-icon__img" />
                  </div>

                  <h5 className="mt-3 socials-header">Socials</h5>
                  <div className="field-icon utils mt-1">
                    <label htmlFor="editProfileX" className="sr-only">
                      X (Twitter)
                    </label>
                    <input
                      id="editProfileX"
                      type="text"
                      className="rounded field-icon__input w-100"
                      placeholder="X App"
                      value={x}
                      onChange={(e) => setX(e.target.value)}
                    />
                    <img src={xImg} alt="" aria-hidden="true" className="field-icon__img" />
                  </div>

                  <div className="field-icon utils mt-1">
                    <label htmlFor="editProfileLinkedIn" className="sr-only">
                      LinkedIn
                    </label>
                    <input
                      id="editProfileLinkedIn"
                      type="text"
                      className="rounded field-icon__input w-100"
                      placeholder="Linkedin"
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                    />
                    <img src={linkedinImg} alt="" aria-hidden="true" className="field-icon__img" />
                  </div>

                  <button
                    type="submit"
                    className="btn rounded-pill w-100 continue-btn btn-lg text-white utils mt-3 btn-primary"
                  >
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
