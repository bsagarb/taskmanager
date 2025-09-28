import React, { useState } from "react";
import { toast } from "react-toastify";

const defaultState = { title: "", description: "", status: "Pending" };

export default function TaskForm({ onCreate, initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || defaultState);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Description is required.");
      return;
    }
    if (initial) {
      if (onSubmit) await onSubmit(form);
    } else {
      if (onCreate) await onCreate(form);
      setForm(defaultState);
    }
  };

  return (
    <form className="task-form card" onSubmit={submit}>
      <label>Title</label>
      <input name="title" value={form.title} onChange={handleChange} />
      <label>Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <label>Status</label>
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <div className="form-actions">
        <button className="btn">{initial ? "Save" : "Create"}</button>
        {onCancel && (
          <button type="button" className="btn-link" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
