import { createTemplate } from '../../services/template.js';

export class Blog extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const templateContent = createTemplate(`
        <link rel="stylesheet" href="/styles.css">
        <div id="blog" class="seccion">
          <ul class="blog-list">
            <li class="blogcard">
              <img class="blogcard__image" src="images/1743370677261.jpeg" alt="AI and Creativity">
              <h3>"La IA no reemplaza la creatividad humana"</h3>
              <p class="blogcard__text">
                AI no puede reemplazar a los artistas. Aunque herramientas como Stable Diffusion o ChatGPT son útiles,
                el arte requiere emoción, visión personal y creatividad auténtica,
                cosas que la IA no posee. La imperfección humana es parte de lo que hace que el arte
                y la programación sean únicos. La IA es una herramienta poderosa, pero no sustituye
                la creatividad humana.
              </p>
            </li>
            <li class="blogcard">
              <img class="blogcard__image" src="images/1740346744537.jpeg" alt="AI in Game Dev">
              <h3>"Cómo la IA está transformando el desarrollo de videojuegos"</h3>
              <p class="blogcard__text">
                La IA está revolucionando el desarrollo de videojuegos,
                permitiendo NPCs más realistas, generación de contenido procedural
                y mundos dinámicos. Como estudiante de Ingeniería de Software en
                la Universidad Católica Boliviana, me interesa cómo estas tecnologías
                optimizan procesos, mejoran la inteligencia enemiga y enriquecen
                la experiencia del jugador.
              </p>
            </li>
            <li class="blogcard">
              <img class="blogcard__image" src="images/0892815a-861f-4817-98fc-400591330cc3.png" alt="UI Design">
              <h3>"La importancia del UI Design en la experiencia de juego"</h3>
              <p class="blogcard__text">
                El diseño de UI en videojuegos es clave para la inmersión y
                la experiencia del jugador. Como estudiante de Ingeniería de
                Software apasionado por los videojuegos y el arte,
                destaco cómo interfaces bien diseñadas, como en
                Hollow Knight o Persona 5, no solo son funcionales,
                sino que refuerzan la identidad visual del juego.
                Un buen equilibrio entre estética y usabilidad es esencial
                para lograr una experiencia memorable.
              </p>
            </li>
          </ul>
          <button class="submitb">Ver Más</button>
        </div>
      `);
      shadow.appendChild(templateContent.cloneNode(true));
    }
  }
  customElements.define('blog-section', Blog);