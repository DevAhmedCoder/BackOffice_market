const pool = require("../../config/db");

// create a product
exports.create = async (req, res) => {
    try {
        const {reference, name, category_id, price} = req.body;
        await pool.query("INSERT INTO products (reference, name, category_id, price) VALUES ($1, $2, $3, $4) RETURNING *",
            [reference, name, category_id, price]);
        res.json({
            success: true
        });
    } catch (err) {
        res.json(
            {
                success: false,
                message: err.detail
            });
        console.error(err);
    }
};

// find all products
exports.findAll = async (req, res) => {
    try {
        const allProduct = await pool.query(
            "SELECT products.id,products.name,products.price,products.reference,categories.name as category_name FROM products " +
            "INNER JOIN categories on products.category_id = categories.id");
        res.json(allProduct.rows);
    } catch (err) {
        console.error(err.message);
    }
};

// find product
exports.findById = async (req, res) => {
    try {
        const {id} = req.params;
        const oneProduct = await pool.query(
            "SELECT products.id,products.name,products.price,products.reference,products.category_id,categories.name as category_name FROM products " +
            "INNER JOIN categories on products.category_id = categories.id WHERE products.id = $1", [id]);
        res.json(oneProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const {id} = req.params;
        const {reference, name, category_id, price} = req.body;
        await pool.query(
            "UPDATE products SET reference = $2, name = $3, category_id = $4, price = $5  WHERE id = $1",
            [id, reference, name, category_id, price]);
        res.json({
            success: true
        });
    } catch (err) {
        res.json(
            {
                success: false,
                message: err.detail
            });
        console.error(err);
    }
};

// delete by id
exports.delete = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query("DELETE FROM products WHERE id = $1", [id]);
        res.json({
            success: true,
            message: "Product was deleted !"
        });
    } catch (err) {
        res.json(
            {
                success: false,
                message: err.detail
            });
        console.error(err);
    }
};

// delete by category id
exports.deleteByCategoryId = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query("DELETE FROM products WHERE category_id = $1", [id]);
        res.json({
            success: true,
            message: "Product was deleted !"
        });
    } catch (err) {
        res.json(
            {
                success: false,
                message: err.detail
            });
        console.error(err);
    }
};