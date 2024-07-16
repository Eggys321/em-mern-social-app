import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UsernameModalF(props) {
  const [followeringUN, setFollowingUN] = useState([]);
  const getData = async () => {
    try {
      const request = await fetch(
        `https://em-mern-social-app.onrender.com/api/v1/users/userprofile/${props.user}`
      );
      const response = await request.json();

    //   console.log(response.user.followers);
      console.log(response.user.following);
    //   setFollowersUN(response?.user?.followers);
        setFollowingUN(response?.user?.following)
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
        <Modal.Title id="contained-modal-title-vcenter">Following </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {followeringUN && followeringUN.length >= 1 ? (
          <>
            <div className="row gap-3 justify-content-between p-3">
              {followeringUN.map((following) => {
                return (
                  <div className="col-4 border" key={following._id}>
                    <h4 className="text-break"> {following.userName} </h4>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h5>You are not following anyone yet</h5>
          </>
        )}
      </Modal.Body>
      {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
    </Modal>
  );
}

export default UsernameModalF;
