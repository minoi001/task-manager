import "./App.css";
import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setTasks(response))
      .catch((err) => {
        console.log("Request Failed", err); // Catch errors
      });
  }, []);

  const [newTask, setNewTask] = useState({});
  const [tasks, setTasks] = useState([]);

  function createNewTask() {
    fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((response) => setTasks(response))
      .catch((err) => {
        console.log("Request Failed", err); // Catch errors
      });
  }

  function editTask(task) {
    fetch("/api/task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((response) => setTasks(response))
      .catch((err) => {
        console.log("Request Failed", err); // Catch errors
      });
  }

  function deleteTask(task) {
    fetch("/api/task", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((response) => setTasks(response))
      .catch((err) => {
        console.log("Request Failed", err); // Catch errors
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <div className="inline">
          <div className="inline">
            <h3>Add new task</h3>
            <input
              type="text"
              value={newTask.title}
              onChange={(event) => {
                setNewTask({ title: event.target.value, status: false });
              }}
            />
            <button
              onClick={() => {
                createNewTask();
              }}
            >
              Add task
            </button>
          </div>
          <div className="inline">
            <h3>Task List</h3>
            {tasks.map((task) => {
              // console.log(task);
              return (
                <div key={task._id}>
                  <span
                    style={{
                      textDecoration: task.status ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked={task.status}
                    onClick={() => {
                      editTask({
                        _id: task._id,
                        title: task.title,
                        status: !task.status,
                      });
                    }}
                  />

                  <button
                    onClick={() => {
                      deleteTask({
                        _id: task._id,
                      });
                    }}
                  >
                    Delete task
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
