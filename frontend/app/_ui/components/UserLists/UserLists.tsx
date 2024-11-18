import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { MovieLists } from "@/_api/mockdata"; // Import the mock data
import styles from "./userlists.module.css";

interface AddToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  movieId: string;
  movieTitle: string; // Added prop for confirmation message
}

const AddToListModal: React.FC<AddToListModalProps> = ({
  isOpen,
  onClose,
  userId,
  movieId,
  movieTitle,
}) => {
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLists([...selectedLists, e.target.value]);
    } else {
      setSelectedLists(selectedLists.filter((id) => id !== e.target.value));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedLists.length > 0) {
      const listNames = selectedLists
        .map(
          (listId) =>
            MovieLists.find((list) => list._id === listId)?.name || "Unknown"
        )
        .join(", ");
      setConfirmationMessage(
        `The movie "${movieTitle}" has been added to the following lists: ${listNames}.`
      );
      setTimeout(() => {
        setConfirmationMessage(null); // Clear confirmation message
        setSelectedLists([]); // Reset selection
        onClose(); // Close modal
      }, 3000); // Adjust delay as needed
    }
  };

  const handleClose = () => {
    setSelectedLists([]); // Uncheck all boxes
    setConfirmationMessage(null); // Clear confirmation message
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
      className={styles.modalOverlay}
    >
      <div className={styles.formContainer}>
        {confirmationMessage ? (
          <div className={styles.confirmationMessage}>{confirmationMessage}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Select lists:</label>
            {MovieLists.map((list) => (
              <div key={list._id} className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id={list._id}
                  value={list._id}
                  checked={selectedLists.includes(list._id)}
                  onChange={handleChange}
                />
                <label htmlFor={list._id}>{list.name}</label>
              </div>
            ))}
            <div className={styles.BottomButtons}>
              <button type="submit" className={styles.SaveButton}>
                Save
              </button>
              <button
                type="button"
                onClick={handleClose}
                className={styles.CancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </ReactModal>
  );
};

export default AddToListModal;
