export function AppointmentCard({ appointment }) {
  return (
    <article className="appointment-card">
      <div className="appointment-main">
        <h2>{appointment.client}</h2>
        <p>{appointment.service}</p>
      </div>

      <div className="appointment-meta">
        <span>{appointment.date}</span>
        <strong>{appointment.time}</strong>
      </div>

      <span className={`status-badge status-${appointment.status}`}>
        {appointment.statusLabel}
      </span>
    </article>
  );
}
