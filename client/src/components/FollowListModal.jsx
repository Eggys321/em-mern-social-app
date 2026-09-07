import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { get } from "../api/client";

const FollowListModal = ({ show, onHide, userId, listKey, title, emptyText }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!show || !userId) return undefined;
    let cancelled = false;

    (async () => {
      try {
        const response = await get(`/users/userprofile/${userId}`, { auth: false });
        if (!cancelled) setList(response?.user?.[listKey] || []);
      } catch (error) {
        console.error(`Failed to load ${listKey}:`, error.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [show, userId, listKey]);

  return (
    <Modal show={show} onHide={onHide} size="md" aria-labelledby="follow-list-modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title id="follow-list-modal-title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {list.length ? (
          <div className="row gap-3 justify-content-between p-3">
            {list.map((person) => (
              <div className="col-md-4 border" key={person._id}>
                <h4 className="text-break fs-6 mb-0">{person.userName}</h4>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-0">{emptyText}</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FollowListModal;
