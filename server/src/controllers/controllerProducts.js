const pool = require("../../config/db");

// create a product
exports.create = async (req, res) => {
    try {
        const { product_ref, product_name, product_category, product_price } = req.body;
        const newProduct = await pool.query("INSERT INTO product (product_ref, product_name, product_category, product_price) VALUES ($1, $2, $3, $4) RETURNING *", [product_ref, product_name, product_category, product_price]);
        res.json(newProduct.rows[0]);
    }
    catch (err) {
        console.error(err.message)
    }
};

// find all products
exports.findAll = async (req, res) => {
    try {
        const allProduct = await pool.query("SELECT * FROM product");
        res.json(allProduct.rows);
    } catch (err) {
        console.error(err.message);
    }
};

// find product
exports.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const oneProduct = await pool.query("SELECT * FROM product WHERE product_id = $1", [id]);
        res.json(oneProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_ref, product_name, product_category, product_price } = req.body;
        await pool.query(
            "UPDATE product SET product_ref = $2, product_name = $3, product_category = $4, product_price = $5  WHERE product_id = $1",
            [id, product_ref, product_name, product_category, product_price]);
        res.json("Product was update!");
    } catch (err) {
        console.error(err.message);
    }
};

// delete
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM product WHERE product_id = $1", [id]);
        res.json("Product was deleted !");
    }
    catch (err) {
        console.error(err.message)
    }
};