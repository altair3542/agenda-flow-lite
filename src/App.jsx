import { useMemo, useState } from 'react';
import { Header } from './components/Header.jsx';
import { AppointmentForm } from './components/AppointmentForm.jsx';
import { AppointmentFilters } from './components/AppointmentFilters.jsx';
import { AppointmentList } from './components/AppointmentList.jsx';

const initialAppointments = [
  {
    id: 1,
    client: 'Laura Gómez',
    service: 'Corte y barba',
    date: '2026-05-17',
    time: '08:00',
    notes: 'Cliente frecuente. Prefiere atención rápida.',
    status: 'confirmed',
  },
  {
    id: 2,
    client: 'Carlos Ruiz',
    service: 'Valoración inicial',
    date: '2026-05-17',
    time: '09:30',
    notes: 'Primera visita.',
    status: 'pending',
  },
  {
    id: 3,
    client: 'Diana Torres',
    service: 'Mantenimiento preventivo',
    date: '2026-05-17',
    time: '11:00',
    notes: 'Traer historial del servicio anterior.',
    status: 'completed',
  },
];

const statusLabels = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  completed: 'Atendida',
  cancelled: 'Cancelada',
};

function App() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredAppointments = useMemo(() => {
    if (activeFilter === 'all') {
      return appointments;
    }

    return appointments.filter((appointment) => appointment.status === activeFilter);
  }, [appointments, activeFilter]);

  function handleCreateAppointment(newAppointmentData) {
    const newAppointment = {
      id: crypto.randomUUID(),
      ...newAppointmentData,
      status: 'pending',
    };

    setAppointments([newAppointment, ...appointments]);
  }

  function handleDeleteAppointment(appointmentId) {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== appointmentId),
    );
  }

  function handleStatusChange(appointmentId, newStatus) {
    setAppointments(
      appointments.map((appointment) => {
        if (appointment.id !== appointmentId) {
          return appointment;
        }

        return {
          ...appointment,
          status: newStatus,
        };
      }),
    );
  }

  return (
    <main className="app-shell">
      <Header totalAppointments={appointments.length} />

      <section className="dashboard-grid">
        <AppointmentForm onCreateAppointment={handleCreateAppointment} />

        <div className="appointments-panel">
          <AppointmentFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <AppointmentList
            appointments={filteredAppointments}
            statusLabels={statusLabels}
            onDeleteAppointment={handleDeleteAppointment}
            onStatusChange={handleStatusChange}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
