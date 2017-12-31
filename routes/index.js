const routes = require("express").Router();
const coin = require("../classes/coin.js");

const client = new coin();

routes.get("/", (req, res) => {
  client.getTicker((err, foundCoins) => {
    res.render("index", { coins: foundCoins });
  });
});

routes.get("/:symbol", (req, res) => {
  var symbol = req.params.symbol;
  client.getMarket(symbol, (err, foundMarkets) => {
    res.render("coins", { symbol: symbol, market: foundMarkets });
  });
});

module.exports = routes;
