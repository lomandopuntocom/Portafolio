function renderSavedItems(itemsToRender) {
  const listaGuardados = document.getElementById('guardados-lista');
  if (!listaGuardados) return;
  const items = itemsToRender || savedItemsManager.getItems();
  listaGuardados.innerHTML = '';
  if (items.length === 0) {
    listaGuardados.innerHTML = '<p>No se encontraron proyectos.</p>';
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

savedItemsManager.subscribe(() => renderSavedItems());


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

  let memento = JSON.parse(localStorage.getItem('proyectosMemento')) || {
    likes: [5, 12, 8], liked: [false, false, false], saved: [false, false, false]
  };
  
  proyectos.forEach((proyecto, idx) => {
    if (memento.saved[idx]) savedItemsManager.add(proyecto);
  });
  renderSavedItems();

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
        const command = new ToggleSaveCommand(proyecto, idx, saveBtn, memento);
        command.execute();
      });

      btnContainer.appendChild(likeBtn);
      btnContainer.appendChild(saveBtn);
      li.insertBefore(btnContainer, li.firstChild);
      lista.appendChild(li);
    });
  }

  const searchInput = document.getElementById('saved-search-input');
  const searchBtn = document.getElementById('saved-search-btn');
  const clearBtn = document.getElementById('saved-search-clear-btn');

  if(searchBtn) {
    searchBtn.addEventListener('click', () => {
      const command = new SearchCommand(searchInput.value);
      command.execute();
    });
  }

  if(clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      const command = new SearchCommand('');
      command.execute();
    });
  }
});