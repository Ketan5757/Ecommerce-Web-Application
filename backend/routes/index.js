const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_CLIENT);
const fetchUser = require("../middleware/authMiddleware");

const {
	getProducts,
	getProductImage,
	getFullProducts,
	upsertProduct,
	getProductDetails,
} = require("../controllers/productController");

const { createOrder, fetchOrders } = require("../controllers/orderController");

router
	.route("/")
	.get((req, res) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		res.end("Initialized!");
	})
	.put((req, res) => {});

router.route("/products").get(getProducts);
router.route("/fetchProductDetails").get(getProductDetails);
router.route("/productImage").get(getProductImage);
router.route("/productsWithImage").get(getFullProducts);
router.get("/dashboardProducts", fetchUser, getFullProducts);
router.post("/create-product", upsertProduct);

router.post("/create-order", createOrder);

router.post("/update-order-status", async (req, res) => {
	const { orderId, status } = req.body;

	try {
		const order = await Order.findById(orderId);

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		order.orderStatus = status;
		await order.save();

		res.status(200).json({ message: "Order status updated successfully" });
	} catch (error) {
		console.error("Error updating order status:", error);
		res.status(500).json({ message: "Failed to update order status" });
	}
});

router.post("/create-payment-intent", async (req, res) => {
	try {
		const { amount, currency } = req.body;
		console.log("Amount for payment intent:", amount);

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency,
		});
		console.log(paymentIntent.client_secret);
		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.error("Error creating payment intent:", error);
		res.status(500).send({ error: "Internal Server Error" });
	}
});

module.exports = router;
