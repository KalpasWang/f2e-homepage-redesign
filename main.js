import "./style.css";
import { gsap } from "gsap/all";

const select = (e) => document.querySelector(e);

const menuContent = select("#menu-content");

function init() {
  handleHeaderMenu();
  handleQnATabs();
}

init();

function handleHeaderMenu() {
  select("#menu-button").addEventListener("click", (e) => {
    menuContent.classList.toggle("scale-y-100");
  });
  select("#close-button").addEventListener("click", (e) => {
    menuContent.classList.remove("scale-y-100");
  });
}

function handleQnATabs() {
  const indicator = select("#indicator");
  const tabs = gsap.utils.toArray('[role="tab"]');
  const containerBox = tabs[0].parentElement.getBoundingClientRect();

  gsap.set(indicator, {
    width: tabs[0].getBoundingClientRect().width,
    left: tabs[0].getBoundingClientRect().left - containerBox.left,
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanel = tab.getAttribute("aria-controls");

      gsap.to(`[role="tabpanel"]:not(#${targetPanel})`, {
        duration: 0.3,
        autoAlpha: 0,
      });
      gsap.to(`#${targetPanel}`, {
        duration: 0.3,
        autoAlpha: 1,
      });
      gsap.to(indicator, {
        duration: 0.3,
        left: tab.getBoundingClientRect().left - containerBox.left,
        width: tab.getBoundingClientRect().width,
      });
    });
  });
}
