import { createTemplate } from '../../services/template.js';

const likesBase = {
  'gestor-eventos': 25,
  'sistema-solar': 42,
  'ordernow': 31
};

const projects = [
  {
    id: 'gestor-eventos',
    image: 'images/gestor.jpg',
    alt: 'Gestor de Eventos',
    date: 'feb. 2024 - jun. 2024',
    title: 'Gestor de Eventos',
    description: `Durante mi educación en la Universidad Católica Boliviana,
                  se nos encargó hacer un gestor de eventos.
                  Mi papel fue el de hacer la interfaz de todas las paginas del proyecto.`,
    likes: 0,
    saved: false
  },
  {
    id: 'sistema-solar',
    image: 'images/miku.jpg',
    alt: 'Sistema Solar',
    date: 'feb. 2024 - jun. 2024',
    title: 'Sistema Solar',
    description: `Durante mi educación en la Universidad Católica Boliviana,
                  se nos dio la libertad de hacer un proyecto manejando graficos en 3d con TreeGL.
                  Nuestro equipo se decantó por hacer un sistema solar.`,
    likes: 0,
    saved: false
  },
  {
    id: 'ordernow',
    image: 'images/ordernow.png',
    alt: 'OrderNow',
    date: 'feb. 2025 - Actualidad',
    title: 'OrderNow',
    description: `Durante mi educación en la Universidad Católica Boliviana,
                  nos asignaron por primera vez un proyecto real,
                  que sea usable para nuestro curriculum.
                  Una pagina de pedidos de comida.`,
    likes: 0,
    saved: false
  }
];

class Command {
    execute() {
        throw new Error('Método execute() debe ser implementado.');
    }
}

export class SaveProjectCommand extends Command {
    constructor(projectId, getState, setState, button) {
        super();
        this.projectId = projectId;
        this.getState = getState;
        this.setState = setState;
        this.button = button;
    }
    execute() {
        const state = this.getState(this.projectId);
        state.saved = !state.saved;
        this.setState(this.projectId, state);
        if (this.button) {
            this.button.classList.toggle('saved', state.saved);
        }
    }
}

export function getProjectState(projectId) {
    const state = JSON.parse(localStorage.getItem(`projectState_${projectId}`)) || {};
    return {
        likes: state.likes || 0,
        saved: state.saved || false
    };
}

export function setProjectState(projectId, state) {
    localStorage.setItem(`projectState_${projectId}`, JSON.stringify(state));
}

export class Gallery extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const projectListHtml = projects.map(project => {
      const state = getProjectState(project.id);
      const totalLikes = (likesBase[project.id] || 0) + (state.likes || 0);
      const liked = state.likes && state.likes > 0;
      return `
        <li class="projcard" data-project-id="${project.id}">
          <img src="${project.image}" alt="${project.alt}">
          <p>${project.date}</p>
          <h3>${project.title}</h3>
          <p class="projcard__text">${project.description}</p>
          <div class="projcard__actions">
            <button class="save-button ${state.saved ? 'saved' : ''}" title="Guardar proyecto">
              <span class="flag-icon">&#x1F6A9;</span> 
            </button>
            <button class="like-button${liked ? ' liked' : ''}" title="Me gusta">
              <span class="heart-icon" style="color:${liked ? 'red' : 'gray'}">&#x2764;</span> 
              <span class="like-count">${totalLikes}</span>
            </button>
          </div>
        </li>
      `;
    }).join('');

    const templateContent = createTemplate(`
      <link rel="stylesheet" href="/styles.css">
      <style>
        /* Basic styling for the buttons and icons */
        .projcard__actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          justify-content: center;
        }
        .projcard__actions button {
          background: none;
          border: 1px solid #ccc;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 16px;
        }
        .projcard__actions button:hover {
          background-color: #f0f0f0;
        }
        .flag-icon {
          color: gray;
        }
        .save-button.saved .flag-icon {
          color: gold;
        }
        .heart-icon {
          color: gray;
        }
        .like-button:focus .heart-icon,
        .like-button:active .heart-icon {
          color: red;
        }
        .like-count {
          font-size: 0.9em;
        }
      </style>
      <div class="seccion">
        <h1>Galería de Proyectos</h1>
        <ul class="project-list">
          ${projectListHtml}
        </ul>
        <button class="submitb">Ver Más</button>
      </div>
    `);

    shadow.appendChild(templateContent.cloneNode(true));

    this.addEventListeners(shadow);
  }

  addEventListeners(shadow) {
    shadow.querySelectorAll('.like-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const projCard = event.target.closest('.projcard');
        const projectId = projCard.dataset.projectId;
        let state = getProjectState(projectId);
        state.likes = (state.likes && state.likes > 0) ? 0 : 1;
        setProjectState(projectId, state);
        const totalLikes = (likesBase[projectId] || 0) + (state.likes || 0);
        const likeCountSpan = button.querySelector('.like-count');
        if (likeCountSpan) {
          likeCountSpan.textContent = totalLikes;
        }
        const heartIcon = button.querySelector('.heart-icon');
        if (heartIcon) {
          heartIcon.style.color = state.likes ? 'red' : 'gray';
        }
      });
    });

    shadow.querySelectorAll('.save-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const projCard = event.target.closest('.projcard');
        const projectId = projCard.dataset.projectId;
        const saveCommand = new SaveProjectCommand(
          projectId,
          getProjectState,
          setProjectState,
          button
        );
        saveCommand.execute();
      });
    });
  }
}

customElements.define('gallery-section', Gallery);