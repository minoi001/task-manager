import "./App.css";
import { useState, useEffect } from "react";
import { ChakraProvider, Checkbox, Button } from "@chakra-ui/react";

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

  const [newTask, setNewTask] = useState({ title: "", status: false });
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
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <h1>Task Manager</h1>
          <div className="inline-block">
            <div className="inline">
              <h3>Add new task</h3>
              <input
                type="text"
                value={newTask.title}
                onChange={(event) => {
                  setNewTask({ title: event.target.value, status: false });
                }}
              />
              <Button
                colorScheme="orange"
                onClick={() => {
                  createNewTask();
                }}
              >
                Add task
              </Button>
            </div>
            <div className="inline">
              <h3>Task List</h3>
              <table className="task-table">
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id}>
                      <td>
                        <Checkbox
                          colorScheme="orange"
                          size="lg"
                          bg="white"
                          border="orange"
                          isChecked={task.status}
                          onChange={() => {
                            editTask({
                              _id: task._id,
                              title: task.title,
                              status: !task.status,
                            });
                          }}
                        />
                      </td>
                      <td
                        className={`task-title ${
                          task.status ? "completed" : ""
                        }`}
                      >
                        <span>{task.title}</span>
                      </td>
                      <td>
                        <Button
                          size="xs"
                          colorScheme="orange"
                          onClick={() => {
                            deleteTask({
                              _id: task._id,
                            });
                          }}
                        >
                          Delete task
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
