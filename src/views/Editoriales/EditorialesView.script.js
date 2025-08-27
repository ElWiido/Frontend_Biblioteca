import {
  getEditoriales,
  createEditorial,
  updateEditorial,
  deleteEditorial,
} from '../../services/editoriales.service.js';

export default {
  name: 'EditorialesView',

  data() {
    return {
      editoriales: [],
      EditorialForm: { editorial_id: null, nombre: '', direccion: '' },
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
    editorialesFiltrados() {
      if (!this.busqueda) return this.editoriales;

      const normalizar = texto =>
        texto
          ? texto.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          : "";

      const textoBusqueda = normalizar(this.busqueda);

      return this.editoriales.filter(editorial =>
        normalizar(editorial.nombre).includes(textoBusqueda)
      );
    }
  },

  created() {
    this.cargarEditoriales();
  },

  methods: {
    // --- Cargar datos ---
    cargarEditoriales() {
      this.loading = true;
      this.error = null;

      getEditoriales()
        .then(editoriales => { this.editoriales = editoriales; })
        .catch(err => {
          console.error(err);
          this.error = 'No se pudieron cargar las editoriales';
        })
        .finally(() => { this.loading = false; });
    },

    // --- Crear ---
    async crearEditorial() {
      try {
        await createEditorial(this.editorialForm);
        this.mostrarModal = false;
        this.resetForm();
        await this.cargarEditoriales();
        this.mensaje = 'Editorial creado correctamente';
        this.mensajeTipo = 'success';
        setTimeout(() => { this.mensaje = ''; }, 1500);
      } catch (err) {
        console.error(err);
        this.mensaje = 'Error al crear el editorial';
        this.mensajeTipo = 'error';
        setTimeout(() => { this.mensaje = ''; }, 1500);
      }
    },

    // --- Actualizar ---
    async actualizarEditorial() {
      try {
        await updateEditorial(this.editorialForm.editorial_id, this.editorialForm);
        this.mostrarModal = false;
        this.resetForm();
        await this.cargarEditoriales();
        this.mensaje = 'Editorial actualizado correctamente';
        this.mensajeTipo = 'success';
        setTimeout(() => { this.mensaje = ''; }, 2000);
      } catch (err) {
        console.error(err);
        this.mensaje = 'Error al actualizar la editorial';
        this.mensajeTipo = 'error';
        setTimeout(() => { this.mensaje = ''; }, 2000);
      }
    },

    // --- Guardar segun modo ---
    guardarEditorial() {
      if (this.editando) {
        this.actualizarEditorial()
        this.mensaje = "Editorial actualizada con éxito";
        this.mensajeTipo = "success";

        setTimeout(() => {
          this.mensaje = null;
        }, 1500); // 2 segundos;
      } else {
        this.crearEditorial()
        this.mensaje = "Editorial creada con éxito";
        this.mensajeTipo = "success";

        setTimeout(() => {
          this.mensaje = null;
        }, 1500);
      }
    },

    // --- Editar ---
    editarEditorial(editorial) {
      this.editorialForm = { ...editorial };
      this.editando = true;
    },

    // --- Eliminar ---
    eliminarEditorial: function(id) {
      if (!confirm('¿Seguro que deseas eliminar esta editorial?')) return;

      deleteEditorial(id)
        .then(() => this.cargarEditoriales())
        .catch(err => {
          console.error(err);
          alert('Error al eliminar el editorial');
        });
    },

    // --- Reset ---
    resetForm() {
      this.editorialForm = { editorial_id: null, nombre: '', direccion: '' };
      this.editando = false;
    },
  }
};
