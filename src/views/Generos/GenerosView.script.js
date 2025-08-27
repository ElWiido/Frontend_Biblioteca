import {
  getGeneros,
  createGenero,
  updateGenero,
  deleteGenero,
} from '../../services/generos.service.js';

export default {
  name: 'GenerosView',

  data() {
    return {
      generos: [],
      generoForm: { genero_id: null, nombre: '' },
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
    generosFiltrados() {
      if (!this.busqueda) return this.generos;

      // Función para quitar acentos y pasar a minúsculas
      const normalizar = texto =>
        texto
          ? texto.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          : "";

      const textoBusqueda = normalizar(this.busqueda);

      return this.generos.filter(genero =>
        normalizar(genero.nombre).includes(textoBusqueda)
      );
    }
  },

  created() {
    this.cargarGeneros();
  },

  methods: {
    // --- Cargar datos ---
    cargarGeneros: function() {
      this.loading = true;
      this.error = null;

      getGeneros()
        .then(generos => { this.generos = generos; })
        .catch(err => {
          console.error(err);
          this.error = 'No se pudieron cargar los géneros';
        })
        .finally(() => { this.loading = false; });
    },

    // --- Crear ---
    async crearGenero() {
      try {
        await createGenero(this.generoForm);
        this.mostrarModal = false;
        this.resetForm();
        await this.cargarGeneros();
        this.mensaje = 'Género creado correctamente';
        this.mensajeTipo = 'success';
        setTimeout(() => { this.mensaje = ''; }, 1500);
      } catch (err) {
        console.error(err);
        this.mensaje = 'Error al crear el género';
        this.mensajeTipo = 'error';
        setTimeout(() => { this.mensaje = ''; }, 1500);
      }
    },

    // --- Actualizar ---
    async actualizarGenero() {
      try {
        await updateGenero(this.generoForm.genero_id, this.generoForm);
        this.mostrarModal = false;
        this.resetForm();
        await this.cargarGeneros();
        this.mensaje = 'Género actualizado correctamente';
        this.mensajeTipo = 'success';
        setTimeout(() => { this.mensaje = ''; }, 2000);
      } catch (err) {
        console.error(err);
        this.mensaje = 'Error al actualizar el género';
        this.mensajeTipo = 'error';
        setTimeout(() => { this.mensaje = ''; }, 2000);
      }
    },

    // --- Guardar según modo ---
    guardarGenero() {
      if (this.editando) {
        this.actualizarGenero()
        this.mensaje = "Género actualizado con éxito";
        this.mensajeTipo = "success";

        setTimeout(() => {
          this.mensaje = null;
        }, 1500);
      } else {
        this.crearGenero()
        this.mensaje = "Género creado con éxito";
        this.mensajeTipo = "success";

        setTimeout(() => {
          this.mensaje = null;
        }, 1500);
      }
    },

    // --- Editar ---
    editarGenero: function(genero) {
      this.generoForm = { ...genero };
      this.editando = true;
    },

    // --- Eliminar ---
    eliminarGenero: function(id) {
      if (!confirm('¿Seguro que deseas eliminar este género?')) return;

      deleteGenero(id)
        .then(() => this.cargarGeneros())
        .catch(err => {
          console.error(err);
          alert('Error al eliminar el género');
        });
    },

    // --- Reset ---
    resetForm() {
      this.generoForm = { genero_id: null, nombre: '' };
      this.editando = false;
    },
  }
};
