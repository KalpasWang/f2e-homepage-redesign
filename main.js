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
    const currentTab = select(".current-tab");
    setIndicator(currentTab);
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("aria-controls");
      const targetPanel = select(`#${targetId}`);
      const containerBox = tab.parentElement.getBoundingClientRect();
      const otherPanels = gsap.utils.toArray(
        `[role="tabpanel"]:not(#${targetId})`
      );
      const otherTabs = tabs.filter((el) => el !== tab);

      gsap.to(otherPanels, {
        duration: 0.3,
        opacity: 0,
        display: "none",
        onComplete() {
          otherTabs.forEach((el) => {
            el.classList.remove("current-tab");
          });
        },
      });
      gsap.to(targetPanel, {
        duration: 0.3,
        opacity: 1,
        display: "block",
        onComplete() {
          tab.classList.add("current-tab");
        },
      });
      gsap.to(indicator, {
        duration: 0.3,
        left: tab.getBoundingClientRect().left - containerBox.left,
        width: tab.getBoundingClientRect().width,
      });
    });
  });
}
