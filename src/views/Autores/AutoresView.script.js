
import {
  getAutores,
  createAutor,
  updateAutor,
  deleteAutor,
} from '../../services/autores.service.js';

export default {
  name: 'AutoresView',

  data() {
    return {
      autores: [],
      autorForm: { autor_id: null, nombre: '', apellido: '', pais_origen: '' },
      loading: false,
      error: null,
      busqueda: '',
      editando: false,
      mostrarModal: false,
      mensaje: '',
      mensajeTipo: '',
    };
  },

  computed: {
    autoresFiltrados() {
      if (!this.busqueda) return this.autores;

      const normalizar = texto =>
        texto
          ? texto.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          : "";

      const textoBusqueda = normalizar(this.busqueda);

      return this.autores.filter(autor =>
        normalizar(autor.nombre).includes(textoBusqueda) ||
        normalizar(autor.apellido).includes(textoBusqueda)
      );
    }
  },

  created() {
    this.cargarAutores();
  },

  methods: {
    // --- Cargar datos ---
    cargarAutores() {
      this.loading = true;
      this.error = null;

      getAutores()
        .then(autores => { this.autores = autores; })
        .catch(err => {
          console.error(err);
          this.error = 'No se pudieron cargar los autores';
        })
        .finally(() => { this.loading = false; });
    },

    // --- Crear ---
    async crearAutor() {
      try {
        await createAutor(this.autorForm);
        this.mostrarModal = false;
        this.resetForm();
        await this.cargarAutores();
        this.mensaje = 'Autor creado correctamente';
        this.mensajeTipo = 'success';
        setTimeout(() => { this.mensaje = ''; }, 1500);
      } catch (err) {
        console.error(err);
        this.mensaje = 'Error al crear el autor';
        this.mensajeTipo = 'error';
        setTimeout(() => { this.mensaje = ''; }, 1500);
      }
    },

    // --- Actualizar ---
    async actualizarAutor() {
      try {
        await updateAutor(this.autorForm.autor_id, this.autorForm);
        this.mostrarModal = false;
        this.resetForm();
        await this.cargarAutores();
        this.mensaje = 'Autor actualizado correctamente';
        this.mensajeTipo = 'success';
        setTimeout(() => { this.mensaje = ''; }, 2000);
      } catch (err) {
        console.error(err);
        this.mensaje = 'Error al actualizar el autor';
        this.mensajeTipo = 'error';
        setTimeout(() => { this.mensaje = ''; }, 2000);
      }
    },

    // --- Guardar segun modo ---
    guardarAutor() {
      if (this.editando) {
        this.actualizarAutor()
        this.mensaje = "Autor actualizado con éxito";
        this.mensajeTipo = "success";

        setTimeout(() => {
          this.mensaje = null;
        }, 1500); // 2 segundos;
      } else {
        this.crearAutor()
        this.mensaje = "Autor creado con éxito";
        this.mensajeTipo = "success";

        setTimeout(() => {
          this.mensaje = null;
        }, 1500);
      }
    },

    // --- Editar ---
    editarAutor(autor) {
      this.autorForm = { ...autor };
      this.editando = true;
    },

    // --- Eliminar ---
    eliminarAutor(id) {
      if (!confirm('¿Seguro que deseas eliminar este autor?')) return;

      deleteAutor(id)
        .then(() => this.cargarAutores())
        .catch(err => {
          console.error(err);
          alert('Error al eliminar el autor');
        });
    },

    // --- Reset ---
    resetForm() {
      this.autorForm = { autor_id: null, nombre: '', apellido: '', pais_origen: '' };
      this.editando = false;
    },
  }
};
