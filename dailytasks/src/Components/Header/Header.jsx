import React, { useState } from "react";
import Logout from "../Authentication/Logout";
import Avatar from "../../Assets/avatar.svg";
import Homepage from "../Homepage/Homepage";
import { addTask } from "../../Reducers/taskSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const openLogoutPopup = () => {
    setLogoutPopupOpen(true);
  };

  const closeLogoutPopup = () => {
    setLogoutPopupOpen(false);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask(newTask));
      setNewTask("");
    } else {
      setError("Task cannot be empty!!!");
      return;
    }
    setError("");
  };

  return (
    <div className="header-container">
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/homepage">
            Task Manager
          </a>

          <div className="icon-task-btn">
            <button
              type="button"
              onClick={handleAddTask}
              className="btn btn-outline-warning"
            >
              Add Task
            </button>
            <div className="user-container">
              <img className="avatar-container" src={Avatar} alt="Avatar" />
              <button
                type="button"
                onClick={openLogoutPopup}
                className="ml-2 btn btn-outline-light"
              >
                Logout
              </button>
            </div>
            {logoutPopupOpen && (
              <Logout isOpen={logoutPopupOpen} onClose={closeLogoutPopup} />
            )}
          </div>
        </nav>
      </div>
      <Homepage newTask={newTask} setNewTask={setNewTask} error={error} />
    </div>
  );
};

export default Header;
