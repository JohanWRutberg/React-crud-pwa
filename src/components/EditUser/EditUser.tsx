import React, { useState } from "react";
import styles from "./EditUser.module.css";
import { db } from "../../firebase-config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export const EditUser = ({ id, firstName, lastName, onUpdate, onDelete }) => {
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        firstName: editedFirstName,
        lastName: editedLastName
      });

      onUpdate(id, editedFirstName, editedLastName);
      setIsEditing(false);

      setSuccessMessage("Data saved successfully");
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating user:", error);
      setSuccessMessage("");
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const userRef = doc(db, "users", id);
      await deleteDoc(userRef);

      onDelete(id); // Notify the parent component to update the list
      setDeleteSuccessMessage("User deleted successfully");
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting user:", error);
      setDeleteSuccessMessage("");
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const isInputEmpty = (firstName, lastName) => {
    if (firstName.length === 0 || lastName.length === 0) {
      setErrorMessage("These fields are mandatory!");
      return true;
    } else {
      setErrorMessage("");
      return false;
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            style={{ fontSize: "12px", color: "gray", border: "solid 1px", borderRadius: "5px" }}
            type="text"
            value={editedFirstName}
            onChange={(e) => {
              setEditedFirstName(e.target.value);
              setIsSaveEnabled(!isInputEmpty(e.target.value, editedLastName));
            }}
            placeholder="New First Name"
            required
          />

          <input
            style={{ fontSize: "12px", color: "gray", border: "solid 1px", borderRadius: "5px" }}
            type="text"
            value={editedLastName}
            onChange={(e) => {
              setEditedLastName(e.target.value);
              setIsSaveEnabled(!isInputEmpty(editedFirstName, e.target.value));
            }}
            placeholder="New Last Name"
            required
          />
          <div className={styles.buttonContainer}>
            <button onClick={handleUpdate} className={styles.updateButton} disabled={!isSaveEnabled}>
              Update
            </button>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Delete
            </button>
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </>
      ) : (
        <button onClick={() => setIsEditing(true)} className={styles.editButton}>
          Edit
        </button>
      )}
    </div>
  );
};
