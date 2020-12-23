const pool = require("../../config/db");

// create a users
exports.create = async (req, res) => {
    try {
        const { firstName, lastName, email, age } = req.body;
        const newUsers = await pool.query("INSERT INTO users (firstName, lastName, email, age) VALUES ($1, $2, $3, $4) RETURNING *", [firstName, lastName, email, age]);
        res.json(newUsers.rows[0]);
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

// find users
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
        const { firstName, lastName, email, age } = req.body;
        await pool.query(
            "UPDATE users SET firstName = $2, lastName = $3, email = $4, age = $5  WHERE user_id = $1",
            [id, firstName, lastName, email,age]);
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