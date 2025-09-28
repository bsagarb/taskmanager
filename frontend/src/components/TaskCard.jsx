import React from 'react';

const TaskCard = ({ task, onEdit, onDelete}) => {
return (
<div className={`task-card status-${task.status.replace(/\s+/g, '-').toLowerCase()}`}>
<h3>{task.title}</h3>
<p className="desc">{task.description}</p>
<div className="meta">
<small>Owner: {task.owner?.name || '—'}</small>
<small>Status: {task.status}</small>
<small>Created: {new Date(task.createdAt).toISOString().split('T')[0]}</small>
</div>
<div className="actions">
<button onClick={() => onEdit(task)}>Edit</button>
<button className="danger" onClick={() => onDelete(task._id)}>Delete</button>
</div>
</div>
);
}

export default TaskCard;