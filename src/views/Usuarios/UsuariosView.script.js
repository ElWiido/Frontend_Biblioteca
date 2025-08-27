import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../../services/usuarios.service.js';

export default {
  name: 'UsuariosView',

  data() {
    return {
      usuarios: [],
      usuariosForm: { id: null, nombre: '', apellido: '', correo: '', telefono: '', direccion: '' },
      loading: false,
      error: null,
      usuarioSeleccionado: null,
      mostrarModal: false,
      busqueda: '',
    };
  },

  computed: {
    usuariosFiltrados() {
      if (!this.busqueda) return this.usuarios;

      // Función para quitar acentos y pasar a minúsculas
      const normalizar = texto =>
        texto
          ? texto.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          : "";

      const textoBusqueda = normalizar(this.busqueda);

      return this.usuarios.filter(usuarios =>
        normalizar(usuarios.nombre).includes(textoBusqueda) ||
        normalizar(usuarios.apellido).includes(textoBusqueda)
      );
    }
  },

  created() {
    this.cargarUsuarios();
  },

  methods: {
    // --- Cargar datos ---
    cargarUsuarios: function() {
      this.loading = true;
      this.error = null;

      getUsuarios()
        .then(usuarios => { this.usuarios = usuarios; })
        .catch(err => {
          console.error(err);
          this.error = 'No se pudieron cargar los usuarios';
        })
        .finally(() => { this.loading = false; });
    },

    // --- Guardar (crear o actualizar) ---
    guardarUsuario: function() {
      const guardar = this.usuarioForm.id
        ? updateUsuario(this.usuarioForm.id, this.usuarioForm)
        : createUsuario(this.usuarioForm);

      guardar
        .then(() => {
          this.resetForm();
          return this.cargarUsuarios();
        })
        .catch(err => {
          console.error(err);
          alert('Error al actualizar el usuario');
        });
    },

    // --- Editar ---
    editarUsuario: function(usuario) {
      this.usuarioForm = { ...usuario };
    },

    // --- Eliminar ---
    eliminarUsuario: function(id) {
      if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

      deleteUsuario(id)
        .then(() => this.cargarUsuarios())
        .catch(err => {
          console.error(err);
          alert('Error al eliminar el usuario');
        });
    },

    // --- Ver detalles ---
    verUsuario: function(id) {
      this.usuarioSeleccionado = null;
      this.mostrarModal = true;

      getUsuarioById(id)
        .then(usuario => { this.usuarioSeleccionado = usuario; })
        .catch(err => {
          console.error(err);
          this.error = 'No se pudo cargar la información del usuario';
        });
    },

    cerrarModal: function() {
      this.mostrarModal = false;
      this.usuarioSeleccionado = null;
    },

    // --- Utilidades ---
    resetForm: function() {
      this.usuarioForm = { id: null, nombre: '', apellido: '', correo: '', telefono: '', direccion: '' };
    },
  }
};
