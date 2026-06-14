/* ══════════════════════════════════════════════════
   NYC Lead · Votes · Learning  —  Main App
   ══════════════════════════════════════════════════ */

// ── State ────────────────────────────────────────────
let activeLayer = 'leadLevel';
let selectedDistrict = null;
let radarChart = null;
let scatterChart = null;
let scatterChartWelcome = null;
let geoLayer = null;
let map = null;

// ── Init ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initControls();
  initAboutModal();
  renderWelcomeScatter();
  renderScatterPlot(null);
});

// ── Map ──────────────────────────────────────────────
function initMap() {
  map = L.map('map', {
    center: [40.700, -73.960],
    zoom: 11,
    zoomControl: true,
    preferCanvas: false,
  });

  // Dark tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  renderGeoLayer();
  renderLegend();
}

function getDistrictById(id) {
  return DISTRICTS.find(d => d.id === id);
}

function districtStyle(feature) {
  const d = getDistrictById(feature.properties.districtId);
  if (!d) return {};
  const color = getMetricColor(activeLayer, d[activeLayer]);
  const isSelected = selectedDistrict && selectedDistrict.id === d.id;
  return {
    fillColor: color,
    fillOpacity: isSelected ? 0.90 : 0.70,
    color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.15)',
    weight: isSelected ? 2.5 : 0.8,
  };
}

function renderGeoLayer() {
  if (geoLayer) {
    map.removeLayer(geoLayer);
  }

  geoLayer = L.geoJSON(NYC_GEODATA, {
    style: districtStyle,
    onEachFeature(feature, layer) {
      const d = getDistrictById(feature.properties.districtId);
      if (!d) return;

      layer.bindTooltip(() => {
        const m = METRICS[activeLayer];
        return `<strong>${d.name}</strong><br>${d.neighborhood}<br>
          ${m.icon} ${m.label}: <strong>${m.format(d[activeLayer])}</strong>`;
      }, { className: 'map-tooltip', sticky: true });

      layer.on('click', () => selectDistrict(d, layer));
      layer.on('mouseover', function () {
        if (!selectedDistrict || selectedDistrict.id !== d.id) {
          this.setStyle({ fillOpacity: 0.85, weight: 1.5, color: 'rgba(255,255,255,0.4)' });
        }
      });
      layer.on('mouseout', function () {
        if (!selectedDistrict || selectedDistrict.id !== d.id) {
          geoLayer.resetStyle(this);
        }
      });
    }
  }).addTo(map);
}

// ── District Selection ───────────────────────────────
function selectDistrict(d, clickedLayer) {
  selectedDistrict = d;

  // Reset all styles then highlight selected
  geoLayer.eachLayer(layer => {
    geoLayer.resetStyle(layer);
    const lid = layer.feature.properties.districtId;
    if (lid === d.id) {
      layer.setStyle({
        fillOpacity: 0.90,
        color: '#ffffff',
        weight: 2.5,
      });
      layer.bringToFront();
    }
  });

  showDistrictPanel(d);
}

// ── Sidebar Panel ────────────────────────────────────
function showDistrictPanel(d) {
  const sidebar = document.getElementById('sidebar');
  const welcome = document.getElementById('welcome-panel');
  const detail = document.getElementById('detail-panel');

  welcome.style.display = 'none';
  detail.style.display = 'block';

  // Borough badge class
  const boroughClass = 'borough-' + d.borough.replace(' ', '');

  document.getElementById('district-name').innerHTML =
    `${d.name}<span class="borough-badge ${boroughClass}">${d.borough}</span>`;
  document.getElementById('district-meta').textContent = d.neighborhood;

  renderMetricCards(d);
  renderNarrative(d);
  renderRadarChart(d);
  renderScatterPlot(d);

  // Mobile: open sidebar
  sidebar.classList.add('open');
}

function renderMetricCards(d) {
  const container = document.getElementById('metrics-grid');
  container.innerHTML = '';

  const metricList = [
    { key: 'voterTurnout',   color: 'var(--layer-turnout)',   pct: d.voterTurnout,           max: 1 },
    { key: 'proHealthVotes', color: 'var(--layer-prohealth)', pct: d.proHealthVotes,          max: 1 },
    { key: 'leadLevel',      color: 'var(--layer-lead)',       pct: d.leadLevel / 25,         max: 25 },
    { key: 'schoolScore',    color: 'var(--layer-school)',     pct: d.schoolScore / 100,      max: 100 },
  ];

  for (const { key, color, pct } of metricList) {
    const m = METRICS[key];
    const card = document.createElement('div');
    card.className = 'metric-card';
    card.style.setProperty('--metric-color', color);

    const val = d[key];
    let ratingText = '';
    if (key === 'leadLevel') {
      ratingText = val > 18 ? '⚠️ Critical' : val > 12 ? '⚠️ Elevated' : val > 7 ? '↗ Moderate' : '✓ Low';
    } else {
      const pctVal = typeof val === 'number' && val <= 1 ? val : val / 100;
      ratingText = pctVal > 0.7 ? '↑ High' : pctVal > 0.5 ? '→ Moderate' : '↓ Low';
    }

    card.innerHTML = `
      <span class="metric-icon">${m.icon}</span>
      <div class="metric-label">${m.label}</div>
      <div class="metric-value">${m.format(val)}</div>
      <div class="metric-sub">${ratingText}</div>
      <div class="metric-bar"><div class="metric-bar-fill" style="width:${Math.min(pct * 100, 100)}%"></div></div>
    `;
    container.appendChild(card);
  }
}

function renderNarrative(d) {
  const box = document.getElementById('narrative-box');
  box.textContent = generateNarrative(d);
  box.className = 'narrative-box';
  if (d.leadLevel > 15) box.className += ' lead-high';
  else if (d.leadLevel > 8) box.className += ' lead-mid';
  else box.className += ' lead-low';
}

// ── Radar Chart ──────────────────────────────────────
function renderRadarChart(d) {
  if (radarChart) { radarChart.destroy(); radarChart = null; }

  // Normalize each metric to 0-100 for radar
  const normalize = {
    voterTurnout:   d.voterTurnout * 100,
    proHealthVotes: d.proHealthVotes * 100,
    leadLevel:      Math.max(0, 100 - ((d.leadLevel / 25) * 100)), // inverted: low lead = high score
    schoolScore:    d.schoolScore,
  };

  const ctx = document.getElementById('radarChart').getContext('2d');
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Voter\nTurnout', 'Pro-Health\nVotes', 'Clean\nWater', 'School\nScore'],
      datasets: [{
        label: d.name,
        data: [
          normalize.voterTurnout,
          normalize.proHealthVotes,
          normalize.leadLevel,
          normalize.schoolScore,
        ],
        backgroundColor: 'rgba(79, 195, 247, 0.15)',
        borderColor: '#4fc3f7',
        pointBackgroundColor: '#4fc3f7',
        pointRadius: 4,
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.raw.toFixed(1)} / 100`
          }
        }
      },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: {
            display: false,
            stepSize: 25,
          },
          pointLabels: {
            color: '#8890aa',
            font: { size: 10 },
          },
          grid: { color: '#2c3150' },
          angleLines: { color: '#2c3150' },
        }
      }
    }
  });
}

// ── Welcome Scatter (no selected district) ────────────
function renderWelcomeScatter() {
  if (scatterChartWelcome) { scatterChartWelcome.destroy(); scatterChartWelcome = null; }
  const ctx = document.getElementById('scatterChartWelcome');
  if (!ctx) return;
  scatterChartWelcome = buildScatterChart(ctx, null);
  const corr = pearsonCorrelation(DISTRICTS.map(d => d.leadLevel), DISTRICTS.map(d => d.schoolScore));
  const el = document.getElementById('scatter-corr-welcome');
  if (el) el.innerHTML = `<span class="corr-badge corr-neg">r = ${corr.toFixed(2)} — Strong negative correlation</span>`;
}

// ── Scatter Plot ─────────────────────────────────────
function renderScatterPlot(selectedD) {
  if (scatterChart) { scatterChart.destroy(); scatterChart = null; }

  const ctx = document.getElementById('scatterChart');
  if (!ctx) return;
  scatterChart = buildScatterChart(ctx, selectedD);

  // Correlation label
  const corr = pearsonCorrelation(
    DISTRICTS.map(d => d.leadLevel),
    DISTRICTS.map(d => d.schoolScore)
  );
  const corrEl = document.getElementById('scatter-corr');
  if (corrEl) corrEl.innerHTML = `<span class="corr-badge ${corr < 0 ? 'corr-neg' : 'corr-pos'}">
    r = ${corr.toFixed(2)} &nbsp; ${corr < -0.5 ? '— Strong negative correlation' : corr < 0 ? '— Weak negative' : '— Positive'}
  </span>`;
}

function buildScatterChart(canvasEl, selectedD) {
  const points = DISTRICTS.map(d => ({
    x: d.leadLevel,
    y: d.schoolScore,
    districtId: d.id,
    label: d.name,
    isSelected: selectedD && d.id === selectedD.id,
  }));

  const regular = points.filter(p => !p.isSelected);
  const selected = points.filter(p => p.isSelected);

  return new Chart(canvasEl.getContext('2d'), {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Districts',
          data: regular.map(p => ({ x: p.x, y: p.y })),
          backgroundColor: 'rgba(79, 195, 247, 0.35)',
          borderColor: 'rgba(79, 195, 247, 0.6)',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: selectedD ? selectedD.name : '',
          data: selected.map(p => ({ x: p.x, y: p.y })),
          backgroundColor: '#ff5252',
          borderColor: '#ff5252',
          pointRadius: 7,
          pointHoverRadius: 9,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              const p = points.find(pt => Math.abs(pt.x - ctx.raw.x) < 0.01 && pt.y === ctx.raw.y);
              return p ? `${p.label}: ${p.x} ppb, ${p.y}/100` : `${ctx.raw.x} ppb, ${ctx.raw.y}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Lead Level (ppb)', color: '#8890aa', font: { size: 10 } },
          ticks: { color: '#8890aa', font: { size: 9 } },
          grid: { color: '#2c3150' },
          border: { color: '#2c3150' },
        },
        y: {
          title: { display: true, text: 'School Score', color: '#8890aa', font: { size: 10 } },
          ticks: { color: '#8890aa', font: { size: 9 } },
          grid: { color: '#2c3150' },
          border: { color: '#2c3150' },
        }
      }
    }
  });
}

function pearsonCorrelation(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0, sx = 0, sy = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    sx  += (xs[i] - mx) ** 2;
    sy  += (ys[i] - my) ** 2;
  }
  return num / Math.sqrt(sx * sy);
}

// ── Legend ───────────────────────────────────────────
function renderLegend() {
  const m = METRICS[activeLayer];
  document.getElementById('legend-title').textContent = m.label;

  const scale = document.getElementById('legend-scale');
  scale.innerHTML = '';

  const pairs = [
    { label: m.format(m.thresholds[0]), color: m.colors[0] },
    { label: m.format(m.thresholds[1]), color: m.colors[1] },
    { label: m.format(m.thresholds[2]), color: m.colors[2] },
    { label: m.format(m.thresholds[3]), color: m.colors[3] },
    { label: m.format(m.thresholds[4]) + '+', color: m.colors[4] },
  ];

  for (const { label, color } of pairs) {
    scale.innerHTML += `
      <div class="legend-item">
        <div class="legend-swatch" style="background:${color}"></div>
        <span>${label}</span>
      </div>`;
  }
}

// ── Layer Controls ───────────────────────────────────
function initControls() {
  document.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const layer = btn.dataset.layer;
      if (layer === activeLayer) return;
      activeLayer = layer;

      document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Re-render map colors
      if (geoLayer) {
        geoLayer.eachLayer(l => {
          const d = getDistrictById(l.feature.properties.districtId);
          if (!d) return;
          const isSelected = selectedDistrict && selectedDistrict.id === d.id;
          l.setStyle({
            fillColor: getMetricColor(activeLayer, d[activeLayer]),
            fillOpacity: isSelected ? 0.90 : 0.70,
            color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.15)',
            weight: isSelected ? 2.5 : 0.8,
          });
        });
      }

      renderLegend();

      // Update tooltip (re-bind tooltips after layer change)
      if (geoLayer) {
        geoLayer.eachLayer(l => {
          const d = getDistrictById(l.feature.properties.districtId);
          if (!d) return;
          l.setTooltipContent(() => {
            const m = METRICS[activeLayer];
            return `<strong>${d.name}</strong><br>${d.neighborhood}<br>
              ${m.icon} ${m.label}: <strong>${m.format(d[activeLayer])}</strong>`;
          });
        });
      }
    });
  });

  // Sidebar toggle (mobile)
  const toggleBtn = document.getElementById('sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('open');
    });
  }
}

// ── About Modal ──────────────────────────────────────
function initAboutModal() {
  const overlay = document.getElementById('about-overlay');
  const openBtn = document.getElementById('about-btn');
  const closeBtn = document.getElementById('about-close');

  openBtn.addEventListener('click', () => overlay.classList.add('open'));
  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
}
