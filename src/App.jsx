import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header.jsx';
import { AppointmentForm } from './components/AppointmentForm.jsx';
import { AppointmentFilters } from './components/AppointmentFilters.jsx';
import { AppointmentList } from './components/AppointmentList.jsx';
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointmentStatus,
} from './services/appointments.service.js';

const statusLabels = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  completed: 'Atendida',
  cancelled: 'Cancelada',
};

function App() {
  const [appointments, setAppointments] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadAppointments() {
      try {
        setIsLoading(true);
        setError('');

        const data = await getAppointments();

        if (!ignore) {
          setAppointments(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            'No fue posible cargar las citas. Verifica que la API esté encendida.',
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadAppointments();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredAppointments = useMemo(() => {
    if (activeFilter === 'all') {
      return appointments;
    }

    return appointments.filter(
      (appointment) => appointment.status === activeFilter,
    );
  }, [appointments, activeFilter]);

  async function handleCreateAppointment(newAppointmentData) {
    try {
      setIsSaving(true);
      setError('');

      const createdAppointment = await createAppointment({
        ...newAppointmentData,
        status: 'pending',
      });

      setAppointments([createdAppointment, ...appointments]);
    } catch (err) {
      setError('No fue posible registrar la cita. Intenta nuevamente.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteAppointment(appointmentId) {
    const previousAppointments = appointments;

    try {
      setError('');

      setAppointments(
        appointments.filter((appointment) => appointment.id !== appointmentId),
      );

      await deleteAppointment(appointmentId);
    } catch (err) {
      setAppointments(previousAppointments);
      setError(
        'No fue posible eliminar la cita. Se restauró la lista anterior.',
      );
    }
  }

  async function handleStatusChange(appointmentId, newStatus) {
    const previousAppointments = appointments;

    try {
      setError('');

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

      await updateAppointmentStatus(appointmentId, newStatus);
    } catch (err) {
      setAppointments(previousAppointments);
      setError(
        'No fue posible actualizar el estado. Se restauró la información anterior.',
      );
    }
  }

  return (
    <main className="app-shell">
      <Header totalAppointments={appointments.length} />

      {error && <div className="alert-message">{error}</div>}

      <section className="dashboard-grid">
        <AppointmentForm
          isSaving={isSaving}
          onCreateAppointment={handleCreateAppointment}
        />

        <div className="appointments-panel">
          <AppointmentFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {isLoading ? (
            <section className="empty-state">
              <h2>Cargando citas...</h2>
              <p>Estamos consultando la información desde la API.</p>
            </section>
          ) : (
            <AppointmentList
              appointments={filteredAppointments}
              statusLabels={statusLabels}
              onDeleteAppointment={handleDeleteAppointment}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
