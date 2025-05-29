// Función para mostrar una sección específica
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(seccion => {
    seccion.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}

// Función para validar datos del formulario
function validarDatos() {
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !correo || !telefono || !mensaje) {
    alert('Por favor, completa todos los campos.');
    return false; // Indica que la validación falló
  }

  console.log('Formulario enviado:');
  console.log('Nombre:', nombre);
  console.log('Correo:', correo);
  console.log('Teléfono:', telefono);
  console.log('Mensaje:', mensaje);

  alert('¡Formulario enviado correctamente!');
  return true; // Indica que la validación fue exitosa
}

// Cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar la sección inicial (puedes cambiar 'galeria' por el id que necesites)
  mostrarSeccion('galeria');

  // Capturamos el formulario
  const formulario = document.getElementById('formulario-contacto');

  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita recargar la página

    if (validarDatos()) {
      // Si la validación es exitosa, puedes hacer más cosas aquí
      formulario.reset();
    }
  });
});
