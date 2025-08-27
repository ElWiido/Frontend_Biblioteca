import { getUsuarios } from '../../services/usuarios.service.js';
import { createPrestamo } from '../../services/prestamos_libros.service.js';

export default {
  name: 'PrestamosLibrosView',
  data() {
    return {
      usuarios: [],
      busquedaUsuario: '',
      mostrarLista: false,
      prestamoForm: {
        prestamo_id: null,
        usuario_id: '',
        libro_id: '',
        fecha_entrega: '',
        fecha_devolucion: '',
        codigo: ''
      },
      mostrarChulo: false,
      mensaje: '',
      mensajeTipo: '',
      loading: false,
      error: null,
    };
  },
  created() {
    this.cargarUsuarios();
    const libroId = this.$route.query.libro_id;
    if (libroId) this.prestamoForm.libro_id = libroId;
  },
  computed: {
    usuariosFiltrados() {
      if (!this.busquedaUsuario) return [];
      return this.usuarios.filter(u =>
        (u.nombre + ' ' + u.apellido).toLowerCase().includes(this.busquedaUsuario.toLowerCase())
      );
    }
  },
  methods: {
    async cargarUsuarios() {
      this.loading = true;
      try {
        this.usuarios = await getUsuarios();
      } catch (err) {
        console.error(err);
        this.error = 'No se pudieron cargar los usuarios';
      } finally {
        this.loading = false;
      }
    },
    seleccionarUsuario(usuario) {
      this.prestamoForm.usuario_id = usuario.usuario_id;
      this.busquedaUsuario = usuario.nombre + ' ' + usuario.apellido;
      this.mostrarLista = false;
    },
    cerrarLista() {
      // Espera un instante para que se ejecute el click antes de cerrar
      setTimeout(() => this.mostrarLista = false, 100);
    },

    async crearPrestamo() {
      if (!this.prestamoForm.usuario_id || !this.prestamoForm.libro_id) {
        this.showMensaje('Debe seleccionar un usuario y un libro', 'error');
        return;
      }

      const hoy = new Date();
      this.prestamoForm.fecha_entrega = hoy.toISOString().split('T')[0];
      this.prestamoForm.fecha_devolucion = '';
      this.prestamoForm.codigo = '';

      this.loading = true; // 🔹 activar spinner

      try {
        const prestamoCreado = await createPrestamo(this.prestamoForm);
        this.mostrarChulo = true;

        const prestamoId = prestamoCreado.prestamo_id;

        if (prestamoId) {
          // pequeño delay para que se note la animación
          setTimeout(() => {
            this.$router.push(`/prestamos_libros/confirmar/${prestamoId}`);
          }, 1500);
        }

        this.resetForm();
      } catch (err) {
        console.error(err);
        this.showMensaje('Error al crear el préstamo', 'error');
      } finally {
        this.loading = false;
        setTimeout(() => this.mostrarChulo = false, 1500);
      }
    },
    resetForm() {
      this.prestamoForm.usuario_id = '';
      this.busquedaUsuario = '';
    },

  }
};
