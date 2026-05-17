const statusOptions = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'confirmed', label: 'Confirmada' },
  { value: 'completed', label: 'Atendida' },
  { value: 'cancelled', label: 'Cancelada' },
];

export function AppointmentCard({
  appointment,
  statusLabel,
  onDeleteAppointment,
  onStatusChange,
}) {
  return (
    <article className="appointment-card">
      <div className="appointment-main">
        <span className={`status-badge status-${appointment.status}`}>
          {statusLabel}
        </span>

        <h2>{appointment.client}</h2>
        <p>{appointment.service}</p>

        {appointment.notes && (
          <p className="appointment-notes">{appointment.notes}</p>
        )}
      </div>

      <div className="appointment-meta">
        <span>{appointment.date}</span>
        <strong>{appointment.time}</strong>
      </div>

      <div className="card-actions">
        <label>
          Estado
          <select
            value={appointment.status}
            onChange={(event) => onStatusChange(appointment.id, event.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="danger-button"
          onClick={() => onDeleteAppointment(appointment.id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
