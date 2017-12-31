var cpi = require('node-coinmarketcap-api');

var market = require('coinmarketcap-cli-api');

const client = new cpi();

// Constructor
const Coin = function() {
  this.items = [];
  this.numItems = 0;
  this.total = 0;
};


// coins whose 24h vol > 1000000
// show exchanges of those coins

Coin.prototype.getTicker = function(cb) {

  client.ticker()
    .then(function(res) {
      cb(null, transformTickerData(res));
      return;
    })
    .catch(function(err) {
      console.log(err);
      return cb(err);
    })
}

function transformTickerData(data) {
  // 24h volume >= 1000000
  var newArr = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i]['24h_volume_usd'] > 1000000) {
      newArr.push(data[i]);
    }
    if (i == data.length - 1)
      return newArr
  }
}

Coin.prototype.getMarket = function(symbol, cb) {

  market.getMarkets(symbol)
    .then(function(res) {
    	cb(null, transformMarketData(res));
    })
    .catch(function(err) {
    	cb(err);
    });
}

function transformMarketData(data) {
  // 24h volume >= 1000000
  var newArr = [];
  for (var i = 0; i < data.length; i++) {
  	var volumeStr = data[i]['Volume (24h)'];
    if (parseFloat(volumeStr.replace(/[^0-9-.]/g, '')) > 1000000 && data[i].Pair.includes('/BTC')) {
      newArr.push(data[i]);
    }
    if (i == data.length - 1)
      return newArr
  }
}

Coin.prototype.isDup = function(id) {
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i]._id.toString() === id.toString()) {
      return i.toString();
    }
  }
  return false;
};


module.exports = Coin;
