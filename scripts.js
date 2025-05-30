// --- ROUTER MEJORADO ---
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(seccion => {
    seccion.style.display = 'none';
  });

  const seccionMostrar = document.getElementById(id);
  if (seccionMostrar) {
    seccionMostrar.style.display = 'block';
  }

  // Actualiza el hash solo si es diferente
  if (window.location.hash.substring(1) !== id) {
    history.pushState({seccion: id}, null, '#' + id);
  }
}

// Escucha cambios en el hash y en el historial
window.addEventListener('DOMContentLoaded', () => {
  function handleRoute() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      mostrarSeccion(hash);
    } else {
      mostrarSeccion('main');
    }
  }
  window.addEventListener('popstate', handleRoute);
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
});

// --- INYECCIÓN DE TARJETAS DE PROYECTO Y MEMENTO ---
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

  // Recuperar estado Memento de likes y guardados
  let memento = JSON.parse(localStorage.getItem('proyectosMemento')) || {
    likes: [5, 12, 8],
    liked: [false, false, false],
    saved: [false, false, false]
  };

  const lista = document.getElementById('proyectos-lista');
  if (lista) {
    lista.innerHTML = "";
    proyectos.forEach((proyecto, idx) => {
      const li = document.createElement('li');
      li.className = 'projcard';
      li.innerHTML = `
        <img class="blogcard__image" src="${proyecto.imagen}" alt="${proyecto.titulo}">
        <p>${proyecto.fecha}</p>
        <h3>${proyecto.titulo}</h3>
        <p class="blogcard__text">${proyecto.descripcion}</p>
      `;

      // --- BOTONES DE LIKE Y GUARDAR CON MEMENTO ---
      const btnContainer = document.createElement('div');
      btnContainer.style.position = 'absolute';
      btnContainer.style.top = '10px';
      btnContainer.style.right = '10px';
      btnContainer.style.display = 'flex';
      btnContainer.style.gap = '10px';
      btnContainer.style.zIndex = '2';
      li.style.position = 'relative';

      // Like
      const likeBtn = document.createElement('button');
      likeBtn.className = 'likebtn';
      likeBtn.innerHTML = `<span class="likebtn__icon">&#10084;</span> <span class="likebtn__count">${memento.likes[idx]}</span>`;
      if (memento.liked[idx]) likeBtn.classList.add('likebtn--active');
      likeBtn.addEventListener('click', function() {
        memento.liked[idx] = !memento.liked[idx];
        likeBtn.classList.toggle('likebtn--active', memento.liked[idx]);
        if (memento.liked[idx]) {
          memento.likes[idx]++;
        } else {
          memento.likes[idx]--;
        }
        likeBtn.querySelector('.likebtn__count').textContent = memento.likes[idx];
        localStorage.setItem('proyectosMemento', JSON.stringify(memento));
      });

      // Guardar
      const saveBtn = document.createElement('button');
      saveBtn.className = 'savebtn';
      saveBtn.innerHTML = `<span class="savebtn__icon">&#9873;</span>`;
      if (memento.saved[idx]) saveBtn.classList.add('savebtn--active');
      saveBtn.addEventListener('click', function() {
        memento.saved[idx] = !memento.saved[idx];
        saveBtn.classList.toggle('savebtn--active', memento.saved[idx]);
        localStorage.setItem('proyectosMemento', JSON.stringify(memento));
      });

      btnContainer.appendChild(likeBtn);
      btnContainer.appendChild(saveBtn);
      li.insertBefore(btnContainer, li.firstChild);

      lista.appendChild(li);
    });
  }
});

// --- PATRÓN COMMAND ---
class Command {
  execute() {}
  undo() {}
}

class LikeCommand extends Command {
  constructor(idx, memento, btn) {
    super();
    this.idx = idx;
    this.memento = memento;
    this.btn = btn;
    this.prevLiked = memento.liked[idx];
    this.prevLikes = memento.likes[idx];
  }
  execute() {
    this.memento.liked[this.idx] = !this.memento.liked[this.idx];
    this.btn.classList.toggle('likebtn--active', this.memento.liked[this.idx]);
    if (this.memento.liked[this.idx]) {
      this.memento.likes[this.idx]++;
    } else {
      this.memento.likes[this.idx]--;
    }
    this.btn.querySelector('.likebtn__count').textContent = this.memento.likes[this.idx];
    localStorage.setItem('proyectosMemento', JSON.stringify(this.memento));
  }
  undo() {
    this.memento.liked[this.idx] = this.prevLiked;
    this.memento.likes[this.idx] = this.prevLikes;
    this.btn.classList.toggle('likebtn--active', this.memento.liked[this.idx]);
    this.btn.querySelector('.likebtn__count').textContent = this.memento.likes[this.idx];
    localStorage.setItem('proyectosMemento', JSON.stringify(this.memento));
  }
}

class SaveCommand extends Command {
  constructor(idx, memento, btn) {
    super();
    this.idx = idx;
    this.memento = memento;
    this.btn = btn;
    this.prevSaved = memento.saved[idx];
  }
  execute() {
    this.memento.saved[this.idx] = !this.memento.saved[this.idx];
    this.btn.classList.toggle('savebtn--active', this.memento.saved[this.idx]);
    localStorage.setItem('proyectosMemento', JSON.stringify(this.memento));
  }
  undo() {
    this.memento.saved[this.idx] = this.prevSaved;
    this.btn.classList.toggle('savebtn--active', this.memento.saved[this.idx]);
    localStorage.setItem('proyectosMemento', JSON.stringify(this.memento));
  }
}

const PersistMixin = Base => class extends Base {
  persist() {
    localStorage.setItem('proyectosMemento', JSON.stringify(this.memento));
  }
};

class LikeCommandWithPersist extends PersistMixin(LikeCommand) {
  execute() {
    super.execute();
    this.persist();
  }
}
