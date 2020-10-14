const express = require('express');

const router = express.Router();
const fs = require('fs');
const {
    raw
} = require('body-parser');

const date = require("../util/date");



// Read json file
let rawdata = fs.readFileSync('userlog.json');
let userlog = JSON.parse(rawdata);
let notes = userlog;


router.get('/', (req, res) => {
    let day = date.getDate();
    res.render('list', {
        ListTitle: day,
        itemsarray: notes
    });
});

router.post('/', (req, res) => {
    let day = date.getDate();
    notes.push(req.body.nameItem);
    let data = JSON.stringify(notes);
    fs.writeFileSync('userlog.json', data);
    res.redirect('/');
})

router.post('/delete/:id', (req, res) => {
    let day = date.getDate();
    notes.splice(req.params.id, 1);
    let data = JSON.stringify(notes);
    fs.writeFileSync('userlog.json', data);
    res.redirect('/');
})

module.exports = router;