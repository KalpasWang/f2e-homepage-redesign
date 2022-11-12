import "./style.css";
import { gsap, ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";

const select = (e) => document.querySelector(e);

gsap.registerPlugin(ScrollTrigger);

function init() {
  // 前處理
  setSmoothScroll();
  handleHeaderMenu();
  handleQnATabs();

  // 動畫處理
  initOpeningAnimation();
  handleQuestionsAnimation();
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
  const bigTitle = select("#big-title");
  const subtitle = select("#subtitle");
  const pieceCode = select("#piece1");
  const pieceDashboard = select("#piece2");
  const rightLine = select("#illustration1");
  const leftLine = select("#illustration2");
  const signupBtn = select("#signup-btn");
  const marquee = select("#marquee");

  SplitType.create(subtitle);

  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: "power3.inOut",
    },
    onStart() {
      window.scrollTo(0, 0);
      document.body.classList.add("h-screen", "overflow-hidden");
    },
    onComplete() {
      document.body.classList.remove("h-screen", "overflow-hidden");
    },
  });

  tl.from("#hero", {
    delay: 0.5,
    yPercent: -30,
    scaleY: 0,
    transformOrigin: "top",
    duration: 1.2,
    autoAlpha: 0,
  })
    .from(
      "header",
      {
        delay: 0.5,
        yPercent: -100,
        duration: 0.05,
        ease: "none",
      },
      "<"
    )
    .from("header .container", {
      yPercent: -100,
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
    )
    .from(
      signupBtn,
      {
        scaleX: 0,
        transformOrigin: "left",
        autoAlpha: 0,
      },
      "-=0.3"
    )
    .from(marquee, {
      autoAlpha: 0,
    })
    .from(
      [pieceCode, pieceDashboard],
      {
        autoAlpha: 0,
        transformOrigin: "50% 50%",
        scale: 0,
        ease: "back.out",
        stagger: 0.1,
      },
      "-=0.2"
    );

  if (leftLine.style.display !== "none") {
    tl.fromTo(
      leftLine,
      {
        clipPath: "polygon(0 0, 0% 0, 0 100%, 0% 100%)",
        ease: "none",
        duration: 1,
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      },
      "-=0.5"
    ).fromTo(
      rightLine,
      {
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        ease: "none",
        duration: 1,
      },
      {
        clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
      }
    );
  }

  [pieceCode, , pieceDashboard].forEach((el, i) => {
    gsap.to(el, {
      delay: i * 0.6,
      duration: 1,
      yPercent: -20,
      yoyo: true,
      repeat: -1,
      ease: "none",
    });
  });
}

function handleQuestionsAnimation() {
  // const questions = gsap.utils.toArray(['#q1', '#q2', '#q3'])

  [1, 2, 3].forEach((n) => {
    const mainQ = select("#question" + n);
    const emotion = select("#emotion" + n);
    const shape = select("#shape" + n);
    const polygon = select("#polygon" + n);
    let group = [mainQ, emotion, shape, polygon];
    if (n === 3) {
      group.pop();
    }

    gsap.from(group, {
      autoAlpha: 0,
      scale: 0,
      transformOrigin: "50% ,50%",
      ease: "elastic.out",
      duration: 0.3,
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#q" + n,
        start: "top 65%",
      },
      onComplete() {
        gsap.to(group, {
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: "#question" + n,
            start: "top 25%",
            end: "center 0%",
            markers: true,
            scrub: true,
          },
        });
      },
    });
  });
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
