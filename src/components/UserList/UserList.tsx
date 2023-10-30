import React, { useEffect, useState } from "react";
import styles from "./UserList.module.css";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { EditUser } from "../EditUser/EditUser";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const userCollection = collection(db, "users");
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  const fetchData = async () => {
    const querySnapshot = await getDocs(userCollection);
    const userList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUsers(userList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateUser = (id, updatedFirstName, updatedLastName) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, firstName: updatedFirstName, lastName: updatedLastName } : user
    );
    setUsers(updatedUsers);
    setSuccessMessage("User updated successfully");
    setDeleteSuccessMessage("");

    // Clear the success message after 2500 milliseconds (2.5 seconds)
    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setDeleteSuccessMessage("User deleted successfully");
    setSuccessMessage("");

    // Clear the success message after 2500 milliseconds (2.5 seconds)
    setTimeout(() => {
      setDeleteSuccessMessage("");
    }, 2500);
  };

  return (
    <div className={styles.container}>
      <p className={styles.headline}>Press Edit to Update or Delete!</p>
      <span className={styles.feedbackText}>
        {users.map((user) => (
          <div key={user.id} className={styles.list}>
            <h2 className={styles.name}>
              {user.firstName} {user.lastName}
            </h2>
            <div className={styles.delButton}>
              <EditUser
                id={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                onUpdate={handleUpdateUser}
                onDelete={handleDeleteUser}
              />
            </div>
          </div>
        ))}
      </span>
      {successMessage && <p style={{ color: "green", fontSize: "1rem" }}>{successMessage}</p>}
      {deleteSuccessMessage && <p style={{ color: "green", fontSize: "1rem" }}>{deleteSuccessMessage}</p>}
      {/* <button onClick={fetchData} className={styles.reloadButton}>
        Reload Data
      </button> */}
      <p style={{ fontSize: "12px", color: "black" }}>No Reload Button needed :-</p>
    </div>
  );
};
