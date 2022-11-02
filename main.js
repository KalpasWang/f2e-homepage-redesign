import './style.css';

const select = (e) => document.querySelector(e);

const menuContent = select('#menu-content');

function handleDOMEvents() {
  select('#menu-button').addEventListener('click', (e) => {
    menuContent.classList.toggle('scale-y-100');
  });
  select('#close-button').addEventListener('click', (e) => {
    menuContent.classList.remove('scale-y-100');
  });
}

handleDOMEvents();
