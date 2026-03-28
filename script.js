// Cursor
const cur = document.getElementById("cur");
const ring = document.getElementById("cur-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
});
(function raf() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(raf);
})();
document
  .querySelectorAll(
    "a,button,.rev-card,.pet-card,.slide-img,.video-wrap,.sum-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur.style.width = "18px";
      cur.style.height = "18px";
      ring.style.opacity = "0";
    });
    el.addEventListener("mouseleave", () => {
      cur.style.width = "10px";
      cur.style.height = "10px";
      ring.style.opacity = "1";
    });
  });

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("vis");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((el) => io.observe(el));

// Petition counters
const pets = [
  { sigEl: "sig1", barEl: "bar1", target: 11022, max: 15000 },
  { sigEl: "sig2", barEl: "bar2", target: 1187, max: 2000 },
  { sigEl: "sig3", barEl: "bar3", target: 492, max: 1000 },
];
const totalTarget = 11022 + 1187 + 492;
let petAnimated = false;

const petSection = document.getElementById("p1");
const petIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !petAnimated) {
        petAnimated = true;
        const dur = 2000,
          start = performance.now();
        function tick(now) {
          const prog = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - prog, 3);
          pets.forEach((p) => {
            document.getElementById(p.sigEl).textContent = Math.round(
              ease * p.target,
            ).toLocaleString();
            document.getElementById(p.barEl).style.width =
              ease * (p.target / p.max) * 100 + "%";
          });
          document.getElementById("totalSigs").textContent = Math.round(
            ease * totalTarget,
          ).toLocaleString();
          if (prog < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    });
  },
  { threshold: 0.3 },
);
if (petSection) petIO.observe(petSection);
