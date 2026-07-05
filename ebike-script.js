/* ===== БАТАРЕИ ===== */
const batteries = [
  {
    name: "Начальная (36V / 10Ah)",
    capacity: "360 Wh",
    range: "30-40 км",
    time: "3-4 ч",
    price: "$ дешёво",
    desc: "Для коротких поездок по городу. Лёгкая, компактная, идеальна для новичков.",
    fill: 45
  },
  {
    name: "Стандартная (48V / 13Ah)",
    capacity: "624 Wh",
    range: "50-70 км",
    time: "4-5 ч",
    price: "$$ средняя",
    desc: "Золотая середина. Хватает на работу, развозку, выходные. Самая популярная.",
    fill: 65
  },
  {
    name: "Мощная (52V / 20Ah)",
    capacity: "1040 Wh",
    range: "80-120 км",
    time: "5-7 ч",
    price: "$$$ премиум",
    desc: "Для дальних путешествий, грузов и высокой скорости. Когда дальность важнее веса.",
    fill: 90
  },
];

const batterySection = document.getElementById("batteryTypes");
if (batterySection) {
  const html = batteries.map((b, i) => `
    <article class="battery-card reveal" style="animation-delay: ${i * 80}ms;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
        <div>
          <h3 style="font-size: 1.2rem; margin-bottom: 4px;">${b.name}</h3>
          <p style="color: var(--muted); font-size: 0.92rem;">${b.desc}</p>
        </div>
        <span style="font-weight: 800; color: #ffb020; white-space: nowrap; margin-left: 16px;">${b.price}</span>
      </div>
      <div class="battery-bar">
        <div class="battery-fill" style="width: ${b.fill}%;"></div>
      </div>
      <div class="specs-grid">
        <div class="spec-card">
          <div class="spec-num">${b.capacity}</div>
          <div class="spec-label">энергия</div>
        </div>
        <div class="spec-card">
          <div class="spec-num">${b.range}</div>
          <div class="spec-label">запас хода</div>
        </div>
        <div class="spec-card">
          <div class="spec-num">${b.time}</div>
          <div class="spec-label">зарядка</div>
        </div>
        <div class="spec-card">
          <div class="spec-num">↔️</div>
          <div class="spec-label">снимаемая</div>
        </div>
      </div>
    </article>
  `).join("");
  batterySection.innerHTML = `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">${html}</div>`;
}

/* ===== МОДЕЛИ ЭЛЕКТРОВЕЛОСИПЕДОВ ===== */
const models = [
  {
    emoji: "🏙️",
    name: "City Pro",
    desc: "Комфортный городской электробайк с низкой рамой. Подходит всем.",
    specs: "48V / 13Ah | 32 км/ч | 65 км",
    color: "#22e0c8"
  },
  {
    emoji: "⛰️",
    name: "Mountain King",
    desc: "Мощный внедорожник. Горы, грунт, приключения без усталости.",
    specs: "52V / 20Ah | 45 км/ч | 100 км",
    color: "#ffb020"
  },
  {
    emoji: "🚀",
    name: "Speedster",
    desc: "Легкий и быстрый. Для тех, кто любит скорость и адреналин.",
    specs: "52V / 15Ah | 50 км/ч | 80 км",
    color: "#ff4d8d"
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    name: "Family Plus",
    desc: "Грузовой электробайк. Везёт детей, покупки, всё сразу.",
    specs: "48V / 20Ah | 30 км/ч | 90 км",
    color: "#7c5cff"
  },
  {
    emoji: "🧑‍🦽",
    name: "Easy Ride",
    desc: "Начальная серия. Все плюсы электро, цена адекватная.",
    specs: "36V / 10Ah | 25 км/ч | 40 км",
    color: "#5cc8ff"
  },
  {
    emoji: "🌍",
    name: "Travel Mate",
    desc: "Туристический. Чемоданы, палатка и запас на 150 км.",
    specs: "52V / 25Ah | 35 км/ч | 150 км",
    color: "#a06bff"
  }
];

const modelsGrid = document.getElementById("modelsGrid");
if (modelsGrid) {
  modelsGrid.style.display = "grid";
  modelsGrid.style.gridTemplateColumns = "repeat(3, 1fr)";
  modelsGrid.style.gap = "20px";
  models.forEach((m, i) => {
    const el = document.createElement("article");
    el.className = "type reveal";
    el.style.animationDelay = `${i * 70}ms`;
    el.innerHTML = `
      <span class="type__glow" style="background:${m.color}"></span>
      <span class="type__emoji">${m.emoji}</span>
      <h3>${m.name}</h3>
      <p>${m.desc}</p>
      <p style="color: var(--c3); font-size: 0.85rem; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--stroke);">${m.specs}</p>
    `;
    modelsGrid.appendChild(el);
  });
}

/* ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ===== */
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

/* ===== FAQ: АККОРДЕОН ===== */
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

/* ===== АНИМАЦИЯ БАТАРЕИ ===== */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".battery-fill").forEach((el) => {
    const rect = el.parentElement.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      el.style.opacity = "1";
    }
  });
});
