import { AppointmentCard } from './AppointmentCard.jsx';

export function AppointmentList({ appointments }) {
  return (
    <section className="appointment-section">
      <div className="section-heading">
        <h2>Citas programadas</h2>
        <span>{appointments.length} citas</span>
      </div>

      <div className="appointment-list">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
          />
        ))}
      </div>
    </section>
  );
}
