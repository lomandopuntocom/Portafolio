import { createTemplate } from '../../services/template.js';
import { SaveProjectCommand, getProjectState, setProjectState } from '../gallery/gallery.js';


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
  }
];


class Command {
    execute() {
        throw new Error('Método execute() debe ser implementado.');
    }
}

class SearchProjectsCommand extends Command {
    constructor(projects, searchTerm) {
        super();
        this.projects = projects;
        this.searchTerm = searchTerm.toLowerCase();
    }
    execute() {
        if (!this.searchTerm) return this.projects;
        return this.projects.filter(project =>
            project.title.toLowerCase().includes(this.searchTerm) ||
            project.description.toLowerCase().includes(this.searchTerm)
        );
    }
}

export class SavedProjects extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }

    render(searchTerm = '') {
        const shadow = this.shadow;

        shadow.innerHTML = '';


        let savedProjects = projects.filter(project => {
            const state = getProjectState(project.id);
            return state.saved;
        });

        if (searchTerm) {
            const searchCommand = new SearchProjectsCommand(savedProjects, searchTerm);
            savedProjects = searchCommand.execute();
        }
        const projectListHtml = savedProjects.length > 0 ? savedProjects.map(project => {
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
        }).join('') : '<p class="no-projects">No tienes proyectos guardados aún.</p>';

        const templateContent = createTemplate(`
            <link rel="stylesheet" href="/styles.css">
            <div class="seccion">
                <h1>Proyectos Guardados</h1>
                <div class="search-bar">
                    <input class="search-input" type="text" placeholder="Buscar proyecto...">
                    <button class="search-btn">Buscar</button>
                </div>
                <ul class="project-list">
                    ${projectListHtml}
                </ul>
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
                let currentState = getProjectState(projectId);

                currentState.likes = (currentState.likes && currentState.likes > 0) ? 0 : 1;
                setProjectState(projectId, currentState);
                const totalLikes = (likesBase[projectId] || 0) + (currentState.likes || 0);
                const likeCountSpan = button.querySelector('.like-count');
                if (likeCountSpan) {
                    likeCountSpan.textContent = totalLikes;
                }
                const heartIcon = button.querySelector('.heart-icon');
                if (heartIcon) {
                    heartIcon.style.color = currentState.likes ? 'red' : 'gray';
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

                let currentState = getProjectState(projectId);
                if (!currentState.saved) {
                    projCard.remove();

                    const projectList = shadow.querySelector('.project-list');
                    if (projectList && projectList.children.length === 0) {
                        const noProjectsMessage = document.createElement('p');
                        noProjectsMessage.classList.add('no-projects');
                        noProjectsMessage.textContent = 'No tienes proyectos guardados aún.';
                        projectList.appendChild(noProjectsMessage);
                    }
                }
            });
        });

        const searchInput = shadow.querySelector('.search-input');
        const searchBtn = shadow.querySelector('.search-btn');
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', () => {
                this.render(searchInput.value);
            });
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.render(searchInput.value);
                }
            });
        }
    }
}

customElements.define('saved-projects-section', SavedProjects);