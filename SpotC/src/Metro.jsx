export const metroLines = [
  {
    name: "Ligne Verte",
    color: "#00884c",
    stations: [
      "Angrignon", "Monk", "Jolicoeur", "Verdun", "De l'Église", "Lasalle", "Charlevoix",
      "Lionel-Groulx", "Atwater", "Guy-Concordia", "Peel", "McGill", "Place-des-Arts",
      "Saint-Laurent", "Berri-UQAM", "Beaudry", "Papineau", "Frontenac", "Préfontaine",
      "Joliette", "Pie-IX", "Viau", "Assomption", "Cadillac", "Langelier", "Radisson",
      "Honoré-Beaugrand"
    ]
  },
  {
    name: "Ligne Orange",
    color: "#ef8222",
    stations: [
      "Côte-Vertu", "Du Collège", "De la Savane", "Namur", "Plamondon", "Côte-Sainte-Catherine",
      "Snowdon", "Villa-Maria", "Vendôme", "Place-Saint-Henri", "Lionel-Groulx", "Georges-Vanier",
      "Lucien-L'Allier", "Bonaventure", "Square-Victoria-OACI", "Place-d'Armes", "Champ-de-Mars",
      "Berri-UQAM", "Sherbrooke", "Mont-Royal", "Laurier", "Rosemont", "Beaubien", "Jean-Talon",
      "Jarry", "Crémazie", "Sauvé", "Henri-Bourassa", "Cartier", "De la Concorde", "Montmorency"
    ]
  },
  {
    name: "Ligne Bleue",
    color: "#0097d7",
    stations: [
      "Snowdon", "Côte-des-Neiges", "Université-de-Montréal", "Édouard-Montpetit", "Outremont",
      "Acadie", "Parc", "De Castelnau", "Jean-Talon", "Fabre", "D'Iberville", "Saint-Michel"
    ]
  },
  {
    name: "Ligne Jaune",
    color: "#f5d523",
    stations: ["Berri-UQAM", "Jean-Drapeau", "Longueuil-Université-de-Sherbrooke"]
  }
];

export const metroDetails = {
  // =====================
  // 🔧 TRAVAUX EN COURS
  // =====================
  "Atwater": {
    history: "Station importante du centre-ville, ouverte en 1966.",
    nearby: ["Centre Alexis Nihon", "Université Concordia"],
    bus: ["24", "104", "138"],
    travaux: "Travaux d’entretien et modernisation des infrastructures.",
    signalements: []
  },
  "Édouard-Montpetit": {
    history: "Station clé de la ligne bleue reliant l’Université de Montréal.",
    nearby: ["Université de Montréal"],
    bus: ["51", "129"],
    travaux: "Travaux liés au REM et amélioration des accès.",
    signalements: []
  },
  "Frontenac": {
    history: "Station de la ligne verte située dans l’est de Montréal.",
    nearby: ["Parc Médéric-Martin"],
    bus: ["29", "94"],
    travaux: "Travaux de maintenance préventive.",
    signalements: []
  },
  "Outremont": {
    history: "Station de la ligne bleue située dans l’arrondissement Outremont.",
    nearby: ["Campus MIL"],
    bus: ["160"],
    travaux: "Travaux d’amélioration des installations.",
    signalements: []
  },
  "Place-Saint-Henri": {
    history: "Station de la ligne orange desservant Saint-Henri.",
    nearby: ["Marché Atwater"],
    bus: ["17", "36"],
    travaux: "Travaux d’entretien de la structure.",
    signalements: []
  },
  "Saint-Michel": {
    history: "Terminus est de la ligne bleue.",
    nearby: ["Parc Frédéric-Back"],
    bus: ["67", "141"],
    travaux: "Travaux d’amélioration de la ventilation.",
    signalements: []
  },
  "Champ-de-Mars": {
    history: "Station près du Vieux-Montréal et de l’Hôtel de Ville.",
    nearby: ["Vieux-Montréal", "Hôtel de Ville"],
    bus: ["715"],
    travaux: "Travaux de la Ville de Montréal à proximité.",
    signalements: []
  },
  "Montmorency": {
    history: "Terminus nord de la ligne orange à Laval.",
    nearby: ["Collège Montmorency"],
    bus: ["2", "33"],
    travaux: "Travaux du groupe Montoni à proximité de la station.",
    signalements: []
  },

  // =====================
  // 🏗️ INFRASTRUCTURES STM
  // =====================
  "Centre de transport Bellechasse": {
    history: "Centre d’entretien des autobus STM.",
    travaux: "Travaux d’amélioration des installations.",
    signalements: []
  },
  "Poste de redressement Richelieu": {
    history: "Infrastructure électrique du réseau.",
    travaux: "Travaux techniques de maintenance.",
    signalements: []
  },
  "Poste de ventilation mécanique Arcand": {
    history: "Système de ventilation du métro.",
    travaux: "Entretien et modernisation.",
    signalements: []
  },
  "Poste de ventilation mécanique Bellechasse": {
    history: "Installation de ventilation du réseau.",
    travaux: "Travaux techniques en cours.",
    signalements: []
  },
  "Poste de ventilation mécanique Chabanel": {
    history: "Infrastructure de ventilation.",
    travaux: "Maintenance préventive.",
    signalements: []
  },
  "Poste de ventilation mécanique Rielle": {
    history: "Système de ventilation STM.",
    travaux: "Travaux d’amélioration.",
    signalements: []
  },
  "Poste de ventilation mécanique Sainte-Marguerite (Richelieu)": {
    history: "Installation de ventilation.",
    travaux: "Travaux d’entretien.",
    signalements: []
  },
  "Réfection du centre de transport Mont-Royal": {
    history: "Centre d’entretien des autobus.",
    travaux: "Réfection complète des installations.",
    signalements: []
  },
  "Réfection du garage Honoré-Beaugrand": {
    history: "Garage de maintenance métro.",
    travaux: "Travaux majeurs de réfection.",
    signalements: []
  },

  // =====================
  // STATIONS AVEC DÉTAILS COMPLETS
  // =====================
  "Berri-UQAM": {
    lines: ["Verte", "Orange", "Jaune"],
    opened: 1966,
    zone: "Centre-ville / Quartier Latin",
    history: "Station inaugurée en 1966. Plus grande station du réseau STM et principal pôle de correspondance.",
    nearby: ["UQAM", "Grande Bibliothèque (BAnQ)", "Gare d'autocars de Montréal", "CHUM"],
    bus: ["15", "30", "125", "427", "747"],
    accessibility: true,
    travaux: "",
    signalements: []
  },
  "Lionel-Groulx": {
    lines: ["Verte", "Orange"],
    opened: 1978,
    zone: "Saint-Henri / Petite-Bourgogne",
    history: "Important point de correspondance entre les lignes Verte et Orange.",
    nearby: ["Marché Atwater", "Canal de Lachine"],
    bus: ["35", "36", "78", "191"],
    accessibility: true,
    travaux: "",
    signalements: []
  },
  "Snowdon": {
    lines: ["Orange", "Bleue"],
    opened: 1981,
    zone: "Côte-des-Neiges",
    history: "Station en profondeur servant de connexion entre Orange et Bleue.",
    nearby: ["Village Monkland", "Oratoire Saint-Joseph", "Queen Mary"],
    bus: ["51", "66", "102", "161"],
    accessibility: true,
    travaux: "Travaux d’entretien et tests d’amélioration de la ventilation.",
    signalements: []
  },
  "Jean-Talon": {
    lines: ["Orange", "Bleue"],
    opened: 1984,
    zone: "Villeray",
    history: "Correspondance stratégique nord du réseau.",
    nearby: ["Marché Jean-Talon", "Plaza Saint-Hubert"],
    bus: ["92", "93", "141", "372"],
    accessibility: false,
    travaux: "",
    signalements: []
  },
  "McGill": {
    lines: ["Verte"],
    opened: 1966,
    zone: "Centre-ville",
    history: "Située sous la rue Union, elle dessert l'Université McGill et le centre-ville.",
    nearby: ["Université McGill", "Centre Eaton", "Place Montréal Trust"],
    bus: ["15", "61", "125", "168"],
    accessibility: true,
    travaux: "",
    signalements: []
  },
  "Mont-Royal": {
    lines: ["Orange"],
    opened: 1966,
    zone: "Plateau Mont-Royal",
    history: "Station iconique avec murales artistiques.",
    nearby: ["Avenue Mont-Royal", "Parc La Fontaine"],
    bus: ["11", "30", "361"],
    accessibility: false,
    travaux: "",
    signalements: []
  },
  "Vendôme": {
    lines: ["Orange"],
    opened: 1981,
    zone: "NDG",
    history: "Station connectée au train EXO.",
    nearby: ["CUSM / Hôpital Glen", "MUHC"],
    bus: ["24", "90", "105"],
    accessibility: true,
    travaux: "",
    signalements: []
  },
  "Longueuil-Université-de-Sherbrooke": {
    lines: ["Jaune"],
    opened: 1967,
    zone: "Longueuil",
    history: "Terminus sud de la ligne jaune, ouvert pour Expo 67.",
    nearby: ["Université de Sherbrooke (Campus Longueuil)", "Place Longueuil"],
    bus: ["8", "28", "88"],
    accessibility: true,
    travaux: "Travaux par promoteur externe à proximité de la station.",
    signalements: []
  },
  "Angrignon": {
    lines: ["Verte"],
    opened: 1978,
    zone: "LaSalle",
    history: "Terminus ouest de la ligne verte.",
    nearby: ["Parc Angrignon", "Carrefour Angrignon"],
    bus: ["36", "37", "90", "195"],
    accessibility: true,
    travaux: "",
    signalements: []
  },
  "Côte-Vertu": {
    lines: ["Orange"],
    opened: 1986,
    zone: "Saint-Laurent",
    history: "Terminus nord-ouest de la ligne orange.",
    nearby: ["Technoparc Montréal", "Collège Vanier"],
    bus: ["64", "121", "171", "177"],
    accessibility: true,
    travaux: "",
    signalements: []
  }
};