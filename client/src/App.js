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

  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function createNewTask() {
    fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: `${newTask}`,
        status: false,
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
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
              value={newTask}
              onChange={(event) => {
                setNewTask(event.target.value);
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
                  <span>{task.title}</span>
                  <button>Edit task</button>
                  <button>Delete task</button>
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
