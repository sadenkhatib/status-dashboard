const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const filterSelect = document.getElementById("filterSelect");
const eventList = document.getElementById("eventList");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const kpiTotal = document.getElementById("kpiTotal");
const kpiWarnings = document.getElementById("kpiWarnings");
const kpiErrors = document.getElementById("kpiErrors");

let isPaused = false;
let events = [];

const EVENT_TYPES = ["info", "warning", "error"];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createMockEvent() {
  const type = randomChoice(EVENT_TYPES);

  const messagesByType = {
    info: ["Heartbeat OK", "Service started", "Cache refreshed", "User signed in"],
    warning: ["Latency elevated", "Retrying request", "Queue growing", "Rate limit near cap"],
    error: ["Service down", "Request failed", "DB connection lost", "Timeout exceeded"]
  };

  return {
    id: (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now() + Math.random()),
    type,
    message: randomChoice(messagesByType[type]),
    timestamp: new Date()
  };
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function matchesSearch(e, q) {
  if (!q) return true;
  const hay = `${e.type} ${e.message} ${formatTime(e.timestamp)}`.toLowerCase();
  return hay.includes(q.toLowerCase());
}

function updateKPIs(list) {
  if (!kpiTotal && !kpiWarnings && !kpiErrors) return;

  const total = list.length;
  let warn = 0;
  let err = 0;

  for (const e of list) {
    if (e.type === "warning") warn++;
    else if (e.type === "error") err++;
  }

  if (kpiTotal) kpiTotal.textContent = total;
  if (kpiWarnings) kpiWarnings.textContent = warn;
  if (kpiErrors) kpiErrors.textContent = err;
}

function getVisibleEvents() {
  const filterValue = filterSelect ? filterSelect.value : "all";
  const q = searchInput ? (searchInput.value || "").trim() : "";

  let list = events;

  if (filterValue !== "all") {
    list = list.filter((e) => e.type === filterValue);
  }

  if (q) {
    list = list.filter((e) => matchesSearch(e, q));
  }

  return list;
}

function renderEvents() {
  const visibleEvents = getVisibleEvents();

  eventList.innerHTML = "";

  visibleEvents
    .slice()
    .reverse()
    .forEach((e) => {
      const li = document.createElement("li");
      li.classList.add(`event-${e.type}`, "fade-in");

      const sev = document.createElement("span");
      sev.className = `sev sev--${e.type.toUpperCase()}`;
      sev.textContent = e.type.toUpperCase();

      const msg = document.createElement("span");
      msg.className = "event-text";
      msg.textContent = ` ${e.message}`;

      const time = document.createElement("span");
      time.className = "event-time";
      time.textContent = ` [${formatTime(e.timestamp)}]`;

      li.appendChild(time);
      li.appendChild(sev);
      li.appendChild(msg);

      eventList.appendChild(li);
    });

  updateKPIs(visibleEvents);
}

for (let i = 0; i < 6; i++) events.push(createMockEvent());
renderEvents();

if (filterSelect) filterSelect.addEventListener("change", renderEvents);
if (searchInput) searchInput.addEventListener("input", renderEvents);

let intervalId = null;

function startLiveUpdates() {
  if (intervalId !== null) return;

  intervalId = setInterval(() => {
    if (isPaused) return;

    const burst = Math.random() < 0.15 ? 3 : 1;
    for (let i = 0; i < burst; i++) events.push(createMockEvent());

    if (events.length > 50) events = events.slice(events.length - 50);

    renderEvents();
  }, 3000);
}

function stopLiveUpdates() {
  if (intervalId === null) return;
  clearInterval(intervalId);
  intervalId = null;
}

pauseBtn?.addEventListener("click", () => {
  isPaused = true;
  pauseBtn.disabled = true;
  if (resumeBtn) resumeBtn.disabled = false;
});

resumeBtn?.addEventListener("click", () => {
  isPaused = false;
  if (pauseBtn) pauseBtn.disabled = false;
  resumeBtn.disabled = true;
});

clearBtn?.addEventListener("click", () => {
  events = [];
  renderEvents();
});

startLiveUpdates();
