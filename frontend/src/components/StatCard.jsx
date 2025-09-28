export default function StatCard({ label, count }) {
  return (
    <div className={`card stat-card count-${label.replace(/\s+/g, '-').toLowerCase()} `}>
      <h4>{label}</h4>
      <p style={{ fontSize: '24px', margin: 0 }}>{count}</p>
    </div>
  );
}
