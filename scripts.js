function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(seccion => seccion.style.display = 'none');
  const seccionMostrar = document.getElementById(id);
  if (seccionMostrar) seccionMostrar.style.display = 'block';
  if (window.location.hash.substring(1) !== id) history.pushState({seccion: id}, null, '#' + id);
}

window.addEventListener('DOMContentLoaded', () => {
  function handleRoute() {
    const hash = window.location.hash.substring(1) || 'main';
    mostrarSeccion(hash);
  }
  window.addEventListener('popstate', handleRoute);
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
});

const DispatcherMixin = {
  subscribe(observerFn) {
    if (!this._subscribers) {
      this._subscribers = [];
    }
    this._subscribers.push(observerFn);
  },

  notify() {
    if (!this._subscribers) {
      return;
    }
    this._subscribers.forEach(observerFn => observerFn());
  }
};


let savedItemsInstance = null;
class SavedItemsManager {
  constructor() {
    if (savedItemsInstance) {
      return savedItemsInstance;
    }
    this._savedItems = [];
    savedItemsInstance = this;

    Object.assign(this, DispatcherMixin);
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
}

const savedItemsManager = new SavedItemsManager();

class ToggleSaveCommand {
  constructor(proyecto, idx, saveBtn, memento) {
    this.proyecto = proyecto;
    this.idx = idx;
    this.saveBtn = saveBtn;
    this.memento = memento;
  }

  execute() {
    this.memento.saved[this.idx] = !this.memento.saved[this.idx];
    this.saveBtn.classList.toggle('savebtn--active', this.memento.saved[this.idx]);
    if (this.memento.saved[this.idx]) {
      savedItemsManager.add(this.proyecto);
    } else {
      savedItemsManager.remove(this.proyecto.titulo);
    }
    localStorage.setItem('proyectosMemento', JSON.stringify(this.memento));
  }
}

class SearchCommand {
  constructor(query) {
    this.query = query.trim().toLowerCase();
  }

  execute() {
    const allItems = savedItemsManager.getItems();
    if (!this.query) {
      renderSavedItems(allItems);
      return;
    }
    const filteredItems = allItems.filter(item =>
      item.titulo.toLowerCase().includes(this.query)
    );
    renderSavedItems(filteredItems);
  }
}