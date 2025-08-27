import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LibrosView from '../views/Libros/LibrosView.vue'
import AutoresView from '@/views/Autores/AutoresView.vue'
import UsuariosView from '@/views/Usuarios/UsuariosView.vue'
import EditorialesView from '@/views/Editoriales/EditorialesView.vue'
import GenerosView from '@/views/Generos/GenerosView.vue'
import Prestamos_librosView from '@/views/Prestamos_Libros/Prestamos_librosView.vue'
import Confirmar_PrestamoView from '@/views/Confirmar_Prestamo/Confirmar_PrestamoView.vue'
import HistorialView from '@/views/Historial/HistorialView.vue'
import RegistrosView from '@/views/Registros/RegistrosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'), // Lazy load
    },
    {
      path: '/libros',
      name: 'libros',
      component: LibrosView, // Importación directa
    },
    {
      path: '/autores',
      name: 'autores',
      component: AutoresView, // Importación directa
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosView, // Importación directa
    },
    {
      path: '/editoriales',
      name: 'editoriales',
      component: EditorialesView, // Importación directa
    },
    {
      path: '/generos',
      name: 'generos',
      component: GenerosView, // Importación directa
    },
    {
      path: '/prestamos',
      name: 'PrestamosLibros',
      component: Prestamos_librosView,
    },
    {
      path: '/prestamos_libros/confirmar/:prestamo_id',
      name: 'ConfirmarPrestamo',
      component: Confirmar_PrestamoView
    },
    {
      path: '/prestamos/historial',
      name: 'Historial',
      component: HistorialView
    },
    {
      path: '/Registro',
      name: 'Registro',
      component: RegistrosView
    },
  ],
})

export default router
