const filters = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'confirmed', label: 'Confirmadas' },
  { value: 'completed', label: 'Atendidas' },
  { value: 'cancelled', label: 'Canceladas' },
];

export function AppointmentFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="filters-card">
      <p className="eyebrow">Filtro</p>

      <div className="filter-actions">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={activeFilter === filter.value ? 'filter-button active' : 'filter-button'}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
