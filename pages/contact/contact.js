import { createTemplate } from '../../services/template.js';

export class Contact extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const templateContent = createTemplate(`
        <link rel="stylesheet" href="/styles.css">
        <div id="contacto" class="seccion">
          <h1>Información de Contacto</h1>
          <p>¿Quieres contactarme?</p>
          <form id="formulario-contacto" class="formbody">
            <label for="nombre">Nombre:</label><br>
            <input type="text" id="nombre" name="nombre" required><br><br>
  
            <label for="correo">Correo:</label><br>
            <input type="email" id="correo" name="correo" required><br><br>
  
            <label for="telefono">Teléfono:</label><br>
            <input type="tel" id="telefono" name="telefono" required><br><br>
  
            <label for="mensaje">Mensaje:</label><br>
            <textarea id="mensaje" name="mensaje" rows="4" cols="50" required></textarea><br><br>
  
            <button type="submit">Enviar</button>
          </form>
        </div>
      `);
      shadow.appendChild(templateContent.cloneNode(true));
  
      const form = shadow.querySelector('#formulario-contacto');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Formulario enviado (simulado)!');
        form.reset();
      });
    }
  }
  customElements.define('contact-section', Contact);
  