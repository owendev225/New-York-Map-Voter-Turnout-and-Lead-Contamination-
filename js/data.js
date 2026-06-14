// Simulated data for NYC Community Districts
// Story: High lead → low school scores → low voter turnout → less pro-health voting
// Data is illustrative and for educational/visualization purposes only

const DISTRICTS = [
  // ─── MANHATTAN (CD 1–12) ────────────────────────────────────────────────
  { id: 1,  borough: "Manhattan", name: "Manhattan CD 1",  neighborhood: "Financial District / Battery Park", voterTurnout: 0.68, proHealthVotes: 0.71, leadLevel: 3.1,  schoolScore: 88 },
  { id: 2,  borough: "Manhattan", name: "Manhattan CD 2",  neighborhood: "Greenwich Village / SoHo",          voterTurnout: 0.72, proHealthVotes: 0.78, leadLevel: 2.8,  schoolScore: 91 },
  { id: 3,  borough: "Manhattan", name: "Manhattan CD 3",  neighborhood: "Lower East Side / Chinatown",      voterTurnout: 0.52, proHealthVotes: 0.63, leadLevel: 7.4,  schoolScore: 68 },
  { id: 4,  borough: "Manhattan", name: "Manhattan CD 4",  neighborhood: "Chelsea / Hell's Kitchen",         voterTurnout: 0.65, proHealthVotes: 0.74, leadLevel: 4.2,  schoolScore: 83 },
  { id: 5,  borough: "Manhattan", name: "Manhattan CD 5",  neighborhood: "Midtown",                          voterTurnout: 0.60, proHealthVotes: 0.65, leadLevel: 3.9,  schoolScore: 82 },
  { id: 6,  borough: "Manhattan", name: "Manhattan CD 6",  neighborhood: "Stuyvesant Town / Turtle Bay",    voterTurnout: 0.70, proHealthVotes: 0.69, leadLevel: 3.3,  schoolScore: 87 },
  { id: 7,  borough: "Manhattan", name: "Manhattan CD 7",  neighborhood: "Upper West Side",                  voterTurnout: 0.74, proHealthVotes: 0.80, leadLevel: 2.6,  schoolScore: 93 },
  { id: 8,  borough: "Manhattan", name: "Manhattan CD 8",  neighborhood: "Upper East Side / Yorkville",      voterTurnout: 0.73, proHealthVotes: 0.66, leadLevel: 2.9,  schoolScore: 92 },
  { id: 9,  borough: "Manhattan", name: "Manhattan CD 9",  neighborhood: "Morningside Heights / West Harlem",voterTurnout: 0.55, proHealthVotes: 0.67, leadLevel: 8.1,  schoolScore: 65 },
  { id: 10, borough: "Manhattan", name: "Manhattan CD 10", neighborhood: "Central Harlem",                   voterTurnout: 0.51, proHealthVotes: 0.68, leadLevel: 9.6,  schoolScore: 61 },
  { id: 11, borough: "Manhattan", name: "Manhattan CD 11", neighborhood: "East Harlem",                      voterTurnout: 0.48, proHealthVotes: 0.65, leadLevel: 11.2, schoolScore: 57 },
  { id: 12, borough: "Manhattan", name: "Manhattan CD 12", neighborhood: "Washington Heights / Inwood",      voterTurnout: 0.46, proHealthVotes: 0.62, leadLevel: 10.8, schoolScore: 59 },

  // ─── BRONX (CD 13–24) ───────────────────────────────────────────────────
  { id: 13, borough: "Bronx",     name: "Bronx CD 1",      neighborhood: "Mott Haven / Port Morris",         voterTurnout: 0.38, proHealthVotes: 0.55, leadLevel: 22.4, schoolScore: 42 },
  { id: 14, borough: "Bronx",     name: "Bronx CD 2",      neighborhood: "Hunts Point / Longwood",          voterTurnout: 0.36, proHealthVotes: 0.52, leadLevel: 23.8, schoolScore: 40 },
  { id: 15, borough: "Bronx",     name: "Bronx CD 3",      neighborhood: "Morrisania / Crotona Park E.",     voterTurnout: 0.39, proHealthVotes: 0.56, leadLevel: 21.1, schoolScore: 43 },
  { id: 16, borough: "Bronx",     name: "Bronx CD 4",      neighborhood: "Concourse / Highbridge",           voterTurnout: 0.41, proHealthVotes: 0.58, leadLevel: 19.7, schoolScore: 46 },
  { id: 17, borough: "Bronx",     name: "Bronx CD 5",      neighborhood: "University Heights / Fordham",    voterTurnout: 0.43, proHealthVotes: 0.60, leadLevel: 18.3, schoolScore: 48 },
  { id: 18, borough: "Bronx",     name: "Bronx CD 6",      neighborhood: "Belmont / East Tremont",           voterTurnout: 0.40, proHealthVotes: 0.57, leadLevel: 20.5, schoolScore: 45 },
  { id: 19, borough: "Bronx",     name: "Bronx CD 7",      neighborhood: "Kingsbridge / Riverdale",          voterTurnout: 0.58, proHealthVotes: 0.67, leadLevel: 8.9,  schoolScore: 69 },
  { id: 20, borough: "Bronx",     name: "Bronx CD 8",      neighborhood: "Riverdale / Fieldston",            voterTurnout: 0.66, proHealthVotes: 0.70, leadLevel: 5.2,  schoolScore: 79 },
  { id: 21, borough: "Bronx",     name: "Bronx CD 9",      neighborhood: "Unionport / Parkchester",          voterTurnout: 0.44, proHealthVotes: 0.59, leadLevel: 15.6, schoolScore: 52 },
  { id: 22, borough: "Bronx",     name: "Bronx CD 10",     neighborhood: "Co-op City / Pelham Bay",          voterTurnout: 0.55, proHealthVotes: 0.63, leadLevel: 9.4,  schoolScore: 67 },
  { id: 23, borough: "Bronx",     name: "Bronx CD 11",     neighborhood: "Pelham Parkway / Morris Park",     voterTurnout: 0.53, proHealthVotes: 0.61, leadLevel: 10.3, schoolScore: 64 },
  { id: 24, borough: "Bronx",     name: "Bronx CD 12",     neighborhood: "Williamsbridge / Baychester",      voterTurnout: 0.50, proHealthVotes: 0.62, leadLevel: 12.1, schoolScore: 61 },

  // ─── BROOKLYN (CD 25–42) ────────────────────────────────────────────────
  { id: 25, borough: "Brooklyn",  name: "Brooklyn CD 1",   neighborhood: "Williamsburg / Greenpoint",        voterTurnout: 0.62, proHealthVotes: 0.71, leadLevel: 6.8,  schoolScore: 74 },
  { id: 26, borough: "Brooklyn",  name: "Brooklyn CD 2",   neighborhood: "Brooklyn Heights / Cobble Hill",   voterTurnout: 0.71, proHealthVotes: 0.76, leadLevel: 3.4,  schoolScore: 89 },
  { id: 27, borough: "Brooklyn",  name: "Brooklyn CD 3",   neighborhood: "Bedford-Stuyvesant",               voterTurnout: 0.47, proHealthVotes: 0.63, leadLevel: 14.8, schoolScore: 53 },
  { id: 28, borough: "Brooklyn",  name: "Brooklyn CD 4",   neighborhood: "Bushwick",                         voterTurnout: 0.43, proHealthVotes: 0.60, leadLevel: 16.2, schoolScore: 49 },
  { id: 29, borough: "Brooklyn",  name: "Brooklyn CD 5",   neighborhood: "East New York / Starrett City",    voterTurnout: 0.40, proHealthVotes: 0.57, leadLevel: 18.9, schoolScore: 44 },
  { id: 30, borough: "Brooklyn",  name: "Brooklyn CD 6",   neighborhood: "Park Slope / Carroll Gardens",     voterTurnout: 0.74, proHealthVotes: 0.80, leadLevel: 3.0,  schoolScore: 92 },
  { id: 31, borough: "Brooklyn",  name: "Brooklyn CD 7",   neighborhood: "Sunset Park",                      voterTurnout: 0.45, proHealthVotes: 0.61, leadLevel: 13.7, schoolScore: 55 },
  { id: 32, borough: "Brooklyn",  name: "Brooklyn CD 8",   neighborhood: "Crown Heights North",              voterTurnout: 0.49, proHealthVotes: 0.64, leadLevel: 12.4, schoolScore: 58 },
  { id: 33, borough: "Brooklyn",  name: "Brooklyn CD 9",   neighborhood: "Crown Heights South / Prospect Lefferts", voterTurnout: 0.48, proHealthVotes: 0.63, leadLevel: 13.1, schoolScore: 56 },
  { id: 34, borough: "Brooklyn",  name: "Brooklyn CD 10",  neighborhood: "Bay Ridge / Dyker Heights",        voterTurnout: 0.62, proHealthVotes: 0.58, leadLevel: 7.6,  schoolScore: 73 },
  { id: 35, borough: "Brooklyn",  name: "Brooklyn CD 11",  neighborhood: "Bensonhurst / Bath Beach",         voterTurnout: 0.56, proHealthVotes: 0.55, leadLevel: 9.2,  schoolScore: 68 },
  { id: 36, borough: "Brooklyn",  name: "Brooklyn CD 12",  neighborhood: "Borough Park / Kensington",        voterTurnout: 0.54, proHealthVotes: 0.57, leadLevel: 10.5, schoolScore: 65 },
  { id: 37, borough: "Brooklyn",  name: "Brooklyn CD 13",  neighborhood: "Coney Island / Brighton Beach",    voterTurnout: 0.51, proHealthVotes: 0.60, leadLevel: 11.8, schoolScore: 63 },
  { id: 38, borough: "Brooklyn",  name: "Brooklyn CD 14",  neighborhood: "Flatbush / Midwood",               voterTurnout: 0.55, proHealthVotes: 0.62, leadLevel: 9.9,  schoolScore: 67 },
  { id: 39, borough: "Brooklyn",  name: "Brooklyn CD 15",  neighborhood: "Sheepshead Bay / Homecrest",       voterTurnout: 0.57, proHealthVotes: 0.60, leadLevel: 8.7,  schoolScore: 70 },
  { id: 40, borough: "Brooklyn",  name: "Brooklyn CD 16",  neighborhood: "Brownsville",                      voterTurnout: 0.37, proHealthVotes: 0.55, leadLevel: 20.3, schoolScore: 41 },
  { id: 41, borough: "Brooklyn",  name: "Brooklyn CD 17",  neighborhood: "East Flatbush / Farragut",         voterTurnout: 0.46, proHealthVotes: 0.62, leadLevel: 14.1, schoolScore: 54 },
  { id: 42, borough: "Brooklyn",  name: "Brooklyn CD 18",  neighborhood: "Canarsie / Flatlands",             voterTurnout: 0.52, proHealthVotes: 0.63, leadLevel: 10.2, schoolScore: 64 },

  // ─── QUEENS (CD 43–56) ──────────────────────────────────────────────────
  { id: 43, borough: "Queens",    name: "Queens CD 1",     neighborhood: "Astoria / Long Island City",       voterTurnout: 0.59, proHealthVotes: 0.67, leadLevel: 7.1,  schoolScore: 72 },
  { id: 44, borough: "Queens",    name: "Queens CD 2",     neighborhood: "Sunnyside / Woodside",             voterTurnout: 0.56, proHealthVotes: 0.65, leadLevel: 8.6,  schoolScore: 69 },
  { id: 45, borough: "Queens",    name: "Queens CD 3",     neighborhood: "Jackson Heights / North Corona",   voterTurnout: 0.47, proHealthVotes: 0.62, leadLevel: 13.4, schoolScore: 55 },
  { id: 46, borough: "Queens",    name: "Queens CD 4",     neighborhood: "Elmhurst / Corona",                voterTurnout: 0.44, proHealthVotes: 0.60, leadLevel: 15.1, schoolScore: 52 },
  { id: 47, borough: "Queens",    name: "Queens CD 5",     neighborhood: "Ridgewood / Maspeth",              voterTurnout: 0.54, proHealthVotes: 0.58, leadLevel: 11.2, schoolScore: 64 },
  { id: 48, borough: "Queens",    name: "Queens CD 6",     neighborhood: "Forest Hills / Rego Park",         voterTurnout: 0.65, proHealthVotes: 0.67, leadLevel: 5.8,  schoolScore: 78 },
  { id: 49, borough: "Queens",    name: "Queens CD 7",     neighborhood: "Flushing / Whitestone",            voterTurnout: 0.60, proHealthVotes: 0.64, leadLevel: 7.3,  schoolScore: 74 },
  { id: 50, borough: "Queens",    name: "Queens CD 8",     neighborhood: "Briarwood / Jamaica Hills",        voterTurnout: 0.50, proHealthVotes: 0.62, leadLevel: 12.6, schoolScore: 60 },
  { id: 51, borough: "Queens",    name: "Queens CD 9",     neighborhood: "Woodhaven / Richmond Hill",        voterTurnout: 0.48, proHealthVotes: 0.61, leadLevel: 13.9, schoolScore: 56 },
  { id: 52, borough: "Queens",    name: "Queens CD 10",    neighborhood: "Howard Beach / Ozone Park",        voterTurnout: 0.58, proHealthVotes: 0.56, leadLevel: 9.1,  schoolScore: 68 },
  { id: 53, borough: "Queens",    name: "Queens CD 11",    neighborhood: "Bayside / Douglaston",             voterTurnout: 0.68, proHealthVotes: 0.62, leadLevel: 4.4,  schoolScore: 82 },
  { id: 54, borough: "Queens",    name: "Queens CD 12",    neighborhood: "Jamaica / St. Albans",             voterTurnout: 0.46, proHealthVotes: 0.64, leadLevel: 14.6, schoolScore: 53 },
  { id: 55, borough: "Queens",    name: "Queens CD 13",    neighborhood: "Queens Village / Cambria Heights",  voterTurnout: 0.52, proHealthVotes: 0.63, leadLevel: 11.5, schoolScore: 63 },
  { id: 56, borough: "Queens",    name: "Queens CD 14",    neighborhood: "Rockaway / Broad Channel",         voterTurnout: 0.50, proHealthVotes: 0.60, leadLevel: 12.8, schoolScore: 60 },

  // ─── STATEN ISLAND (CD 57–59) ───────────────────────────────────────────
  { id: 57, borough: "Staten Island", name: "Staten Island CD 1", neighborhood: "North Shore / St. George",  voterTurnout: 0.53, proHealthVotes: 0.58, leadLevel: 11.4, schoolScore: 63 },
  { id: 58, borough: "Staten Island", name: "Staten Island CD 2", neighborhood: "Mid-Island / New Springville", voterTurnout: 0.60, proHealthVotes: 0.54, leadLevel: 7.8, schoolScore: 72 },
  { id: 59, borough: "Staten Island", name: "Staten Island CD 3", neighborhood: "South Shore / Tottenville",  voterTurnout: 0.63, proHealthVotes: 0.52, leadLevel: 5.9,  schoolScore: 76 },
];

// Metric config: display metadata for each data layer
const METRICS = {
  voterTurnout: {
    key: "voterTurnout",
    label: "Voter Turnout",
    legendSub: "% of registered voters casting ballots",
    unit: "%",
    format: v => `${(v * 100).toFixed(1)}%`,
    thresholds: [0.3, 0.45, 0.55, 0.65, 0.75],
    colors: ["#1a3a5c", "#1e5fa8", "#1e88e5", "#42a5f5", "#90caf9"],
    description: "Percentage of registered voters who cast ballots in the most recent local election cycle.",
  },
  proHealthVotes: {
    key: "proHealthVotes",
    label: "Public Health Mandate",
    legendSub: "% votes for candidates pledging lead remediation",
    unit: "%",
    format: v => `${(v * 100).toFixed(1)}%`,
    thresholds: [0.3, 0.5, 0.6, 0.7, 0.8],
    colors: ["#1b3a1f", "#2e7d32", "#388e3c", "#66bb6a", "#a5d6a7"],
    description: "Share of votes for candidates who championed clean water, lead abatement, and public-health investment.",
  },
  leadLevel: {
    key: "leadLevel",
    label: "Lead in Water",
    legendSub: "Average tap water concentration (ppb) — EPA limit: 15",
    unit: "ppb",
    format: v => `${v.toFixed(1)} ppb`,
    thresholds: [2, 8, 14, 18, 24],
    colors: ["#f9a825", "#e65100", "#b71c1c", "#7f0000", "#4a0000"],
    description: "Estimated average lead concentration in parts-per-billion in tap water sampled across the district. EPA action level: 15 ppb.",
  },
  schoolScore: {
    key: "schoolScore",
    label: "Educational Outcomes",
    legendSub: "Composite index: test scores + graduation rate (0–100)",
    unit: "/100",
    format: v => `${v}/100`,
    thresholds: [40, 55, 65, 75, 90],
    colors: ["#4a0072", "#7b1fa2", "#9c27b0", "#ce93d8", "#f3e5f5"],
    description: "Composite index combining standardized test scores and 4-year graduation rates, normalized to 100.",
  },
};

function getMetricColor(metricKey, value) {
  const m = METRICS[metricKey];
  const t = m.thresholds;
  const c = m.colors;
  if (metricKey === "leadLevel") {
    // Higher is worse (red)
    if (value < t[1]) return c[0];
    if (value < t[2]) return c[1];
    if (value < t[3]) return c[2];
    if (value < t[4]) return c[3];
    return c[4];
  } else {
    // Higher is better
    if (value < t[1]) return c[0];
    if (value < t[2]) return c[1];
    if (value < t[3]) return c[2];
    if (value < t[4]) return c[3];
    return c[4];
  }
}

function generateNarrative(d) {
  const lead = d.leadLevel;
  const turnout = d.voterTurnout;
  const school = d.schoolScore;
  const proH = d.proHealthVotes;

  const leadRating = lead > 18 ? "critically high" : lead > 12 ? "elevated" : lead > 7 ? "moderate" : "low";
  const turnoutRating = turnout > 0.65 ? "strong" : turnout > 0.5 ? "moderate" : "low";
  const schoolRating = school > 80 ? "excellent" : school > 65 ? "good" : school > 55 ? "below average" : "poor";
  const healthRating = proH > 0.7 ? "high" : proH > 0.6 ? "moderate" : "low";

  const narratives = [];

  if (lead > 15 && school < 60) {
    narratives.push(`Research links chronic lead exposure to cognitive impairment — this district's ${leadRating} contamination (${lead.toFixed(1)} ppb) may partly explain its ${schoolRating} academic outcomes.`);
  } else if (lead < 6 && school > 80) {
    narratives.push(`Clean water infrastructure correlates with strong learning environments here — low lead (${lead.toFixed(1)} ppb) and ${schoolRating} schools reinforce each other.`);
  }

  if (lead > 15 && turnout < 0.45) {
    narratives.push(`Communities burdened by contamination often face broader systemic challenges that suppress civic participation — ${turnoutRating} voter turnout (${(turnout * 100).toFixed(0)}%) reflects this pattern.`);
  } else if (turnout > 0.65) {
    narratives.push(`High civic engagement (${(turnout * 100).toFixed(0)}% turnout) gives this district political leverage to advocate for infrastructure investment.`);
  }

  if (proH > 0.7 && lead > 10) {
    narratives.push(`Despite high contamination, residents voted strongly for pro-health candidates (${(proH * 100).toFixed(0)}%) — a signal of community awareness and demand for change.`);
  } else if (proH < 0.58 && lead < 8) {
    narratives.push(`With low environmental burden, pro-health voting (${(proH * 100).toFixed(0)}%) isn't driven by local urgency but by broader political alignment.`);
  }

  if (narratives.length === 0) {
    narratives.push(`${d.name} shows ${leadRating} lead levels (${lead.toFixed(1)} ppb), ${turnoutRating} voter turnout (${(turnout * 100).toFixed(0)}%), and ${schoolRating} school performance — a profile consistent with its borough's socioeconomic context.`);
  }

  return narratives.join(" ");
}
