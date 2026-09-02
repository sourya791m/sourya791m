// ============================================================
// Reduced motion check
// ============================================================
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// ============================================================
// Smooth scroll for nav links
// ============================================================
function scroll2(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  closeMobileNav();
}

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function closeMobileNav() {
  if (!navToggle || !navLinks) return;
  navToggle.classList.remove("open");
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

function isMobileNavOpen() {
  return navLinks && navLinks.classList.contains("open");
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.addEventListener("click", (e) => {
  if (!isMobileNavOpen()) return;
  const withinNav = e.target.closest("nav");
  if (!withinNav) closeMobileNav();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMobileNavOpen()) closeMobileNav();
});

// ============================================================
// Scroll progress bar
// ============================================================
const scrollProgressBar = document.getElementById("scrollProgressBar");
function updateScrollProgress() {
  if (!scrollProgressBar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgressBar.style.width = pct + "%";
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// ============================================================
// Reveal-on-scroll
// ============================================================
function initReveal(selector) {
  const els = document.querySelectorAll(selector);
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("in-view"));
  }
}
initReveal(".reveal");

// ============================================================
// Active nav-link highlighting
// ============================================================
const sections = document.querySelectorAll("main > div[id], #hero");
const navAnchors = document.querySelectorAll(".nav-links a");

function setActiveLink(id) {
  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
  });
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((sec) => sectionObserver.observe(sec));
}

// ============================================================
// Project data — single source of truth.
// Only confirmed facts are included; unknown tech/status is omitted.
// ============================================================
const PROJECTS = [
  {
    id: "chat-ai",
    num: "01",
    title: "Chat AI",
    categories: ["ai"],
    catLabel: "AI",
    featured: true,
    short: "An AI-powered chat project focused on conversational interaction.",
    whatItIs: "A conversational AI system built to explore natural, real-time chat interaction.",
    exploring: "How AI-driven conversation can feel more natural and responsive.",
  },
  {
    id: "ai-farming",
    num: "02",
    title: "AI Farming",
    categories: ["ai", "experimental"],
    catLabel: "AI",
    status: "Experiment",
    short: "An experimental AI/automation project related to farming.",
    whatItIs: "An experimental exploration applying AI and automation ideas to a farming-related context.",
    exploring: "How automation and AI concepts could apply to agricultural tasks.",
  },
  {
    id: "chat-bot",
    num: "03",
    title: "Chat Bot",
    categories: ["bots", "automation"],
    catLabel: "Bots",
    short: "A chatbot project designed for automated interaction and responses.",
    whatItIs: "A chatbot built to handle automated conversational interaction.",
    exploring: "Designing automated response flows and interaction logic.",
  },
  {
    id: "discord-bots",
    num: "04",
    title: "Discord Group Management Bots",
    categories: ["discord", "bots", "automation"],
    catLabel: "Discord",
    featured: true,
    short: "Bots designed to help automate and manage Discord communities.",
    whatItIs: "A set of Discord bots built to automate community management tasks.",
    exploring: "Automating repetitive moderation and management workflows in Discord servers.",
  },
  {
    id: "telegram-bots",
    num: "05",
    title: "Telegram Bots",
    categories: ["telegram", "bots"],
    catLabel: "Telegram",
    featured: true,
    short: "A collection of Telegram bot projects and experiments.",
    whatItIs: "Several small Telegram bots built as experiments in automation.",
    exploring: "Different bot interaction patterns and automation ideas on Telegram.",
  },
  {
    id: "account-selling-bot",
    num: "06",
    title: "Account Selling Bot",
    categories: ["telegram", "bots"],
    catLabel: "Telegram",
    short: "A Telegram-based bot project related to account marketplace/selling workflows.",
    whatItIs: "A bot exploring marketplace-style listing and transaction workflows on Telegram.",
    exploring: "Automating structured request-and-response flows for marketplace-style listings.",
  },
  {
    id: "hosting-bot",
    num: "07",
    title: "Hosting Bot",
    categories: ["telegram", "bots", "automation"],
    catLabel: "Telegram",
    short: "A bot project related to automating hosting/service workflows.",
    whatItIs: "A bot built to automate repetitive hosting and service-related tasks.",
    exploring: "Streamlining backend service workflows through bot automation.",
  },
  {
    id: "digital-locker",
    num: "08",
    title: "Digital Locker",
    categories: ["automation"],
    catLabel: "Digital Tools",
    featured: true,
    short: "A digital storage/organization project.",
    whatItIs: "A tool for organizing and storing digital files and information.",
    exploring: "Structuring personal digital storage more efficiently.",
  },
  {
    id: "arduino-smart-car",
    num: "09",
    title: "Arduino Smart Car",
    categories: ["robotics"],
    catLabel: "Robotics",
    featured: true,
    status: "Built",
    short: "Autonomous obstacle-avoiding robotic car.",
    whatItIs: "A 4-wheel robotic car using ultrasonic and IR sensors to detect obstacles and control movement in real time.",
    exploring: "Combining sensor input with motor control logic to make navigation decisions autonomously.",
    tech: ["Arduino", "C/C++", "Ultrasonic Sensor", "IR Sensors", "Motors"],
  },
  {
    id: "writing-machine",
    num: "10",
    title: "Writing Machine",
    categories: ["robotics"],
    catLabel: "Robotics",
    featured: true,
    status: "Built",
    short: "A machine designed to reproduce digital text as physical handwriting.",
    whatItIs: "A stepper-motor based machine designed to reproduce text on paper through mechanical movement.",
    exploring: "Translating digital text input into precise, repeatable physical strokes.",
    tech: ["Arduino", "Stepper Motors", "Embedded Systems", "Mechanical Control"],
  },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI" },
  { key: "bots", label: "Bots" },
  { key: "telegram", label: "Telegram" },
  { key: "discord", label: "Discord" },
  { key: "automation", label: "Automation" },
  { key: "robotics", label: "Robotics" },
  { key: "experimental", label: "Experimental" },
];

// ============================================================
// Render: Featured grid
// ============================================================
const featuredGrid = document.getElementById("featuredGrid");
if (featuredGrid) {
  const featured = PROJECTS.filter((p) => p.featured);
  featuredGrid.innerHTML = featured
    .map(
      (p, i) => `
    <article class="feat-card reveal reveal-d${Math.min(i + 1, 4)}" data-id="${p.id}">
      <div class="feat-visual" aria-hidden="true">${p.catLabel}</div>
      <div class="feat-num">${p.num}</div>
      <h3 class="feat-title">${p.title}</h3>
      <span class="feat-cat">${p.catLabel}</span>
      <p class="feat-desc">${p.short}</p>
      <button class="feat-explore" type="button" data-explore="${p.id}">Explore Project</button>
    </article>
  `
    )
    .join("");
  initReveal(".feat-card");
}

// ============================================================
// Render: Filter bar
// ============================================================
const filterBar = document.getElementById("filterBar");
let activeFilter = "all";

if (filterBar) {
  filterBar.innerHTML = CATEGORIES.map(
    (c, i) => `
    <button class="filter-btn" type="button" data-filter="${c.key}" aria-pressed="${i === 0}">${c.label}</button>
  `
  ).join("");
}

// ============================================================
// Render: All projects grid
// ============================================================
const allProjectsGrid = document.getElementById("allProjectsGrid");

function renderProjectCard(p) {
  const statusTag = p.status ? `<span class="proj-status">${p.status}</span>` : "";
  return `
    <article class="proj-card" data-id="${p.id}" data-categories="${p.categories.join(" ")}">
      <div class="proj-num">${p.num}</div>
      <h3 class="proj-title">${p.title}</h3>
      <span class="proj-cat">${p.catLabel}</span>
      ${statusTag}
      <p class="proj-desc">${p.short}</p>
      <button class="proj-explore" type="button" data-explore="${p.id}">Explore Project</button>
    </article>
  `;
}

if (allProjectsGrid) {
  allProjectsGrid.innerHTML = PROJECTS.map(renderProjectCard).join("");
}

// ============================================================
// Filtering
// ============================================================
function applyFilter(key) {
  activeFilter = key;
  if (filterBar) {
    filterBar.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.filter === key));
    });
  }
  if (allProjectsGrid) {
    allProjectsGrid.querySelectorAll(".proj-card").forEach((card) => {
      const cats = (card.dataset.categories || "").split(" ");
      const show = key === "all" || cats.includes(key);
      card.hidden = !show;
    });
  }
}

if (filterBar) {
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    applyFilter(btn.dataset.filter);
  });
}

// ============================================================
// View all projects button — scrolls to full grid
// ============================================================
const viewAllBtn = document.getElementById("viewAllBtn");
if (viewAllBtn) {
  viewAllBtn.addEventListener("click", () => {
    const target = document.getElementById("all-projects");
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  });
}

// ============================================================
// Project detail modal
// ============================================================
const modalBackdrop = document.getElementById("modalBackdrop");
const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalNum = document.getElementById("modalNum");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalShort = document.getElementById("modalShort");
const modalWhatBlock = document.getElementById("modalWhatBlock");
const modalWhat = document.getElementById("modalWhat");
const modalExploringBlock = document.getElementById("modalExploringBlock");
const modalExploring = document.getElementById("modalExploring");
const modalTechBlock = document.getElementById("modalTechBlock");
const modalTech = document.getElementById("modalTech");

let lastFocusedEl = null;

function openProjectModal(id) {
  const p = PROJECTS.find((proj) => proj.id === id);
  if (!p || !modalBackdrop) return;

  lastFocusedEl = document.activeElement;

  modalNum.textContent = p.num;
  modalTitle.textContent = p.title;
  modalShort.textContent = p.short;

  let metaHTML = `<span class="modal-tag">${p.catLabel}</span>`;
  if (p.status) metaHTML += `<span class="modal-tag modal-tag-status">${p.status}</span>`;
  modalMeta.innerHTML = metaHTML;

  if (p.whatItIs) {
    modalWhat.textContent = p.whatItIs;
    modalWhatBlock.hidden = false;
  } else {
    modalWhatBlock.hidden = true;
  }

  if (p.exploring) {
    modalExploring.textContent = p.exploring;
    modalExploringBlock.hidden = false;
  } else {
    modalExploringBlock.hidden = true;
  }

  if (p.tech && p.tech.length) {
    modalTech.textContent = p.tech.join(" · ");
    modalTechBlock.hidden = false;
  } else {
    modalTechBlock.hidden = true;
  }

  modalBackdrop.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeProjectModal() {
  if (!modalBackdrop) return;
  modalBackdrop.hidden = true;
  document.body.classList.remove("modal-open");
  if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
    lastFocusedEl.focus();
  }
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-explore]");
  if (trigger) {
    openProjectModal(trigger.dataset.explore);
  }
});

if (modalClose) modalClose.addEventListener("click", closeProjectModal);

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeProjectModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (!modalBackdrop || modalBackdrop.hidden) return;
  if (e.key === "Escape") {
    closeProjectModal();
    return;
  }
  if (e.key === "Tab") {
    const focusable = projectModal.querySelectorAll(
      'button, a[href], [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// ============================================================
// Hero "what am I building?" cycling text
// ============================================================
const cycleItems = [
  "AI systems",
  "Automation bots",
  "Telegram tools",
  "Discord bots",
  "Robotics",
  "Digital tools",
];
const cycleTextEl = document.getElementById("cycleText");

if (cycleTextEl) {
  let cycleIndex = 0;
  if (prefersReducedMotion) {
    cycleTextEl.textContent = cycleItems[0];
  } else {
    setInterval(() => {
      cycleIndex = (cycleIndex + 1) % cycleItems.length;
      cycleTextEl.style.opacity = "0";
      setTimeout(() => {
        cycleTextEl.textContent = cycleItems[cycleIndex];
        cycleTextEl.style.opacity = "1";
      }, 220);
    }, 2400);
    cycleTextEl.style.transition = "opacity 0.2s ease";
  }
}

// ============================================================
// Playground — mini terminal
// ============================================================
const termOutput = document.getElementById("termOutput");
const termForm = document.getElementById("termForm");
const termInput = document.getElementById("termInput");

const TERMINAL_RESPONSES = {
  help: "Commands: help, about, work, now, skills, contact, clear",
  about: "I'm a builder interested in AI, robotics, software and automation. I learn by experimenting.",
  work: "Categories: AI · Bots · Telegram · Discord · Automation · Robotics · Experimental. Scroll to 'Things I've Built' to explore.",
  projects: "Categories: AI · Bots · Telegram · Discord · Automation · Robotics · Experimental. Scroll to 'Things I've Built' to explore.",
  now: "Currently exploring: AI, Robotics, Automation, Software.",
  skills: "Python · C++ · Java · JavaScript · Arduino · HTML · CSS · Git",
  contact: "Reach out via the Contact section — Email, GitHub, X or Instagram.",
};

function appendTermLine(text, cls) {
  if (!termOutput) return;
  const p = document.createElement("p");
  if (cls) p.className = cls;
  p.textContent = text;
  termOutput.appendChild(p);
  termOutput.scrollTop = termOutput.scrollHeight;
}

if (termForm && termInput) {
  termForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = termInput.value.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    appendTermLine("$ " + raw, "term-cmd");

    if (cmd === "clear") {
      termOutput.innerHTML = "";
    } else if (TERMINAL_RESPONSES[cmd]) {
      appendTermLine(TERMINAL_RESPONSES[cmd]);
    } else {
      appendTermLine(`Command not found: "${raw}". Type "help" for options.`, "term-err");
    }
    termInput.value = "";
  });
}

// ============================================================
// Playground — random project
// ============================================================
const randomProjectBtn = document.getElementById("randomProjectBtn");
const randomResult = document.getElementById("randomResult");

if (randomProjectBtn && randomResult) {
  randomProjectBtn.addEventListener("click", () => {
    const p = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
    randomResult.innerHTML = `
      <strong>${p.title}</strong>
      ${p.short}
      <div style="margin-top:10px;">
        <button class="proj-explore" type="button" data-explore="${p.id}">View Details</button>
      </div>
    `;
  });
}

// ============================================================
// Playground — tech stack shuffle
// ============================================================
const shuffleTagsEl = document.getElementById("shuffleTags");
const TECH_STACK = ["Python", "C++", "JavaScript", "Arduino", "AI", "Bots", "Robotics", "Automation"];

if (shuffleTagsEl) {
  function renderShuffle(list) {
    shuffleTagsEl.innerHTML = list
      .map((t) => `<span class="shuffle-tag">${t}</span>`)
      .join("");
  }
  renderShuffle(TECH_STACK);

  if (!prefersReducedMotion) {
    let current = [...TECH_STACK];
    setInterval(() => {
      current = [...current].sort(() => Math.random() - 0.5);
      renderShuffle(current);
      const tags = shuffleTagsEl.querySelectorAll(".shuffle-tag");
      const pick = tags[Math.floor(Math.random() * tags.length)];
      if (pick) pick.classList.add("shuffle-active");
    }, 2600);
  }
}

// ============================================================
// Playground — builder quotes
// ============================================================
const BUILDER_QUOTES = [
  "Build it. Break it. Fix it.",
  "Curiosity → Prototype → Reality.",
  "Less talking. More testing.",
  "Idea today, prototype tomorrow.",
  "If it works, ship it. If it breaks, learn it.",
  "Every bot starts as a bad first draft.",
];
const quoteText = document.getElementById("quoteText");
const quoteBtn = document.getElementById("quoteBtn");
let lastQuoteIndex = 0;

if (quoteBtn && quoteText) {
  quoteBtn.addEventListener("click", () => {
    let next = Math.floor(Math.random() * BUILDER_QUOTES.length);
    if (next === lastQuoteIndex) next = (next + 1) % BUILDER_QUOTES.length;
    lastQuoteIndex = next;
    quoteText.textContent = BUILDER_QUOTES[next];
  });
}

// ============================================================
// Easter egg — Konami-style sequence
// ============================================================
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];
let konamiProgress = 0;

const eggToast = document.getElementById("eggToast");
const eggMessage = document.getElementById("eggMessage");
const eggClose = document.getElementById("eggClose");

function showEasterEgg() {
  if (!eggToast || !eggMessage) return;
  eggMessage.textContent = "System override... just kidding. You found the easter egg. 🤖";
  eggToast.hidden = false;
  setTimeout(() => {
    eggToast.hidden = true;
  }, 6000);
}

document.addEventListener("keydown", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === KONAMI[konamiProgress]) {
    konamiProgress++;
    if (konamiProgress === KONAMI.length) {
      showEasterEgg();
      konamiProgress = 0;
    }
  } else {
    konamiProgress = key === KONAMI[0] ? 1 : 0;
  }
});

if (eggClose && eggToast) {
  eggClose.addEventListener("click", () => {
    eggToast.hidden = true;
  });
}

// ============================================================
// Initial filter state
// ============================================================
applyFilter("all");
