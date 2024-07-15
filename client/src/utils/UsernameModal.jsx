import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UsernameModal(props) {
  const [followersUN, setFollowersUN] = useState([]);
  const getData = async () => {
    try {
      const request = await fetch(
        `http://localhost:5782/api/v1/users/userprofile/${props.user}`
      );
      const response = await request.json();

      console.log(response.user.followers);
      console.log(response.user.following);
      setFollowersUN(response?.user?.followers);
      //   setFollowingUN(response?.user?.following)
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Follower(s) </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {followersUN && followersUN.length >= 1 ? (
          <>
            <div className="row gap-3 justify-content-between p-3">
              {followersUN.map((follower) => {
                return (
                  <div className="col-4 border" key={follower._id}>
                    <h4 className="text-break"> {follower.userName} </h4>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h5>No follower(s) yet</h5>
          </>
        )}
      </Modal.Body>
      {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
    </Modal>
  );
}

export default UsernameModal;
