// moviesData.ts
export const mockplayingData = [
  {
    id: 1,
    image: "despicableme4.jpg",
    title: "Despicable Me 4",
    backdrop_path: "despicableme4bd.jpg",
    summary:
      "Things just got a little more despicable. Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
  },
  {
    id: 2,
    image: "deadpoolandwolverine.jpg",
    backdrop_path: "deadpoolandwolverinebd.jpg",
    title: "Deadpool and Wolverine",
    summary:
      "Come together. A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
  },
  {
    id: 3,
    image: "gladiator2.jpg",
    backdrop_path: "gladiator2bd.jpg",
    title: "Gladiator II",
    summary:
      "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.",
  },
  {
    id: 4,
    image: "thewildrobot.jpg",
    backdrop_path: "thewildrobotbd.jpg",
    title: "The Wild Robot",
    summary:
      "Discover your true nature. After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
  },
  {
    id: 5,
    image: "transformerone.jpg",
    backdrop_path: "transformersbd.jpg",
    title: "Transformer One",
    summary:
      "The untold origin story of Optimus Prime and Megatron, better known as sworn enemies, but once were friends bonded like brothers who changed the fate of Cybertron forever.",
  },

  {
    id: 6,
    image: "venom.jpg",
    backdrop_path: "venombd.jpg",
    title: "Venom",
    summary:
      "'Til death do they part.Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
  },
  {
    id: 7,
    image: "thejoker.jpg",
    backdrop_path: "jokerbd.jpg",
    title: "Joker: Folie à Deux",
    summary:
      "The world is a stage. While struggling with his dual identity, Arthur Fleck not only stumbles upon true love, but also finds the music that's always been inside him.",
  },
  // Add more "Now Playing" movies here
];

export const mockpopularData = [
  {
    id: 1,
    image: "despicableme4.jpg",
    title: "Despicable Me 4",
    backdrop_path: "@/_assets/films/popularfilms/arcadian.jpg",
    summary: "Summary of Now Playing Movie 1",
  },
  {
    id: 2,
    image: "deadpoolandwolverine.jpg",
    backdrop_path: "@/_assets/films/popularfilms/arcadian.jpg",
    title: "Deadpool and Wolverine",
    summary: "Summary of Now Playing Movie 1",
  },
  {
    id: 3,
    image: "gladiator2.jpg",
    backdrop_path: "@/_assets/films/popularfilms/arcadian.jpg",
    title: "Gladiator II",
    summary: "Summary of Now Playing Movie 1",
  },
  // Add more "Popular" movies here
];

export const mocktopratedData = [
  {
    id: 1,
    image: "thegodfather.jpg",
    title: "The Godfather",
    backdrop_path: "@/_assets/films/popularfilms/arcadian.jpg",
    summary: "Summary of Now Playing Movie 1",
  },
  {
    id: 2,
    image: "shawshankredemption.jpg",
    backdrop_path: "@/_assets/films/popularfilms/arcadian.jpg",
    title: "Shawshank Redemption",
    summary: "Summary of Now Playing Movie 1",
  },
  {
    id: 3,
    image: "thedarkknight.jpg",
    backdrop_path: "@/_assets/films/popularfilms/arcadian.jpg",
    title: "The Dark Knight",
    summary: "Summary of Now Playing Movie 1",
  },
  {
    id: 4,
    image: "spiritedaway.jpg",
    backdrop_path: "@/_assets/films/popularfilms/arcadian.jpg",
    title: "Spirited Away",
    summary: "Summary of Now Playing Movie 1",
  },
  {
    id: 5,
    image: "pulpfiction.jpg",
    backdrop_path: "@/_assets/films/popularfilms/arcadian.jpg",
    title: "Pulp Fiction",
    summary: "Summary of Now Playing Movie 1",
  },
  {
    id: 6,
    image: "thegreenmile.jpg",
    backdrop_path: "@/_assets/films/popularfilms/arcadian.jpg",
    title: "The Green Mile",
    summary: "Summary of Now Playing Movie 1",
  },

  // Add more "Top Rated" movies here
];

export const MovieLists = [
  {
    _id: "1",
    name: "Top Sci-Fi Movies",
    description: "A collection of the best science fiction movies of all time.",
    entries: [
      { itemType: "movie", item_id: "001", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
      { itemType: "movie", item_id: "002", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
      { itemType: "movie", item_id: "003", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
    ],
  },
  {
    _id: "2",
    name: "Family Favorites",
    description: "Movies the whole family can enjoy.",
    entries: [
      { itemType: "movie", item_id: "004", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
      { itemType: "movie", item_id: "005", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
      { itemType: "movie", item_id: "006", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
    ],
  },
  {
    _id: "3",
    name: "Oscar Winners",
    description: "Award-winning movies from the Oscars.",
    entries: [
      { itemType: "movie", item_id: "007", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
      { itemType: "movie", item_id: "008", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
      { itemType: "movie", item_id: "009" }, 
    ],
  },
  {
    _id: "4",
    name: "Upcoming Releases",
    description: "A list of movies scheduled to release soon.",
    entries: [
      { itemType: "movie", item_id: "010", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
      { itemType: "movie", item_id: "011", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
    ],
  },
  {
    _id: "5",
    name: "Classic Thrillers",
    description: "Timeless thriller movies that keep you on the edge of your seat.",
    entries: [
      { itemType: "movie", item_id: "012", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
      { itemType: "movie", item_id: "013", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
      { itemType: "movie", item_id: "014", imageUrl: "@/_assets/films/popularfilms/arcadian.jpg" },
    ],
  },
];

