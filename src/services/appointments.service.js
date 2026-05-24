const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
const APPOINTMENTS_ENDPOINT = `${API_URL}/appointments`;

async function parseResponse(response) {
  if (!response.ok) {
    throw new Error('La API no pudo completar la operación.');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getAppointments() {
  const response = await fetch(APPOINTMENTS_ENDPOINT);
  return parseResponse(response);
}

export async function createAppointment(appointmentData) {
  const response = await fetch(APPOINTMENTS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointmentData),
  });

  return parseResponse(response);
}

export async function updateAppointmentStatus(appointmentId, status) {
  const response = await fetch(`${APPOINTMENTS_ENDPOINT}/${appointmentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  return parseResponse(response);
}

export async function deleteAppointment(appointmentId) {
  const response = await fetch(`${APPOINTMENTS_ENDPOINT}/${appointmentId}`, {
    method: 'DELETE',
  });

  return parseResponse(response);
}
