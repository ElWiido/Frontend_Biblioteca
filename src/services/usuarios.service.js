const API_URL = import.meta.env.VITE_BACKEND_URL + '/usuarios';

// Obtener todos los usuarios
export async function getUsuarios() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Trear un usuario por ID
export async function getUsuarioById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el usuario');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Crear un nuevo usuario
export async function createUsuario(usuario) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });

    const data = await response.json(); // intento leer siempre el JSON

    if (!response.ok) {
      // Si el backend devuelve un array de errores
      if (data.errors && Array.isArray(data.errors)) {
        const mensajes = data.errors.map(err => err.msg); // extraigo solo los textos
        throw new Error(mensajes.join('\n')); // uno todo en un string
      }
      throw new Error(data.message || 'Error al crear usuario');
    }

    // Éxito
    return { success: true, data };

  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}


// Actualizar un usuario por ID
export async function updateUsuario(id, usuario) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el usuario');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Eliminar un autor por ID
export async function deleteUsuario(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Error al eliminar usuario');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
