const pool = require("../../config/db");

// create a category
exports.create = async (req, res) => {
    try {
        const { category } = req.body;
        const newCategory = await pool.query("INSERT INTO categories (category) VALUES ($1) RETURNING *", [category]);
        res.json(newCategory.rows[0]);
    }
    catch (err) {
        console.error(err.message)
    }
};

// find all Categories
exports.findAll = async (req, res) => {
    try {
        const allCategories = await pool.query("SELECT * FROM categories");
        res.json(allCategories.rows);
    } catch (err) {
        console.error(err.message);
    }
};

// find Categories
exports.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const oneCategories = await pool.query("SELECT * FROM categories WHERE category_id=$1", [id]);
        res.json(oneCategories.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

// Update Categories
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name } = req.body;
        await pool.query("UPDATE categories SET category = $2  WHERE category_id = $1", [id, category_name]);
        res.json("Category was update!");
    } catch (err) {
        console.error(err.message);
    }
};

// delete Categories
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM categories WHERE category_id  = $1", [id]);
        res.json("Category was deleted !");
    }
    catch (err) {
        console.error(err.message)
    }
};