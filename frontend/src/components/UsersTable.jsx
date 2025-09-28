export default function UsersTable({ users, onUserClick }) {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Total</th>
          <th>Pending</th>
          <th>In Progress</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ user, stats }) => (
          <tr key={user.id} onClick={() => onUserClick(user.id)} style={{ cursor: 'pointer' }}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{stats.total}</td>
            <td>{stats.pending}</td>
            <td>{stats.inProgress}</td>
            <td>{stats.completed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
