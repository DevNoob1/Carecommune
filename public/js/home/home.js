gsap.registerPlugin(ScrollTrigger);

gsap.from(".card", {
  opacity: 0,
  x: -1000,
  duration: 3,
  scrollTrigger: {
    trigger: ".card",
    toggleActions: "play reverse reverse reverse",
  },
  start: "top center",
  marker: true,
});

gsap.to(".title", {
  x:1200,
  scrollTrigger: {
    trigger: ".content",
    toggleActions: "play none reverse reverse",
  },
  start: "top 50%",
  opacity: 0,
  duration: 3,
  // repeat: -1,
  // transformOrigin: "left center",
  ease: "none",
});
