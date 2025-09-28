const Task = require("../models/Task");
const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";

    if (!isAdmin) {
      const stats = await getTaskStats(req.user.id);
      return res.json({
        role: "user",
        name: req.user.name,
        stats,
      });
    } else {
      const users = await User.find(
        { _id: { $ne: req.user.id } },
        "name email role"
      );
      const userStats = [];

      for (const user of users) {
        const stats = await getTaskStats(user._id);
        userStats.push({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          stats,
        });
      }

      const adminStats = await getTaskStats(req.user.id);

      return res.json({
        role: "admin",
        adminStats,
        users: userStats,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getTaskStats = async (userId) => {
  const tasks = await Task.find({ owner: userId });

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  return {
    total,
    pending,
    inProgress,
    completed,
  };
};

exports.adminStats = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const allTasks = await Task.find();

    const stats = {
      total: allTasks.length,
      pending: allTasks.filter((t) => t.status === "Pending").length,
      inProgress: allTasks.filter((t) => t.status === "In Progress").length,
      completed: allTasks.filter((t) => t.status === "Completed").length,
    };

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
