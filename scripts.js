function mostrarSeccion(id) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
      seccion.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
  }
  
  // Mostrar "acerca" al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    mostrarSeccion('main');
  });
  