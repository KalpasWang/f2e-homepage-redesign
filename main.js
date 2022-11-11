import "./style.css";
import { gsap, ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";

const select = (e) => document.querySelector(e);

gsap.registerPlugin(ScrollTrigger);

function init() {
  setSmoothScroll();
  initOpeningAnimation();
  handleHeaderMenu();
  handleQnATabs();
}

init();

function setSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function initOpeningAnimation() {
  const hero = select("#hero");
  const bigTitle = select("#big-title");
  const subtitle = select("#subtitle");
  const pieceCode = select("#piece1");
  const pieceDashboard = select("#piece2");
  const rightLine = select("#illustration1");
  const leftLine = select("#illustration2");
  const signupBtn = select("#signup-btn");
  const marquee = select("#marquee");

  window.scrollTo(0, 0);
  document.body.classList.add("h-screen", "overflow-scroll");
  const text = new SplitType(subtitle);

  const t1 = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: "power3.inOut",
    },
  });

  t1.from(hero, {
    yPercent: -100,
    duration: 1.2,
    autoAlpha: 0,
  })
    .from("header .container", {
      autoAlpha: 0,
    })
    .from(bigTitle, {
      yPercent: 25,
      autoAlpha: 0,
      ease: "none",
    })
    .fromTo(
      "#subtitle .char",
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        stagger: 0.08,
      },
      "-=0.2"
    );

  document.body.classList.remove("h-screen", "overflow-scroll");
}

function handleHeaderMenu() {
  const menuContent = select("#menu-content");

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
