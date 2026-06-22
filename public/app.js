const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const PREF_KEY = "dex.preferences.v1";
const CHAT_KEY = "dex.conversation.v1";
const DEFAULT_PREFS = {
  theme: "cyan",
  density: 70,
  bootSkip: false,
  apiMode: "local",
  apiEndpoint: "./data/institute-of-sound.json",
  dockOrder: []
};

const fallbackInstituteData = {
  source: "Institute of Sound Embedded Fallback",
  version: "0.1.0",
  updatedAt: new Date().toISOString(),
  profile: { name: "Arjun Kale", role: "Sonic Architect", rank: "VII", level: 27, xp: { current: 7840, target: 10000 } },
  modules: [
    { id: "artist", name: "ArtistDex", icon: "A", sync: 86, discoveries: 42, connections: 148, achievements: 12, artifacts: 42, description: "Your evolving artistic identity, sound signatures, influences, releases, and creative milestones." },
    { id: "editor", name: "EditorDex", icon: "E", sync: 64, discoveries: 18, connections: 76, achievements: 8, artifacts: 18, description: "Your editorial eye, narrative decisions, sonic refinements, and craft lineage across every project." },
    { id: "curator", name: "CuratorDex", icon: "C", sync: 91, discoveries: 73, connections: 203, achievements: 19, artifacts: 73, description: "Your taste constellation: collections, recommendations, cultural threads, and the signals only you connect." },
    { id: "listener", name: "ListenerDex", icon: "L", sync: 78, discoveries: 2400, connections: 284, achievements: 14, artifacts: 2400, description: "Your listening universe, from recurring moods and hidden affinities to the sounds shaping your inner world." },
    { id: "producer", name: "ProducerDex", icon: "P", sync: 52, discoveries: 12, connections: 61, achievements: 7, artifacts: 12, description: "Your production intelligence: sessions, collaborators, tools, techniques, and an evolving creative fingerprint." }
  ],
  nodes: [
    { id: "core", label: "DEX Core", type: "system", weight: 100 },
    { id: "artist", label: "ArtistDex", type: "module", weight: 86 },
    { id: "editor", label: "EditorDex", type: "module", weight: 64 },
    { id: "curator", label: "CuratorDex", type: "module", weight: 91 },
    { id: "listener", label: "ListenerDex", type: "module", weight: 78 },
    { id: "producer", label: "ProducerDex", type: "module", weight: 52 },
    { id: "obsidian-frequencies", label: "Obsidian Frequencies", type: "collection", weight: 73 },
    { id: "nyra-voss", label: "Nyra Voss", type: "connection", weight: 67 },
    { id: "ambient-systems", label: "Ambient Systems", type: "genre", weight: 58 }
  ],
  edges: [
    { from: "core", to: "artist", label: "identity", strength: 0.86 },
    { from: "core", to: "editor", label: "craft", strength: 0.64 },
    { from: "core", to: "curator", label: "taste", strength: 0.91 },
    { from: "core", to: "listener", label: "resonance", strength: 0.78 },
    { from: "core", to: "producer", label: "creation", strength: 0.52 },
    { from: "curator", to: "obsidian-frequencies", label: "collection", strength: 0.74 },
    { from: "artist", to: "nyra-voss", label: "collaboration signal", strength: 0.66 },
    { from: "listener", to: "ambient-systems", label: "listening affinity", strength: 0.82 },
    { from: "editor", to: "ambient-systems", label: "narrative thread", strength: 0.51 }
  ],
  signals: [
    { title: "New sonic connection mapped", detail: "Nyra Voss - Ambient Systems", type: "connection", age: "04M" },
    { title: "Collection threshold reached", detail: "Obsidian Frequencies - 24 artifacts", type: "collection", age: "2H" },
    { title: "ProducerDex achievement unlocked", detail: "Signal Architect - Tier II", type: "achievement", age: "1D" }
  ]
};

let prefs = loadPrefs();
let graphData = fallbackInstituteData;

function loadPrefs() {
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(PREF_KEY) || "{}") };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

function savePrefs(next = prefs) {
  prefs = { ...DEFAULT_PREFS, ...next };
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
  } catch {}
  applyPrefs();
}

function applyPrefs() {
  document.documentElement.dataset.theme = prefs.theme;
  document.documentElement.style.setProperty("--pref-density", String(prefs.density / 70));
  $("#densityRange") && ($("#densityRange").value = prefs.density);
  $("#bootSkipToggle") && ($("#bootSkipToggle").checked = prefs.bootSkip);
  $("#apiMode") && ($("#apiMode").value = prefs.apiMode);
  $("#apiEndpoint") && ($("#apiEndpoint").value = prefs.apiEndpoint);
  $$(".swatch").forEach(button => button.classList.toggle("active", button.dataset.theme === prefs.theme));
  $("#apiEndpointLabel") && ($("#apiEndpointLabel").textContent = prefs.apiEndpoint || "No endpoint configured");
}

function formatCount(value) {
  if (typeof value === "string") return value;
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 ? 1 : 0)}K`;
  return String(value);
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function toast(message) {
  const el = $("#dexToast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("visible");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("visible"), 1800);
}

applyPrefs();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

$("#nativeCollapse")?.addEventListener("click", () => {
  document.body.classList.add("collapsing-to-icon");
  if (window.webkit?.messageHandlers?.dexNative) {
    window.webkit.messageHandlers.dexNative.postMessage("collapse");
  } else {
    $("#exitDex")?.click();
    setTimeout(() => document.body.classList.remove("collapsing-to-icon"), 700);
  }
});

// Ambient starfield
const canvas = $("#starfield");
const ctx = canvas.getContext("2d");
let stars = [];
let pointer = { x: .5, y: .5 };

function sizeCanvas() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: Math.min(190, Math.floor(innerWidth / 7)) }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.25 + .2,
    a: Math.random() * .55 + .12,
    s: Math.random() * .08 + .015
  }));
}

function renderStars() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const star of stars) {
    star.y += star.s;
    if (star.y > innerHeight + 3) star.y = -3;
    const ox = (pointer.x - .5) * star.r * 8;
    const oy = (pointer.y - .5) * star.r * 8;
    ctx.beginPath();
    ctx.fillStyle = `rgba(164,183,255,${star.a})`;
    ctx.arc(star.x + ox, star.y + oy, star.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(renderStars);
}
addEventListener("resize", sizeCanvas);
addEventListener("pointermove", e => { pointer = { x: e.clientX / innerWidth, y: e.clientY / innerHeight }; });
sizeCanvas();
renderStars();

// Clock
function updateTime() {
  $("#entryTime").textContent = new Date().toLocaleTimeString("en-GB");
}
updateTime();
setInterval(updateTime, 1000);

// Dock reorder
const dock = $("#dock");
let draggedItem = null;
function restoreDockOrder() {
  if (!dock || !prefs.dockOrder?.length) return;
  const byLabel = Object.fromEntries($$(".dock-item", dock).map(item => [item.getAttribute("aria-label"), item]));
  prefs.dockOrder.forEach(label => byLabel[label] && dock.appendChild(byLabel[label]));
}
function saveDockOrder() {
  if (!dock) return;
  savePrefs({ ...prefs, dockOrder: $$(".dock-item", dock).map(item => item.getAttribute("aria-label")) });
}
restoreDockOrder();
$$(".dock-item").forEach(item => {
  item.addEventListener("dragstart", () => {
    draggedItem = item;
    requestAnimationFrame(() => item.classList.add("dragging"));
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    draggedItem = null;
    saveDockOrder();
  });
});
dock.addEventListener("dragover", e => {
  e.preventDefault();
  if (!draggedItem) return;
  const items = $$(".dock-item:not(.dragging)", dock);
  const next = items.find(item => e.clientX < item.getBoundingClientRect().left + item.offsetWidth / 2);
  dock.insertBefore(draggedItem, next || null);
});

// Launch sequence
let launched = false;
function launchDex() {
  if (launched) return;
  launched = true;
  if (prefs.bootSkip) {
    $("#entryScreen").classList.add("hidden");
    $("#appShell").classList.add("visible");
    $("#bootScreen").classList.remove("active", "complete");
    return;
  }
  const boot = $("#bootScreen");
  boot.classList.add("active");
  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.ceil(Math.random() * 7);
    if (progress >= 100) progress = 100;
    $("#bootPercent").textContent = `${String(progress).padStart(2, "0")}%`;
    $("#bootProgress").style.width = `${progress}%`;
    if (progress === 100) {
      clearInterval(timer);
      setTimeout(() => {
        $("#entryScreen").classList.add("hidden");
        $("#appShell").classList.add("visible");
        boot.classList.add("complete");
      }, 480);
    }
  }, 75);
}
$("#dexLaunch").addEventListener("click", launchDex);
$("#textLaunch").addEventListener("click", launchDex);
$("#exitDex").addEventListener("click", () => {
  $("#appShell").classList.remove("visible");
  $("#entryScreen").classList.remove("hidden");
  $("#bootScreen").classList.remove("active", "complete");
  $("#bootProgress").style.width = "0";
  launched = false;
});

// View navigation
const viewMap = {
  home: { el: $("#homeView"), label: "CORE ARRAY" },
  chat: { el: $("#chatView"), label: "CONVERSATION CORE" },
  map: { el: $("#mapView"), label: "ECOSYSTEM MAP" },
  graph: { el: $("#graphView"), label: "DATA GRAPH" },
  archive: { el: $("#archiveView"), label: "ARTIFACT ARCHIVE" },
  signals: { el: $("#signalsView"), label: "SIGNAL STREAM" }
};

function setView(name) {
  if (!viewMap[name]) return;
  const shell = $("#appShell");
  shell.classList.remove("view-pulse");
  void shell.offsetWidth;
  shell.classList.add("view-pulse");
  $$(".view").forEach(view => view.classList.remove("active"));
  viewMap[name].el.classList.add("active");
  $("#viewName").textContent = viewMap[name].label;
  $$(".rail-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.view === name));
  if (name === "map") requestAnimationFrame(fitMap);
  if (name === "graph") renderGraphConsole();
  if (name === "chat") requestAnimationFrame(() => $("#chatInput")?.focus());
}
$$("[data-view]").forEach(button => button.addEventListener("click", () => setView(button.dataset.view)));

// Module modal
let moduleData = {
  ArtistDex: { icon: "A", sync: "86%", discoveries: "42", description: "Your evolving artistic identity, sound signatures, influences, releases, and creative milestones." },
  EditorDex: { icon: "E", sync: "64%", discoveries: "18", description: "Your editorial eye, narrative decisions, sonic refinements, and craft lineage across every project." },
  CuratorDex: { icon: "C", sync: "91%", discoveries: "73", description: "Your taste constellation—collections, recommendations, cultural threads, and the signals only you connect." },
  ListenerDex: { icon: "L", sync: "78%", discoveries: "2.4K", description: "Your listening universe, from recurring moods and hidden affinities to the sounds shaping your inner world." },
  ProducerDex: { icon: "P", sync: "52%", discoveries: "12", description: "Your production intelligence: sessions, collaborators, tools, techniques, and an evolving creative fingerprint." }
};
function openModule(name) {
  const data = moduleData[name];
  if (!data) return;
  $("#modalEmblem").textContent = data.icon;
  $("#modalTitle").innerHTML = `${name.replace("Dex", "")}<span>Dex</span>`;
  $("#modalDescription").textContent = data.description;
  $("#modalSync").textContent = data.sync;
  $("#modalDiscoveries").textContent = data.discoveries;
  $("#moduleModal").classList.add("open");
}
$$(".dex-module").forEach(module => {
  module.addEventListener("click", () => openModule(module.dataset.module));
  module.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openModule(module.dataset.module); });
});
$$("[data-close-modal]").forEach(el => el.addEventListener("click", () => $("#moduleModal").classList.remove("open")));
addEventListener("keydown", e => { if (e.key === "Escape") { $("#moduleModal").classList.remove("open"); $("#mapDetail").classList.remove("open"); } });

// Ecosystem node details
let nodeData = {
  "DEX Core": ["100%", "512", "38", "167"],
  ArtistDex: ["86%", "148", "12", "42"],
  EditorDex: ["64%", "76", "8", "18"],
  CuratorDex: ["91%", "203", "19", "73"],
  ListenerDex: ["78%", "284", "14", "2.4K"],
  ProducerDex: ["52%", "61", "7", "12"]
};
$$(".map-node").forEach(node => node.addEventListener("click", e => {
  e.stopPropagation();
  const name = node.dataset.node;
  const data = nodeData[name];
  $("#detailTitle").textContent = name;
  $("#detailScore").textContent = data[0];
  $("#detailConnections").textContent = data[1];
  $("#detailAchievements").textContent = data[2];
  $("#detailArtifacts").textContent = data[3];
  $("#mapDetail").classList.add("open");
}));
$("#closeDetail").addEventListener("click", () => $("#mapDetail").classList.remove("open"));

// Map zoom and pan
const mapStage = $("#mapStage");
let scale = 1, panX = 0, panY = 0, isPanning = false, startX = 0, startY = 0;
function updateMap() {
  for (const el of [$("#connections"), $("#nodeLayer")]) {
    el.style.setProperty("--scale", scale);
    el.style.setProperty("--pan-x", `${panX}px`);
    el.style.setProperty("--pan-y", `${panY}px`);
  }
}
function fitMap() {
  const bounds = mapStage.getBoundingClientRect();
  // The relationship cluster occupies a tighter footprint than its SVG canvas.
  // Fit that meaningful area, keeping nodes legible at common laptop heights.
  scale = Math.max(.3, Math.min(1, (bounds.width - 34) / 1100, (bounds.height - 34) / 600));
  panX = 0;
  panY = 0;
  updateMap();
}
function adjustZoom(delta) {
  scale = Math.max(.3, Math.min(1.75, scale + delta));
  updateMap();
}
mapStage.addEventListener("wheel", e => {
  e.preventDefault();
  adjustZoom(e.deltaY > 0 ? -.08 : .08);
}, { passive: false });
mapStage.addEventListener("pointerdown", e => {
  if (e.target.closest("button")) return;
  isPanning = true; startX = e.clientX - panX; startY = e.clientY - panY;
  mapStage.setPointerCapture(e.pointerId);
});
mapStage.addEventListener("pointermove", e => {
  if (!isPanning) return;
  panX = (e.clientX - startX) / scale; panY = (e.clientY - startY) / scale;
  updateMap();
});
mapStage.addEventListener("pointerup", () => { isPanning = false; });
$("#zoomIn").addEventListener("click", () => adjustZoom(.12));
$("#zoomOut").addEventListener("click", () => adjustZoom(-.12));
$("#resetMap").addEventListener("click", fitMap);
addEventListener("resize", () => {
  if ($("#mapView").classList.contains("active")) fitMap();
});

// Settings, API integration scaffold, and graph data adapter
function normalizeGraphData(raw) {
  const data = { ...fallbackInstituteData, ...(raw || {}) };
  data.modules = Array.isArray(data.modules) && data.modules.length ? data.modules : fallbackInstituteData.modules;
  data.nodes = Array.isArray(data.nodes) && data.nodes.length ? data.nodes : fallbackInstituteData.nodes;
  data.edges = Array.isArray(data.edges) ? data.edges : fallbackInstituteData.edges;
  data.signals = Array.isArray(data.signals) ? data.signals : fallbackInstituteData.signals;
  return data;
}

async function loadInstituteData({ notify = false } = {}) {
  const endpoint = prefs.apiEndpoint || DEFAULT_PREFS.apiEndpoint;
  $("#apiStatus") && ($("#apiStatus").textContent = "SYNCING...");
  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    graphData = normalizeGraphData(await response.json());
    $("#apiStatus") && ($("#apiStatus").textContent = prefs.apiMode === "live" ? "LIVE API" : "LOCAL DATA");
    if (notify) toast("Institute data synced");
  } catch (error) {
    graphData = normalizeGraphData(fallbackInstituteData);
    $("#apiStatus") && ($("#apiStatus").textContent = "FALLBACK");
    if (notify) toast("Using embedded fallback data");
  }
  hydrateFromGraph();
  renderGraphConsole();
  buildCommandResults();
}

function hydrateFromGraph() {
  moduleData = Object.fromEntries(graphData.modules.map(module => [
    module.name,
    {
      icon: module.icon,
      sync: `${module.sync}%`,
      discoveries: formatCount(module.discoveries),
      description: module.description
    }
  ]));

  nodeData = {
    "DEX Core": [
      "100%",
      String(graphData.edges.filter(edge => edge.from === "core" || edge.to === "core").length),
      String(graphData.modules.reduce((total, module) => total + Number(module.achievements || 0), 0)),
      String(graphData.nodes.length)
    ],
    ...Object.fromEntries(graphData.modules.map(module => [
      module.name,
      [`${module.sync}%`, formatCount(module.connections), formatCount(module.achievements), formatCount(module.artifacts)]
    ]))
  };

  graphData.modules.forEach(module => {
    const card = $(`[data-module="${module.name}"]`);
    if (!card) return;
    $(".module-icon", card).textContent = module.icon;
    $(".module-stats span:first-child b", card).textContent = `${module.sync}%`;
    const second = $(".module-stats span:nth-child(2) b", card);
    if (second) second.textContent = formatCount(module.discoveries);
  });

  const list = $(".activity-panel ul");
  if (list && graphData.signals?.length) {
    list.innerHTML = graphData.signals.slice(0, 3).map(signal => {
      const tone = signal.type === "achievement" ? "amber" : signal.type === "collection" ? "violet" : "cyan";
      return `<li><i class="pulse ${tone}"></i><div><b>${escapeHTML(signal.title)}</b><small>${escapeHTML(signal.detail)}</small></div><time>${escapeHTML(signal.age)}</time></li>`;
    }).join("");
  }

  const profile = graphData.profile || {};
  $(".profile-chip strong") && ($(".profile-chip strong").textContent = (profile.name || "Arjun Kale").toUpperCase());
  $(".profile-chip small") && ($(".profile-chip small").textContent = (profile.role || "Sonic Architect").toUpperCase());
  $(".rank-ring b") && ($(".rank-ring b").textContent = profile.level || 27);
}

function renderGraphConsole() {
  if (!$("#graphNodeList")) return;
  $("#graphNodeCount").textContent = String(graphData.nodes.length).padStart(2, "0");
  $("#graphEdgeCount").textContent = String(graphData.edges.length).padStart(2, "0");
  $("#apiEndpointLabel").textContent = prefs.apiEndpoint || DEFAULT_PREFS.apiEndpoint;
  $("#graphUpdated").textContent = graphData.updatedAt ? new Date(graphData.updatedAt).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "READY";
  $("#graphNodeList").innerHTML = graphData.nodes.map(node => `
    <li>
      <i>${escapeHTML(node.type || "node")}</i>
      <b>${escapeHTML(node.label)}</b>
      <span>${String(node.weight ?? 0).padStart(2, "0")}%</span>
    </li>
  `).join("");
}

function openSettings() {
  applyPrefs();
  $("#settingsPanel").classList.add("open");
}

function closeSettings() {
  $("#settingsPanel").classList.remove("open");
}

$("#settingsButton")?.addEventListener("click", openSettings);
$$("[data-close-settings]").forEach(el => el.addEventListener("click", closeSettings));
$("#themeSwatches")?.addEventListener("click", event => {
  const button = event.target.closest("[data-theme]");
  if (!button) return;
  savePrefs({ ...prefs, theme: button.dataset.theme });
  toast(`${button.dataset.theme.toUpperCase()} theme applied`);
});
$("#savePrefs")?.addEventListener("click", async () => {
  savePrefs({
    ...prefs,
    density: Number($("#densityRange").value),
    bootSkip: $("#bootSkipToggle").checked,
    apiMode: $("#apiMode").value,
    apiEndpoint: $("#apiEndpoint").value.trim() || DEFAULT_PREFS.apiEndpoint
  });
  await loadInstituteData({ notify: true });
  closeSettings();
});
$("#resetPrefs")?.addEventListener("click", async () => {
  localStorage.removeItem(PREF_KEY);
  prefs = { ...DEFAULT_PREFS };
  applyPrefs();
  await loadInstituteData({ notify: true });
  toast("Preferences reset");
});
$("#syncData")?.addEventListener("click", () => loadInstituteData({ notify: true }));

// Search / command palette
const commandState = { items: [] };

function openCommandPalette(seed = "") {
  $("#commandPalette").classList.add("open");
  $("#commandInput").value = seed;
  buildCommandResults(seed);
  requestAnimationFrame(() => $("#commandInput").focus());
}

function closeCommandPalette() {
  $("#commandPalette").classList.remove("open");
}

function commandItems() {
  return [
    { type: "view", title: "Open Core Array", detail: "Go to home dashboard", run: () => setView("home") },
    { type: "view", title: "Talk to DEX", detail: "Open private multilingual chat", run: () => setView("chat") },
    { type: "view", title: "Open Ecosystem Map", detail: "View relationship matrix", run: () => setView("map") },
    { type: "view", title: "Open Data Graph", detail: "Inspect knowledge graph backend", run: () => setView("graph") },
    { type: "view", title: "Open Artifact Archive", detail: "View saved discoveries", run: () => setView("archive") },
    { type: "view", title: "Open Signal Stream", detail: "View real-time intelligence", run: () => setView("signals") },
    { type: "system", title: "Open Settings", detail: "Theme, API, preferences", run: openSettings },
    { type: "system", title: "Sync Institute Data", detail: prefs.apiEndpoint, run: () => loadInstituteData({ notify: true }) },
    { type: "system", title: "Collapse DEX", detail: "Return to floating icon", run: () => $("#nativeCollapse")?.click() },
    ...Object.keys(moduleData).map(name => ({ type: "module", title: `Open ${name}`, detail: moduleData[name].description, run: () => openModule(name) })),
    ...graphData.nodes.map(node => ({ type: node.type || "node", title: node.label, detail: `Graph node - ${node.weight ?? 0}% weight`, run: () => { setView("graph"); toast(`${node.label} selected`); } }))
  ];
}

function buildCommandResults(query = $("#commandInput")?.value || "") {
  const normalized = query.trim().toLowerCase();
  const items = commandItems()
    .filter(item => !normalized || `${item.title} ${item.detail} ${item.type}`.toLowerCase().includes(normalized))
    .slice(0, 9);
  commandState.items = items;
  const results = $("#commandResults");
  if (!results) return;
  results.innerHTML = items.map((item, index) => `
    <li>
      <button data-command-index="${index}">
        <span>${escapeHTML(item.type)}</span>
        <b>${escapeHTML(item.title)}</b>
        <small>${escapeHTML(item.detail || "")}</small>
      </button>
    </li>
  `).join("") || `<li class="empty">No matching command</li>`;
}

function runCommand(index = 0) {
  const item = commandState.items[index];
  if (!item) return;
  closeCommandPalette();
  item.run();
}

$("#commandButton")?.addEventListener("click", () => openCommandPalette());
$("#commandInput")?.addEventListener("input", () => buildCommandResults());
$("#commandInput")?.addEventListener("keydown", event => {
  if (event.key === "Enter") runCommand(0);
});
$("#commandResults")?.addEventListener("click", event => {
  const button = event.target.closest("[data-command-index]");
  if (!button) return;
  runCommand(Number(button.dataset.commandIndex));
});
$$("[data-close-command]").forEach(el => el.addEventListener("click", closeCommandPalette));

addEventListener("keydown", event => {
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommandPalette();
  } else if (!isTyping && event.key === "/") {
    event.preventDefault();
    openCommandPalette();
  } else if (event.key === "Escape") {
    closeSettings();
    closeCommandPalette();
  }
});

// DEX local conversation engine. It stays deterministic and private today,
// while keeping the response boundary ready for a future Institute database.
const chatState = {
  messages: loadConversation(),
  pending: false
};

function loadConversation() {
  try {
    const saved = JSON.parse(localStorage.getItem(CHAT_KEY) || "[]");
    if (Array.isArray(saved) && saved.length) return saved.slice(-60);
  } catch {}
  return [{
    role: "dex",
    tone: "warm",
    language: "hinglish",
    text: "Namaste. Main DEX hoon—Institute of Sound ka private knowledge companion. Hindi, English, Hinglish aur Unicode scripts mein baat karo. Main abhi local Institute data aur conversation memory se jawab deta hoon."
  }];
}

function saveConversation() {
  try {
    localStorage.setItem(CHAT_KEY, JSON.stringify(chatState.messages.slice(-60)));
  } catch {}
}

function detectLanguage(text) {
  if (/[\u0600-\u06ff]/.test(text)) return "arabic";
  if (/[\u0980-\u09ff]/.test(text)) return "bengali";
  if (/[\u0b80-\u0bff]/.test(text)) return "tamil";
  if (/[\u0c00-\u0c7f]/.test(text)) return "telugu";
  if (/[\u0900-\u097f]/.test(text)) return "hindi";
  if (/\b(hai|kya|kaise|mera|mujhe|bhai|batao|dikhao|acha|nahi|haan)\b/i.test(text)) return "hinglish";
  if (/[¿¡]|\b(hola|gracias|como|qué|musica)\b/i.test(text)) return "spanish";
  if (/\b(bonjour|merci|comment|musique|quoi)\b/i.test(text)) return "french";
  return "english";
}

function detectEmotion(text) {
  const value = text.toLowerCase();
  if (/[😢😭💔😞]|\b(sad|dukhi|udaas|hurt|lonely|tired|bura|down)\b/u.test(value)) return "low";
  if (/[😡🤬]|\b(angry|gussa|frustrated|irritated|hate)\b/u.test(value)) return "tense";
  if (/[😍🥳🔥✨😄]|\b(happy|khush|excited|amazing|mast|awesome|love)\b/u.test(value)) return "bright";
  if (/[😰😟]|\b(worried|anxious|dar|scared|confused|tension)\b/u.test(value)) return "anxious";
  return "neutral";
}

function tokenize(text) {
  return text.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(token => token.length > 1);
}

function findKnowledgeMatches(text) {
  const query = new Set(tokenize(text));
  const records = [
    ...graphData.modules.map(module => ({
      kind: "module",
      title: module.name,
      body: module.description,
      score: `${module.sync}% synchronized · ${formatCount(module.discoveries)} discoveries`
    })),
    ...graphData.nodes.map(node => ({
      kind: node.type || "node",
      title: node.label,
      body: `Institute knowledge graph entity with ${node.weight ?? 0}% weight.`,
      score: `${node.weight ?? 0}% graph weight`
    })),
    ...graphData.signals.map(signal => ({
      kind: "signal",
      title: signal.title,
      body: signal.detail,
      score: signal.age
    }))
  ];
  return records.map(record => {
    const haystack = tokenize(`${record.title} ${record.body} ${record.kind}`);
    const relevance = haystack.reduce((total, token) => total + (query.has(token) ? 1 : 0), 0);
    return { ...record, relevance };
  }).filter(record => record.relevance > 0).sort((a, b) => b.relevance - a.relevance).slice(0, 3);
}

function localized(language, key) {
  const messages = {
    thinking: {
      hindi: "मैं सुन रहा हूँ।",
      hinglish: "Main sun raha hoon.",
      spanish: "Te escucho.",
      french: "Je t’écoute.",
      arabic: "أنا أستمع إليك.",
      bengali: "আমি শুনছি।",
      tamil: "நான் கேட்கிறேன்.",
      telugu: "నేను వింటున్నాను.",
      english: "I’m listening."
    },
    noMatch: {
      hindi: "यह जानकारी अभी मेरे स्थानीय Institute डेटा में नहीं मिली। इसे डेटाबेस में जोड़ने पर मैं यहीं से जवाब दूँगा।",
      hinglish: "Ye detail abhi mere local Institute data mein nahi mili. Database connect hote hi main isi chat se answer karunga.",
      spanish: "Aún no encuentro eso en los datos locales del Institute. Podré responder cuando se conecte la base de datos.",
      french: "Je ne trouve pas encore cela dans les données locales de l’Institut. La base de données pourra compléter la réponse.",
      arabic: "لم أجد هذه المعلومة بعد في بيانات المعهد المحلية. سأجيب عنها عند ربط قاعدة البيانات.",
      bengali: "Institute-এর লোকাল ডেটায় এখনো এই তথ্যটি পাইনি। ডেটাবেস যুক্ত হলে এখানেই উত্তর দেব।",
      tamil: "இந்த தகவல் இப்போது உள்ளூர் Institute தரவில் இல்லை. தரவுத்தளம் இணைந்ததும் பதிலளிப்பேன்.",
      telugu: "ఈ సమాచారం ప్రస్తుతం లోకల్ Institute డేటాలో లేదు. డేటాబేస్ కనెక్ట్ అయిన తర్వాత సమాధానం ఇస్తాను.",
      english: "I can’t find that in the local Institute data yet. Once the database is connected, I’ll answer it from this same chat."
    }
  };
  return messages[key]?.[language] || messages[key]?.english || "";
}

function emotionPrefix(language, tone) {
  if (tone === "neutral") return "";
  const prefixes = {
    hinglish: { low: "Lag raha hai ye thoda heavy hai. ", tense: "Main frustration samajh raha hoon. ", bright: "Energy kaafi bright lag rahi hai. ", anxious: "Chalo isko calmly unpack karte hain. " },
    hindi: { low: "लगता है यह थोड़ा भारी है। ", tense: "मैं आपकी परेशानी समझ रहा हूँ। ", bright: "आपकी ऊर्जा बहुत अच्छी लग रही है। ", anxious: "आइए इसे शांति से समझते हैं। " },
    english: { low: "This sounds a little heavy. ", tense: "I can hear the frustration. ", bright: "Your energy feels bright. ", anxious: "Let’s unpack this calmly. " }
  };
  return (prefixes[language] || prefixes.english)[tone] || "";
}

function buildDexReply(text) {
  const language = detectLanguage(text);
  const tone = detectEmotion(text);
  const normalized = text.toLowerCase();
  const prefix = emotionPrefix(language, tone);
  const matches = findKnowledgeMatches(text);

  if (/\b(who are you|tum kaun|aap kaun|who is dex|dex kya)\b/i.test(normalized)) {
    return { language, tone, text: `${prefix}Main DEX hoon—Institute of Sound ka local knowledge aur conversation system. Abhi main app ke apne data, graph aur saved memory par chalta hoon; external AI service use nahi karta.` };
  }
  if (/\b(how am i feeling|emotion|mood|kaisa feel|feeling)\b/i.test(normalized)) {
    const labels = { low: "low / reflective", tense: "tense / frustrated", bright: "bright / excited", anxious: "anxious / uncertain", neutral: "calm / neutral" };
    return { language, tone, text: `${prefix}Tumhare words aur emoji se current tone “${labels[tone]}” lag rahi hai. Ye diagnosis nahi—sirf conversation signal hai, aur tum ise kabhi bhi correct kar sakte ho.` };
  }
  if (/\b(strongest|best dex|highest|sabse strong)\b/i.test(normalized)) {
    const strongest = [...graphData.modules].sort((a, b) => Number(b.sync) - Number(a.sync))[0];
    return { language, tone, text: `${prefix}Abhi ${strongest.name} strongest hai: ${strongest.sync}% synchronized, ${formatCount(strongest.discoveries)} discoveries. ${strongest.description}` };
  }
  if (matches.length) {
    const answer = matches.map(match => `${match.title} — ${match.body} (${match.score})`).join("\n\n");
    return { language, tone, text: `${prefix}${answer}` };
  }
  return { language, tone, text: `${prefix}${localized(language, "noMatch")}` };
}

function renderConversation() {
  const thread = $("#chatThread");
  if (!thread) return;
  thread.innerHTML = chatState.messages.map(message => `
    <article class="chat-message ${message.role === "user" ? "user" : "dex"}" data-tone="${escapeHTML(message.tone || "neutral")}">
      <div class="message-avatar">${message.role === "user" ? "AK" : "D"}</div>
      <div>
        <span>${message.role === "user" ? "YOU" : "DEX"} · ${escapeHTML(message.language || "AUTO")}</span>
        <p>${escapeHTML(message.text).replace(/\n/g, "<br>")}</p>
      </div>
    </article>
  `).join("") + (chatState.pending ? `
    <article class="chat-message dex thinking">
      <div class="message-avatar">D</div>
      <div><span>DEX · PROCESSING</span><p><i></i><i></i><i></i></p></div>
    </article>` : "");
  thread.scrollTop = thread.scrollHeight;
}

function updateEmotionPreview(text) {
  const meter = $("#emotionMeter");
  if (!meter) return;
  const tone = detectEmotion(text);
  meter.dataset.tone = tone;
  meter.querySelector("span").textContent = tone === "neutral" ? "LISTENING" : `TONE: ${tone.toUpperCase()}`;
}

function sendChatMessage(text) {
  const clean = text.trim();
  if (!clean || chatState.pending) return;
  const language = detectLanguage(clean);
  const tone = detectEmotion(clean);
  chatState.messages.push({ role: "user", text: clean, language, tone });
  chatState.pending = true;
  renderConversation();
  const delay = Math.min(900, 320 + clean.length * 4);
  setTimeout(() => {
    chatState.messages.push({ role: "dex", ...buildDexReply(clean) });
    chatState.pending = false;
    saveConversation();
    renderConversation();
  }, delay);
}

$("#chatForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const input = $("#chatInput");
  sendChatMessage(input.value);
  input.value = "";
  input.style.height = "";
  updateEmotionPreview("");
});
$("#chatInput")?.addEventListener("input", event => {
  event.target.style.height = "";
  event.target.style.height = `${Math.min(110, event.target.scrollHeight)}px`;
  updateEmotionPreview(event.target.value);
});
$("#chatInput")?.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    $("#chatForm").requestSubmit();
  }
});
$("#chatSuggestions")?.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (button) sendChatMessage(button.textContent);
});
$("#clearChat")?.addEventListener("click", () => {
  chatState.messages = [];
  try { localStorage.removeItem(CHAT_KEY); } catch {}
  chatState.messages = loadConversation();
  renderConversation();
  toast("Conversation cleared");
});

renderConversation();
loadInstituteData();
