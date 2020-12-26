const pool = require("../../config/db");

// create user
exports.create = async (req, res) => {
    try {
        const { first_name, last_name, email, age } = req.body;
         await pool.query(
            "INSERT INTO users (first_name, last_name, email, age) VALUES ($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, email, age]);
        ;
    }
    catch (err) {
        console.error(err.message)
    }
};

// find all users
exports.findAll = async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
       
    } catch (err) {
        console.error(err.message);
    }
};

// find user
exports.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const oneUsers = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        res.json(oneUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, age } = req.body;
        await pool.query(
            "UPDATE users SET first_name = $2, last_name = $3, email = $4, age = $5  WHERE user_id = $1",
            [id, first_name, last_name, email,age]);
        res.json("user was update!");
    } catch (err) {
        console.error(err.message);
    }
};

// delete
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
        res.json("user was deleted !");
    }
    catch (err) {
        console.error(err.message)
    }
};