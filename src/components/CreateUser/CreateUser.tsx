import React, { useState } from "react";
import { TextInput } from "../TextInput";
import styles from "./CreateUser.module.css";
import { useCreateUserMutation } from "../../store/api/usersApi";

export const CreateUser = () => {
  const [createUser] = useCreateUserMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showUserPart, setShowUserPart] = useState(false); // State variable to control the visibility

  const submitHandler = () => {
    if (firstName !== "" && lastName !== "") {
      setFeedback(`User: ${firstName} ${lastName} added!`);
      setSubmitted(true);
      setFirstName("");
      setLastName("");
      setTimeout(() => {
        setFeedback("");
        setShowUserPart(true); // After a delay, show the user part
      }, 2500);

      createUser({
        user: {
          firstName: firstName,
          lastName: lastName
        }
      });
    } else {
      setSubmitted(false);
      setFeedback("All fields ar mandatory!");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.headline}>Register a User!</p>
      <TextInput
        value={firstName}
        placeholder="Firstname"
        onInput={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <TextInput
        value={lastName}
        placeholder="Lastname"
        onInput={(event) => {
          setLastName(event.target.value);
        }}
      />
      <button className={styles.submitButton} onClick={submitHandler}>
        Register
      </button>
      <p className={styles.feedbackText} style={{ color: submitted ? "#3c425c" : "#ed4e59" }}>
        {feedback}
      </p>
    </div>
  );
};
