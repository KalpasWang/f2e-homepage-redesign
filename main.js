import "./style.css";
import { gsap, ScrollTrigger, TextPlugin } from "gsap/all";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";

const select = (e) => document.querySelector(e);

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function init() {
  // 前處理
  setSmoothScroll();
  handleHeaderMenu();
  handleQnATabs();

  // 動畫處理
  initOpeningAnimation();
  handleQuestionsAnimation();
  set2ndBanner();
  handleStagesAnimationn();
  handleEventDescription();
  setPrizeAnimation();
  setQnA();
  setSponsors();
}

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

  [pieceCode, pieceDashboard].forEach((el, i) => {
    gsap.to(el, {
      delay: i * 0.6,
      duration: 1,
      yPercent: -20,
      yoyo: true,
      repeat: -1,
      ease: "none",
    });
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#questions",
      start: "top bottom",
      end: "top 40%",
      scrub: true,
    },
  });

  tl2
    .to([bigTitle, subtitle, signupBtn], {
      y: "30vh",
      duration: 3,
    })
    .to(
      [pieceCode, pieceDashboard, rightLine, leftLine, marquee],
      {
        y: "-50vh",
        duration: 3,
      },
      "<"
    );
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
            scrub: true,
          },
        });
      },
    });
  });
}

function set2ndBanner() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#opening",
      start: "top top",
      pin: true,
      scrub: true,
    },
  });

  tl.from("#opening", {
    backgroundColor: "#000000",
    duration: 2,
  })
    .from(["#stamp1", "#stamp2", "#hand1", "#hand2"], {
      duration: 2,
      delay: 1,
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    })
    .from(
      ["#opening-title", "#opening-bg"],
      {
        duration: 2,
        delay: 1,
        scale: 0.1,
        stagger: 0.3,
        autoAlpha: 0,
        transformOrigin: "50%, 50%",
      },
      "<"
    )
    .from("#opening-subtitle", {
      autoAlpha: 0,
      delay: 1,
      duration: 2,
    })
    .from("#opening-marquee1-wrapper", {
      autoAlpha: 0,
      duration: 2,
    })
    .from(
      "#opening-marquee1",
      {
        autoAlpha: 0,
        duration: 2,
        xPercent: 20,
      },
      "<"
    )
    .from(
      "#opening-marquee2-wrapper",
      {
        autoAlpha: 0,
        duration: 2,
      },
      "<"
    )
    .from(
      "#opening-marquee2",
      {
        autoAlpha: 0,
        duration: 2,
        xPercent: -20,
      },
      "<"
    );
}

function handleStagesAnimationn() {
  const cards = gsap.utils.toArray([
    "#stage-card1",
    "#stage-card2",
    "#stage-card3",
  ]);

  gsap.from(cards, {
    stagger: 0.6,
    rotateY: 0,
    yPercent: 100,
    duration: 1,
    scrollTrigger: {
      trigger: cards,
      start: "top 100%",
      end: "top 50%",
      scrub: true,
    },
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#stages-h2",
      start: "top 70%",
    },
  });

  tl.from("#stages-h2", {
    duration: 1,
    scaleX: 0,
    transformOrigin: "50%, 50%",
    ease: "power3.out",
  })
    .from("#stages-subtitle", {
      autoAlpha: 0,
      y: 50,
      duration: 0.7,
    })
    .from(
      "#stages-thunder",
      {
        scale: 0,
        transformOrigin: "top",
        duration: 0.3,
        ease: "elastic.out",
      },
      "-=0.3"
    );
}

function handleEventDescription() {
  const items = gsap.utils.toArray(".event-item");

  ScrollTrigger.batch(items, {
    interval: 0.5,
    batchMax: 3,
    start: "top 100%",
    end: "top 65%",
    onEnter(elements) {
      gsap.from(elements, {
        duration: 1,
        stagger: 0.6,
        opacity: 0,
        scale: 0.9,
        y: 200,
        ease: "back.out",
        transformOrigin: "50% 50%",
      });
    },
  });
}

function setPrizeAnimation() {
  const texts = ["區區修煉已經無法滿足了嗎？", "還有比賽等著你！"];

  // 標題 animation
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#prize h2",
      start: "top 80%",
    },
  });
  tl1
    .to("#prize-h2-1", {
      text: texts[0],
      duration: 1,
    })
    .to("#prize-h2-2", {
      text: texts[1],
      duration: 1,
      delay: 0.3,
    });

  // 賽車 animation
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#runway",
      start: "top 90%",
      end: "center 40%",
      scrub: true,
    },
  });
  const trackWidth = select("#runway").offsetWidth;
  const carWidth = select("#car").offsetWidth;

  tl2
    .to("#car", {
      duration: 1,
      x: -1 * (trackWidth - carWidth),
      ease: "none",
    })
    .to(
      "#flag",
      {
        duration: 0.2,
        rotate: -45,
        x: -30,
        y: -30,
      },
      "-=0.05"
    );

  // 卡片動畫
  const cards = gsap.utils.toArray("#prize li");
  cards.forEach((card, i) => {
    const factor = i === 0 ? -1 : 1;
    gsap.from(card, {
      duration: 1,
      x: factor * 100,
      y: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: card,
        start: "top 70%",
      },
    });
  });
}

function setQnA() {
  gsap.from("#qna h2", {
    color: "#06102b",
    duration: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#qna h2",
      start: "top 80%",
    },
  });

  gsap.from(["#qna-tabs", "#qna-tabpanels"], {
    opacity: 0,
    duration: 1,
    ease: "none",
    stagger: 0.5,
    scrollTrigger: {
      trigger: "#qna-tabs",
      start: "top 70%",
    },
  });
}

function setSponsors() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#sponsors",
      start: "top 80%",
    },
  });

  tl.from("#sponsors-h2-1", {
    opacity: 0,
    yPercent: 100,
    duration: 0.7,
  })
    .from("#sponsors-h2-2", {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
    })
    .from(["#sopnsors-star1", "#sopnsors-star2"], {
      scale: 0.5,
      transformOrigin: "50% 50%",
      opacity: 0,
      duration: 0.5,
      stagger: 0.25,
    });

  gsap.from("#sponsors-wrapper img", {
    y: 500,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#sponsors-wrapper",
      start: "top 100%",
      end: "+=300",
      scrub: true,
    },
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

init();
