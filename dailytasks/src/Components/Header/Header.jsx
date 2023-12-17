import React, { useState } from "react";
import Logout from "../Authentication/Logout";
import Avatar from "../../Assets/avatar.svg";
import Homepage from "../Homepage/Homepage";
import { addTask } from "../../Reducers/taskSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();

  const openLogoutPopup = () => {
    setLogoutPopupOpen(true);
  };

  const closeLogoutPopup = () => {
    setLogoutPopupOpen(false);
  };

  const handleAddTask = () => {
    dispatch(addTask(newTask));
    setNewTask("");
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
            <div className="user-container" onClick={openLogoutPopup}>
              <img className="avatar-container" src={Avatar} alt="Avatar" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                fill="#fff"
                className="logout-icon"
              >
                <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" />
              </svg>
            </div>
            {logoutPopupOpen && (
              <Logout isOpen={logoutPopupOpen} onClose={closeLogoutPopup} />
            )}
          </div>
        </nav>
      </div>
      <Homepage newTask={newTask} setNewTask={setNewTask} />
    </div>
  );
};

export default Header;
