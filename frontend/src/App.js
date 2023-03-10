import Header from "./components/Header";
import Search from "./features/tasks/Search";
import AddTask from "./features/tasks/AddTask";
import Content from "./features/tasks/Content";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import "./index.css";
import apiRequest from "./apiRequest";

const App = () => {
  const API_URL = "http://localhost:3500/tasks";

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listTasks = await response.json();
        setTasks(listTasks);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchTasks();
    }, 2000);
  }, []);

  const addTask = async (task) => {
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const myNewTask = { id, completed: false, task: task };
    console.log(myNewTask);
    const listTasks = [...tasks, myNewTask];
    setTasks(listTasks);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewTask),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    const listTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } :task 
    );
    setTasks(listTasks);

    const myTask = listTasks.filter((task) => task.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: myTask[0].id, completed: myTask[0].completed }),
    };
    //const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(`${API_URL}`, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const myTask = tasks.filter((task) => task.id === id);
    const listTasks = tasks.filter((task) => task.id !== id);
    setTasks(listTasks);

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: myTask[0].id }),
    };
    // const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(API_URL, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask) return;
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="App">
      <Header title="Todo List" />
      <AddTask
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
      />
      <Search setSearch={setSearch} search={search} />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            tasks={tasks.filter((task) =>
              task.task.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={tasks.length} />
    </div>
  );
};

export default App;
