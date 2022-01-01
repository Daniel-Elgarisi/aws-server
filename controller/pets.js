const express = require('express');
const client = require('../db/db');
const router = express.Router();

router.post('/petRegister', addPet);
router.get('/updateStatus/:phonenumber/:petname', UpdatePetStatus);
router.get('/watchPatients', getAllPets);


async function getAllPets(req, response) {

    let sql = 'select * from pets';

    client.query(sql, [], (err, res) => {
        if (!err) {
            let array = [];
            res.rows.map((get) => {
                let obj = { name: get.name, breed: get.breed, gender: get.gender, type: get.type, birthday: get.birthday.toLocaleDateString('he-IL').split('').join(''), status: get.status }
                array.push(obj)
            })
            return response.status(200).json(array);
            // response.json(res.rows)
        } else {
            console.log(err);
            response.send("Error:")
        }
    });

}

router.get('/pets', (req, res) => {
    let allpets = []
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].owner == req.body.owner) {
            if (pets[i].type == req.body.type) {
                allpets.push(pets[i])
            }
        }
    }
    res.status(200).contentType('application/json').json({
        "data": allpets
    })
})


router.post('/updateVaccein', (req, response) => {
    client.query(`INSERT into vaccantions (vaccine_type,pet_id,date) 
                VALUES ($1,$2,CURRENT_DATE)`,
        [req.body.vaccein, req.body.petId],
        (err, res) => {
            if (err) {
                console.log(err);
                response.status(400).contentType('application/json').json({
                    "message": "update failed!"
                })
            }
            else {
                response.status(200).contentType('application/json').json({
                    "message": "update ok!"
                })
            }

        }
    )
})

router.post('/findPetIdByName', (req, response) => {
    client.query(`SELECT id FROM pets WHERE name=$1 AND owner_id=$2`, [req.body.pname, req.body.ownerId],
        (err, res) => {
            if (err) {
                response.status(400).contentType('application/json').json({
                    "message": "not found!"
                })
            }
            else {
                try {
                    if (res.rows[0]) {
                        console.log("owner: ", req.body.ownerId);
                        console.log(res);
                        console.log(res.rows[0]);
                        response.status(200).contentType('application/json').json({
                            "message": "ok!",
                            "data": res.rows[0].id
                        })
                    }
                }
                catch {
                    response.status(400).contentType('application/json').json({
                        "message": "not found!"
                    })
                }

            }
        })
})

router.delete('/deletePet', (req, response) => {
    client.query(`DELETE FROM pets WHERE name=$1 and owner_id=$2`, [req.body.pname, req.body.ownerId],
        (err, res) => {
            if (err) {
                console.log(err);
                response.status(400).contentType('application/json').json({
                    "message": "delete failed!"
                })
            }
            else {
                console.log("owner: ", req.body.ownerId);
                console.log(res);
                response.status(200).contentType('application/json').json({
                    "message": "delete ok!"
                })
            }

        }
    )
})


async function addPet(req, response) {

    _petObj = req.body;

    let user = await client.query("select * from users where phone_number=$1", [req.body.phone_number]);
    if (user.rowCount == 0) {
        return response.status(400).json({ message: "user is not found" });
    }

    let userpets = await client.query('select * from pets where owner_id=$1 AND name=$2', [user.rows[0].id, req.body.name]);
    if (userpets.rowCount > 0) {
        return response.status(400).json({ message: "pet is exist" });
    }

    let sql = `INSERT INTO pets(name, breed, chip_number, owner_id, birthday, gender, type,status) 
            VALUES($1, $2, $3, $4, $5, $6, $7,$8)`;

    let values = [
        _petObj.name,
        _petObj.breed,
        _petObj.chip_number,
        user.rows[0].id,
        _petObj.birthday,
        _petObj.gender,
        _petObj.type,
        _petObj.status = true
    ];

    client.query(sql, values, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "Something went wrong" });
        } else {
            if (res.rowCount > 0) {
                return response.json({ message: "New pet created successfully" });
            } else {
                return response.status(400).json({ message: "Something went wrong" });
            }
        }
    });

}

async function UpdatePetStatus(req, response) {

    let user = await client.query("select * from users where phone_number=$1", [req.params.phonenumber]);
    if (user.rowCount == 0) {
        return response.status(400).json({ message: "user is not found" });
    }

    let userpets = await client.query('select * from pets where owner_id=$1 AND name=$2', [user.rows[0].id, req.params.petname]);
    if (userpets.rowCount == 0) {
        return response.status(400).json({ message: "pet is not exist" });
    }
    let sql = "UPDATE pets SET status=$1 where owner_id=$2 AND name=$3";
    let val = [false, user.rows[0].id, req.params.petname]
    client.query(sql, val, (err, res) => {
        if (err) {
            response.status(200).json({ message: "Something went wrong" });
        } else {
            response.status(200).json({ message: "update successfully!" });
        }
    });


}



function CheckRole(Role) {
    if (Role == 1) {
        return "OWNER"
    }
    if (Role == 2) {
        return "SECRETARY"
    }
    return "DOCTOR"
}

module.exports = router;

// function validNewPet(data) {
//     let schema = joi.object({
//         phone_number: joi.string().alphanum().min(10).max(10).required(),
//         name: joi.string().regex(/^[,. a-z]+$/).min(3).max(20).required(),
//         breed: joi.string().min(2).max(15).required(),
//         chip_number: joi.number().min(15).max(15),
//         birthday: joi.required(),
//         gender: joi.required(),
//         type: joi.required()
//     });
//     return schema.validate(data);
// }


