const client = require('../db/db')
const express = require('express');
const router = express.Router();

router.get('/watchVacc/:phonenumber/:petname', getVaccines);

async function getVaccines(req, response) {

    let user = await client.query("select * from users where phone_number=$1", [req.params.phonenumber]);
    if (user.rowCount == 0) {
        return response.status(400).json({ message: "user is not found" });
    }

    let userpets = await client.query('select * from pets where owner_id=$1 AND name=$2', [user.rows[0].id, req.params.petname]);
    if (userpets.rowCount == 0) {
        return response.status(400).json({ message: "pet is not found" });
    }

    let sql = 'select * from vaccantions where pet_id=$1';
    let vars = [userpets.rows[0].id];

    client.query(sql, vars, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "error" });
        } else {
            let array = [];
            res.rows.map((vaccantions) => {
                let obj = { vaccine_type: vaccantions.vaccine_type, date: vaccantions.date.toLocaleDateString('he-IL').split('').join('') }
                array.push(obj)
            })
            return response.status(200).json(array);
        }
    });
}
module.exports = router;

