import {
  getLibros,
  createLibro,
  updateLibro,
  deleteLibro,
  getLibroById
} from '../../services/libros.service.js';
import { getAutores } from '@/services/autores.service.js';
import { getEditoriales } from '@/services/editoriales.service.js';
import { getGeneros } from '@/services/generos.service.js';
import { getEstados } from '@/services/estados.service.js';
import { patchPrestamo, getPrestamos } from '@/services/prestamos_libros.service.js';



export default {
  name: 'LibrosView',
  data() {
    return {
      libros: [],
      autores: [],
      editoriales: [],
      generos: [],
      estados: [],
      libroForm: {
        libro_id: null,
        titulo: '',
        fecha_publicacion: '',
        autor_id: '',
        editorial_id: '',
        genero_id: ''
      },
      libroSeleccionado: null,
      mostrarModal: false,
      mostrarModalCrear: false,
      busqueda: '',
      mensaje: '',
      mensajeTipo: '',
      editando: false,
      loading: false,
      error: null,
    };
  },

  computed: {
    librosFiltrados() {
      if (!this.busqueda) return this.libros;

      const normalizar = texto =>
        texto
          ? texto.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          : "";

      const textoBusqueda = normalizar(this.busqueda);

      return this.libros.filter(libro =>
        normalizar(libro.titulo).includes(textoBusqueda) ||
        normalizar(this.nombreAutor(libro.autor_id)).includes(textoBusqueda)
      );
    }
  },

  created() {
    this.cargarLibros();
    this.cargarAutores();
    this.cargarEditoriales();
    this.cargarGeneros();
    this.cargarEstados();
  },

  methods: {
    // --- Cargar datos ---
    async cargarLibros() {
      this.loading = true;
      try {
        this.libros = await getLibros();
      } catch (err) {
        console.error(err);
        this.error = 'No se pudieron cargar los libros';
      } finally {
        this.loading = false;
      }
    },

    async cargarAutores() {
      try { this.autores = await getAutores(); } catch (err) { console.error(err); }
    },
    async cargarEditoriales() {
      try { this.editoriales = await getEditoriales(); } catch (err) { console.error(err); }
    },
    async cargarGeneros() {
      try { this.generos = await getGeneros(); } catch (err) { console.error(err); }
    },
    async cargarEstados() {
      try { this.estados = await getEstados(); } catch (err) { console.error(err); }
    },

    // --- Obtener nombres por id ---
    nombreAutor(id) {
      const autor = this.autores.find(a => a.autor_id === id);
      return autor ? `${autor.nombre} ${autor.apellido || ''}` : id;
    },
    nombreEditorial(id) {
      const editorial = this.editoriales.find(e => e.editorial_id === id);
      return editorial ? editorial.nombre : id;
    },
    nombreGenero(id) {
      const genero = this.generos.find(g => g.genero_id === id);
      return genero ? genero.nombre : id;
    },
    nombreEstado(id) {
      const estado = this.estados.find(e => e.estado_id === id);
      return estado ? estado.nombre_estado : id;
    },

    // --- Modales ---
    abrirCrearLibro() {
      this.resetForm();
      this.editando = false;
      this.mostrarModalCrear = true;
    },
    cerrarCrearLibro() {
      this.mostrarModalCrear = false;
      this.resetForm();
    },

    abrirEdicion(libro) {
      this.libroForm = { ...libro };
      this.editando = true;
      this.mostrarModalCrear = true;
      this.mostrarModal = false; // cerrar modal de detalle
    },

    cancelarEdicion() {
      this.resetForm();
      this.editando = false;
      this.mostrarModalCrear = false;
    },

    // --- CRUD Libros ---
    async crearLibro() {
      try {
        await createLibro(this.libroForm);
        console.log(this.libroForm);
        this.cerrarCrearLibro();
        await this.cargarLibros();
        this.showMensaje('Libro creado correctamente', 'success');
      } catch (err) {
        console.error(err);
        this.showMensaje('Error al crear el libro', 'error');
      }
    },

    async actualizarLibro() {
      try {
        await updateLibro(this.libroForm.libro_id, this.libroForm);
        this.cancelarEdicion();
        await this.cargarLibros();
        this.showMensaje('Libro actualizado correctamente', 'success');
      } catch (err) {
        console.error(err);
        this.showMensaje('Error al actualizar el libro', 'error');
      }
    },

    async guardarLibro() {
      if (this.editando) {
        await this.actualizarLibro();
      } else {
        await this.crearLibro();
      }
    },

    async eliminarLibro(id) {
      if (!confirm('¿Seguro que deseas eliminar este libro?')) return;
      try {
        await deleteLibro(id);
        console.log(this.id);
        await this.cargarLibros();
        this.showMensaje('Libro eliminado correctamente', 'success');
        this.mostrarModal = false;
      } catch (err) {
        console.error(err);
        this.showMensaje('Error al eliminar el libro', 'error');
        this.mostrarModal = false;
      }
    },

    // --- Ver detalle ---
    async verLibro(id) {
      this.libroSeleccionado = null;
      this.mostrarModal = true;
      try {
        this.libroSeleccionado = await getLibroById(id);
      } catch (err) {
        console.error(err);
        this.showMensaje('No se pudo cargar la información del libro', 'error');
      }
    },

    cerrarModal() {
      this.mostrarModal = false;
      this.libroSeleccionado = null;
    },

    // --- Utilidades ---
    resetForm() {
      this.libroForm = {
        libro_id: null,
        titulo: '',
        fecha_publicacion: '',
        autor_id: '',
        editorial_id: '',
        genero_id: ''
      };
    },

    formatearFecha(fecha) {
      if (!fecha) return '';

      const [year, month, day] = fecha.split('-').map(Number);

      // Crear la fecha y sumar 1 día (24 horas)
      const d = new Date(year, month - 1, day);
      d.setDate(d.getDate() + 1);

      return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    },

    showMensaje(texto, tipo) {
      this.mensaje = texto;
      this.mensajeTipo = tipo;
      setTimeout(() => { this.mensaje = ''; }, 2000);
    },


    prestarModal() {
      if (!this.libroSeleccionado) return;

      this.$router.push({
        name: 'PrestamosLibros',   // nombre de la ruta que definiste
        query: { libro_id: this.libroSeleccionado.libro_id }
      });
    },

    async devolverLibro(libro_id) {
      try {
        // Traemos todos los préstamos
        const prestamos = await getPrestamos();

        // Buscamos el préstamo activo de este libro
        const prestamoActivo = prestamos.find(
          p => p.libro_id === libro_id && !p.fecha_devolucion
        );

        if (!prestamoActivo) {
          alert('No se encontró un préstamo activo para este libro');
          return;
        }

        // Mandamos el id del préstamo (no el id del libro)
        const prestamo = await patchPrestamo(prestamoActivo.prestamo_id);

        if (prestamo) {
          this.showMensaje('Devuelto', 'success');
          this.cerrarModal();
          this.cargarLibros();
        }
      } catch (error) {
        console.error('Error al devolver libro:', error);
      }
    }
  },
};
