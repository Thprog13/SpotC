export const metroLines = [
  {
    name: "Ligne Verte",
    color: "#00884c",
    stations: ["Angrignon", "Monk", "Jolicoeur", "Verdun", "De l'Église", "Lasalle", "Charlevoix", "Lionel-Groulx", "Atwater", "Guy-Concordia", "Peel", "McGill", "Place-des-Arts", "Saint-Laurent", "Berri-UQAM", "Beaudry", "Papineau", "Frontenac", "Préfontaine", "Joliette", "Pie-IX", "Viau", "Assomption", "Cadillac", "Langelier", "Radisson", "Honoré-Beaugrand"]
  },
  {
    name: "Ligne Orange",
    color: "#ef8222",
    stations: ["Côte-Vertu", "Du Collège", "De la Savane", "Namur", "Plamondon", "Côte-Sainte-Catherine", "Snowdon", "Villa-Maria", "Vendôme", "Place-Saint-Henri", "Lionel-Groulx", "Georges-Vanier", "Lucien-L'Allier", "Bonaventure", "Square-Victoria-OACI", "Place-d'Armes", "Champ-de-Mars", "Berri-UQAM", "Sherbrooke", "Mont-Royal", "Laurier", "Rosemont", "Beaubien", "Jean-Talon", "Jarry", "Crémazie", "Sauvé", "Henri-Bourassa", "Cartier", "De la Concorde", "Montmorency"]
  },
  {
    name: "Ligne Bleue",
    color: "#0097d7",
    stations: ["Snowdon", "Côte-des-Neiges", "Université-de-Montréal", "Édouard-Montpetit", "Outremont", "Acadie", "Parc", "De Castelnau", "Jean-Talon", "Fabre", "D'Iberville", "Saint-Michel"]
  },
  {
    name: "Ligne Jaune",
    color: "#f5d523",
    stations: ["Berri-UQAM", "Jean-Drapeau", "Longueuil-Université-de-Sherbrooke"]
  }
];

export const metroDetails = {
  "Berri-UQAM": {
    history: "Inaugurée en 1966, c'est la station la plus fréquentée du réseau. Elle rend hommage à l'UQAM et à la rue Berri.",
    nearby: ["UQAM", "Grande Bibliothèque", "Gare d'autocars de Montréal", "CHUM"],
    bus: ["15", "30", "125", "427", "715", "747"],
    signalements: [
      { type: "Police", desc: "Agents à la sortie St-Denis", time: "5 min" },
      { type: "Travaux", desc: "Ascenseur en panne", time: "20 min" }
    ]
  },
  "McGill": {
    history: "Située au cœur du centre-ville, elle dessert le quartier des spectacles et les grands magasins.",
    nearby: ["Université McGill", "Centre Eaton", "Place Montréal Trust"],
    bus: ["15", "61", "125", "168"],
    signalements: []
  }
};