class Footer extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'blocks/footer/footer.css');

        const wrapper = document.createElement('div');
        wrapper.classList.add('footer');
        wrapper.innerHTML = `
            <a class="footer__link" href="https://www.linkedin.com/in/cabrerafloresjeanpaul" target="_blank">
                <img class="footer__img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn"> LinkedIn
            </a>
            <a class="footer__link" href="https://github.com/lomandopuntocom" target="_blank">
                <img class="footer__img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub"> GitHub
            </a>
            <a class="footer__link" href="mailto:jean.cabrera@ucb.edu.bo">
                <img class="footer__img" src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="Gmail"> Gmail
            </a>
        `;


        shadow.appendChild(linkElem);
        shadow.appendChild(wrapper);
    }
}

customElements.define('foot-element', Footer);
