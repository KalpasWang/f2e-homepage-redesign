import './style.css';

const select = (e) => document.querySelector(e);

const menuContent = select('#menu-content');

function handleDOMEvents() {
  select('#menu-button').addEventListener('click', (e) => {
    menuContent.classList.toggle('max-h-full');
  });
  select('#close-button').addEventListener('click', (e) => {
    menuContent.classList.remove('max-h-full');
  });
}

handleDOMEvents();
