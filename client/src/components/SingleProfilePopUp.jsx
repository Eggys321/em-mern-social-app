import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import FollowListModal from "./FollowListModal";
import ProfileSidebar from "./ProfileSidebar";
import { get } from "../api/client";

function SingleProfilePopUp({ name, show, onHide }) {
  const [data, setData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowF, setModalShowF] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await get(`/users/userprofile/${userId}`, { auth: false });
        if (!cancelled) setData(response.user);
      } catch (error) {
        console.error("Failed to load profile:", error.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <>
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
      <Offcanvas show={show} onHide={onHide} aria-label={name ? `${name}'s profile` : "Profile"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <section className="p-2 rounded-2 border profile-section">
            <ProfileSidebar
              data={data}
              onShowFollowers={() => setModalShow(true)}
              onShowFollowing={() => setModalShowF(true)}
            />
          </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SingleProfilePopUp;
