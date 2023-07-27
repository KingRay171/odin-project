var express = require("express");
var router = express.Router();

const game_controller = require("../controllers/gameController");
const platform_controller = require("../controllers/platformController");
const genre_controller = require("../controllers/genreController");
const rating_controller = require("../controllers/ratingController");

router.get("/", game_controller.index);

router.get("/games", game_controller.all);

router.get("/platforms", platform_controller.all);

router.get("/ratings", rating_controller.all);

router.get("/genres", genre_controller.all);

router.get("/genre/create", genre_controller.create_get);

router.post("/genre/create", genre_controller.create_post);

router.get("/rating/create", rating_controller.create_get);

router.post("/rating/create", rating_controller.create_post);

router.get("/platform/create", platform_controller.create_get);

router.post("/platform/create", platform_controller.create_post);

router.get("/game/create", game_controller.create_get);

router.post("/game/create", game_controller.create_post);

router.get("/genre/:id", genre_controller.detail);

router.get("/genre/:id/update", genre_controller.update_get);

router.post("/genre/:id/update", genre_controller.update_post);

router.get("/rating/:id", rating_controller.detail);

router.get("/rating/:id/update", rating_controller.update_get);

router.post("/rating/:id/update", rating_controller.update_post);

router.get("/platform/:id", platform_controller.detail);

router.get("/platform/:id/update", platform_controller.update_get);

router.post("/platform/:id/update", platform_controller.update_post);

router.get("/game/:id", game_controller.detail);

router.get("/game/:id/update", game_controller.update_get);

router.post("/game/:id/update", game_controller.update_post);

router.get("/game/:id/delete", game_controller.delete_get);

router.post("/game/:id/delete", game_controller.delete_post);

router.get("/genre/:id/delete", genre_controller.delete_get);

router.post("/genre/:id/delete", genre_controller.delete_post);

router.get("/platform/:id/delete", platform_controller.delete_get);

router.post("/platform/:id/delete", platform_controller.delete_post);

router.get("/rating/:id/delete", rating_controller.delete_get);

router.post("/rating/:id/delete", rating_controller.delete_post);

module.exports = router;
