const Products = require("../models/products.js");
const asyncHandler = require("express-async-handler");

const upsertProduct = asyncHandler(async (req, res) => {
	const { id, name, category, image, new_price, old_price } = req.body;

    if (!id || !name || !category || !image || !new_price || !old_price) {
		return res.status(400).json({ message: "All fields are required" });
	}

    try {
		const updatedProduct = await Product.findOneAndUpdate(
			{ _id },
			{
				name,
				category,
				image,
				new_price,
				old_price,
			},
			{
				new: true,
				upsert: true,
				runValidators: true,
			}
		);

		res.status(200).json(updatedProduct);
		console.log(updatedProduct);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

const getProductDetails = asyncHandler(async (req, res) => {
    const { id } = req.query;

    try {
        const product = await Products.findOne({ id: Number(id) });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({
            ...product.toObject(),
            _id: product._id.toString()  
        });
    } catch (error) {
        console.error("Error fetching product:", error.message);
        res.status(500).json({ message: "Failed to fetch product" });
    }
});

const getFullProducts = asyncHandler(async (req, res) => {
	const { category, type, offset = 0, limit = 100 } = req.query;

	const offsetInt = parseInt(offset, 10);
	const limitInt = parseInt(limit, 10);

	let query = {};
	if (category) query.category = category;
	if (type) query.type = type;

	console.log(category, type, offsetInt, limitInt);

	const products = await Products.find(query)
		.skip(offsetInt)
		.limit(limitInt)
		.lean();
	console.log(products.length);

	if (!products?.length) {
		return res.status(400).json({ message: "No products" });
	}

	const productsWithStringId = products.map((product) => ({
		...product,
		_id: product._id.toString(),
	}));

	res.json(productsWithStringId);
});

const getProducts = asyncHandler(async (req, res) => {
	const { category, type, offset = 0, limit = 100 } = req.query;

	const offsetInt = parseInt(offset, 10);
	const limitInt = parseInt(limit, 10);

	console.log(category, type, offsetInt, limitInt);

	let query = {};
	if (category) query.category = category;
	if (type) query.type = type;

	const fieldsToReturn = "_id id name category new_price old_price";

	const products = await Products.find(query)
		.select(fieldsToReturn)
		.skip(offsetInt)
		.limit(limitInt);
	console.log(products.length);

	if (!products?.length) {
		return res.status(400).json({ message: "No products" });
	}

	res.json(products);
});

const getProductImage = asyncHandler(async (req, res) => {
	const { id } = req.query;
	console.log(id);

	let query = {};
	if (id) query.id = id;

	const fieldsToReturn = "_id id image";

	const products = await Products.findOne(query).select(fieldsToReturn);
	console.log(products.length);

	if (!products?.length) {
		return res.status(400).json({ message: "No products" });
	}

	res.json(products);
});

module.exports = {
	getProducts,
	getProductImage,
	getFullProducts,
	upsertProduct,
    getProductDetails
};
