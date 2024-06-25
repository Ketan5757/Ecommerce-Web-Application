const Order = require("../models/order.js");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
	const {
        user,
        orderItems,
        totalAmount,
        shippingAddress,
        paymentMethod,
        paymentStatus,
        orderStatus,
        isActive
    } = req.body;

    if (!user || !orderItems || !totalAmount || !shippingAddress || !paymentMethod) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newOrder = new Order({
            user,
            orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentStatus,
            orderStatus,
            isActive
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: "Order created successfully", orderId: savedOrder._id.toString() });
        console.log(savedOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to create order' });
    }
});

const fetchOrders = asyncHandler(async (req, res) => {
	const { user, offset = 0, limit = 100 } = req.query;

	const offsetInt = parseInt(offset, 10);
	const limitInt = parseInt(limit, 10);

	let query = {};
	if (user) query.user = user;
	if (type) query.type = type;

	console.log(user, offsetInt, limitInt);

	const orders = await Products.find(query)
		.skip(offsetInt)
		.limit(limitInt)
		.lean();
	console.log(orders.length);

	if (!orders?.length) {
		return res.status(400).json({ message: "No orders" });
	}

	const ordersWithStringId = orders.map((order) => ({
		...order,
		_id: order._id.toString(),
	}));

	res.json(ordersWithStringId);
});

module.exports = {
	fetchOrders,
    createOrder
};
