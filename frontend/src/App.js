import './App.css';
import { useState } from 'react';
import { Task } from './models/tasks.js';

const BASE_URL = "http://127.0.0.1:8000/"
const STATUS_DISPLAY_MAP = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

function App() {
  // Form input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");
  const [dueDatetime, setDueDatetime] = useState("");

  // Control states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [taskResponse, setTaskResponse] = useState(null);

  async function handleSubmit(event) { 
    event.preventDefault();

    setIsLoading(true);
    setTaskResponse(null);
    setError(null);
    try {
      // Create a task which includes validation
      const task = new Task(title, description, status, dueDatetime);

      // POST task to backend
      const response = await fetch(BASE_URL + "api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      //  Check for server error
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setTaskResponse(new Task(data.title, data.description, data.status, data.due_datetime));

      // Reset input states, as response was received
      setTitle("");
      setDescription("");
      setStatus("TODO"); 
      setDueDatetime("");
  
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>
          Create a Task:
      </h1>
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className='task-inputs'>

          <label>
            Title:
            <input 
              type='text'
              value={title}
              placeholder='Washing'
              onChange={(e) => {setTitle(e.target.value)}}
            />
          </label>

          <label>
            Description:
            <textarea 
              value={description}
              placeholder='Do the washing, remember, only whites!!!' 
              onChange={(e) => {setDescription(e.target.value)}}
            />
          </label>

          <label> 
            Status:
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {Object.keys(STATUS_DISPLAY_MAP).map((key) => {
                return <option key={key} value={key}> {STATUS_DISPLAY_MAP[key]} </option>
              })}
            </select>
          </label>

          <label>
            Due date + time: 
            <input 
              type='datetime-local'
              value={dueDatetime}
              placeholder='Date'
              onChange={(e) => setDueDatetime(e.target.value)}
            />
          </label>

        </div>
        <button type="submit" disabled={isLoading}>
          Create Task
        </button>
        {error ? (
          <div className="error-message">
            {error}
          </div>
        ) : taskResponse && (
          <div className="task-response">
            <h2>Response: </h2>
            <h3>Task Created!</h3>
            <label>Title:  <span>{taskResponse.title}</span> </label>
            <label> Description: <span>{taskResponse.description}</span> </label>
            <label> Status: <span>{STATUS_DISPLAY_MAP[taskResponse.status]}</span> </label>
            <label> Due Date/Time:  <span>{taskResponse.dueDatetime}</span> </label> {/* TODO do some formatting for Datetime */}
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
