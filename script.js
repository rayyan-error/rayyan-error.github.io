// Portfolio interactions: nav state, section spy, theme toggle, footer year.
document.documentElement.classList.remove("no-js");

// Nav border on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Active section highlighting
const links = document.querySelectorAll('.nav__links a[href^="#"]');
const sections = [...links].map((a) => document.querySelector(a.getAttribute("href")));
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => s && spy.observe(s));

document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const getPreferredTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("theme", theme); } catch (e) {}
};

try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
} catch (e) {}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || getPreferredTheme();
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });
}
