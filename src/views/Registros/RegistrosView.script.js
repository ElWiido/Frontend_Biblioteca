import { createUsuario } from '../../services/usuarios.service.js';

export default {
  name: 'RegistroView',

  data() {
    return {
      usuarioForm: { id: null, nombre: '', apellido: '', correo: '', telefono: '', direccion: '' },
      loading: false,
      error: null,
      mostrarModal: false,
      modalMensaje: '',
      modalTipo: 'success',
    };
  },

  methods: {
    // --- Guardar (crear) ---
    async crearUsuario() {
      try {
        this.loading = true;
        const result = await createUsuario(this.usuarioForm);

        if (result.success) {
          this.modalMensaje = "Usuario creado con éxito";
          this.modalTipo = "success";
          this.mostrarModal = true;
          setTimeout(() => {
            this.resetForm();
            this.$router.push('/libros');
          }, 10000);

        } else {
          this.modalMensaje = "Error: " + result.message;
          this.modalTipo = "error";
          this.mostrarModal = true;
        }
      } catch (err) {
        console.error(err);
        this.modalMensaje = "Error al crear el usuario";
        this.modalTipo = "error";
        this.mostrarModal = true;
      } finally {
        this.loading = false;
      }
    },

    cerrarModal() {
      this.mostrarModal = false;
    },

    // --- Utilidades ---
    resetForm() {
      this.usuarioForm = { id: null, nombre: '', apellido: '', correo: '', telefono: '', direccion: '' };
    },
  }
};
