function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(seccion => {
    seccion.style.display = 'none';
  });

  const seccionMostrar = document.getElementById(id);
  if (seccionMostrar) {
    seccionMostrar.style.display = 'block';
  }

  history.replaceState(null, null, '#' + id);
}

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    mostrarSeccion(hash);
  } else {
    mostrarSeccion('main');
  }
});

// --- INYECCIÓN DE TARJETAS DE PROYECTO ---
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
