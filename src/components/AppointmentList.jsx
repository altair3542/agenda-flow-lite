import { AppointmentCard } from './AppointmentCard.jsx';

export function AppointmentList({
  appointments,
  statusLabels,
  onDeleteAppointment,
  onStatusChange,
}) {
  if (appointments.length === 0) {
    return (
      <section className="empty-state">
        <h2>No hay citas para mostrar</h2>
        <p>Cambia el filtro activo o registra una nueva cita.</p>
      </section>
    );
  }

  return (
    <section className="appointment-section">
      <div className="section-heading">
        <h2>Citas visibles</h2>
        <span>
          {appointments.length === 1 ? '1 resultado' : `${appointments.length} resultados`}
        </span>
      </div>

      <div className="appointment-list">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            statusLabel={statusLabels[appointment.status]}
            onDeleteAppointment={onDeleteAppointment}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </section>
  );
}
