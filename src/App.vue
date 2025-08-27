<template>
  <div>
    <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow rounded-bottom-4 fixed-top w-100">
      <div class="container-fluid">
        <!-- Logo -->
        <RouterLink class="navbar-brand d-flex align-items-center" to="/">
          <i class="bi bi-book-half me-2"></i> <!-- Icono de libro -->
          Biblioteca
        </RouterLink>


        <!-- Botón para colapsar en móvil -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink class="nav-link text-white fw-semibold" to="/libros">Libros</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white fw-semibold" to="/prestamos/historial">Historial</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white fw-semibold" to="/usuarios">Usuarios</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
  <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


