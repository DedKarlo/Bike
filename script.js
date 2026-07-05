/* ===== ВИДЫ ВЕЛОСИПЕДОВ (генерация карточек) ===== */
const bikeTypes = [
  { emoji: "🏙️", name: "Городской", desc: "Комфорт и практичность для ежедневных поездок по городу.", c: "#7c5cff" },
  { emoji: "⛰️", name: "Горный (MTB)", desc: "Внедорожье, грунт и адреналин. Крепкая рама и мощные тормоза.", c: "#22e0c8" },
  { emoji: "🏁", name: "Шоссейный", desc: "Скорость и лёгкость для длинных дистанций по асфальту.", c: "#ff4d8d" },
  { emoji: "🔋", name: "Электро", desc: "Мотор-помощник для дальних маршрутов и подъёмов без пота.", c: "#ffb020" },
  { emoji: "🛹", name: "BMX / Трюковой", desc: "Прыжки, рампы и трюки. Компактный и невероятно прочный.", c: "#5cc8ff" },
  { emoji: "🌍", name: "Гравел", desc: "Универсал: и асфальт, и грунт. Один байк для всех приключений.", c: "#a06bff" },
];

const grid = document.getElementById("typesGrid");
if (grid) {
  bikeTypes.forEach((b) => {
    const el = document.createElement("article");
    el.className = "type reveal";
    el.innerHTML = `
      <span class="type__glow" style="background:${b.c}"></span>
      <span class="type__emoji">${b.emoji}</span>
      <h3>${b.name}</h3>
      <p>${b.desc}</p>`;
    grid.appendChild(el);
  });
}

/* ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ ===== */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("in"), (i % 6) * 70);
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ===== СЧЁТЧИКИ СТАТИСТИКИ ===== */
function animateCount(el) {
  const target = +el.dataset.count;
  if (target === 0) { el.textContent = "0"; return; }
  const dur = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString("ru-RU");
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".stat__num").forEach((el) => statObserver.observe(el));

/* ===== МОБИЛЬНОЕ МЕНЮ ===== */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
if (burger && navLinks) {
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    burger.classList.toggle("x");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger.classList.remove("x");
    })
  );
}

/* ===== FAQ: закрываем остальные при открытии одного ===== */
const faqItems = document.querySelectorAll(".faq__item");
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});
