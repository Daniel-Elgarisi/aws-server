const client = require('../db/db')
const express = require('express');
const router = express.Router();

router.post('/make', MakeApp);
router.delete('/delete', DeleteApp);
router.get('/day', getAppOfDay);
router.get('/month', getAppOfMonth);

async function MakeApp(req, response) {
    // let fixedTime =  new Date(req.body.time.toLocaleDateString())
    let user = await client.query("select * from users where phone_number=$1", [req.body.phone_number]);
    if (user.rowCount == 0) {
        return response.status(400).json({ message: "user is not found" });
    }

    let userpets = await client.query('select * from pets where owner_id=$1 AND name=$2', [user.rows[0].id, req.body.name]);
    if (userpets.rowCount == 0) {
        return response.status(400).json({ message: "pet is not found" });
    }

    let ap = await client.query('select * from appointments where time=$1', [req.body.time]);
    if (ap.rowCount > 0) {
        return response.status(400).json({ message: "Appointment is cell" });
    }


    let sql = 'INSERT INTO appointments(appointment_type, time, owner_id, pet_id, phone_number)';
    sql += " VALUES($1,$2,$3,$4,$5)"
    let vars = [req.body.appointment_type, req.body.time, user.rows[0].id, userpets.rows[0].id, req.body.phone_number];


    client.query(sql, vars, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "error" });
        } else {
            return response.status(200).json({ message: "appointments is created successfully" });
        }
    });


}
async function DeleteApp(req, response) {

    let user = await client.query("select * from users where phone_number=$1", [req.body.phonenumber]);
    if (user.rowCount == 0) {
        return response.status(400).json({ message: "user is not found" });
    }

    let userpets = await client.query('select * from pets where owner_id=$1 AND name=$2', [user.rows[0].id, req.body.petname]);
    if (userpets.rowCount == 0) {
        return response.status(400).json({ message: "pet is not found" });
    }

    let t = await client.query('select * from appointments where owner_id=$1 AND pet_id=$2 AND time=$3', [user.rows[0].id, userpets.rows[0].id, req.body.time]);
    if (userpets.rowCount == 0) {
        return response.status(400).json({ message: "appointment is not found" });
    }

    let sql = 'delete from appointments where owner_id=$1 AND pet_id=$2 AND time=$3';
    let vars = [user.rows[0].id, userpets.rows[0].id, t.rows[0].time];

    client.query(sql, vars, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "error" });
        } else {
            return response.status(200).json({ message: "deleted" });
        }
    });
}

async function getAppOfDay(req, response) {
    let sql = "select * from appointments WHERE time>CURRENT_TIMESTAMP - interval '1' day AND time <CURRENT_TIMESTAMP + interval '1' day ";
    let appoint = await client.query(sql);
    if (appoint.rowCount == 0) {
        return response.status(400).json({ message: "appointments is not found" });
    }
    let len = appoint.rows.length
    for (let index = 0; index < len; index++) {
        let petName = await client.query('select name from pets where owner_id=$1 AND id=$2', [appoint.rows[index].owner_id, appoint.rows[index].pet_id]);
        if (petName.rowCount == 0) {
            return response.status(400).json({ message: "pet is not found" });
        }

        let user = await client.query('select first_name from users where id=$1', [appoint.rows[index].owner_id]);
        if (user.rowCount == 0) {
            return response.status(400).json({ message: "user is not found" });
        }
        appoint.rows[index].pet_id = petName.rows[0].name
        appoint.rows[index].owner_id = user.rows[0].first_name
    }

    let array = [];
    appoint.rows.map((row) => {
        let date = row.time.toLocaleDateString()
        let hour = row.time.getHours()
        hour = `${hour}`
        let minutes = row.time.getMinutes()
        minutes = `${minutes}`
        if (hour.length == 1)
            hour = "0" + hour
        if (minutes.length == 1)
            minutes = "0" + minutes
        let result = date + " " + hour + ":" + minutes
        let obj = {
            name: row.owner_id,
            phone_number: row.phone_number,
            name_pet: row.pet_id,
            type: row.appointment_type,
            time: result,
            date: row.time
        }
        array.push(obj)
    })
    array = array.sort(function (a, b) {
        return a.date - b.date
    });
    console.log(array);
    return response.status(200).json(array);
};

async function getAppOfMonth(req, response) {
    let sql = 'select * from appointments';
    let appoint = await client.query(sql);
    if (appoint.rowCount == 0) {
        return response.status(400).json({ message: "appointments is not found" });
    }
    let len = appoint.rows.length
    for (let index = 0; index < len; index++) {
        let petName = await client.query('select name from pets where owner_id=$1 AND id=$2', [appoint.rows[index].owner_id, appoint.rows[index].pet_id]);
        if (petName.rowCount == 0) {
            return response.status(400).json({ message: "pet is not found" });
        }

        let user = await client.query('select first_name from users where id=$1', [appoint.rows[index].owner_id]);
        if (user.rowCount == 0) {
            return response.status(400).json({ message: "user is not found" });
        }
        appoint.rows[index].pet_id = petName.rows[0].name
        appoint.rows[index].owner_id = user.rows[0].first_name
    }

    let array = [];
    appoint.rows.map((row) => {
        let date = row.time.toLocaleDateString()
        let hour = row.time.getHours()
        hour = `${hour}`
        let minutes = row.time.getMinutes()
        minutes = `${minutes}`
        if (hour.length == 1)
            hour = "0" + hour
        if (minutes.length == 1)
            minutes = "0" + minutes
        let result = date + " " + hour + ":" + minutes
        let obj = {
            name: row.owner_id,
            phone_number: row.phone_number,
            name_pet: row.pet_id,
            type: row.appointment_type,
            time: result,
            date: row.time
        }
        array.push(obj)
    })
    array = array.sort(function (a, b) {
        return a.date - b.date
    });
    console.log(array);
    return response.status(200).json(array);
};


module.exports = router;
