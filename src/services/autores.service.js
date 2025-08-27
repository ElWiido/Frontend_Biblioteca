const API_URL = import.meta.env.VITE_BACKEND_URL + '/autores';

// Obtener todos los libros
export async function getAutores() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener autores');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Trear un autor por ID
export async function getAutorById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el autor');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Crear un nuevo autor
export async function createAutor(autor) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(autor)
    });
    if (!response.ok) {
      throw new Error('Error al crear autor');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Actualizar un autor por ID
export async function updateAutor(id, autor) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(autor)
    });
    if (!response.ok) {
      throw new Error('Error al actualizar autor');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Eliminar un autor por ID
export async function deleteAutor(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Error al eliminar autor');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
