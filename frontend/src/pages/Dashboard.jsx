import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../contexts/AuthContext";
import StatCard from "../components/StatCard";
import UsersTable from "../components/UsersTable";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState(null);
  const [globalStats, setGlobalStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await api.get("/dashboard");
      setDashboard(res.data);
    };
    fetchDashboard();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/dashboard/adminstats");
      setGlobalStats(res.data);
    };
    fetchStats();
  }, []);

  if (!dashboard) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>
        Welcome <strong>{user?.name}, Here is your tasks statastics</strong>
      </h2>

      {user.role === "user" && (
        <div className="dashboard-cards">
          <StatCard label="Total Tasks" count={dashboard.stats.total} />
          <StatCard label="Pending" count={dashboard.stats.pending} />
          <StatCard label="In Progress" count={dashboard.stats.inProgress} />
          <StatCard label="Completed" count={dashboard.stats.completed} />
        </div>
      )}

      {user.role === "admin" && (
        <>
          <h3>All users tasks statastics</h3>
          {/* <UsersTable users={dashboard.users} onUserClick={(userId) => navigate(`/users/${userId}`)} /> */}
          <div className="dashboard-cards">
            <StatCard label="Total Tasks" count={globalStats.total} />
            <StatCard label="Pending" count={globalStats.pending} />
            <StatCard label="In Progress" count={globalStats.inProgress} />
            <StatCard label="Completed" count={globalStats.completed} />
          </div>
          <h3>Your Tasks</h3>
          <div className="dashboard-cards">
            <StatCard label="Total Tasks" count={dashboard.adminStats.total} />
            <StatCard label="Pending" count={dashboard.adminStats.pending} />
            <StatCard
              label="In Progress"
              count={dashboard.adminStats.inProgress}
            />
            <StatCard
              label="Completed"
              count={dashboard.adminStats.completed}
            />
          </div>
        </>
      )}
    </div>
  );
}
