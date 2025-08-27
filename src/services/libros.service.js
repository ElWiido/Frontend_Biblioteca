const API_URL = import.meta.env.VITE_BACKEND_URL + '/libros';

// Obtener todos los libros
export async function getLibros() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener libros');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

//Trear un libro por ID
export async function getLibroById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener libro');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

//Crear un nuevo libro
export async function createLibro(libro) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(libro)
    });
    if (!response.ok) {
      throw new Error('Error al crear libro');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Actualizar un libro por ID
export async function updateLibro(id, libro) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(libro)
    });
    if (!response.ok) {
      throw new Error('Error al actualizar libro');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Eliminar un libro por ID
export async function deleteLibro(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Error al eliminar libro');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
