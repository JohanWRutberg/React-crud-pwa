import React, { useState } from "react";
import "./App.css";
import { CreateUser } from "./components/CreateUser";
import { UserList } from "./components/UserList";

function App() {
  const [showUserList, setShowUserList] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button
            style={{ backgroundColor: showUserList ? "#3c425c" : "lightgray" }}
            className="TabButton"
            onClick={() => setShowUserList(false)}
          >
            Create
          </button>
          <button
            style={{ backgroundColor: showUserList ? "lightgray" : "#3c425c" }}
            className="TabButton"
            onClick={() => setShowUserList(true)}
          >
            Read - Update - Delete
          </button>
          {showUserList ? <UserList /> : <CreateUser />}
        </div>
      </header>
    </div>
  );
}

export default App;
