import { getLibros } from '../../services/libros.service.js';
import { getPrestamos } from '@/services/prestamos_libros.service.js';
import { getUsuarios } from '@/services/usuarios.service.js';



export default {
  name: 'HistorialView',
  data() {
    return {
      prestamos: [],
      libros: [],
      usuarios: [],
      PrestamoForm: {
        prestamo_id: null,
        usuario: '',
        libro: '',
        fecha_entrega: '',
        fecha_devolucion: ''
      },
      busqueda: '',
      mensaje: '',
      mensajeTipo: '',
      editando: false,
      loading: false,
      error: null,
    };
  },

  computed: {
    prestamosFiltrados() {
      return this.prestamos
        .filter(prestamo => {
          const texto = this.busqueda.toLowerCase();
          return (
            this.nombreUsuario(prestamo.usuario_id || '').toLowerCase().includes(texto) ||
            this.nombreLibro(prestamo.libro_id || '').toLowerCase().includes(texto) ||
            (prestamo.fecha_devolucion ? "finalizado" : "prestado").includes(texto)
          );
        })
        .sort((a, b) => {
          // Primero: los prestados (sin fecha_devolucion)
          if (!a.fecha_devolucion && b.fecha_devolucion) return -1;
          if (a.fecha_devolucion && !b.fecha_devolucion) return 1;

          // Si ambos son finalizados, ordenar por fecha_devolucion DESC
          if (a.fecha_devolucion && b.fecha_devolucion) {
                const diff = new Date(b.fecha_devolucion) - new Date(a.fecha_devolucion);
                if (diff !== 0) return diff;
              }

              // Si empatan o no tienen fecha_devolucion → ordenar por id DESC
              return b.prestamo_id - a.prestamo_id;
        });
    }
  },

  created() {
    this.cargarPrestamos();
    this.cargarLibros();
    this.cargarUsuarios();
  },

  methods: {
    // --- Cargar datos ---
    async cargarPrestamos() {
      this.loading = true;
      try {
        this.prestamos = await getPrestamos();
      } catch (err) {
        console.error(err);
        this.error = 'No se pudieron cargar los prestamos';
      } finally {
        this.loading = false;
      }
    },

    async cargarUsuarios() {
      try { this.usuarios = await getUsuarios(); } catch (err) { console.error(err); }
    },
    async cargarLibros() {
      try { this.libros = await getLibros(); } catch (err) { console.error(err); }
    },

    // --- Obtener nombres por id ---
    nombreUsuario(id) {
      const usuario = this.usuarios.find(a => a.usuario_id === id);
      return usuario ? `${usuario.nombre} ${usuario.apellido}` : '';
    },
    nombreLibro(id) {
      const libro = this.libros.find(e => e.libro_id === id);
      return libro ? libro.titulo : '';
    },

    // --- Utilidades ---
    resetForm() {
      this.PrestamoForm = {
        prestamo_id: null,
        usuario: '',
        libro: '',
        fecha_entrega: '',
        fecha_devolucion: ''
      }
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
  }
}
