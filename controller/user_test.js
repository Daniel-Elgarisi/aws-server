
const users = [
    {username:"daniel", password: "000", role: "doctor"},
    {username:"yogev", password: "111", role: "owner"},
    {username:"maor", password: "222", role: "secretary"}
]

const express = require('express');
const router = express.Router();

router.put('/update', (req,res)=>{
    newPassword="123"
    for (let i = 0; i < pets.length; i++) {
        if(users[i].username == req.body.username){
            users[i].password=newPassword 
            break
        }
        }
        res.status(200).contentType('application/json').json({
            "messege":"It's update!",
            "data": users[i]
        })
})

module.exports = router;