function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(seccion => {
    seccion.style.display = 'none';
  });

  const seccionMostrar = document.getElementById(id);
  if (seccionMostrar) {
    seccionMostrar.style.display = 'block';
  }

<<<<<<< HEAD
  if (window.location.hash.substring(1) !== id) {
    history.pushState({seccion: id}, null, '#' + id);
  }
=======
  history.replaceState(null, null, '#' + id);
>>>>>>> parent of 2b72197 (Implementacion Router)
}

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    mostrarSeccion(hash);
  } else {
    mostrarSeccion('main');
  }
});

<<<<<<< HEAD

let savedItemsInstance = null;

class SavedItemsManager {
  constructor() {
    if (savedItemsInstance) {
      return savedItemsInstance;
    }
    this._savedItems = [];
    this._subscribers = [];
    savedItemsInstance = this;
  }

  add(proyecto) {
    if (!this.isSaved(proyecto.titulo)) {
      this._savedItems.push(proyecto);
      this.notify();
    }
  }

  remove(proyectoTitulo) {
    this._savedItems = this._savedItems.filter(p => p.titulo !== proyectoTitulo);
    this.notify();
  }

  isSaved(proyectoTitulo) {
    return this._savedItems.some(p => p.titulo === proyectoTitulo);
  }

  getItems() {
    return this._savedItems;
  }

  subscribe(observerFn) {
    this._subscribers.push(observerFn);
  }

  notify() {
    this._subscribers.forEach(observerFn => observerFn());
  }
}

const savedItemsManager = new SavedItemsManager();

function renderSavedItems() {
  const listaGuardados = document.getElementById('guardados-lista');
  if (!listaGuardados) return;

  listaGuardados.innerHTML = '';
  const items = savedItemsManager.getItems();

  if (items.length === 0) {
    listaGuardados.innerHTML = '<p>Aún no has guardado ningún proyecto.</p>';
    return;
  }

  items.forEach(proyecto => {
    const li = document.createElement('li');
    li.className = 'projcard';
    li.innerHTML = `
      <img class="blogcard__image" src="${proyecto.imagen}" alt="${proyecto.titulo}">
      <h3>${proyecto.titulo}</h3>
      <p class="blogcard__text">${proyecto.descripcion}</p>
    `;
    listaGuardados.appendChild(li);
  });
}

savedItemsManager.subscribe(renderSavedItems);


=======
// --- INYECCIÓN DE TARJETAS DE PROYECTO ---
>>>>>>> parent of 2b72197 (Implementacion Router)
window.addEventListener('DOMContentLoaded', () => {
  const proyectos = [
    {
      imagen: 'images/gestor.jpg',
      fecha: 'feb. 2024 - jun. 2024',
      titulo: 'Gestor de Eventos',
      descripcion: 'Durante mi educación en la Universidad Católica Boliviana, se nos encargó hacer un gestor de eventos. Mi papel fue el de hacer la interfaz de todas las paginas del proyecto.'
    },
    {
      imagen: 'images/miku.jpg',
      fecha: 'feb. 2024 - jun. 2024',
      titulo: 'Sistema Solar',
      descripcion: 'Durante mi educación en la Universidad Católica Boliviana, se nos dio la libertad de hacer un proyecto manejando graficos en 3d con TreeGL. nuestro equipo se decantó por hacer un sistema solar'
    },
    {
      imagen: 'images/ordernow.png',
      fecha: 'feb. 2025 - Actualidad',
      titulo: 'OrderNow',
      descripcion: 'Durante mi educación en la Universidad Católica Boliviana, nos asignaron por primera vez un proyecto real, que sea usable para nuestro curriculum. Una pagina de pedidos de comida.'
    }
  ];

<<<<<<< HEAD
  let memento = JSON.parse(localStorage.getItem('proyectosMemento')) || {
    likes: [5, 12, 8],
    liked: [false, false, false],
    saved: [false, false, false]
  };
  
  proyectos.forEach((proyecto, idx) => {
    if (memento.saved[idx]) {
      savedItemsManager.add(proyecto);
    }
  });
  renderSavedItems();

=======
>>>>>>> parent of 2b72197 (Implementacion Router)
  const lista = document.getElementById('proyectos-lista');
  if (lista) {
    lista.innerHTML = "";
    proyectos.forEach(proyecto => {
      const li = document.createElement('li');
      li.className = 'projcard';
      li.innerHTML = `
        <img class="blogcard__image" src="${proyecto.imagen}" alt="${proyecto.titulo}">
        <p>${proyecto.fecha}</p>
        <h3>${proyecto.titulo}</h3>
        <p class="blogcard__text">${proyecto.descripcion}</p>
      `;
<<<<<<< HEAD

      const btnContainer = document.createElement('div');
      btnContainer.style.position = 'absolute';
      btnContainer.style.top = '10px';
      btnContainer.style.right = '10px';
      btnContainer.style.display = 'flex';
      btnContainer.style.gap = '10px';
      btnContainer.style.zIndex = '2';
      li.style.position = 'relative';

      const likeBtn = document.createElement('button');
      likeBtn.className = 'likebtn';
      likeBtn.innerHTML = `<span class="likebtn__icon">&#10084;</span> <span class="likebtn__count">${memento.likes[idx]}</span>`;
      if (memento.liked[idx]) likeBtn.classList.add('likebtn--active');
      likeBtn.addEventListener('click', function() {
        memento.liked[idx] = !memento.liked[idx];
        likeBtn.classList.toggle('likebtn--active', memento.liked[idx]);
        memento.likes[idx] += memento.liked[idx] ? 1 : -1;
        likeBtn.querySelector('.likebtn__count').textContent = memento.likes[idx];
        localStorage.setItem('proyectosMemento', JSON.stringify(memento));
      });

      const saveBtn = document.createElement('button');
      saveBtn.className = 'savebtn';
      saveBtn.innerHTML = `<span class="savebtn__icon">&#9873;</span>`;
      if (memento.saved[idx]) saveBtn.classList.add('savebtn--active');
      
      saveBtn.addEventListener('click', function() {
        memento.saved[idx] = !memento.saved[idx];
        saveBtn.classList.toggle('savebtn--active', memento.saved[idx]);
        
        if (memento.saved[idx]) {
          savedItemsManager.add(proyecto);
        } else {
          savedItemsManager.remove(proyecto.titulo);
        }
        
        localStorage.setItem('proyectosMemento', JSON.stringify(memento));
      });

      btnContainer.appendChild(likeBtn);
      btnContainer.appendChild(saveBtn);
      li.insertBefore(btnContainer, li.firstChild);

      lista.appendChild(li);
    });
  }
});
=======
      lista.appendChild(li);
    });
  }
});

window.addEventListener('DOMContentLoaded', () => {

  const projcards = document.querySelectorAll('.projcard');
  // Simulación de likes iniciales (puedes personalizar estos valores)
  const likesArray = [5, 12, 8];

  projcards.forEach((card, idx) => {
    const btnContainer = document.createElement('div');
    btnContainer.style.position = 'absolute';
    btnContainer.style.top = '10px';
    btnContainer.style.right = '10px';
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '10px';
    btnContainer.style.zIndex = '2';

    card.style.position = 'relative';

    let liked = false;
    let saved = false;

    const likeBtn = document.createElement('button');
    likeBtn.className = 'likebtn';
    likeBtn.innerHTML = `<span class="likebtn__icon">&#10084;</span> <span class="likebtn__count">${likesArray[idx]}</span>`;
    likeBtn.addEventListener('click', function() {
      liked = !liked;
      likeBtn.classList.toggle('likebtn--active', liked);
      const heart = likeBtn.querySelector('.likebtn__icon');
      const count = likeBtn.querySelector('.likebtn__count');
      if (liked) {
        likesArray[idx]++;
      } else {
        likesArray[idx]--;
      }
      count.textContent = likesArray[idx];
    });

    const saveBtn = document.createElement('button');
    saveBtn.className = 'savebtn';
    saveBtn.innerHTML = `<span class="savebtn__icon">&#9873;</span>`;
    saveBtn.addEventListener('click', function() {
      saved = !saved;
      saveBtn.classList.toggle('savebtn--active', saved);
    });

    btnContainer.appendChild(likeBtn);
    btnContainer.appendChild(saveBtn);

    card.insertBefore(btnContainer, card.firstChild);
  });
});
>>>>>>> parent of 2b72197 (Implementacion Router)
