export const Router = {
    init: () => {
        document.addEventListener("click", event => {
            const link = event.target.closest('a');
            if (link) {
                const href = link.getAttribute("href");
                if (href && href.startsWith("/")) {
                    event.preventDefault();
                    Router.go(href);
                }
            }
        });

        window.addEventListener("popstate", () => {
            Router.go(location.pathname, false);
        });

        Router.go(location.pathname, false);
    },

    go: (route, addToHistory = true) => {
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }

        let pageElement = null;
        const main = document.getElementById('main');

        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        switch (route) {
            case "/":
                pageElement = document.createElement("main-section");
                break;
            case "/acerca":
                pageElement = document.createElement("about-section");
                break;
            case "/blog":
                pageElement = document.createElement("blog-section");
                break;
            case "/galeria":
                pageElement = document.createElement("gallery-section");
                break;
            case "/guardados":
                pageElement = document.createElement("saved-projects-section");
                break;
            case "/contacto":
                pageElement = document.createElement("contact-section");
                break;
            default:
                pageElement = document.createElement("main-section");
                console.warn(`Route not found: ${route}. Displaying front page.`);
                break;
        }

        if (pageElement) {
            main.appendChild(pageElement);
        }

        window.scrollTo(0, 0);
    },
};