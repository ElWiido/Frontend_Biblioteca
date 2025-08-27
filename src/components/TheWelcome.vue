<script setup>
</script>

<template>
  <div class="container">
    <div class="bg-light border rounded-4 shadow-sm py-3 px-4 mb-4">
      <h2 class="text-center mb-0 fw-bold mt-5">
        <i class="me-2 text-primary"></i> Biblioteca Virtual
        <i class="ms-2 text-primary"></i>
      </h2>
    </div>
    <div>
      <div class="row justify-content-center g-4 mt-4">
        <div class="col-12 col-md-6 col-lg-5">
          <router-link to="/libros" class="text-decoration-none">
            <div class="card h-100 shadow-lg rounded-4 bg-light border-0 card-hover text-center p-4" style="cursor:pointer;">
              <i class="bi bi-book-half display-3 text-primary mb-3"></i>
              <h4 class="card-title fw-bold mb-2">Libros</h4>
              <hr class="w-50 mx-auto my-2">
              <span class="text-secondary">Explora y gestiona los libros</span>
            </div>
          </router-link>
        </div>
        <div class="col-12 col-md-6 col-lg-5">
          <router-link to="/registro" class="text-decoration-none">
            <div class="card h-100 shadow-lg rounded-4 bg-light border-0 card-hover text-center p-4" style="cursor:pointer;">
              <i class="bi bi-person-add display-3 text-primary mb-3"></i>
              <h4 class="card-title fw-bold mb-2">Usuarios</h4>
              <hr class="w-50 mx-auto my-2">
              <span class="text-secondary">Registrate para solicitar algun libro</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
