// pages
import { Navbar } from './pages/navbar/navbar.js';
import { Main } from './pages/main/main.js';
import { About } from './pages/about/about.js';
import { Blog } from './pages/blog/blog.js';
import { Gallery } from './pages/gallery/gallery.js';
import { Contact } from './pages/contact/contact.js';
import { Footer } from './pages/footer/footer.js';
import { SavedProjects } from './pages/saved/saved.js';
// services
import { Router } from './services/router.js';

document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});