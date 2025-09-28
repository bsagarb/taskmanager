import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import TaskCard from "../components/TaskCard";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [admtasks, setAdmtasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // 'all' or 'mine'
  const { user } = useContext(AuthContext);

  const fetchTasks = async () => {
    setLoading(true);
    const res = await api.get("/tasks");
    setTasks(res.data.tasks);
    setAdmtasks(res.data.admtasks || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (payload) => {
    await api.post("/tasks", payload);
    toast.success("Task Created");
    fetchTasks();
  };

  const handleUpdate = async (id, payload) => {
    await api.put(`/tasks/${id}`, payload);
    setEditing(null);
    toast.success("Task Updated");
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await api.delete(`/tasks/${id}`);
    toast.success("Task Deleted");
    fetchTasks();
  };

  const tasksToShow =
    user.role === "admin" ? (activeTab === "all" ? tasks : admtasks) : tasks;

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h2 className="team-or-me">
          {user.role === "admin" ? "Admin - Task Management" : "My Tasks"}
        </h2>

        <div className="create-task">
          <div className="btn btn-primary" onClick={() => setCreating(true)}>
            Create Task
          </div>
        </div>
      </div>

      {user.role === "admin" && (
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Tasks
          </button>
          <button
            className={`tab-btn ${activeTab === "mine" ? "active" : ""}`}
            onClick={() => setActiveTab("mine")}
          >
            My Tasks
          </button>
        </div>
      )}

      {creating && (
        <div className="modal">
          <div className="modal-card">
            <h3>Create Task</h3>
            <TaskForm
              onCreate={async (data) => {
                await handleCreate(data);
                setCreating(false);
              }}
              onCancel={() => setCreating(false)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className="tasks-content"
          style={{ marginTop: user.role === "admin" ? "180px" : "130px" }}
        >
          <div className="tasks-grid">
            {tasksToShow.length === 0 && (
              <div className="muted">No tasks yet</div>
            )}
            {tasksToShow.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(t) => setEditing(t)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {editing && (
        <div className="modal">
          <div className="modal-card">
            <h3>Edit Task</h3>
            <TaskForm
              initial={editing}
              onSubmit={(data) => handleUpdate(editing._id, data)}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
