// src/TodoList.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [filter, setFilter] = useState("all");
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    const API_URL = "https://pit4-todolist-fastapi.onrender.com";

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        document.body.style.backgroundColor = darkMode ? "#1a1a1a" : "#eae0c8";
    }, [darkMode]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axios.get(`${API_URL}/todos`);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    }, []);

    const removeTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/todos/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const addTask = async () => {
        if (task.trim() === "") return;
        try {
            const response = await axios.post(`${API_URL}/todos`, {
                text: task,
                completed: false,
            });
            setTasks([...tasks, response.data]);
            setTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const toggleComplete = async (id) => {
        const updatedTask = tasks.find((t) => t.id === id);
        const updatedCompleted = !updatedTask.completed;
        try {
            await axios.put(`${API_URL}/todos/${id}`, {
                ...updatedTask,
                completed: updatedCompleted,
            });
            setTasks(tasks.map((task) =>
                task.id === id ? { ...task, completed: updatedCompleted } : task
            ));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedTask(tasks[index].text);
    };

    const confirmEdit = async (index) => {
        const updatedTask = tasks[index];
        try {
            await axios.put(`${API_URL}/todos/${updatedTask.id}`, {
                ...updatedTask,
                text: editedTask,
            });
            setTasks(tasks.map((task) =>
                task.id === updatedTask.id ? { ...task, text: editedTask } : task
            ));
            setEditingIndex(null);
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    return (
        <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
            <h2>To-Do List</h2>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            <div className="filter-buttons">
                <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
                <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>
                <button onClick={() => setFilter("pending")} className={filter === "pending" ? "active" : ""}>Pending</button>
            </div>

            <ul>
                {filteredTasks.map((t, index) => (
                    <li key={t.id} className={t.completed ? "completed" : ""}>
                        <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => toggleComplete(t.id)}
                        />
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={editedTask}
                                onChange={(e) => setEditedTask(e.target.value)}
                            />
                        ) : (
                            <span onClick={() => toggleComplete(t.id)}>{t.text}</span>
                        )}
                        <div className="task-buttons">
                            <button onClick={() => removeTask(t.id)}>Delete</button>
                            {editingIndex === index ? (
                                <button onClick={() => confirmEdit(index)}>💾</button>
                            ) : (
                                <button onClick={() => startEditing(index)}>Edit</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
