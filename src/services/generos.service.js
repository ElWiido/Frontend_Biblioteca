const API_URL = import.meta.env.VITE_BACKEND_URL + '/generos';

// Obtener todos los generos
export async function getGeneros() {
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

// Trear un genero por ID
export async function getGeneroById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el genero');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Crear un nuevo genero
export async function createGenero(genero) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(genero)
    });
    if (!response.ok) {
      throw new Error('Error al crear genero');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Actualizar un genero por ID
export async function updateGenero(id, genero) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(genero)
    });
    if (!response.ok) {
      throw new Error('Error al actualizar genero');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Eliminar un autor por ID
export async function deleteGenero(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Error al eliminar genero');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
