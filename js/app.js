/* ══════════════════════════════════════════════════
   NYC Lead · Votes · Learning  —  Main Application
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
});

// ── Map ──────────────────────────────────────────────
function initMap() {
  map = L.map('map', {
    center: [40.700, -73.960],
    zoom: 11,
    zoomControl: true,
    preferCanvas: false,
  });

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
    fillOpacity: isSelected ? 0.88 : 0.68,
    color: isSelected ? '#e8ecf4' : 'rgba(255,255,255,0.12)',
    weight: isSelected ? 2 : 0.7,
  };
}

function renderGeoLayer() {
  if (geoLayer) map.removeLayer(geoLayer);

  geoLayer = L.geoJSON(NYC_GEODATA, {
    style: districtStyle,
    onEachFeature(feature, layer) {
      const d = getDistrictById(feature.properties.districtId);
      if (!d) return;

      layer.bindTooltip(() => {
        const m = METRICS[activeLayer];
        return `<strong>${d.name}</strong><br><span style="color:#9aa3bc">${d.neighborhood}</span><br>${m.label}: <strong>${m.format(d[activeLayer])}</strong>`;
      }, { sticky: true });

      layer.on('click', () => selectDistrict(d));
      layer.on('mouseover', function () {
        if (!selectedDistrict || selectedDistrict.id !== d.id) {
          this.setStyle({ fillOpacity: 0.82, weight: 1.2, color: 'rgba(255,255,255,0.35)' });
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
function selectDistrict(d) {
  selectedDistrict = d;

  geoLayer.eachLayer(layer => {
    geoLayer.resetStyle(layer);
    if (layer.feature.properties.districtId === d.id) {
      layer.setStyle({ fillOpacity: 0.88, color: '#e8ecf4', weight: 2 });
      layer.bringToFront();
    }
  });

  showDistrictPanel(d);

  // Hide the map hint once a district is clicked
  const note = document.getElementById('map-note');
  if (note) note.classList.add('hidden');
}

// ── Sidebar Panel ────────────────────────────────────
function showDistrictPanel(d) {
  document.getElementById('welcome-panel').style.display = 'none';
  const detail = document.getElementById('detail-panel');
  detail.style.display = 'flex';
  detail.style.flexDirection = 'column';

  const boroughClass = 'borough-' + d.borough.replace(' ', '');
  document.getElementById('district-name').textContent = d.name;
  const badge = document.getElementById('borough-badge');
  badge.textContent = d.borough;
  badge.className = `borough-badge ${boroughClass}`;
  document.getElementById('district-meta').textContent = d.neighborhood;

  renderMetricCards(d);
  renderNarrative(d);
  renderRadarChart(d);
  renderScatterPlot(d);

  document.getElementById('sidebar').classList.add('open');
}

function renderMetricCards(d) {
  const container = document.getElementById('metrics-grid');
  container.innerHTML = '';

  const metricList = [
    { key: 'voterTurnout',   color: 'var(--layer-turnout)',   pct: d.voterTurnout },
    { key: 'proHealthVotes', color: 'var(--layer-prohealth)', pct: d.proHealthVotes },
    { key: 'leadLevel',      color: 'var(--layer-lead)',       pct: d.leadLevel / 25 },
    { key: 'schoolScore',    color: 'var(--layer-school)',     pct: d.schoolScore / 100 },
  ];

  for (const { key, color, pct } of metricList) {
    const m = METRICS[key];
    const val = d[key];
    const card = document.createElement('div');
    card.className = 'metric-card';
    card.style.setProperty('--metric-color', color);

    let rating = '';
    if (key === 'leadLevel') {
      rating = val > 18 ? 'Critical' : val > 12 ? 'Elevated' : val > 7 ? 'Moderate' : 'Low';
    } else {
      const p = val <= 1 ? val : val / 100;
      rating = p > 0.7 ? 'High' : p > 0.5 ? 'Moderate' : 'Low';
    }

    card.innerHTML = `
      <div class="metric-label">${m.label}</div>
      <div class="metric-value">${m.format(val)}</div>
      <div class="metric-rating">${rating}</div>
      <div class="metric-bar"><div class="metric-bar-fill" style="width:${Math.min(pct * 100, 100)}%"></div></div>
    `;
    container.appendChild(card);
  }
}

function renderNarrative(d) {
  const box = document.getElementById('narrative-box');
  box.textContent = generateNarrative(d);
  // Accent color on left border based on lead level
  const color = d.leadLevel > 15
    ? 'var(--layer-lead)'
    : d.leadLevel > 8
      ? 'var(--amber)'
      : 'var(--layer-prohealth)';
  box.style.setProperty('--narrative-color', color);
}

// ── Radar Chart ──────────────────────────────────────
function renderRadarChart(d) {
  if (radarChart) { radarChart.destroy(); radarChart = null; }

  const data = [
    d.voterTurnout * 100,
    d.proHealthVotes * 100,
    Math.max(0, 100 - (d.leadLevel / 25) * 100),
    d.schoolScore,
  ];

  const ctx = document.getElementById('radarChart').getContext('2d');
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Voter Turnout', 'Health Mandate', 'Water Quality', 'Educational Outcomes'],
      datasets: [{
        label: d.name,
        data,
        backgroundColor: 'rgba(91, 200, 245, 0.12)',
        borderColor: '#5bc8f5',
        pointBackgroundColor: '#5bc8f5',
        pointRadius: 3,
        borderWidth: 1.5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => `${ctx.raw.toFixed(1)} / 100` } }
      },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { display: false },
          pointLabels: {
            color: '#606880',
            font: { size: 9, family: 'Inter, system-ui' },
          },
          grid: { color: '#1c1f30' },
          angleLines: { color: '#1c1f30' },
        }
      }
    }
  });
}

// ── Welcome Scatter ───────────────────────────────────
function renderWelcomeScatter() {
  if (scatterChartWelcome) { scatterChartWelcome.destroy(); scatterChartWelcome = null; }
  const canvas = document.getElementById('scatterChartWelcome');
  if (!canvas) return;
  scatterChartWelcome = buildScatterChart(canvas, null);
  const corr = pearsonCorrelation(
    DISTRICTS.map(d => d.leadLevel),
    DISTRICTS.map(d => d.schoolScore)
  );
  const el = document.getElementById('scatter-corr-welcome');
  if (el) el.innerHTML = `<span class="corr-badge corr-neg">Pearson r = ${corr.toFixed(2)} &mdash; Strong negative correlation across all 59 districts</span>`;
}

// ── Scatter Plot (detail panel) ───────────────────────
function renderScatterPlot(selectedD) {
  if (scatterChart) { scatterChart.destroy(); scatterChart = null; }
  const canvas = document.getElementById('scatterChart');
  if (!canvas) return;
  scatterChart = buildScatterChart(canvas, selectedD);

  const corr = pearsonCorrelation(
    DISTRICTS.map(d => d.leadLevel),
    DISTRICTS.map(d => d.schoolScore)
  );
  const el = document.getElementById('scatter-corr');
  if (el) el.innerHTML = `<span class="corr-badge corr-neg">Pearson r = ${corr.toFixed(2)} &mdash; Strong negative correlation</span>`;
}

function buildScatterChart(canvasEl, selectedD) {
  const points = DISTRICTS.map(d => ({
    x: d.leadLevel,
    y: d.schoolScore,
    label: d.name,
    isSelected: selectedD && d.id === selectedD.id,
  }));

  const regular  = points.filter(p => !p.isSelected).map(p => ({ x: p.x, y: p.y }));
  const selected = points.filter(p => p.isSelected).map(p => ({ x: p.x, y: p.y }));

  return new Chart(canvasEl.getContext('2d'), {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'All districts',
          data: regular,
          backgroundColor: 'rgba(91, 200, 245, 0.3)',
          borderColor: 'rgba(91, 200, 245, 0.5)',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: selectedD ? selectedD.name : '',
          data: selected,
          backgroundColor: '#f5a623',
          borderColor: '#f5a623',
          pointRadius: 6,
          pointHoverRadius: 8,
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
              return p ? `${p.label}: ${p.x} ppb — Score ${p.y}` : `${ctx.raw.x} ppb`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Lead Concentration (ppb)', color: '#606880', font: { size: 10 } },
          ticks: { color: '#606880', font: { size: 9 } },
          grid: { color: '#1c1f30' },
          border: { color: '#1c1f30' },
        },
        y: {
          title: { display: true, text: 'Educational Outcomes Index', color: '#606880', font: { size: 10 } },
          ticks: { color: '#606880', font: { size: 9 } },
          grid: { color: '#1c1f30' },
          border: { color: '#1c1f30' },
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
  document.getElementById('legend-subtitle').textContent = m.legendSub || '';

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

      if (geoLayer) {
        geoLayer.eachLayer(l => {
          const d = getDistrictById(l.feature.properties.districtId);
          if (!d) return;
          const isSelected = selectedDistrict && selectedDistrict.id === d.id;
          l.setStyle({
            fillColor: getMetricColor(activeLayer, d[activeLayer]),
            fillOpacity: isSelected ? 0.88 : 0.68,
            color: isSelected ? '#e8ecf4' : 'rgba(255,255,255,0.12)',
            weight: isSelected ? 2 : 0.7,
          });
          // Refresh tooltip
          const m = METRICS[activeLayer];
          l.setTooltipContent(
            `<strong>${d.name}</strong><br><span style="color:#9aa3bc">${d.neighborhood}</span><br>${m.label}: <strong>${m.format(d[activeLayer])}</strong>`
          );
        });
      }

      renderLegend();
    });
  });

  const toggleBtn = document.getElementById('sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });
  }
}

// ── About Modal ──────────────────────────────────────
function initAboutModal() {
  const overlay = document.getElementById('about-overlay');
  document.getElementById('about-btn').addEventListener('click', () => overlay.classList.add('open'));
  document.getElementById('about-close').addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
}
