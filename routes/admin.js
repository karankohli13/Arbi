const routes = require("express").Router();
const Order = require("../models/order.js");


routes.get("/", (req, res) => {
	(() => {
		return new Promise((resolve, reject) => {
			Order.find({}, (err, foundOrders) => {
				if (err) reject(err);
				resolve(foundOrders);
			});
		});
	})()
	.then(foundOrders => {
		res.render("admin/admin", { orders: foundOrders });
	})
	.catch(err => {
		res.send("Error: " + err);
	});
});

module.exports = routes;