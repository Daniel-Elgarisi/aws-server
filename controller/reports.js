const client = require('../db/db')
const express = require('express');
const router = express.Router();

router.post('/uploadReport', uploadReport);
router.get('/viewMedical/:phonenumber/:petname', getAllPetReports)

async function uploadReport(req, response) {

    let user = await client.query("select * from users where phone_number=$1", [req.body.phone_number]);
    if (user.rowCount == 0) {
        return response.status(400).json({ message: "user is not found" });
    }

    let userpets = await client.query('select * from pets where owner_id=$1 AND name=$2', [user.rows[0].id, req.body.name]);
    if (userpets.rowCount == 0) {
        return response.status(400).json({ message: "pet is not found" });
    }

    let sql = 'INSERT INTO medical_report(owner_id, pet_id, appoint_type, report, date)';
    sql += " VALUES($1,$2,$3,$4, CURRENT_DATE)"
    let vars = [user.rows[0].id, userpets.rows[0].id, req.body.appointment_type, req.body.report];


    client.query(sql, vars, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "error" });
        } else {
            return response.status(200).json({ message: "report is created successfully" });
        }
    });


}

async function getAllPetReports(req, response) {

    let user = await client.query("select * from users where phone_number=$1", [req.params.phonenumber]);
    if (user.rowCount == 0) {
        return response.status(400).json({ message: "user is not found" });
    }

    let userpets = await client.query('select * from pets where owner_id=$1 AND name=$2', [user.rows[0].id, req.params.petname]);
    if (userpets.rowCount == 0) {
        return response.status(400).json({ message: "pet is not found" });
    }

    let sql = 'select * from medical_report where owner_id=$1 AND pet_id=$2';
    let vars = [user.rows[0].id, userpets.rows[0].id];

    client.query(sql, vars, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "error" });
        } else {
            let array = [];
            res.rows.map((report) => {
                let obj = {
                    type: report.appoint_type,
                    report: report.report,
                    date: report.date.toLocaleDateString('he-IL').split('').join('')
                }
                array.push(obj)
            })
            return response.status(200).json(array);
        }
    });
}

module.exports = router;
