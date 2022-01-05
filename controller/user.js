const client = require('../db/db')
const express = require('express');
const router = express.Router();

router.post('/login', login);
router.put('/update', updateUser);
router.post('/register', addUser);



function varifyLogin(dbUsername, dbPassword, username, password) {
    if (dbUsername == username && dbPassword == password) {
        return true;
    }
    return false;
}

async function login(req, response) {
    let name;
    let Role
    client.query('select * from users where user_name = $1', [req.body.username], (err, res) => {
        if (res && res.rows[0]) {
            if (varifyLogin(res.rows[0].user_name, res.rows[0].password, req.body.username, req.body.password)) {
                response.status(200).contentType('application/json').json({
                    "message": "login ok!",
                    "data": {
                        username: res.rows[0].user_name,
                        role: res.rows[0].role,
                        phone_number: res.rows[0].phone_number
                    }
                })
            }
            else {
                response.status(400).contentType('application/json').json({
                    "message": "Wrong username or password"
                })
            }
        }
        else {
            response.status(400).contentType('application/json').json({
                "message": "Wrong username or password"
            })
        }
    })
}



async function updateUser(req, response) {

    let user = await client.query("select * from users");
    for (let i = 0; i < user.rowCount; i++) {
        if (user.rows[i].email == req.body.email) {
            if (user.rows[i].user_name != req.body.currentUser) {
                return response.status(400).json({ message: "email exist" });
            }
        }
        if (user.rows[i].phone_number == req.body.phone) {
            if (user.rows[i].user_name != req.body.currentUser)
                return response.status(400).json({ message: "phone number exist" });
        }
    }

    client.query('UPDATE users SET  first_name=$1, last_name=$2, email=$3, phone_number=$4 WHERE user_name = $5', [req.body.name, req.body.lname, req.body.email, req.body.phone, req.body.currentUser],
        (err, res) => {
            if (err) {
                response.status(400).contentType('application/json').json({
                    "message": "edit failed!"
                })
            } else
                response.status(200).contentType('application/json').json({
                    "message": "edit ok!"
                })
        }
    )
}

async function addUser(req, response) {

    _userObj = req.body;

    let sql = `INSERT INTO users(user_name, password, first_name, last_name, email, phone_number, role) 
            VALUES($1,$2, $3, $4, $5, $6, $7)`;

    let values = [
        _userObj.user_name,
        _userObj.password,
        _userObj.first_name,
        _userObj.last_name,
        _userObj.email,
        _userObj.phone_number,
        _userObj.role,
    ];

    client.query(sql, values, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "Existing username or existing email or existing cell phone number" });
        } else {
            if (res.rowCount > 0) {
                return response.json({ message: "New user created successfully" });
            } else {
                return response.status(400).json({ message: "Something went wrong" });
            }
        }
    });

}

router.post('/getUserByPhone', (req, response) => {
    client.query(`SELECT id FROM users WHERE phone_number=$1`, [req.body.phone], (err, res) => {
        if (err) {
            console.log(err);
        }
        try {
            if (res.rows[0]) {
                console.log(res.rows[0].id);
                response.status(200).contentType('application/json').json({
                    "message": "ok!",
                    "data": res.rows[0].id
                })

            }
        }
        catch (e) {
            console.log(e);
            response.status(400).contentType('application/json').json({
                "message": "not ok!"
            })
        }
    })
})



module.exports = { router, varifyLogin } 