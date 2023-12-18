// Homepage.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTasks, editTask, deleteTask } from "../../Reducers/taskSlice";
import "./homepage.css";

const Homepage = ({ newTask, setNewTask, error }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  console.log(error);

  const [editedTask, setEditedTask] = useState({ id: null, text: "" });

  const handleEditTask = () => {
    dispatch(editTask({ id: editedTask.id, text: editedTask.text }));
    setEditedTask({ id: null, text: "" });
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditInputChange = (e) => {
    setEditedTask({ ...editedTask, text: e.target.value });
  };

  return (
    <div className="homepage-container">
      <div>
        <input
          className="task-input-box"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Type your task here"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <h2 className="list-of-tasks">Lists of Tasks</h2>
      <div className="task-list-container">
        <ol>
          {tasks.map((task) => (
            <li className="task-data" key={task.id}>
              {task.id === editedTask.id ? (
                <>
                  <input
                    type="text"
                    value={editedTask.text}
                    onChange={handleEditInputChange}
                    className="edit-input-box"
                  />
                  <button
                    className="save-btn btn btn-success"
                    onClick={handleEditTask}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {task.text}
                  <div className="button-container">
                    <button
                      className="edit-btn btn btn-dark"
                      onClick={() =>
                        setEditedTask({ id: task.id, text: task.text })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn btn btn-danger"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Homepage;
