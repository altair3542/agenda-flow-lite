export function Header({ totalAppointments }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Agenda del día</p>
        <h1>AgendaFlow Lite</h1>
        <p className="header-description">
          Gestión local de citas con React: estado, eventos y formularios.
        </p>
      </div>

      <span className="header-badge">
        {totalAppointments === 1 ? '1 cita' : `${totalAppointments} citas`}
      </span>
    </header>
  );
}
