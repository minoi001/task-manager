import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <div className="inline">
          <div className="inline">
            <h3>Add new task</h3>
            <input type="text"></input>
            <button>Add task</button>
          </div>
          <div className="inline">
            <h3>Task List</h3>
            <span>Task</span>
            <button>Edit task</button>
            <button>Delete task</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
