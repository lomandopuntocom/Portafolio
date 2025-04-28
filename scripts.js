function mostrarSeccion(id) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
      seccion.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    mostrarSeccion('main');
  });
  