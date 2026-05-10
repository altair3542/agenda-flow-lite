import { Header } from './components/Header.jsx';
import { AppointmentList } from './components/AppointmentList.jsx';

const appointments = [
  {
    id: 1,
    client: 'Laura Gómez',
    service: 'Corte y barba',
    date: 'Domingo, 10 de mayo',
    time: '08:00',
    status: 'confirmed',
    statusLabel: 'Confirmada',
  },
  {
    id: 2,
    client: 'Carlos Ruiz',
    service: 'Valoración inicial',
    date: 'Domingo, 10 de mayo',
    time: '09:30',
    status: 'pending',
    statusLabel: 'Pendiente',
  },
  {
    id: 3,
    client: 'Diana Torres',
    service: 'Mantenimiento preventivo',
    date: 'Domingo, 10 de mayo',
    time: '11:00',
    status: 'completed',
    statusLabel: 'Atendida',
  },
];

function App() {
  return (
    <main className="app-shell">
      <Header />
      <AppointmentList appointments={appointments} />
    </main>
  );
}

export default App;
