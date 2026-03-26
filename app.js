/**
 * Earth Month – Sustainability Challenge Tracker
 * app.js
 */

'use strict';

// ─── Data ────────────────────────────────────────────────────────────────────

const CHALLENGES = [
  { day: 1,  icon: '🚶', title: 'Walk or cycle',           category: 'transport', points: 10, co2: 1.2, desc: 'Leave the car at home and travel on foot or by bike today.' },
  { day: 2,  icon: '🥗', title: 'Go meat-free',            category: 'food',      points: 8,  co2: 2.5, desc: 'Enjoy a fully plant-based meal for the whole day.' },
  { day: 3,  icon: '💧', title: 'Shorter shower',          category: 'water',     points: 6,  co2: 0.3, desc: 'Cut your shower to 4 minutes or less.' },
  { day: 4,  icon: '♻️', title: 'Sort your recycling',     category: 'waste',     points: 7,  co2: 0.8, desc: 'Properly separate all recyclables from general waste today.' },
  { day: 5,  icon: '🔌', title: 'Unplug standby devices',  category: 'energy',    points: 5,  co2: 0.5, desc: 'Switch off devices at the wall instead of leaving on standby.' },
  { day: 6,  icon: '🛍️', title: 'Refuse single-use plastic', category: 'waste',   points: 8,  co2: 0.4, desc: 'Use a reusable bag, cup, or bottle for every purchase today.' },
  { day: 7,  icon: '🚌', title: 'Use public transport',    category: 'transport', points: 10, co2: 1.8, desc: 'Take the bus, tram, or train for your daily commute.' },
  { day: 8,  icon: '🌱', title: 'Plant something',         category: 'food',      points: 12, co2: 0.1, desc: 'Plant a herb, vegetable, or tree – indoors or outdoors.' },
  { day: 9,  icon: '💡', title: 'Switch to LEDs',          category: 'energy',    points: 10, co2: 1.0, desc: 'Replace at least one incandescent bulb with an LED alternative.' },
  { day: 10, icon: '🍱', title: 'Pack a zero-waste lunch', category: 'waste',     points: 7,  co2: 0.3, desc: 'Bring lunch in reusable containers with no single-use packaging.' },
  { day: 11, icon: '🚿', title: 'Cold-finish shower',      category: 'water',     points: 5,  co2: 0.4, desc: 'End your shower with 30 seconds of cold water to save hot-water energy.' },
  { day: 12, icon: '🏡', title: 'Home energy audit',       category: 'energy',    points: 15, co2: 0.0, desc: 'Identify the top 3 energy wasters in your home and plan to fix them.' },
  { day: 13, icon: '🧺', title: 'Air-dry laundry',         category: 'energy',    points: 8,  co2: 1.5, desc: 'Skip the tumble dryer and hang-dry your laundry.' },
  { day: 14, icon: '🛒', title: 'Buy local produce',       category: 'food',      points: 10, co2: 0.9, desc: 'Choose locally grown or produced food to reduce transport emissions.' },
  { day: 15, icon: '🚲', title: 'Bike to work / school',   category: 'transport', points: 12, co2: 2.0, desc: 'Cycle all the way to your destination today.' },
  { day: 16, icon: '🌊', title: 'Fix a dripping tap',      category: 'water',     points: 10, co2: 0.1, desc: 'A dripping tap wastes up to 15 litres a day – get it fixed!' },
  { day: 17, icon: '📦', title: 'Buy second-hand',         category: 'waste',     points: 12, co2: 1.5, desc: 'Choose a pre-loved item instead of buying something new.' },
  { day: 18, icon: '🌡️', title: 'Lower the thermostat',   category: 'energy',    points: 8,  co2: 2.0, desc: "Turn down heating by 1°C – you'll barely notice but the planet will." },
  { day: 19, icon: '🥕', title: 'Eat seasonal food',       category: 'food',      points: 8,  co2: 0.7, desc: 'Check what is in season and build your meals around it.' },
  { day: 20, icon: '🗑️', title: 'Compost food scraps',    category: 'waste',     points: 10, co2: 1.2, desc: 'Start or add to a compost bin – kitchen scraps become garden gold.' },
  { day: 21, icon: '🌿', title: 'Meatless Monday',         category: 'food',      points: 8,  co2: 2.5, desc: 'Commit to skipping meat every Monday this month (and beyond!).' },
  { day: 22, icon: '🌍', title: 'Earth Day – Share it!',  category: 'waste',     points: 15, co2: 0.0, desc: 'Post about your Earth Month journey to inspire others.' },
  { day: 23, icon: '🔋', title: 'Charge devices wisely',  category: 'energy',    points: 5,  co2: 0.3, desc: 'Unplug chargers once devices are full and avoid overnight charging.' },
  { day: 24, icon: '🚰', title: 'Cold-wash laundry',       category: 'water',     points: 7,  co2: 0.6, desc: 'Wash clothes at 30°C instead of 60°C to cut energy use by 60%.' },
  { day: 25, icon: '🏙️', title: 'Carpool today',          category: 'transport', points: 10, co2: 1.5, desc: 'Share a ride with a colleague, friend, or via a rideshare app.' },
  { day: 26, icon: '🍳', title: 'Waste-free cooking',      category: 'food',      points: 8,  co2: 0.5, desc: 'Use up leftovers and food scraps creatively – zero food waste today.' },
  { day: 27, icon: '🌞', title: 'Use natural light',       category: 'energy',    points: 5,  co2: 0.2, desc: 'Open the curtains and avoid switching on lights during daylight hours.' },
  { day: 28, icon: '🧴', title: 'Switch to bar soap/shampoo', category: 'waste',  points: 8,  co2: 0.3, desc: 'Replace a plastic-bottled product with a solid bar alternative.' },
  { day: 29, icon: '🧹', title: 'Community clean-up',      category: 'waste',     points: 20, co2: 0.0, desc: 'Spend 30 minutes picking up litter in your neighbourhood.' },
  { day: 30, icon: '🎉', title: 'Pledge to continue',      category: 'transport', points: 25, co2: 0.0, desc: 'Write down 3 sustainable habits you will keep after Earth Month ends.' },
];

const TIPS = [
  { icon: '🌿', category: 'Diet', text: 'Swap one meal a day to a plant-based option. Even small dietary shifts significantly reduce greenhouse gas emissions.' },
  { icon: '🚴', category: 'Transport', text: 'Cycling just two days a week instead of driving can cut your transport carbon footprint by up to 50%.' },
  { icon: '💡', category: 'Energy', text: 'Set your devices to dark mode and lower screen brightness — it saves battery life and reduces energy consumption.' },
  { icon: '🛁', category: 'Water', text: 'Turn off the tap while brushing your teeth. You can save up to 8 litres of water per minute.' },
  { icon: '🛍️', category: 'Shopping', text: 'Before buying something new, ask: do I really need this? Can I borrow, rent, or buy it second-hand?' },
  { icon: '🌳', category: 'Nature', text: 'Spend time in nature — it strengthens your connection to the environment and motivates sustainable choices.' },
  { icon: '♻️', category: 'Waste', text: 'Recycle correctly. Contaminated recycling often ends up in landfill — rinse containers before placing them in the recycling bin.' },
  { icon: '🍎', category: 'Food', text: 'Plan your meals for the week to avoid overbuying and food waste. Around 30% of all food produced globally is wasted.' },
  { icon: '🔌', category: 'Energy', text: 'Switch to a renewable energy tariff — in many countries you can choose a green energy supplier with just a phone call.' },
  { icon: '☁️', category: 'Digital', text: "Streaming video in HD uses 3× more energy than SD. Lower your video quality when you don't need full resolution." },
];

/** Emission factors (kg CO₂ per unit) */
const EMISSION_FACTORS = {
  transport: { 'car-petrol': 0.192, 'car-diesel': 0.171, 'car-electric': 0.053, 'public-transit': 0.089, 'bike-walk': 0 },
  diet:      { 'meat-heavy': 155, 'average': 100, 'vegetarian': 70, 'vegan': 50 },
  energy:    0.233, // kg CO₂ per kWh (UK grid average)
};

// ─── State ───────────────────────────────────────────────────────────────────

const state = {
  completed: new Set(loadStorage('completed') || []),
  currentTip: 0,
  currentFilter: 'all',
};

function loadStorage(key) {
  try {
    const raw = localStorage.getItem('earth-month-' + key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem('earth-month-' + key, JSON.stringify(value));
  } catch (_) { /* storage unavailable */ }
}

// ─── Challenge grid ───────────────────────────────────────────────────────────

function renderChallenges() {
  const grid = document.getElementById('challenge-grid');
  grid.innerHTML = '';

  CHALLENGES.forEach(ch => {
    const card = document.createElement('div');
    card.className = 'challenge-card' +
      (state.completed.has(ch.day) ? ' completed' : '') +
      (state.currentFilter !== 'all' && ch.category !== state.currentFilter ? ' hidden-card' : '');
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `Day ${ch.day}: ${ch.title}`);
    card.dataset.day = ch.day;

    card.innerHTML = `
      <span class="challenge-day">Day ${ch.day}</span>
      <span class="challenge-icon" aria-hidden="true">${ch.icon}</span>
      <span class="challenge-title">${escapeHtml(ch.title)}</span>
      <span class="challenge-desc">${escapeHtml(ch.desc)}</span>
      <div class="challenge-meta">
        <span class="challenge-points">+${ch.points} pts</span>
        <span class="challenge-badge badge-${ch.category}">${ch.category}</span>
      </div>
    `;

    card.addEventListener('click', () => toggleChallenge(ch.day));
    grid.appendChild(card);
  });
}

function toggleChallenge(day) {
  if (state.completed.has(day)) {
    state.completed.delete(day);
  } else {
    state.completed.add(day);
  }
  saveStorage('completed', [...state.completed]);
  renderChallenges();
  updateSummary();
}

function updateSummary() {
  const completedChallenges = CHALLENGES.filter(ch => state.completed.has(ch.day));
  const points = completedChallenges.reduce((sum, ch) => sum + ch.points, 0);
  const co2    = completedChallenges.reduce((sum, ch) => sum + ch.co2,    0);

  document.getElementById('completed-count').textContent = state.completed.size;
  document.getElementById('points-total').textContent    = points;
  document.getElementById('co2-saved').textContent       = co2.toFixed(1);
}

// ─── Filter buttons ───────────────────────────────────────────────────────────

function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentFilter = btn.dataset.filter;
      renderChallenges();
    });
  });
}

// ─── Carbon footprint estimator ───────────────────────────────────────────────

function initFootprintForm() {
  document.getElementById('footprint-form').addEventListener('submit', e => {
    e.preventDefault();
    calculateFootprint();
  });
}

function calculateFootprint() {
  const mode   = document.getElementById('transport-mode').value;
  const kmWeek = Math.max(0, parseFloat(document.getElementById('km-per-week').value) || 0);
  const diet   = document.getElementById('diet-type').value;
  const kwhMo  = Math.max(0, parseFloat(document.getElementById('energy-kwh').value) || 0);

  const transportMonthly = (kmWeek * 4.33) * (EMISSION_FACTORS.transport[mode] || 0);
  const dietMonthly      = EMISSION_FACTORS.diet[diet] || 0;
  const energyMonthly    = kwhMo * EMISSION_FACTORS.energy;

  const total = transportMonthly + dietMonthly + energyMonthly;
  const totalRounded = Math.round(total);

  const MAX_GAUGE = 600;
  const pct = Math.min(100, (total / MAX_GAUGE) * 100);

  document.getElementById('footprint-result').classList.remove('hidden');
  document.getElementById('footprint-kg').textContent = totalRounded;
  document.getElementById('gauge-fill').style.width   = pct + '%';

  const tip = getFootprintTip(total, mode, diet);
  document.getElementById('footprint-tip').textContent = tip;
}

function getFootprintTip(total, mode, diet) {
  if (total < 150) return '🌟 Excellent! Your footprint is well below average. Keep it up!';
  if (total < 300) return '👍 Good work! You\'re below the average monthly footprint. Small tweaks in diet or transport can push you even lower.';
  if (mode === 'car-petrol' || mode === 'car-diesel') {
    return '🚌 Your biggest win would be switching some car journeys to public transport, cycling, or carpooling.';
  }
  if (diet === 'meat-heavy' || diet === 'average') {
    return '🥗 Reducing meat (especially beef) even one day a week could cut your monthly footprint by 10–20 kg CO₂.';
  }
  return '🏠 Review your home energy use — better insulation, a smart thermostat, or switching to renewables can make a big difference.';
}

// ─── Tips carousel ────────────────────────────────────────────────────────────

function initTipsCarousel() {
  renderTip();
  renderDots();

  document.getElementById('prev-tip').addEventListener('click', () => {
    state.currentTip = (state.currentTip - 1 + TIPS.length) % TIPS.length;
    renderTip();
    updateDots();
  });

  document.getElementById('next-tip').addEventListener('click', () => {
    state.currentTip = (state.currentTip + 1) % TIPS.length;
    renderTip();
    updateDots();
  });

  // Auto-advance every 8 seconds
  setInterval(() => {
    state.currentTip = (state.currentTip + 1) % TIPS.length;
    renderTip();
    updateDots();
  }, 8000);
}

function renderTip() {
  const tip  = TIPS[state.currentTip];
  const card = document.getElementById('tip-card');
  card.innerHTML = `
    <span class="tip-icon" aria-hidden="true">${tip.icon}</span>
    <span class="tip-category">${escapeHtml(tip.category)}</span>
    <p class="tip-text">${escapeHtml(tip.text)}</p>
  `;
}

function renderDots() {
  const container = document.getElementById('tip-dots');
  container.innerHTML = '';
  TIPS.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      state.currentTip = i;
      renderTip();
      updateDots();
    });
    container.appendChild(dot);
  });
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === state.currentTip);
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

function init() {
  renderChallenges();
  updateSummary();
  initFilters();
  initFootprintForm();
  initTipsCarousel();
}

document.addEventListener('DOMContentLoaded', init);
