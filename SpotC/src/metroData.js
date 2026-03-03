export const metroLines = [
  {
    name: "Ligne Verte",
    color: "#00884c",
    stations: [
      "Angrignon", "Monk", "Jolicoeur", "Verdun", "De l'Église", "Lasalle", 
      "Charlevoix", "Lionel-Groulx", "Atwater", "Guy-Concordia", "Peel", 
      "McGill", "Place-des-Arts", "Saint-Laurent", "Berri-UQAM", "Beaudry", 
      "Papineau", "Frontenac", "Préfontaine", "Joliette", "Pie-IX", "Viau", 
      "Assomption", "Cadillac", "Langelier", "Radisson", "Honoré-Beaugrand"
    ]
  },
  {
    name: "Ligne Orange",
    color: "#ef8222",
    stations: [
      "Côte-Vertu", "Du Collège", "De la Savane", "Namur", "Plamondon", 
      "Côte-Sainte-Catherine", "Snowdon", "Villa-Maria", "Vendôme", "Place-Saint-Henri", 
      "Lionel-Groulx", "Georges-Vanier", "Lucien-L'Allier", "Bonaventure", "Square-Victoria-OACI", 
      "Place-d'Armes", "Champ-de-Mars", "Berri-UQAM", "Sherbrooke", "Mont-Royal", 
      "Laurier", "Rosemont", "Beaubien", "Jean-Talon", "Jarry", "Crémazie", 
      "Sauvé", "Henri-Bourassa", "Cartier", "De la Concorde", "Montmorency"
    ]
  },
  {
    name: "Ligne Bleue",
    color: "#0097d7",
    stations: [
      "Snowdon", "Côte-des-Neiges", "Université-de-Montréal", "Édouard-Montpetit", 
      "Outremont", "Acadie", "Parc", "De Castelnau", "Jean-Talon", "Fabre", 
      "D'Iberville", "Saint-Michel"
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
  // 🟢 LIGNE VERTE
  // =====================
  "Angrignon": {
    lines: ["Verte"],
    history: "Inaugurée en 1978, elle dessert le grand parc du même nom.",
    nearby: ["Parc Angrignon", "Carrefour Angrignon"],
    bus: ["37", "78", "106", "110", "113", "195", "406"],
    travaux: ""
  },
  "Monk": {
    lines: ["Verte"],
    history: "Station nommée en l'honneur de la famille Monk, d'importants propriétaires fonciers locaux.",
    nearby: ["Boulevard Monk"],
    bus: ["36", "78"],
    travaux: ""
  },
  "Jolicoeur": {
    lines: ["Verte"],
    history: "Reconnue pour son architecture audacieuse et son insertion dans un milieu boisé.",
    nearby: ["Canal de Lachine"],
    bus: ["37", "112"],
    travaux: ""
  },
  "Verdun": {
    lines: ["Verte"],
    history: "Située sous la rue de Verdun, elle dessert le cœur de l'arrondissement.",
    nearby: ["Plage de Verdun", "Mairie de Verdun"],
    bus: ["107", "108"],
    travaux: ""
  },
  "De l'Église": {
    lines: ["Verte"],
    history: "Station à quais superposés pour limiter l'excavation sous la rue Wellington.",
    nearby: ["Rue Wellington", "Hôpital de Verdun"],
    bus: ["12", "37", "58", "61"],
    travaux: ""
  },
  "Lasalle": {
    lines: ["Verte"],
    history: "Nommée ainsi en raison de sa proximité avec l'arrondissement LaSalle.",
    nearby: ["Ateliers municipaux"],
    bus: ["58", "108"],
    travaux: ""
  },
  "Charlevoix": {
    lines: ["Verte"],
    history: "Également à quais superposés, elle dessert le quartier Pointe-Saint-Charles.",
    nearby: ["YMCA Pointe-Saint-Charles"],
    bus: ["57", "71", "101", "107"],
    travaux: ""
  },
  "Lionel-Groulx": {
    lines: ["Verte", "Orange"],
    history: "Station de transfert majeure conçue sur deux niveaux pour faciliter les correspondances.",
    nearby: ["Marché Atwater", "Canal de Lachine"],
    bus: ["35", "36", "71", "108", "191", "211", "405", "485", "491", "496", "747"],
    travaux: ""
  },
  "Atwater": {
    lines: ["Verte"],
    history: "Pôle commercial important reliant le centre-ville et Westmount.",
    nearby: ["Collège Dawson", "Place Alexis Nihon", "Westmount Square"],
    bus: ["24", "63", "90", "104", "138", "144"],
    travaux: ""
  },
  "Guy-Concordia": {
    lines: ["Verte"],
    history: "Dessert le campus centre-ville de l'Université Concordia.",
    nearby: ["Université Concordia", "Musée des beaux-arts de Montréal"],
    bus: ["15", "57", "66", "165", "166", "465"],
    travaux: ""
  },
  "Peel": {
    lines: ["Verte"],
    history: "Célèbre pour ses cercles colorés intégrés dans les murs de béton.",
    nearby: ["Cours Mont-Royal", "Square Dorchester"],
    bus: ["15", "107", "168"],
    travaux: ""
  },
  "McGill": {
    lines: ["Verte"],
    history: "Une des stations les plus fréquentées, au cœur du Montréal souterrain (RÉSO).",
    nearby: ["Université McGill", "Centre Eaton", "Place Montréal Trust"],
    bus: ["15", "61", "125", "168", "420", "427"],
    travaux: "Chantier REM à proximité."
  },
  "Place-des-Arts": {
    lines: ["Verte"],
    history: "Porte d'entrée du Quartier des spectacles.",
    nearby: ["Place des Arts", "MAC", "Complexe Desjardins"],
    bus: ["15", "80", "125", "129", "480"],
    travaux: ""
  },
  "Saint-Laurent": {
    lines: ["Verte"],
    history: "Située sur le boulevard Saint-Laurent, la 'Main' de Montréal.",
    nearby: ["Monument-National", "Quartier chinois"],
    bus: ["15", "55", "125", "150"],
    travaux: ""
  },
  "Berri-UQAM": {
    lines: ["Verte", "Orange", "Jaune"],
    history: "Cœur battant du réseau depuis 1966, point de transfert pour trois lignes.",
    nearby: ["UQAM", "Grande Bibliothèque (BAnQ)", "Gare d'autocars", "CHUM"],
    bus: ["15", "30", "125", "427", "747"],
    travaux: ""
  },
  "Beaudry": {
    lines: ["Verte"],
    history: "Porte d'entrée du Village, reconnaissable à ses piliers arc-en-ciel.",
    nearby: ["Le Village"],
    bus: ["15", "150"],
    travaux: ""
  },
  "Papineau": {
    lines: ["Verte"],
    history: "Située près du pont Jacques-Cartier, elle dessert le quartier Sainte-Marie.",
    nearby: ["Édifice de Radio-Canada", "Pont Jacques-Cartier"],
    bus: ["10", "15", "34", "45", "150", "445"],
    travaux: ""
  },
  "Frontenac": {
    lines: ["Verte"],
    history: "Desserte locale importante pour le quartier Centre-Sud.",
    nearby: ["Centre Jean-Claude-Malépart"],
    bus: ["10", "29", "34", "85", "94", "125", "150", "185"],
    travaux: ""
  },
  "Préfontaine": {
    lines: ["Verte"],
    history: "Première station d'Hochelaga-Maisonneuve en direction est.",
    nearby: ["Aréna Francis-Bouillon"],
    bus: ["29", "34", "85", "125"],
    travaux: ""
  },
  "Joliette": {
    lines: ["Verte"],
    history: "Située au cœur de la zone résidentielle d'Hochelaga.",
    nearby: ["Place Simon-Valois"],
    bus: ["29", "34", "85", "125"],
    travaux: ""
  },
  "Pie-IX": {
    lines: ["Verte"],
    history: "Station thématique liée aux Jeux Olympiques de 1976.",
    nearby: ["Stade Olympique", "Jardin Botanique", "Biodôme"],
    bus: ["97", "139", "185", "355", "439 (SRB Pie-IX)"],
    travaux: ""
  },
  "Viau": {
    lines: ["Verte"],
    history: "Accès direct au Parc olympique et au Stade Saputo.",
    nearby: ["Planétarium", "Insectarium", "Stade Saputo"],
    bus: ["34", "125", "136", "185"],
    travaux: ""
  },
  "Assomption": {
    lines: ["Verte"],
    history: "Dessert le secteur industriel et institutionnel de l'est.",
    nearby: ["Hôpital Maisonneuve-Rosemont"],
    bus: ["131"],
    travaux: ""
  },
  "Cadillac": {
    lines: ["Verte"],
    history: "Nommée en l'honneur du fondateur de Détroit, Antoine Laumet de La Mothe Cadillac.",
    nearby: ["Centre commercial Domaine"],
    bus: ["32", "185", "432"],
    travaux: ""
  },
  "Langelier": {
    lines: ["Verte"],
    history: "Dessert une zone commerciale et résidentielle dense.",
    nearby: ["Bibliothèque Langelier"],
    bus: ["33", "185", "197"],
    travaux: ""
  },
  "Radisson": {
    lines: ["Verte"],
    history: "Pôle bus important pour le transport vers l'est et la Rive-Nord.",
    nearby: ["Place Versailles"],
    bus: ["26", "28", "44", "185", "410", "430", "444"],
    travaux: ""
  },
  "Honoré-Beaugrand": {
    lines: ["Verte"],
    history: "Terminus est de la ligne verte depuis 1976.",
    nearby: ["Terminus Honoré-Beaugrand"],
    bus: ["18", "26", "28", "141", "185", "186", "187", "189", "486", "487"],
    travaux: ""
  },

  // =====================
  // 🟠 LIGNE ORANGE
  // =====================
  "Côte-Vertu": {
    lines: ["Orange"],
    history: "Terminus ouest et pôle bus majeur pour l'arrondissement Saint-Laurent.",
    nearby: ["Cégep Saint-Laurent", "Vanier College"],
    bus: ["17", "64", "70", "121", "128", "171", "174", "177", "196", "213", "215", "225", "470"],
    travaux: ""
  },
  "Du Collège": {
    lines: ["Orange"],
    history: "Nommée en raison de la proximité du Vieux Collège de Saint-Laurent.",
    nearby: ["Musée des métiers d'art du Québec"],
    bus: ["17", "128", "175", "202"],
    travaux: ""
  },
  "De la Savane": {
    lines: ["Orange"],
    history: "Localisée près de l'autoroute Décarie, autrefois une zone de savane.",
    nearby: ["Carré Lucerne"],
    bus: ["17", "100"],
    travaux: ""
  },
  "Namur": {
    lines: ["Orange"],
    history: "Célèbre pour son luminaire géant en forme de molécule.",
    nearby: ["Epicentre Retail", "Décarie"],
    bus: ["17", "92", "115", "124"],
    travaux: ""
  },
  "Plamondon": {
    lines: ["Orange"],
    history: "Sert le quartier multiethnique de Côte-des-Neiges.",
    nearby: ["Parc Van Horne"],
    bus: ["124", "160", "161"],
    travaux: ""
  },
  "Côte-Sainte-Catherine": {
    lines: ["Orange"],
    history: "Située dans un quartier résidentiel calme de l'arrondissement.",
    nearby: ["École de musique Vincent-d'Indy"],
    bus: ["124", "129"],
    travaux: ""
  },
  "Snowdon": {
    lines: ["Orange", "Bleue"],
    history: "Station de transfert à deux niveaux avec des quais superposés.",
    nearby: ["Chemin Queen-Mary", "Oratoire Saint-Joseph (à distance)"],
    bus: ["17", "51", "124", "166"],
    travaux: ""
  },
  "Villa-Maria": {
    lines: ["Orange"],
    history: "Dessert le prestigieux collège Villa Maria.",
    nearby: ["Collège Villa Maria"],
    bus: ["17", "24", "103", "162"],
    travaux: ""
  },
  "Vendôme": {
    lines: ["Orange"],
    history: "Pôle intermodal relié aux trains d'exo et au CUSM.",
    nearby: ["CUSM (Hôpital)", "Trains exo"],
    bus: ["17", "37", "90", "102", "104", "105", "124"],
    travaux: ""
  },
  "Place-Saint-Henri": {
    lines: ["Orange"],
    history: "Inspirée par l'œuvre de Gabrielle Roy, 'Bonheur d'occasion'.",
    nearby: ["Parc Sir-George-Étienne-Cartier"],
    bus: ["17", "35", "36", "78", "191"],
    travaux: ""
  },
  "Georges-Vanier": {
    lines: ["Orange"],
    history: "Une des stations les moins fréquentées, elle dessert la Petite-Bourgogne.",
    nearby: ["Bibliothèque Georges-Vanier"],
    bus: ["36"],
    travaux: ""
  },
  "Lucien-L'Allier": {
    lines: ["Orange"],
    history: "Reliée au Centre Bell et à la gare de train de banlieue.",
    nearby: ["Centre Bell", "Gare Lucien-L'Allier"],
    bus: ["36", "150", "350", "355", "358", "364"],
    travaux: ""
  },
  "Bonaventure": {
    lines: ["Orange"],
    history: "Reliée à la Gare Centrale et au terminus d'autobus métropolitain.",
    nearby: ["Place Ville-Marie", "Gare Centrale", "Place Bonaventure"],
    bus: ["36", "61", "74", "75", "107", "168", "420", "427", "747"],
    travaux: ""
  },
  "Square-Victoria-OACI": {
    lines: ["Orange"],
    history: "Célèbre pour son entrée de style Art nouveau signée Hector Guimard.",
    nearby: ["OACI", "Tour de la Bourse", "Vieux-Montréal"],
    bus: ["35", "36", "61", "75", "168"],
    travaux: ""
  },
  "Place-d'Armes": {
    lines: ["Orange"],
    history: "Accès principal au Palais des congrès et au Quartier chinois.",
    nearby: ["Palais des congrès", "Quartier chinois", "Basilique Notre-Dame"],
    bus: ["55", "129"],
    travaux: ""
  },
  "Champ-de-Mars": {
    lines: ["Orange"],
    history: "Réputée pour son vitrail monumental illuminant les quais.",
    nearby: ["Hôtel de Ville de Montréal", "CHUM", "Vieux-Port"],
    bus: ["14", "129"],
    travaux: ""
  },
  "Sherbrooke": {
    lines: ["Orange"],
    history: "Située près du Carré Saint-Louis et de l'ITHQ.",
    nearby: ["ITHQ", "Carré Saint-Louis"],
    bus: ["24", "30", "144"],
    travaux: ""
  },
  "Mont-Royal": {
    lines: ["Orange"],
    history: "Porte d'entrée du Plateau, elle a été récemment rénovée pour l'accessibilité.",
    nearby: ["Avenue du Mont-Royal", "Parc du Mont-Royal (bus)"],
    bus: ["11", "30", "97", "711"],
    travaux: ""
  },
  "Laurier": {
    lines: ["Orange"],
    history: "Dessert le secteur nord du Plateau-Mont-Royal.",
    nearby: ["Petit Laurier"],
    bus: ["14", "27", "30", "47", "51", "711"],
    travaux: ""
  },
  "Rosemont": {
    lines: ["Orange"],
    history: "Reliée à une importante station de bus et de vélos.",
    nearby: ["Bibliothèque Marc-Favreau"],
    bus: ["13", "25", "30", "161", "197"],
    travaux: ""
  },
  "Beaubien": {
    lines: ["Orange"],
    history: "Station centrale du quartier Rosemont–La Petite-Patrie.",
    nearby: ["Cinéma Beaubien (à distance)"],
    bus: ["18", "30", "160"],
    travaux: ""
  },
  "Jean-Talon": {
    lines: ["Orange", "Bleue"],
    history: "Seul point de transfert entre les lignes orange et bleue.",
    nearby: ["Marché Jean-Talon", "Petite Italie", "Plaza St-Hubert"],
    bus: ["30", "31", "92", "93", "95", "99"],
    travaux: ""
  },
  "Jarry": {
    lines: ["Orange"],
    history: "Située près du parc Jarry et de son stade de tennis.",
    nearby: ["Parc Jarry", "Stade IGA"],
    bus: ["31", "193"],
    travaux: ""
  },
  "Crémazie": {
    lines: ["Orange"],
    history: "Dessert le secteur industriel et le Collège Ahuntsic.",
    nearby: ["Collège Ahuntsic", "FTQ"],
    bus: ["31", "52", "54", "56", "100", "146", "460"],
    travaux: ""
  },
  "Sauvé": {
    lines: ["Orange"],
    history: "Reliée à la gare Sauvé du train de banlieue.",
    nearby: ["Gare Sauvé"],
    bus: ["31", "41", "121", "140", "180"],
    travaux: ""
  },
  "Henri-Bourassa": {
    lines: ["Orange"],
    history: "Pôle majeur pour les bus vers le nord de l'île et Laval.",
    nearby: ["Parc Ahuntsic"],
    bus: ["31", "48", "49", "55", "56", "69", "164", "171"],
    travaux: ""
  },
  "Cartier": {
    lines: ["Orange"],
    history: "Première station de Laval en venant du sud.",
    nearby: ["Terminus Cartier"],
    bus: ["STL Laval", "Exo"],
    travaux: ""
  },
  "De la Concorde": {
    lines: ["Orange"],
    history: "Station multimodale connectée à la ligne exo Saint-Jérôme.",
    nearby: ["Gare de la Concorde"],
    bus: ["STL Laval"],
    travaux: ""
  },
  "Montmorency": {
    lines: ["Orange"],
    history: "Terminus nord à Laval, nommée pour le premier évêque de Québec.",
    nearby: ["Université de Montréal (Laval)", "Collège Letendre", "Centre de la nature"],
    bus: ["STL Laval", "Exo", "361", "400"],
    travaux: ""
  },

  // =====================
  // 🔵 LIGNE BLEUE
  // =====================
  "Côte-des-Neiges": {
    lines: ["Bleue"],
    history: "Station profonde desservant le quartier de l'Université de Montréal.",
    nearby: ["Oratoire Saint-Joseph", "Hôpital Sainte-Justine"],
    bus: ["51", "119", "165", "166", "465"],
    travaux: ""
  },
  "Université-de-Montréal": {
    lines: ["Bleue"],
    history: "Dessert le campus principal de l'UdeM.",
    nearby: ["UdeM", "HEC Montréal", "Polytechnique"],
    bus: ["51", "119"],
    travaux: ""
  },
  "Édouard-Montpetit": {
    lines: ["Bleue"],
    history: "Reliée à une station du futur REM située très en profondeur.",
    nearby: ["CEPSUM"],
    bus: ["51", "119", "129"],
    travaux: ""
  },
  "Outremont": {
    lines: ["Bleue"],
    history: "Station décorée de magnifiques verrières circulaires.",
    nearby: ["Campus MIL"],
    bus: ["51", "119", "160", "161"],
    travaux: ""
  },
  "Acadie": {
    lines: ["Bleue"],
    history: "Dessert le quartier Parc-Extension et le campus MIL.",
    nearby: ["Campus MIL"],
    bus: ["16", "80", "179", "480"],
    travaux: ""
  },
  "Parc": {
    lines: ["Bleue"],
    history: "Reliée à l'ancienne gare Jean-Talon et aux trains d'exo.",
    nearby: ["Gare Parc", "Parc Jarry"],
    bus: ["16", "80", "92", "93", "480"],
    travaux: ""
  },
  "De Castelnau": {
    lines: ["Bleue"],
    history: "Dessert le quartier de la Petite Italie.",
    nearby: ["Marché Jean-Talon", "Stade IGA"],
    bus: ["55", "92", "93"],
    travaux: ""
  },
  "Fabre": {
    lines: ["Bleue"],
    history: "Station profonde desservant l'est du quartier Villeray.",
    nearby: ["Hôpital Jean-Talon"],
    bus: ["45", "93", "99"],
    travaux: ""
  },
  "D'Iberville": {
    lines: ["Bleue"],
    history: "Accès principal au quartier Saint-Michel sud.",
    nearby: ["Secteur résidentiel"],
    bus: ["93", "94", "99"],
    travaux: ""
  },
  "Saint-Michel": {
    lines: ["Bleue"],
    history: "Terminus est actuel de la ligne bleue.",
    nearby: ["Parc François-Perrault", "Bibliothèque de Saint-Michel"],
    bus: ["41", "67", "93", "99", "141", "188", "467"],
    travaux: "Futur prolongement vers Anjou en préparation."
  },

  // =====================
  // 🟡 LIGNE JAUNE
  // =====================
  "Jean-Drapeau": {
    lines: ["Jaune"],
    history: "Station inaugurée pour l'Expo 67 sur l'île Sainte-Hélène.",
    nearby: ["Parc Jean-Drapeau", "Biosphère", "Casino de Montréal", "La Ronde"],
    bus: ["767 (La Ronde)", "768 (Plage)", "777 (Casino)"],
    travaux: ""
  },
  "Longueuil-Université-de-Sherbrooke": {
    lines: ["Jaune"],
    history: "Terminus de la ligne jaune, reliant la Rive-Sud au métro.",
    nearby: ["Université de Sherbrooke (Campus Longueuil)", "Place Longueuil", "Terminus Longueuil"],
    bus: ["1 (RTL)", "2 (RTL)", "8 (RTL)", "28 (RTL)", "88 (RTL)", "170 (RTL)"],
    travaux: "Travaux par promoteur externe à proximité."
  }
};