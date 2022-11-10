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

  function setIndicator(tab) {
    const containerBox = tab.parentElement.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();

    gsap.set(indicator, {
      width: tabBox.width,
      left: tabBox.left - containerBox.left,
    });
  }

  setIndicator(tabs[0]);

  window.addEventListener("resize", () => {
    currentTab = select(".current-tab");
    console.log(currentTab);
    setIndicator(currentTab);
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanel = tab.getAttribute("aria-controls");
      const containerBox = tab.parentElement.getBoundingClientRect();

      gsap.to(`[role="tabpanel"]:not(#${targetPanel})`, {
        duration: 0.3,
        opacity: 0,
        display: "none",
      });
      gsap.to(`#${targetPanel}`, {
        duration: 0.3,
        opacity: 1,
        display: "block",
      });
      gsap.to(indicator, {
        duration: 0.3,
        left: tab.getBoundingClientRect().left - containerBox.left,
        width: tab.getBoundingClientRect().width,
      });
    });
  });
}
