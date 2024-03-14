import "./App.css";
import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Checkbox,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";

function App() {
  const [newTask, setNewTask] = useState({ title: "", status: false });
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

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
      .then(setNewTask({ title: "", status: false }))
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

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = sortBy
    ? [...filteredTasks].sort((a, b) =>
        a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
      )
    : filteredTasks;

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
              <div className="inline-container">
                <Input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  mb={4}
                  bg="white"
                />
                <Select
                  placeholder="Sort By"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  mb={4}
                  bg="white"
                >
                  <option value="title">Title</option>
                  <option value="status">Status</option>
                  {/* Add more options for other criteria */}
                </Select>
              </div>

              <table className="task-table">
                <tbody>
                  {sortedTasks.map((task) => (
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
