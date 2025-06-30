import { createTemplate } from '../../services/template.js';

export class About extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const templateContent = createTemplate(`
          <link rel="stylesheet" href="/styles.css">
          <div class="about-container">
            <img src="images/Realme.JPG" alt="Mi foto">
            <div class="about-details">
              <h2>Acerca de Mí</h2>
              <div>
                <h4>Perfil Profesional</h4>
                <p>Estudiante de Ingeniería de Software (5to semestre).</p>
              </div>
              <div>
                <h4>Educación</h4>
                <ul>
                  <li>Universidad Católica Boliviana.</li>
                  <li>Escuela Complutense Latinoamericana: <br>“Bioinformática e ingeniería de datos aplicados a ciencias biomédicas”.</li>
                </ul>
              </div>
              <div>
                <h4>Experiencia</h4>
                <ul>
                  <li>Sistema Solar en TreeGS.</li>
                  <li>Gestor de Eventos.</li>
                  <li>Participante en desarrollo de OrderNow.</li>
                </ul>
              </div>
              <div>
                <h4>Habilidades</h4>
                <ul>
                  <li>Comprensión básica de inglés.</li>
                  <li>HTML / CSS.</li>
                  <li>C++, C#, Python, JS.</li>
                </ul>
              </div>
              <div>
                <h4>Hobbies</h4>
                <ul>
                  <li>Videojuegos.</li>
                  <li>Dibujo.</li>
                  <li>Escritura.</li>
                  <li>Inteligencia Artificial.</li>
                </ul>
              </div>
            </div>
          </div>
      `);
      shadow.appendChild(templateContent.cloneNode(true));
    }
  }
  customElements.define('about-section', About);
  