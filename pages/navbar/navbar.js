import { createTemplate } from '../../services/template.js';

export class Navbar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const templateContent = createTemplate(`
        <link rel="stylesheet" href="/styles.css">
        <nav class="nav">
          <a class="nav__link" href="/" id="main-link">
            <img src="images/logo.png" alt="logo">
          </a>
          <div class="nav-links-container">
            <a class="nav__link" href="/acerca" id="acerca-link">Acerca de mí</a>
            <a class="nav__link" href="/blog" id="blog-link">Blog</a>
            <a class="nav__link" href="/galeria" id="galeria-link">Galería de Proyectos</a>
            <a class="nav__link" href="/guardados" id="guardados-link">Proyectos Guardados</a>
            <a class="nav__link" href="/contacto" id="contacto-link">Información de Contacto</a>
          </div>
        </nav>
      `);
      shadow.appendChild(templateContent.cloneNode(true));
    }
  }
  customElements.define('navbar-component', Navbar);
  