const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      owner: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { owner: req.user.id };
    const tasks = await Task.find(filter).populate("owner", "name email role");
    let admtasks = [];
    if (req.user.role === "admin") {
      admtasks = tasks.filter(
        (task) => task.owner._id.toString() === req.user.id.toString()
      );
    }
    res.json({ tasks, admtasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "owner",
      "name email role"
    );
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && String(task.owner._id) !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && String(task.owner) !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) {
      const allowed = ["Pending", "In Progress", "Completed"];
      if (!allowed.includes(status))
        return res.status(400).json({ message: "Invalid status" });
      task.status = status;
    }

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && String(task.owner) !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    await task.deleteOne();
    res.json({ message: "Task removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
