const pool = require("../../config/db");

// create a category
exports.create = async (req, res) => {
    try {
        const {name} = req.body;
        await pool.query("INSERT INTO categories (name) VALUES ($1) RETURNING * ",
            [name]);
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
        const {id} = req.params;
        const oneCategories = await pool.query("SELECT * FROM categories WHERE id=$1", [id]);
        res.json(oneCategories.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

// Update Categories
exports.update = async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        await pool.query("UPDATE categories SET name = $2  WHERE id = $1", [id, name]);
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

// delete Categories
exports.delete = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query("DELETE FROM categories WHERE id  = $1", [id]);
        res.json({
            success: true,
            message: "Category was deleted !"
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