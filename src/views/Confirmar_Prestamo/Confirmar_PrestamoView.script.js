import axios from 'axios';
import { Modal } from 'bootstrap';

export default {
  name: 'ConfirmarPrestamoView',
  data() {
    return {
      prestamoId: null,
      codigo: '',
      loading: false,
      mensaje: '',
      mensajeTipo: '',
      estadoOverlay: null,
      errorModal: null
    };
  },
  created() {
    this.prestamoId = this.$route.params.prestamo_id;
  },
  methods: {
    async confirmarPrestamo() {
      if (this.codigo.length !== 6) {
        this.mensaje = 'El código debe tener 6 dígitos';
        this.mensajeTipo = 'error';
        this.estadoOverlay = 'error';
        this.showErrorModal();
        return;
      }

      this.estadoOverlay = 'loading';
      this.mensaje = '';

      try {
        const API_URL = import.meta.env.VITE_BACKEND_URL + `/prestamos_libros/confirmar/${this.prestamoId}`;
        await axios.post(API_URL, { codigo: this.codigo });

        // Confirmado
        this.estadoOverlay = 'success';
        this.mensaje = "Préstamo confirmado con éxito";
        this.mensajeTipo = 'success';
        this.codigo = '';

        setTimeout(() => {
          this.estadoOverlay = null;
          this.$router.push('/libros');
        }, 2000);

      } catch (err) {
        console.error(err);

        // Error del backend
        this.mensaje = err.response?.data?.message || 'Error al confirmar el préstamo';
        this.mensajeTipo = 'error';
        this.estadoOverlay = null;

        this.showErrorModal();

        // Redirigir después de mostrar error
        setTimeout(() => {
          this.estadoOverlay = null;
          this.errorModal.hide();
          this.$router.push('/libros');
        }, 3000);
      } finally {
        this.loading = false;
      }
    },
    showErrorModal() {
      if (!this.errorModal) {
        this.errorModal = new Modal(document.getElementById("errorModal"));
      }
      this.errorModal.show();
    }
  }
};

