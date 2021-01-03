const pool = require("../../config/db");

// create a product
exports.create = async (req, res) => {
    try {
        const { ref, name, category, price } = req.body;
        const newProduct = await pool.query("INSERT INTO products (ref, name, category, price) VALUES ($1, $2, $3, $4) RETURNING *", [ref, name, category, price]);
        res.json(newProduct.rows[0]);
    }
    catch (err) {
        console.error(err.message)
    }
};

// find all products
exports.findAll = async (req, res) => {
    try {
        const allProduct = await pool.query("SELECT * FROM products INNER JOIN categories on product.category = categories.id");
        res.json(allProduct.rows);
    } catch (err) {
        console.error(err.message);
    }
};

// find product
exports.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const oneProduct = await pool.query("SELECT * FROM products INNER JOIN categories on product.category = categories.id WHERE product_id = $1", [id]);
        res.json(oneProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { ref, name, category, price } = req.body;
        await pool.query(
            "UPDATE products SET product_ref = $2, product_name = $3, product_category = $4, product_price = $5  WHERE product_id = $1",
            [id, ref, name, category, price]);
        res.json("Product was update!");
    } catch (err) {
        console.error(err.message);
    }
};

// delete
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM products WHERE id = $1", [id]);
        res.json("Product was deleted !");
    }
    catch (err) {
        console.error(err.message)
    }
};