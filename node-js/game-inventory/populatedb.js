#! /usr/bin/env node

console.log(
  'This script populates some test games, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Game = require("./models/game");
const Platform = require("./models/platform");
const Genre = require("./models/genre");
const Rating = require("./models/rating");

const genres = [];
const platforms = [];
const games = [];
const ratings = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createRatings();
  await createPlatforms();
  await createGames();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function gameCreate(
  index,
  name,
  platforms,
  description,
  rating,
  genres,
  price,
  stock
) {
  const gamedetail = { name, platforms, description, rating, price, stock };
  if (genres) gamedetail.genre = genres;
  const game = new Game(gamedetail);

  await game.save();
  games[index] = game;
  console.log(`Added game: ${name}`);
}

async function platformCreate(index, name, description, price, stock) {
  const platform = new Platform({ name, description, price, stock });
  await platform.save();
  platforms[index] = platform;
  console.log(`Added platform: ${name}`);
}

async function ratingCreate(index, name) {
  const rating = new Rating({ name });
  await rating.save();
  ratings[index] = rating;
  console.log(`Added rating: ${name}`);
}

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "Platformer"),
    genreCreate(1, "Action"),
    genreCreate(2, "Racing"),
  ]);
}

async function createPlatforms() {
  console.log("Adding platforms");
  await Promise.all([
    platformCreate(
      0,
      "Nintendo Switch",
      "The Nintendo Switch is both a home console and a handheld device - a hybrid of sorts. On the go, it'll be in the form of a tablet that also has a docking station which then plugs into your TV.In addition to providing single and multiplayer thrills at home, the Nintendo Switch system also enables gamers to play the same title wherever, whenever, and with whomever they choose.",
      300,
      0
    ),
    platformCreate(
      1,
      "Xbox Series X and S",
      "The Xbox Series X and Xbox Series S are, collectively, the fourth generation of the Xbox series of home video game consoles developed and sold by Microsoft. Released on November 10, 2020, the higher-end Xbox Series X and lower-end Xbox Series S are part of the ninth generation of video game consoles, which also includes Sony's PlayStation 5, released the same month. They superseded the Xbox One. ",
      459,
      11
    ),
    platformCreate(
      2,
      "Playstation 5",
      "The PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment. It was announced as the successor to the PlayStation 4 in April 2019, was launched on November 12, 2020, in Australia, Japan, New Zealand, North America, and South Korea, and was released worldwide one week later. The PS5 is part of the ninth generation of video game consoles, along with Microsoft's Xbox Series X/S consoles, which were released in the same month. ",
      499,
      0
    ),
    platformCreate(
      3,
      "Steam",
      "Steam is a video game digital distribution service and storefront from Valve. It was launched as a software client in September 2003 to provide game updates automatically for Valve's games, and expanded to distributing third-party titles in late 2005.",
      0,
      9999
    ),
  ]);
}

async function createRatings() {
  console.log("Adding ratings");
  await Promise.all([
    ratingCreate(0, "Everyone"),
    ratingCreate(1, "Everyone 10+"),
    ratingCreate(2, "Teen"),
    ratingCreate(3, "Mature 17+"),
    ratingCreate(4, "Adults Only 18+"),
    ratingCreate(5, "Rating Pending"),
  ]);
}

async function createGames() {
  console.log("Adding Games");
  await Promise.all([
    gameCreate(
      0,
      "Elden Ring",
      [platforms[1], platforms[2], platforms[3]],
      "Elden Ring is a 2022 action role-playing game developed by FromSoftware. It was directed by Hidetaka Miyazaki with worldbuilding provided by fantasy writer George R. R. Martin. It was released for PlayStation 4, PlayStation 5, Windows, Xbox One, and Xbox Series X/S on February 25 by FromSoftware in Japan and Bandai Namco Entertainment internationally. Players control a customizable player character who is on a quest to repair the Elden Ring and become the new Elden Lord. ",
      ratings[3],
      [genres[1]],
      59.99,
      3
    ),
    gameCreate(
      1,
      "Super Mario Odyssey",
      [platforms[0]],
      "Super Mario Odyssey is a 2017 platform game developed and published by Nintendo for the Nintendo Switch. An entry in the Super Mario series, it follows Mario and his new ally Cappy—a sentient hat that allows Mario to control other characters and objects—as they journey across various kingdoms to save Princess Peach from his nemesis Bowser's plans of forced marriage. In contrast to the linear gameplay of prior entries, the game returns to the primarily open-ended, 3D platform gameplay featured in Super Mario 64 and Super Mario Sunshine. ",
      ratings[1],
      [genres[0], genres[1]],
      59.99,
      34
    ),
  ]);
}
