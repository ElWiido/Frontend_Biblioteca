const API_URL = import.meta.env.VITE_BACKEND_URL + '/prestamos_libros';

// Obtener todos los préstamos
export async function getPrestamos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener préstamos');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Obtener un préstamo por ID
export async function getPrestamoById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Error al obtener el préstamo');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Crear un nuevo préstamo
export async function createPrestamo(prestamo) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prestamo)
    });
    if (!response.ok) throw new Error('Error al crear el préstamo');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Actualizar un préstamo por ID
export async function updatePrestamo(id, prestamo) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prestamo)
    });
    if (!response.ok) throw new Error('Error al actualizar el préstamo');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Eliminar un préstamo por ID
export async function deletePrestamo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar el préstamo');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function patchPrestamo(id) {
  try {
    const fechaHoy = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fecha_devolucion: fechaHoy })
    });
    if (!response.ok) throw new Error('Error al devolver el libro');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}


