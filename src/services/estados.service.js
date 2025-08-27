const API_URL = import.meta.env.VITE_BACKEND_URL + '/estados';

// Obtener todos los libros
export async function getEstados() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los estados');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
