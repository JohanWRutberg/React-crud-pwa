import React from "react";
import styles from "./DeleteUser.module.css";
import { db } from "../../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";

export const DeleteUser = ({ id, setSuccessMessage }) => {
  const handleDelete = async (userId) => {
    try {
      const deleteVal = doc(db, "users", userId);
      await deleteDoc(deleteVal);
      setSuccessMessage("User deleted successfully");

      // Clear the success message after 2500 milliseconds (2.5 seconds)
      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch (error) {
      console.error("Error deleting user:", error);
      setSuccessMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={() => handleDelete(id)} className={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
};
