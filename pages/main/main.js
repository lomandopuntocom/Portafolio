import { createTemplate } from '../../services/template.js';

export class Main extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const templateContent = createTemplate(`
        <link rel="stylesheet" href="/styles.css">
        <div class="seccion">
          <div class="main-content">
            <img src="images/Realme.JPG" alt="Mi foto">
            <div class="main-text-container">
              <h1>Hola! Soy Jean Paul.</h1>
              <p>
                Soy estudiante de Ingeniería de Software en la Universidad Católica Boliviana, apasionado por el diseño de interfaces interactivas y el desarrollo eficiente de software.
              </p>
            </div>
          </div>
        </div>
      `);
      shadow.appendChild(templateContent.cloneNode(true));
    }
  }
  customElements.define('main-section', Main);