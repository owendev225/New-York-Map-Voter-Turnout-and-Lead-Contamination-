// Approximate GeoJSON for NYC Community Districts
// Polygons are simplified grid-based approximations for visualization purposes.
// Not surveyed boundaries — for illustrative use only.

const NYC_GEODATA = {
  "type": "FeatureCollection",
  "features": [

    // ═══════════════════════════════════════════════
    //  MANHATTAN  (12 CDs, tall thin island)
    // lon: -74.02 → -73.93   lat: 40.700 → 40.878
    // Divided into 12 roughly equal horizontal bands
    // ═══════════════════════════════════════════════

    // CD 1 – Financial District / Battery Park  (southernmost)
    { "type": "Feature", "properties": { "districtId": 1 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.020, 40.700], [-73.970, 40.700], [-73.960, 40.715], [-73.975, 40.718], [-74.015, 40.712], [-74.020, 40.700]
    ]] } },

    // CD 2 – Greenwich Village / SoHo
    { "type": "Feature", "properties": { "districtId": 2 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.015, 40.712], [-73.975, 40.718], [-73.965, 40.730], [-73.978, 40.732], [-74.010, 40.726], [-74.015, 40.712]
    ]] } },

    // CD 3 – Lower East Side / Chinatown
    { "type": "Feature", "properties": { "districtId": 3 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.992, 40.715], [-73.970, 40.712], [-73.960, 40.715], [-73.958, 40.728], [-73.978, 40.732], [-73.990, 40.726], [-73.992, 40.715]
    ]] } },

    // CD 4 – Chelsea / Hell's Kitchen
    { "type": "Feature", "properties": { "districtId": 4 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.010, 40.726], [-73.978, 40.732], [-73.970, 40.745], [-73.984, 40.748], [-74.005, 40.740], [-74.010, 40.726]
    ]] } },

    // CD 5 – Midtown
    { "type": "Feature", "properties": { "districtId": 5 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.978, 40.732], [-73.958, 40.728], [-73.950, 40.742], [-73.965, 40.748], [-73.978, 40.744], [-73.978, 40.732]
    ]] } },

    // CD 6 – Stuyvesant Town / Turtle Bay
    { "type": "Feature", "properties": { "districtId": 6 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.990, 40.744], [-73.965, 40.748], [-73.953, 40.760], [-73.968, 40.762], [-73.988, 40.756], [-73.990, 40.744]
    ]] } },

    // CD 7 – Upper West Side
    { "type": "Feature", "properties": { "districtId": 7 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.005, 40.740], [-73.984, 40.748], [-73.978, 40.760], [-73.990, 40.763], [-74.002, 40.756], [-74.005, 40.740]
    ]] } },

    // CD 8 – Upper East Side / Yorkville
    { "type": "Feature", "properties": { "districtId": 8 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.988, 40.756], [-73.968, 40.762], [-73.958, 40.774], [-73.973, 40.776], [-73.986, 40.769], [-73.988, 40.756]
    ]] } },

    // CD 9 – Morningside Heights / West Harlem
    { "type": "Feature", "properties": { "districtId": 9 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.002, 40.756], [-73.990, 40.763], [-73.982, 40.775], [-73.994, 40.778], [-74.000, 40.770], [-74.002, 40.756]
    ]] } },

    // CD 10 – Central Harlem
    { "type": "Feature", "properties": { "districtId": 10 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.986, 40.769], [-73.973, 40.776], [-73.962, 40.786], [-73.976, 40.789], [-73.984, 40.781], [-73.986, 40.769]
    ]] } },

    // CD 11 – East Harlem
    { "type": "Feature", "properties": { "districtId": 11 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.976, 40.789], [-73.960, 40.786], [-73.945, 40.796], [-73.960, 40.802], [-73.974, 40.798], [-73.976, 40.789]
    ]] } },

    // CD 12 – Washington Heights / Inwood  (northernmost Manhattan)
    { "type": "Feature", "properties": { "districtId": 12 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.000, 40.778], [-73.982, 40.775], [-73.920, 40.850], [-73.935, 40.878], [-73.970, 40.870], [-74.000, 40.850], [-74.000, 40.778]
    ]] } },

    // ═══════════════════════════════════════════════
    //  BRONX  (12 CDs)
    // lon: -73.94 → -73.75   lat: 40.795 → 40.920
    // ═══════════════════════════════════════════════

    // CD 1 (id 13) – Mott Haven / Port Morris  (SW Bronx)
    { "type": "Feature", "properties": { "districtId": 13 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.940, 40.795], [-73.900, 40.795], [-73.900, 40.815], [-73.940, 40.815], [-73.940, 40.795]
    ]] } },

    // CD 2 (id 14) – Hunts Point / Longwood
    { "type": "Feature", "properties": { "districtId": 14 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.900, 40.795], [-73.860, 40.795], [-73.860, 40.815], [-73.900, 40.815], [-73.900, 40.795]
    ]] } },

    // CD 3 (id 15) – Morrisania / Crotona
    { "type": "Feature", "properties": { "districtId": 15 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.940, 40.815], [-73.900, 40.815], [-73.900, 40.835], [-73.940, 40.835], [-73.940, 40.815]
    ]] } },

    // CD 4 (id 16) – Concourse / Highbridge
    { "type": "Feature", "properties": { "districtId": 16 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.900, 40.815], [-73.860, 40.815], [-73.860, 40.835], [-73.900, 40.835], [-73.900, 40.815]
    ]] } },

    // CD 5 (id 17) – University Heights / Fordham
    { "type": "Feature", "properties": { "districtId": 17 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.940, 40.835], [-73.900, 40.835], [-73.900, 40.855], [-73.940, 40.855], [-73.940, 40.835]
    ]] } },

    // CD 6 (id 18) – Belmont / East Tremont
    { "type": "Feature", "properties": { "districtId": 18 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.900, 40.835], [-73.860, 40.835], [-73.860, 40.855], [-73.900, 40.855], [-73.900, 40.835]
    ]] } },

    // CD 7 (id 19) – Kingsbridge / Riverdale (NW)
    { "type": "Feature", "properties": { "districtId": 19 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.940, 40.855], [-73.900, 40.855], [-73.900, 40.878], [-73.940, 40.878], [-73.940, 40.855]
    ]] } },

    // CD 8 (id 20) – Riverdale / Fieldston (far NW)
    { "type": "Feature", "properties": { "districtId": 20 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.940, 40.878], [-73.900, 40.878], [-73.900, 40.920], [-73.940, 40.920], [-73.940, 40.878]
    ]] } },

    // CD 9 (id 21) – Unionport / Parkchester (central-east)
    { "type": "Feature", "properties": { "districtId": 21 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.860, 40.835], [-73.820, 40.835], [-73.820, 40.860], [-73.860, 40.860], [-73.860, 40.835]
    ]] } },

    // CD 10 (id 22) – Co-op City / Pelham Bay (NE)
    { "type": "Feature", "properties": { "districtId": 22 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.860, 40.860], [-73.800, 40.860], [-73.800, 40.895], [-73.860, 40.895], [-73.860, 40.860]
    ]] } },

    // CD 11 (id 23) – Pelham Parkway / Morris Park
    { "type": "Feature", "properties": { "districtId": 23 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.900, 40.855], [-73.860, 40.855], [-73.860, 40.835], [-73.820, 40.835], [-73.820, 40.860], [-73.860, 40.860], [-73.860, 40.878], [-73.900, 40.878], [-73.900, 40.855]
    ]] } },

    // CD 12 (id 24) – Williamsbridge / Baychester (N)
    { "type": "Feature", "properties": { "districtId": 24 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.900, 40.878], [-73.860, 40.878], [-73.800, 40.895], [-73.800, 40.920], [-73.860, 40.920], [-73.900, 40.920], [-73.900, 40.878]
    ]] } },

    // ═══════════════════════════════════════════════
    //  BROOKLYN  (18 CDs)
    // lon: -74.05 → -73.83   lat: 40.570 → 40.740
    // ═══════════════════════════════════════════════

    // CD 1 (id 25) – Williamsburg / Greenpoint (NW)
    { "type": "Feature", "properties": { "districtId": 25 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.975, 40.700], [-73.935, 40.700], [-73.935, 40.730], [-73.975, 40.730], [-73.975, 40.700]
    ]] } },

    // CD 2 (id 26) – Brooklyn Heights / Cobble Hill
    { "type": "Feature", "properties": { "districtId": 26 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.010, 40.680], [-73.975, 40.680], [-73.975, 40.700], [-74.010, 40.700], [-74.010, 40.680]
    ]] } },

    // CD 3 (id 27) – Bedford-Stuyvesant
    { "type": "Feature", "properties": { "districtId": 27 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.960, 40.675], [-73.920, 40.675], [-73.920, 40.700], [-73.960, 40.700], [-73.960, 40.675]
    ]] } },

    // CD 4 (id 28) – Bushwick
    { "type": "Feature", "properties": { "districtId": 28 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.935, 40.700], [-73.895, 40.700], [-73.895, 40.720], [-73.935, 40.720], [-73.935, 40.700]
    ]] } },

    // CD 5 (id 29) – East New York / Starrett City (E)
    { "type": "Feature", "properties": { "districtId": 29 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.900, 40.660], [-73.860, 40.660], [-73.860, 40.690], [-73.900, 40.690], [-73.900, 40.660]
    ]] } },

    // CD 6 (id 30) – Park Slope / Carroll Gardens
    { "type": "Feature", "properties": { "districtId": 30 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.010, 40.660], [-73.975, 40.660], [-73.975, 40.680], [-74.010, 40.680], [-74.010, 40.660]
    ]] } },

    // CD 7 (id 31) – Sunset Park (W)
    { "type": "Feature", "properties": { "districtId": 31 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.020, 40.638], [-73.990, 40.638], [-73.990, 40.660], [-74.020, 40.660], [-74.020, 40.638]
    ]] } },

    // CD 8 (id 32) – Crown Heights North
    { "type": "Feature", "properties": { "districtId": 32 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.975, 40.660], [-73.940, 40.660], [-73.940, 40.678], [-73.975, 40.678], [-73.975, 40.660]
    ]] } },

    // CD 9 (id 33) – Crown Heights South / Prospect Lefferts
    { "type": "Feature", "properties": { "districtId": 33 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.960, 40.645], [-73.922, 40.645], [-73.922, 40.660], [-73.960, 40.660], [-73.960, 40.645]
    ]] } },

    // CD 10 (id 34) – Bay Ridge / Dyker Heights (SW)
    { "type": "Feature", "properties": { "districtId": 34 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.035, 40.610], [-74.000, 40.610], [-74.000, 40.638], [-74.035, 40.638], [-74.035, 40.610]
    ]] } },

    // CD 11 (id 35) – Bensonhurst / Bath Beach
    { "type": "Feature", "properties": { "districtId": 35 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.000, 40.600], [-73.965, 40.600], [-73.965, 40.625], [-74.000, 40.625], [-74.000, 40.600]
    ]] } },

    // CD 12 (id 36) – Borough Park / Kensington
    { "type": "Feature", "properties": { "districtId": 36 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.990, 40.625], [-73.950, 40.625], [-73.950, 40.645], [-73.990, 40.645], [-73.990, 40.625]
    ]] } },

    // CD 13 (id 37) – Coney Island / Brighton Beach (S)
    { "type": "Feature", "properties": { "districtId": 37 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.005, 40.574], [-73.960, 40.574], [-73.960, 40.600], [-74.005, 40.600], [-74.005, 40.574]
    ]] } },

    // CD 14 (id 38) – Flatbush / Midwood (central S)
    { "type": "Feature", "properties": { "districtId": 38 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.965, 40.617], [-73.928, 40.617], [-73.928, 40.640], [-73.965, 40.640], [-73.965, 40.617]
    ]] } },

    // CD 15 (id 39) – Sheepshead Bay / Homecrest
    { "type": "Feature", "properties": { "districtId": 39 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.960, 40.590], [-73.920, 40.590], [-73.920, 40.617], [-73.960, 40.617], [-73.960, 40.590]
    ]] } },

    // CD 16 (id 40) – Brownsville (NE inner)
    { "type": "Feature", "properties": { "districtId": 40 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.922, 40.660], [-73.893, 40.660], [-73.893, 40.678], [-73.922, 40.678], [-73.922, 40.660]
    ]] } },

    // CD 17 (id 41) – East Flatbush / Farragut
    { "type": "Feature", "properties": { "districtId": 41 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.932, 40.635], [-73.892, 40.635], [-73.892, 40.655], [-73.932, 40.655], [-73.932, 40.635]
    ]] } },

    // CD 18 (id 42) – Canarsie / Flatlands (SE)
    { "type": "Feature", "properties": { "districtId": 42 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.900, 40.620], [-73.860, 40.620], [-73.860, 40.648], [-73.900, 40.648], [-73.900, 40.620]
    ]] } },

    // ═══════════════════════════════════════════════
    //  QUEENS  (14 CDs)
    // lon: -73.97 → -73.70   lat: 40.600 → 40.800
    // ═══════════════════════════════════════════════

    // CD 1 (id 43) – Astoria / Long Island City (NW)
    { "type": "Feature", "properties": { "districtId": 43 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.945, 40.755], [-73.910, 40.755], [-73.910, 40.785], [-73.945, 40.785], [-73.945, 40.755]
    ]] } },

    // CD 2 (id 44) – Sunnyside / Woodside
    { "type": "Feature", "properties": { "districtId": 44 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.920, 40.735], [-73.888, 40.735], [-73.888, 40.755], [-73.920, 40.755], [-73.920, 40.735]
    ]] } },

    // CD 3 (id 45) – Jackson Heights / North Corona
    { "type": "Feature", "properties": { "districtId": 45 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.895, 40.750], [-73.860, 40.750], [-73.860, 40.775], [-73.895, 40.775], [-73.895, 40.750]
    ]] } },

    // CD 4 (id 46) – Elmhurst / Corona (central W)
    { "type": "Feature", "properties": { "districtId": 46 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.885, 40.728], [-73.850, 40.728], [-73.850, 40.752], [-73.885, 40.752], [-73.885, 40.728]
    ]] } },

    // CD 5 (id 47) – Ridgewood / Maspeth (W inner)
    { "type": "Feature", "properties": { "districtId": 47 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.910, 40.710], [-73.875, 40.710], [-73.875, 40.735], [-73.910, 40.735], [-73.910, 40.710]
    ]] } },

    // CD 6 (id 48) – Forest Hills / Rego Park (central)
    { "type": "Feature", "properties": { "districtId": 48 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.858, 40.710], [-73.822, 40.710], [-73.822, 40.736], [-73.858, 40.736], [-73.858, 40.710]
    ]] } },

    // CD 7 (id 49) – Flushing / Whitestone (NE)
    { "type": "Feature", "properties": { "districtId": 49 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.852, 40.755], [-73.800, 40.755], [-73.800, 40.795], [-73.852, 40.795], [-73.852, 40.755]
    ]] } },

    // CD 8 (id 50) – Briarwood / Jamaica Hills (central S)
    { "type": "Feature", "properties": { "districtId": 50 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.815, 40.700], [-73.772, 40.700], [-73.772, 40.728], [-73.815, 40.728], [-73.815, 40.700]
    ]] } },

    // CD 9 (id 51) – Woodhaven / Richmond Hill
    { "type": "Feature", "properties": { "districtId": 51 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.858, 40.688], [-73.820, 40.688], [-73.820, 40.710], [-73.858, 40.710], [-73.858, 40.688]
    ]] } },

    // CD 10 (id 52) – Howard Beach / Ozone Park (S)
    { "type": "Feature", "properties": { "districtId": 52 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.862, 40.660], [-73.820, 40.660], [-73.820, 40.688], [-73.862, 40.688], [-73.862, 40.660]
    ]] } },

    // CD 11 (id 53) – Bayside / Douglaston (NE far)
    { "type": "Feature", "properties": { "districtId": 53 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.800, 40.755], [-73.745, 40.755], [-73.745, 40.798], [-73.800, 40.798], [-73.800, 40.755]
    ]] } },

    // CD 12 (id 54) – Jamaica / St. Albans (SE central)
    { "type": "Feature", "properties": { "districtId": 54 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.780, 40.688], [-73.745, 40.688], [-73.745, 40.712], [-73.780, 40.712], [-73.780, 40.688]
    ]] } },

    // CD 13 (id 55) – Queens Village / Cambria Heights
    { "type": "Feature", "properties": { "districtId": 55 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.758, 40.712], [-73.718, 40.712], [-73.718, 40.738], [-73.758, 40.738], [-73.758, 40.712]
    ]] } },

    // CD 14 (id 56) – Rockaway / Broad Channel (S peninsula)
    { "type": "Feature", "properties": { "districtId": 56 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-73.890, 40.600], [-73.780, 40.600], [-73.760, 40.625], [-73.850, 40.635], [-73.890, 40.618], [-73.890, 40.600]
    ]] } },

    // ═══════════════════════════════════════════════
    //  STATEN ISLAND  (3 CDs)
    // lon: -74.26 → -74.05   lat: 40.490 → 40.650
    // ═══════════════════════════════════════════════

    // CD 1 (id 57) – North Shore / St. George
    { "type": "Feature", "properties": { "districtId": 57 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.110, 40.620], [-74.055, 40.620], [-74.055, 40.652], [-74.110, 40.652], [-74.110, 40.620]
    ]] } },

    // CD 2 (id 58) – Mid-Island / New Springville
    { "type": "Feature", "properties": { "districtId": 58 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.180, 40.570], [-74.110, 40.570], [-74.110, 40.620], [-74.180, 40.620], [-74.180, 40.570]
    ]] } },

    // CD 3 (id 59) – South Shore / Tottenville
    { "type": "Feature", "properties": { "districtId": 59 }, "geometry": { "type": "Polygon", "coordinates": [[
      [-74.260, 40.490], [-74.180, 40.490], [-74.180, 40.570], [-74.260, 40.570], [-74.260, 40.490]
    ]] } },

  ]
};
