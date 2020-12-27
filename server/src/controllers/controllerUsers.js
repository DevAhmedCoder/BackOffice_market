const pool = require("../../config/db");

// create a users
exports.create = async (req, res) => {
    try {
        const { firstname, lastname, email, age } = req.body;
        const newUsers = await pool.query("INSERT INTO users (firstname, lastname, email, age) VALUES ($1, $2, $3, $4) RETURNING *", [firstname, lastname, email, age]);
        res.json("ok");
      
    }
    catch (err) {
        res.json(err.detail);
        console.error(err);
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
        const oneUsers = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(oneUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, age } = req.body;
        await pool.query(
            "UPDATE users SET firstname = $2, lastname = $3, email = $4, age = $5  WHERE id = $1",
            [id, firstname, lastname, email, age]);
        res.json("ok");
    } catch (err) {
        res.json(err.detail);
        console.error(err.message);
    }
};

// delete
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.json("user was deleted !");
    }
    catch (err) {
        console.error(err.message)
    }
};