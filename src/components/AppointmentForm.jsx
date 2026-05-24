import { useState } from 'react';

const initialFormData = {
  client: '',
  service: '',
  date: '',
  time: '',
  notes: '',
};

export function AppointmentForm({ isSaving, onCreateAppointment }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.client.trim()) {
      nextErrors.client = 'El nombre del cliente es obligatorio.';
    }

    if (!formData.service.trim()) {
      nextErrors.service = 'El servicio es obligatorio.';
    }

    if (!formData.date) {
      nextErrors.date = 'La fecha es obligatoria.';
    }

    if (!formData.time) {
      nextErrors.time = 'La hora es obligatoria.';
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onCreateAppointment({
      client: formData.client.trim(),
      service: formData.service.trim(),
      date: formData.date,
      time: formData.time,
      notes: formData.notes.trim(),
    });

    setFormData(initialFormData);
    setErrors({});
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <p className="eyebrow">Nueva cita</p>
        <h2>Registrar atención</h2>
      </div>

      <label>
        Cliente
        <input
          name="client"
          value={formData.client}
          onChange={handleChange}
          placeholder="Ej: Mariana López"
        />
        {errors.client && <span className="error-message">{errors.client}</span>}
      </label>

      <label>
        Servicio
        <input
          name="service"
          value={formData.service}
          onChange={handleChange}
          placeholder="Ej: Consulta inicial"
        />
        {errors.service && <span className="error-message">{errors.service}</span>}
      </label>

      <div className="form-row">
        <label>
          Fecha
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </label>

        <label>
          Hora
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <span className="error-message">{errors.time}</span>}
        </label>
      </div>

      <label>
        Notas
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Observaciones relevantes para la atención"
          rows="4"
        />
      </label>

      <button type="submit" className="primary-button" disabled={isSaving}>
        {isSaving ? 'Guardando...' : 'Agregar cita'}
      </button>
    </form>
  );
}
