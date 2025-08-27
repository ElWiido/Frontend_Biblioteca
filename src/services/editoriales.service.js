const API_URL = import.meta.env.VITE_BACKEND_URL + '/editoriales';

// Obtener todos los editoriales
export async function getEditoriales() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener editoriales');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Trear un editorial por ID
export async function getEditorialById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el editorial');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Crear un nuevo editorial
export async function createEditorial(editorial) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editorial)
    });
    if (!response.ok) {
      throw new Error('Error al crear editorial');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Actualizar un autor por ID
export async function updateEditorial(id, editorial) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editorial)
    });
    if (!response.ok) {
      throw new Error('Error al actualizar editorial');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Eliminar un editorial por ID
export async function deleteEditorial(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Error al eliminar editorial');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
